'use client'

import { ArrowUpRight } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const PROJECTS = [
  {
    img: '/generated/projects/genyus.png',
    name: 'Genyus AI',
    tag: 'SaaS · IA',
    desc: 'Plataforma todo-en-uno de creación de contenido con inteligencia artificial.',
    url: 'https://genyus.ai',
  },
  {
    img: '/generated/projects/alkilator.png',
    name: 'Alkilator',
    tag: 'Plataforma · Reservas',
    desc: 'Alquiler de coches y furgonetas con reserva online en minutos por toda España.',
    url: 'https://alkilator.com',
  },
  {
    img: '/generated/projects/evoteam.png',
    name: 'EVOTEAM',
    tag: 'Plataforma · Deporte',
    desc: 'Gestión integral para clubes deportivos: administración, economía y comunicación en una sola solución.',
    url: 'https://evoteam.es',
  },
  {
    img: '/generated/projects/prats.png',
    name: 'Sastrería Prats',
    tag: 'Web · E-commerce',
    desc: 'Web a medida para una sastrería artesanal de trajes en Madrid, con boutique online.',
    url: 'https://sastreriaprats.com',
  },
]

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <div className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[10px] text-gray-400">{url.replace('https://', '')}</div>
    </div>
  )
}

export function ProjectsShowcase() {
  return (
    <section id="proyectos" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Proyectos realizados"
          title={<>Ideas que ya son <span className="text-gradient">producto real</span></>}
          subtitle="Una muestra de software y webs que hemos construido para clientes reales. Pásate a verlos en vivo."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <BrowserChrome url={p.url} />
                <div className="relative aspect-[16/11] overflow-hidden bg-gray-50">
                  {/* Captura real del sitio (auto-scroll suave al pasar el ratón) */}
                  <img
                    src={p.img}
                    alt={`Captura de ${p.name}`}
                    loading="lazy"
                    className="absolute left-0 top-0 w-full transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-[calc(100%-100%/1.45)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                    <ArrowUpRight className="h-5 w-5 text-blue-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-600">{p.tag}</span>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{p.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
