import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/v2/PageHero'
import { AboutSections } from '@/components/sections/v2/AboutSections'
import { StatsBand } from '@/components/sections/v2/StatsBand'
import { FinalCta } from '@/components/sections/v2/FinalCta'

export const metadata: Metadata = {
  title: 'Nosotros | FastIA — Agencia de desarrollo a medida',
  description:
    'Somos una agencia de desarrollo de software a medida. Tú imaginas, nosotros lo construimos: desde 2.000 € y en tiempo récord. Conoce cómo trabajamos.',
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Nosotros"
        title={<>Desarrolladores que convierten <span className="text-gradient">ideas en software</span></>}
        subtitle="Un equipo cercano, obsesionado con entregar rápido, cobrar lo justo y dejarte el código en las manos."
        ctaLabel="Trabaja con nosotros"
      />
      <AboutSections />
      <StatsBand />
      <FinalCta />
    </div>
  )
}

