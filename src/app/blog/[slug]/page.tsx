import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/api'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

// Desactivado generateStaticParams para renderizado dinámico en cada request
// export async function generateStaticParams() {
//   const posts = await getBlogPosts(100) // Obtener más posts para generar todas las rutas
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = await getBlogPosts(100)
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  const description = post.excerpt || post.meta_description || `Lee ${post.title} en FastIA - Desarrollo de plataformas digitales con IA`
  const imageUrl = post.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'
  const title = post.meta_title || post.title

  return {
    title: `${title} | FastIA Blog`,
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
  // Conversión básica de Markdown a HTML
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-display font-bold mt-8 mb-4 text-foreground">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-display font-bold mt-10 mb-6 text-foreground">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-display font-bold mt-12 mb-8 text-foreground">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-blue-500 hover:text-accent-purple-500 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-background-secondary p-4 rounded-lg overflow-x-auto my-4"><code class="font-mono text-sm">$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-background-secondary px-2 py-1 rounded font-mono text-sm">$1</code>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    // Paragraphs
    .split('\n\n')
    .map((para) => {
      if (!para.trim()) return ''
      if (para.startsWith('<')) return para
      return `<p class="mb-4 text-foreground-muted leading-relaxed">${para}</p>`
    })
    .join('')

  // Wrap list items
  html = html.replace(/(<li[\s\S]*?<\/li>)/g, (match) => {
    if (match.includes('<ul') || match.includes('<ol')) return match
    return `<ul class="list-disc ml-6 mb-4 space-y-2">${match}</ul>`
  })

  return html
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getBlogPosts(100)
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.published_at || post.created_at
  const readTime = Math.ceil((post.content?.length || 0) / 1000) || 5
  const relatedPosts = posts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags?.some((tag) => post.tags?.includes(tag))))
    .slice(0, 3)

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.image_url,
    datePublished: publishedDate,
    dateModified: post.updated_at || publishedDate,
    author: {
      '@type': 'Person',
      name: post.author || 'FastIA',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FastIA',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastia.es'}/blog/${post.slug}`,
    },
  }

  const contentHtml = renderMarkdown(post.content || '')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 lg:px-6 pt-8">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              {post.category && (
                <span className="inline-block px-4 py-2 rounded-full bg-accent-blue-500/10 text-accent-blue-400 text-sm font-semibold mb-6">
                  {post.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-foreground">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-foreground-muted leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-muted mb-8 pb-8 border-b border-foreground/10">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={publishedDate}>
                    {new Date(publishedDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min de lectura</span>
                </div>
              </div>

              {/* Share Buttons */}
              <ShareButtons
                url={`/blog/${post.slug}`}
                title={post.title}
                description={post.excerpt || ''}
              />
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image_url && (
          <section className="relative h-64 md:h-96 lg:h-[500px] mb-12">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="py-12 border-t border-foreground/10">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-background-secondary text-foreground-muted text-sm border border-foreground/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-background-secondary">
            <div className="container mx-auto px-4 lg:px-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Artículos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group block bg-background rounded-lg overflow-hidden border border-foreground/10 hover:border-accent-blue-500/30 transition-all duration-300 hover:shadow-glow-md"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-accent-blue-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-foreground-muted text-sm line-clamp-2 mb-4">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-accent-blue-500 group-hover:text-accent-purple-500 transition-colors">
                        <span className="text-sm font-semibold">Leer más</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
