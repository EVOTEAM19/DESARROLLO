import { Suspense } from 'react'
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
