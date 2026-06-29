'use client'

import { PhoneCall, PenTool, Rocket, LifeBuoy } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const STEPS = [
  {
    icon: PhoneCall,
    n: '01',
    title: 'Cuéntanos tu idea',
    desc: 'Una llamada para entender tu problema, tus usuarios y a dónde quieres llegar. Sin tecnicismos.',
  },
  {
    icon: PenTool,
    n: '02',
    title: 'Diseñamos y cerramos precio',
    desc: 'Prototipo visual + alcance claro + presupuesto cerrado. Sabes exactamente qué vas a recibir y cuánto cuesta.',
  },
  {
    icon: Rocket,
    n: '03',
    title: 'Desarrollamos en sprints',
    desc: 'Construimos por iteraciones. Cada semana ves avances funcionando y puedes ajustar el rumbo.',
  },
  {
    icon: LifeBuoy,
    n: '04',
    title: 'Lanzamos y acompañamos',
    desc: 'Desplegamos en producción, te entregamos el código y seguimos a tu lado para crecer.',
  },
]

export function ProcessSteps() {
  return (
    <section id="proceso" className="section bg-gradient-to-b from-transparent via-blue-50 to-transparent">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title={<>De la idea al software <span className="text-gradient">en 4 pasos</span></>}
          subtitle="Un proceso transparente y predecible. Sin humo, sin sorpresas y con un único objetivo: que tu producto salga al mundo."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* Línea conectora en desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent md:block" />
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.n} delay={i * 0.1} className="relative">
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-background-secondary text-blue-600 shadow-glow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center md:text-left">
                  <div className="font-mono text-sm text-blue-600/70">{s.n}</div>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
