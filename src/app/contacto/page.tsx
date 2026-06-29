import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHero } from '@/components/sections/v2/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto | FastIA — Cuéntanos tu idea',
  description:
    'Cuéntanos tu idea y te respondemos en menos de 24h con un plan, un precio cerrado y un plazo. Llamada gratuita, sin compromiso.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contacto"
        title={<>Cuéntanos tu idea y <span className="text-gradient">hagámosla realidad</span></>}
        subtitle="Te respondemos en menos de 24h con una idea clara de cómo construirla, cuánto cuesta y en cuánto tiempo. Sin comerciales pesados, solo una conversación honesta."
      />
      <Suspense fallback={<div className="py-24 text-center text-foreground-muted">Cargando formulario…</div>}>
        <ContactForm />
      </Suspense>
    </div>
  )
}
