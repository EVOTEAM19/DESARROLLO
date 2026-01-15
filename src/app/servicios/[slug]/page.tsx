import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServices, getPageBySlug } from '@/lib/api'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const services = await getServices()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    }
  }

  const description = service.description || `Descubre ${service.name}, servicio de FastIA - Desarrollo de plataformas digitales con IA`

  return {
    title: `${service.name} | FastIA`,
    description,
    openGraph: {
      title: service.name,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: service.name,
      description,
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const services = await getServices()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const relatedServices = services
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3)

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.category,
    provider: {
      '@type': 'Organization',
      name: 'FastIA',
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
              { label: 'Servicios', href: '/servicios' },
              { label: service.name },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-accent-blue-500/10 text-accent-blue-400 text-sm font-semibold mb-4">
                  {service.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
                  {service.name}
                </h1>
                <p className="text-xl text-foreground-muted leading-relaxed max-w-3xl mx-auto">
                  {service.description}
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex justify-center">
                <ShareButtons
                  url={`/servicios/${service.slug}`}
                  title={service.name}
                  description={service.description || ''}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background-secondary">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Beneficios clave
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Implementación rápida y escalable',
                  'Soporte técnico especializado',
                  'Resultados medibles y ROI demostrable',
                  'Integración con sistemas existentes',
                  'Capacitación y acompañamiento continuo',
                  'Innovación constante y actualizaciones',
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-background rounded-lg border border-foreground/10"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-blue-500/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-blue-500" />
                    </div>
                    <p className="text-foreground font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Casos de uso
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Empresas en crecimiento',
                    description: 'Escala tus operaciones con soluciones de IA que crecen contigo, desde startups hasta empresas globales.',
                  },
                  {
                    title: 'Transformación digital',
                    description: 'Moderniza tus procesos con tecnologías de vanguardia que mejoran la eficiencia y la experiencia del cliente.',
                  },
                  {
                    title: 'Optimización operativa',
                    description: 'Reduce costos y aumenta la productividad mediante automatización inteligente y análisis predictivo.',
                  },
                ].map((useCase, index) => (
                  <div
                    key={index}
                    className="p-6 bg-background-secondary rounded-lg border border-foreground/10"
                  >
                    <h3 className="text-xl font-display font-bold mb-3 text-foreground">
                      {useCase.title}
                    </h3>
                    <p className="text-foreground-muted">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background-secondary">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-xl text-foreground-muted">
                Contacta con nuestro equipo para descubrir cómo podemos ayudarte
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-blue-600 via-accent-purple-600 to-accent-cyan-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-glow-lg hover:scale-105 group"
              >
                <span>Contactar ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-foreground">
                Servicios relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((related) => (
                  <Link
                    key={related.id}
                    href={`/servicios/${related.slug}`}
                    className="group block bg-background-secondary rounded-lg overflow-hidden border border-foreground/10 hover:border-accent-blue-500/30 transition-all duration-300 hover:shadow-glow-md p-6"
                  >
                    <div className="mb-4">
                      <Sparkles className="w-8 h-8 text-accent-blue-500" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-accent-blue-400 transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-foreground-muted text-sm line-clamp-2">
                      {related.description}
                    </p>
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
