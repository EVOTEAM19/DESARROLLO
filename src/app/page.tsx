import { Suspense } from 'react'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { TechStack } from '@/components/sections/TechStack'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { ContactForm } from '@/components/sections/ContactForm'
import { ClientLogos } from '@/components/ClientLogos'
import { getSiteSettings } from '@/lib/api'
import { HeroSkeleton } from '@/components/ui/Skeleton'

// Revalidar cada hora (3600 segundos)
export const revalidate = 3600

export default async function Home() {
  // Cargar datos del hero desde Supabase
  const heroData = await getSiteSettings('hero_section')

  return (
    <div className="flex flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Sección Desarrollo Freelance - SEO */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Desarrollo Freelance Profesional | Apps &amp; Software a Medida
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">8 semanas</div>
              <div className="text-xl text-white mb-2">MVP en producción</div>
              <div className="text-gray-400">De idea a App Store/Play Store</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">45-75€</div>
              <div className="text-xl text-white mb-2">hora developers senior</div>
              <div className="text-gray-400">Precio competitivo, calidad premium</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">+40</div>
              <div className="text-xl text-white mb-2">developers freelance</div>
              <div className="text-gray-400">React, Flutter, iOS, Android, IA</div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-300 mb-8">
              Desarrolladores <strong className="text-white">freelance expertos</strong> en apps móviles,
              plataformas web y software personalizado. <strong className="text-white">MVP rápido</strong>,
              código limpio, <strong className="text-white">precio justo</strong>. También ofrecemos
              <strong className="text-white"> CTO as a Service</strong> para startups que necesitan
              liderazgo tech sin contratar full-time.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/freelance"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Ver developers disponibles →
              </Link>
              <Link
                href="/cto-as-a-service"
                className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded-lg transition-colors"
              >
                Contratar CTO freelance →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20" />}>
        <ClientLogos />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <StatsCounter />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <ProductsSection />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <ProcessTimeline />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <BlogGrid />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <ContactForm />
      </Suspense>
    </div>
  )
}
