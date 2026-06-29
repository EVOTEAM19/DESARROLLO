'use client'

import Link from 'next/link'
import { Search, Megaphone, BarChart3, ChevronRight } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const SERVICES = [
  {
    icon: Search,
    title: 'Posicionamiento SEO',
    desc: 'Aparece en Google de forma orgánica. Optimizamos tu web —técnico, contenido y autoridad— para atraer tráfico cualificado mes a mes, sin pagar por cada clic.',
    points: ['Auditoría y SEO técnico', 'Contenido que posiciona', 'SEO local y Google Maps'],
  },
  {
    icon: Megaphone,
    title: 'Campañas SEM',
    desc: 'Campañas especiales en Google Ads y redes sociales. Llegamos a tus clientes ideales desde el primer día con anuncios optimizados para convertir.',
    points: ['Google Ads y Meta Ads', 'Segmentación precisa', 'Optimización por conversión'],
  },
  {
    icon: BarChart3,
    title: 'Datos y optimización',
    desc: 'Medimos cada euro invertido y mejoramos sin parar. Sabes exactamente qué funciona y de dónde llegan tus clientes.',
    points: ['Analítica y seguimiento', 'Informes claros', 'Mejora continua'],
  },
]

export function GrowthSection() {
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Crecimiento"
          title={<>No solo lo construimos: <span className="text-gradient">hacemos que te encuentren</span></>}
          subtitle="Una gran plataforma no sirve de nada si nadie la ve. Posicionamos tu negocio en Google y lanzamos campañas para llenarte de clientes."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.desc}</p>
                  <ul className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <Link href="/contacto" className="link inline-flex items-center gap-0.5 text-base font-medium">
              Quiero más clientes <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
