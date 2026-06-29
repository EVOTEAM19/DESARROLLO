'use client'

import { Boxes, Smartphone, LayoutDashboard, Globe, Bot, Plug, Check } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const SERVICES = [
  {
    icon: Boxes,
    title: 'Software a medida',
    desc: 'Herramientas internas que se adaptan a cómo trabaja tu empresa, no al revés.',
    points: ['ERPs y CRMs propios', 'Paneles de gestión', 'Digitalización de procesos', 'Roles y permisos'],
  },
  {
    icon: Smartphone,
    title: 'Aplicaciones móviles',
    desc: 'Apps nativas para iOS y Android desde una sola base de código.',
    points: ['React Native / Flutter', 'Publicación en stores', 'Notificaciones push', 'Modo offline'],
  },
  {
    icon: LayoutDashboard,
    title: 'Plataformas web & SaaS',
    desc: 'Productos web completos, multiusuario y listos para escalar.',
    points: ['Suscripciones y pagos', 'Dashboards en tiempo real', 'Multi-tenant', 'Panel de administración'],
  },
  {
    icon: Globe,
    title: 'Webs y landing pages',
    desc: 'Sitios rápidos, cuidados y optimizados para convertir visitas en clientes.',
    points: ['Diseño a medida', 'SEO técnico', 'Rendimiento 90+', 'Gestor de contenidos'],
  },
  {
    icon: Bot,
    title: 'Automatización & IA',
    desc: 'Quita tareas repetitivas del medio y pon a la IA a trabajar por ti.',
    points: ['Agentes y chatbots', 'Workflows automáticos', 'Integración con OpenAI', 'Procesado de documentos'],
  },
  {
    icon: Plug,
    title: 'Integraciones & APIs',
    desc: 'Conectamos todas tus herramientas para que hablen entre sí.',
    points: ['Pasarelas de pago', 'CRMs y ERPs', 'APIs de terceros', 'Sincronización de datos'],
  },
]

export function ServicesGrid() {
  return (
    <section id="servicios" className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Qué hacemos"
          title={<>Un equipo, <span className="text-gradient">todo lo que necesitas construir</span></>}
          subtitle="Elige por dónde empezar. Lo más habitual es combinar varios: una web que capta, una app que fideliza y una automatización que te ahorra horas."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <div className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:bg-gray-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-blue-600 ring-1 ring-inset ring-indigo-500/20 transition-colors group-hover:bg-indigo-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.desc}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-gray-200 pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                        <Check className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
