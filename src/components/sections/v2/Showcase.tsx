'use client'

import Image from 'next/image'
import { SectionHeading, Reveal } from './_shared'

const PROJECTS = [
  {
    img: '/generated/showcase-dashboard.png',
    tag: 'SaaS · Panel de control',
    title: 'Plataforma de gestión a medida',
    desc: 'Un panel para centralizar operaciones, métricas y clientes en un solo lugar, con roles y permisos.',
    stack: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    img: '/generated/showcase-mobile.png',
    tag: 'App móvil · iOS + Android',
    title: 'App de fidelización y pedidos',
    desc: 'Una app para que tus clientes pidan, acumulen puntos y reciban notificaciones, publicada en ambas stores.',
    stack: ['React Native', 'Node.js', 'Push'],
  },
  {
    img: '/generated/showcase-automation.png',
    tag: 'Automatización · IA',
    title: 'Asistente que automatiza procesos',
    desc: 'Un agente que conecta tus herramientas, responde a clientes y elimina tareas repetitivas del equipo.',
    stack: ['Python', 'OpenAI', 'n8n'],
  },
]

export function Showcase() {
  return (
    <section id="proyectos" className="section bg-gray-50">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Ejemplos"
          title={<>Una muestra de lo que <span className="text-gradient">podemos construir</span></>}
          subtitle="Conceptos como punto de partida. Tu proyecto se diseña desde cero alrededor de tu idea y tu negocio."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-black/5 bg-white/85 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
