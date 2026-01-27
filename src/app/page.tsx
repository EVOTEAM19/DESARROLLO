import { Suspense } from 'react'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { TechStack } from '@/components/sections/TechStack'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { ContactForm } from '@/components/sections/ContactForm'
import { WhyAICompetitive } from '@/components/sections/WhyAICompetitive'
import { BusinessSectors } from '@/components/sections/BusinessSectors'
import { AICaseStudies } from '@/components/sections/AICaseStudies'
import { ClientLogos } from '@/components/ClientLogos'
import { getSiteSettings } from '@/lib/api'
import { HeroSkeleton } from '@/components/ui/Skeleton'

// Forzar renderizado dinámico en cada request (sin caché)
// Esto desactiva completamente la generación estática
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true

export default async function Home() {
  // Cargar datos del hero desde Supabase (si no existe, no falla)
  const heroData = await getSiteSettings('hero_section').catch(() => null)

  return (
    <div className="flex flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Sección Estadísticas de Impacto IA */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Integramos IA en tu negocio para multiplicar resultados con menos recursos
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">70%</div>
              <div className="text-xl text-white mb-2">Reducción de costes operativos</div>
              <div className="text-gray-400">Automatiza tareas repetitivas con IA</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">3x</div>
              <div className="text-xl text-white mb-2">Multiplicación de productividad</div>
              <div className="text-gray-400">Tus equipos logran más en menos tiempo</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">8 semanas</div>
              <div className="text-xl text-white mb-2">De la idea a IA en producción</div>
              <div className="text-gray-400">Resultados medibles desde el día 1</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">+100</div>
              <div className="text-xl text-white mb-2">Proyectos con IA integrada</div>
              <div className="text-gray-400">Empresas transformadas por nuestro equipo</div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-300 mb-8">
              Desarrollamos apps móviles, plataformas web y software a medida con <strong className="text-white">Inteligencia Artificial integrada desde el primer día</strong>. 
              No solo programamos: <strong className="text-white">transformamos tu negocio</strong>. 
              Automatizamos procesos, reducimos costes hasta un 70% y multiplicamos productividad. 
              <strong className="text-white"> Resultados medibles en 8 semanas</strong>.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contacto"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Descubre cómo la IA puede transformar tu negocio →
              </Link>
              <Link
                href="/contacto"
                className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded-lg transition-colors"
              >
                Habla con un especialista en IA →
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
        <WhyAICompetitive />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <ProcessTimeline />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <BusinessSectors />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <AICaseStudies />
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
