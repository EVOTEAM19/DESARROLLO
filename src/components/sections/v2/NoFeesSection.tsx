'use client'

import Link from 'next/link'
import { Check, X, CalendarClock, Infinity as InfinityIcon, ArrowRight } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const MENSUAL = [
  'Holded, CRMs y ERPs de pago: 50–300 €/mes',
  'Pagas todos los meses, para siempre',
  'Subidas de precio año tras año',
  'Tus datos viven en el servidor de otro',
  'Te adaptas a su producto, no al revés',
]

const PROPIO = [
  'Una sola inversión, para siempre tuyo',
  'Cero cuotas mensuales, para siempre',
  '100% tuyo: el código y los datos',
  'Hecho a la medida exacta de tu negocio',
  'Sin límites de usuarios ni de funciones',
]

export function NoFeesSection() {
  return (
    <section className="section bg-gray-50">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Adiós a las cuotas"
          title={<>Haz tu plataforma y <span className="text-gradient">olvídate de las cuotas mensuales</span></>}
          subtitle="Deja de pagar cada mes por Holded y otras herramientas que nunca serán tuyas. Te construimos tu software a medida: lo pagas una vez y es tuyo para siempre."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Suscripción mensual */}
          <Reveal>
            <div className="h-full rounded-3xl border border-gray-200 bg-white p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                  <CalendarClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Lo de siempre</p>
                  <h3 className="text-lg font-semibold text-gray-500">Suscripción mensual</h3>
                </div>
              </div>
              <ul className="mt-6 space-y-3.5">
                {MENSUAL.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Tu software a medida */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-card">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-400/15 blur-[90px]" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <InfinityIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Con FastIA</p>
                  <h3 className="text-lg font-semibold text-gray-900">Tu software, tuyo para siempre</h3>
                </div>
              </div>
              <ul className="relative mt-6 space-y-3.5">
                {PROPIO.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Ahorro */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-8 text-center sm:flex-row sm:text-left">
            <p className="text-lg leading-relaxed text-foreground">
              <span className="font-semibold text-gray-900">150 €/mes son 9.000 € en 5 años.</span>{' '}
              Tu plataforma a medida la pagas <span className="text-gradient font-semibold">una sola vez</span> y es tuya para siempre. Haz números.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Calcula lo que ahorras
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
