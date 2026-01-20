import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts, getPageBySlug } from '@/lib/api'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { ArrowRight, Check, Mail } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Desactivado generateStaticParams para renderizado dinámico en cada request
// export async function generateStaticParams() {
//   const products = await getProducts()
//   return products.map((product) => ({
//     slug: product.slug,
//   }))
// }

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  const description = product.description || `Descubre ${product.name}, ${product.category} de FastIA - Plataforma digital con IA`
  const imageUrl = product.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'

  return {
    title: `${product.name} | FastIA`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const features = (product.features as string[]) || []
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3)

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    category: product.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  }

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
              { label: 'Productos', href: '/productos' },
              { label: product.name },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Imagen */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-secondary">
                <Image
                  src={product.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Contenido */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-accent-blue-500/10 text-accent-blue-400 text-sm font-semibold mb-4">
                    {product.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-xl text-foreground-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Share Buttons */}
                <ShareButtons
                  url={`/productos/${product.slug}`}
                  title={product.name}
                  description={product.description || ''}
                />

                {/* CTA */}
                <div className="pt-6">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-blue-600 via-accent-purple-600 to-accent-cyan-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-glow-lg hover:scale-105 group"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contactar sobre este producto</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-20 bg-background-secondary">
            <div className="container mx-auto px-4 lg:px-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Características principales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-background rounded-lg border border-foreground/10"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-blue-500/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-blue-500" />
                    </div>
                    <p className="text-foreground font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Otros productos relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/productos/${related.slug}`}
                    className="group block bg-background-secondary rounded-lg overflow-hidden border border-foreground/10 hover:border-accent-blue-500/30 transition-all duration-300 hover:shadow-glow-md"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'}
                        alt={related.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-accent-blue-400 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-foreground-muted text-sm line-clamp-2">
                        {related.description}
                      </p>
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
