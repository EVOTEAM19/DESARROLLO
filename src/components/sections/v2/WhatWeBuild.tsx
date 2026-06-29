'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Boxes, Plug, Brain, ArrowUpRight, ChevronRight } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

function ImageCard({
  src,
  title,
  desc,
  wide = false,
}: {
  src: string
  title: string
  desc: string
  wide?: boolean
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
      <div className={`relative ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'} overflow-hidden bg-gray-50`}>
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="flex items-center gap-1.5 text-xl font-semibold text-gray-900">
          {title}
          <ArrowUpRight className="h-5 w-5 text-blue-500 opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{desc}</p>
      </div>
    </div>
  )
}

function IconCard({ icon: Icon, title, desc }: { icon: typeof Boxes; title: string; desc: string }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{desc}</p>
    </div>
  )
}

export function WhatWeBuild() {
  return (
    <section id="servicios" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Qué construimos"
          title={<>Si lo puedes imaginar, <span className="text-gradient">lo podemos construir</span></>}
          subtitle="Apps, webs, plataformas y automatizaciones a medida. Desde el MVP de una startup hasta la herramienta interna que tu empresa necesita."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ImageCard
              src="/generated/mocks/mock-web-v2.jpg"
              title="Plataformas web & SaaS"
              desc="Paneles de control, portales de cliente y productos SaaS completos. Escalables, rápidos y con la experiencia de usuario que esperan tus clientes."
              wide
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ImageCard
              src="/generated/mocks/mock-app-v2.jpg"
              title="Apps móviles"
              desc="iOS y Android desde una sola base de código. Nativas, fluidas y listas para publicar en las stores."
            />
          </Reveal>

          <Reveal delay={0.04}>
            <ImageCard
              src="/generated/mocks/mock-store-v2.jpg"
              title="Webs que convierten"
              desc="Sitios corporativos y landing pages rápidas, bonitas y optimizadas para vender."
            />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-2">
            <ImageCard
              src="/generated/showcase-automation.png"
              title="Automatización & IA"
              desc="Conectamos tus herramientas, automatizamos procesos y montamos agentes de IA que trabajan por ti 24/7."
              wide
            />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Reveal>
            <IconCard icon={Boxes} title="Software a medida" desc="ERPs, CRMs y herramientas internas diseñadas exactamente para cómo trabaja tu empresa." />
          </Reveal>
          <Reveal delay={0.08}>
            <IconCard icon={Plug} title="Integraciones & APIs" desc="Conecta tu stack: pagos, facturación, CRMs, ERPs y cualquier servicio con API." />
          </Reveal>
          <Reveal delay={0.16}>
            <IconCard icon={Brain} title="MVP para startups" desc="De cero a producto validable en semanas, listo para enseñar a inversores y primeros usuarios." />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link href="/servicios" className="link inline-flex items-center gap-0.5 text-base font-medium">
              Ver todos los servicios <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
