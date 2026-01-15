import { getServices } from '@/lib/api'
import { ServicesSection } from '@/components/sections/ServicesSection'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Servicios | FastIA',
  description: 'Desarrollo de apps móviles, plataformas web, automatización con IA y más. Soluciones tecnológicas que transforman tu negocio.',
}

export default async function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesSection />
    </div>
  )
}
