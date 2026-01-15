import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/api'
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { generateArticleSchema } from '@/lib/schemas'
import { TrackedLink } from '@/components/ui/TrackedLink'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(100)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = await getBlogPosts(100)
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  const description = post.excerpt || post.meta_description || `Lee ${post.title} en FastIA`
  const imageUrl = post.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'
  const title = post.meta_title || post.title

  return {
    title: `${title} | FastIA Reflexiones`,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author || 'FastIA'],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

function renderMarkdown(content: string) {
  let html = content
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-white">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6 text-white">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8 text-white">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-500 hover:text-orange-400 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="font-mono text-sm text-gray-300">$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded font-mono text-sm text-orange-500">$1</code>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-300">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-300">$1</li>')
    .split('\n\n')
    .map((para) => {
      if (!para.trim()) return ''
      if (para.startsWith('<')) return para
      return `<p class="mb-6 text-gray-300 leading-relaxed text-lg">${para}</p>`
    })
    .join('')

  html = html.replace(/(<li.*<\/li>)/gs, (match) => {
    if (match.includes('<ul') || match.includes('<ol')) return match
    return `<ul class="list-disc ml-6 mb-6 space-y-2">${match}</ul>`
  })

  return html
}

export default async function ReflexionPostPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getBlogPosts(100)
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.published_at || post.created_at
  const readTime = Math.ceil((post.content?.length || 0) / 200) || 5

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'
  const articleUrl = `${baseUrl}/reflexiones/${post.slug}`
  const articleImage = post.image_url || `${baseUrl}/og-image.jpg`

  // Structured Data para Article
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt || post.meta_description || '',
    image: articleImage,
    author: post.author || 'Equipo FastIA',
    datePublished: publishedDate,
    dateModified: post.updated_at || publishedDate,
    url: articleUrl,
    category: post.category || 'Tecnología',
    keywords: post.tags || ['IA', 'Inteligencia Artificial'],
  })

  return (
    <>
      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen bg-gray-900">
      {/* Header del artículo */}
      <article className="max-w-4xl mx-auto px-4 pt-32 pb-24">
        {/* Back button */}
        <Link 
          href="/reflexiones"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Reflexiones
        </Link>

        {/* Categoría */}
        <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
          <span className="text-sm font-semibold text-orange-500">
            {post.category?.toUpperCase() || 'ARTÍCULO'}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-800 mb-12">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author || 'Equipo FastIA'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(publishedDate).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readTime} min de lectura</span>
          </div>
          <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Compartir</span>
          </button>
        </div>

        {/* Imagen destacada */}
        {post.image_url && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Contenido del artículo */}
        <div 
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-400
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-gray-300 prose-ul:my-6
            prose-ol:text-gray-300 prose-ol:my-6
            prose-li:my-2
            prose-code:text-orange-500 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
            prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || '') }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all cursor-pointer"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-orange-500/10 to-gray-800 border border-orange-500/30 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Te gustaría implementar esto en tu empresa?
          </h3>
          <p className="text-gray-400 mb-2">
            Agendamos una sesión de 30 minutos gratis. Analizamos tu caso y te damos un presupuesto sin compromiso.
          </p>
          <p className="text-lg text-orange-400 mb-6 font-semibold">
            ROI en 6 meses o devolvemos dinero
          </p>
          <TrackedLink
            href="/contacto"
            ctaName="Demo gratuita 30min - ROI garantizado"
            location={`Blog Post - ${post.title}`}
            className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50"
          >
            Demo gratuita 30min →
          </TrackedLink>
        </div>
      </article>
      </div>
    </>
  )
}
