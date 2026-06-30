'use client'

import Image from 'next/image'
import { Sparkles, Wallet, Gauge, Code2, MessageSquare, ShieldCheck } from 'lucide-react'
import { SectionHeading, Reveal, Eyebrow } from './_shared'

const VALUES = [
  { icon: MessageSquare, title: 'Cercanía real', desc: 'Hablas directamente con quien diseña y programa tu producto. Sin capas, sin intermediarios, sin tickets.' },
  { icon: Wallet, title: 'Precio justo', desc: 'Presupuesto cerrado y sin sorpresas. Crees que el buen software tiene que costar una fortuna: no es verdad.' },
  { icon: Gauge, title: 'Velocidad', desc: 'Trabajamos en sprints y entregamos pronto: un producto terminado y perfecto en semanas, no en meses.' },
  { icon: Code2, title: 'Es tuyo', desc: 'Te entregamos el código fuente completo. Sin ataduras ni dependencias forzadas con nosotros.' },
  { icon: ShieldCheck, title: 'Calidad seria', desc: 'Código limpio, probado y escalable. Tu producto nace terminado y preparado para crecer contigo.' },
  { icon: Sparkles, title: 'Sin humo', desc: 'Usamos IA y la última tecnología cuando aporta valor de verdad, no para rellenar una propuesta.' },
]

export function AboutSections() {
  return (
    <>
      {/* Manifiesto */}
      <section className="section">
        <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Nuestra idea</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tightest text-gray-900 sm:text-4xl text-balance">
                Cualquier cosa que imagines, te la convertimos en software.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground-muted">
                <p>
                  Somos una agencia de desarrollo formada por gente que lleva años construyendo producto. Nos cansamos
                  de ver presupuestos imposibles y plazos eternos para cosas que se pueden hacer mucho mejor, más
                  rápido y más barato.
                </p>
                <p>
                  Así que montamos FastIA con una premisa simple: <span className="text-gray-900">tú imaginas, nosotros
                  lo construimos.</span> Una web, una app, una plataforma o esa herramienta interna que llevas meses
                  necesitando — a medida y en tiempo récord.
                </p>
                <p>Sin letra pequeña, sin cajas negras y con el código en tus manos desde el primer día.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-card">
              <Image
                src="/generated/avatar-team.png"
                alt="Equipo de desarrollo FastIA"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="section bg-gray-50">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title={<>Los principios que <span className="text-gradient">no negociamos</span></>}
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-gray-900">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{v.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
