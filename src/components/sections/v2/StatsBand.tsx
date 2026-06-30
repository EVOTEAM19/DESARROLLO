'use client'

import { Reveal } from './_shared'

const STATS = [
  { value: 'Sin límites', label: 'En lo que construimos para ti' },
  { value: '2–8', label: 'Semanas del brief al lanzamiento' },
  { value: '100%', label: 'Del código fuente es tuyo' },
  { value: '1 a 1', label: 'Hablas con quien programa' },
]

export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-gray-200 py-16">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="container-tight relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">{s.value}</div>
                <div className="mx-auto mt-3 max-w-[12rem] text-sm leading-snug text-foreground-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
