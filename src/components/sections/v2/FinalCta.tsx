'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './_shared'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-50" />

      <div className="container-tight relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tightest text-gray-900 sm:text-6xl text-balance">
            ¿Tienes una idea en la cabeza?
            <br />
            <span className="text-gradient">Hagámosla realidad.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground-muted">
            Cuéntanosla en una llamada gratuita de 20 minutos. Saldrás con una idea clara de cómo construirla,
            cuánto cuesta y en cuánto tiempo.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-600"
            >
              Cuéntanos tu idea
            </Link>
            <a
              href="mailto:hola@fastia.es"
              className="group inline-flex items-center gap-0.5 text-lg font-medium text-blue-600 transition-colors hover:text-blue-500"
            >
              Escríbenos
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
