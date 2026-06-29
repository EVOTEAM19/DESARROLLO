'use client'

import Link from 'next/link'
import { Clock, CalendarRange, Target, ArrowRight, Check } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const MODES = [
  {
    icon: Clock,
    title: 'Por horas',
    desc: 'Suma un desarrollador senior a tu equipo solo por las horas que necesites. Perfecto para desbloquear algo, revisar código o avanzar tareas concretas.',
  },
  {
    icon: CalendarRange,
    title: 'Por meses',
    desc: 'Refuerza tu equipo durante semanas o meses, con dedicación parcial o completa. Se integra en tu día a día como uno más del equipo.',
  },
  {
    icon: Target,
    title: 'Trabajo puntual',
    desc: 'Un encargo concreto con principio y fin: una integración, una funcionalidad, una migración o un producto completo. Lo desarrollamos, lo entregamos y listo.',
  },
]

const ANY = ['Webs y apps', 'Integraciones y APIs', 'Automatizaciones e IA', 'Bases de datos', 'Paneles y dashboards', 'Lo que imagines']

export function FreelanceSection() {
  return (
    <section id="freelance" className="section bg-gray-50">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Talento bajo demanda"
          title={<>Contrata talento freelance <span className="text-gradient">cuando lo necesites</span></>}
          subtitle="¿No necesitas un proyecto entero? Pon a un desarrollador senior en tu equipo el tiempo justo —por horas, por meses o para un encargo puntual— y que construya exactamente lo que te haga falta."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {MODES.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{m.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Desarrollamos cualquier cosa + CTA */}
        <Reveal delay={0.12}>
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-400/15 blur-[90px]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tightest text-gray-900 sm:text-3xl">
                  Desarrollamos <span className="text-gradient">cualquier cosa</span>
                </h3>
                <p className="mt-3 text-foreground-muted">
                  Desde una pequeña integración hasta una plataforma entera. Tú pones el alcance y el tiempo; nosotros, el código.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ANY.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-foreground">
                      <Check className="h-3.5 w-3.5 text-blue-600" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:justify-self-end">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  Habla con un desarrollador
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
