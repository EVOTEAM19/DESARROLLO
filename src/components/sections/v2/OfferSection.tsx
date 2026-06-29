'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Reveal } from './_shared'

const INCLUDED = [
  'Sesión de descubrimiento y definición del alcance',
  'Diseño de interfaz (UI/UX) a medida',
  'Desarrollo completo: web, app o ambas',
  'Despliegue en producción y puesta en marcha',
  'Código fuente 100% tuyo, sin ataduras',
  '30 días de soporte y ajustes incluidos',
]

export function OfferSection() {
  return (
    <section className="section">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-card sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-blue-300/15 blur-[100px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="pill">Oferta de lanzamiento</span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tightest text-gray-900 sm:text-5xl">
                  Tu proyecto, desde <span className="text-gradient">2.000 €</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
                  Un precio cerrado, un equipo senior y un plazo claro. Llevamos tu idea a producción sin
                  presupuestos eternos ni letra pequeña.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contacto"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    Pide tu presupuesto gratis
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 font-medium text-gray-900 transition-colors hover:bg-gray-50"
                  >
                    Ver servicios
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white/70 p-7 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Qué incluye</p>
                <ul className="mt-5 space-y-4">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
