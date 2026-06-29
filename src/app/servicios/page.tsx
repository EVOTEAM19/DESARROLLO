import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/v2/PageHero'
import { ServicesGrid } from '@/components/sections/v2/ServicesGrid'
import { ProcessSteps } from '@/components/sections/v2/ProcessSteps'
import { OfferSection } from '@/components/sections/v2/OfferSection'
import { FaqSection } from '@/components/sections/v2/FaqSection'
import { FinalCta } from '@/components/sections/v2/FinalCta'

export const metadata: Metadata = {
  title: 'Servicios | FastIA — Desarrollo de software a medida',
  description:
    'Software a medida, apps móviles, plataformas web, webs y automatización con IA. Precio cerrado desde 2.000 € y entrega en tiempo récord.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Servicios"
        title={<>Construimos el software <span className="text-gradient">que tu negocio necesita</span></>}
        subtitle="Desde una idea en una servilleta hasta un producto en producción. Webs, apps, plataformas y automatizaciones a medida — con precio cerrado y plazos reales."
        ctaLabel="Pide presupuesto gratis"
      />
      <ServicesGrid />
      <ProcessSteps />
      <OfferSection />
      <FaqSection />
      <FinalCta />
    </div>
  )
}
