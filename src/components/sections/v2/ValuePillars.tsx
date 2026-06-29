'use client'

import { Tag, Gauge, Code2, HeartHandshake } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const PILLARS = [
  {
    icon: Tag,
    title: 'Precio cerrado',
    desc: 'Proyectos a medida desde 2.000 €. Sabes lo que pagas antes de empezar. Sin sorpresas ni facturas infladas.',
  },
  {
    icon: Gauge,
    title: 'Tiempo récord',
    desc: 'Tu producto terminado en semanas, no en meses. Trabajamos en sprints y ves avances reales cada semana.',
  },
  {
    icon: Code2,
    title: 'El código es tuyo',
    desc: 'Te entregamos el 100% del código fuente. Sin ataduras, sin cajas negras, sin dependencias forzadas.',
  },
  {
    icon: HeartHandshake,
    title: 'Acompañamiento real',
    desc: 'Hablas con quien programa, no con un ticket. Un equipo cercano que entiende tu negocio y te asesora.',
  },
]

export function ValuePillars() {
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Por qué FastIA"
          title={<>Software serio, sin la fricción <span className="text-gradient">de una gran consultora</span></>}
          subtitle="La potencia de un equipo senior con la cercanía y la velocidad de un partner que rema contigo."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:bg-gray-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-blue-600 ring-1 ring-inset ring-indigo-500/20 transition-colors group-hover:bg-indigo-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{p.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
