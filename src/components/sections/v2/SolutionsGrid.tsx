'use client'

import Link from 'next/link'
import {
  Warehouse, Calculator, Boxes, CreditCard, Fingerprint, Target, Users, CalendarCheck,
  LayoutDashboard, Workflow, FileText, Plug, ArrowRight,
} from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const SOLUTIONS = [
  { icon: Warehouse, t: 'Gestión de almacén' },
  { icon: Boxes, t: 'Control de stock' },
  { icon: Calculator, t: 'Contabilidad y facturación' },
  { icon: CreditCard, t: 'Gestión de pagos y cobros' },
  { icon: Fingerprint, t: 'Fichaje de empleados' },
  { icon: Target, t: 'Generación de leads' },
  { icon: Users, t: 'CRM a medida' },
  { icon: CalendarCheck, t: 'Reservas y citas' },
  { icon: LayoutDashboard, t: 'Portales de cliente' },
  { icon: FileText, t: 'Informes y paneles (BI)' },
  { icon: Workflow, t: 'Automatización de procesos' },
  { icon: Plug, t: 'Integraciones y APIs' },
]

export function SolutionsGrid() {
  return (
    <section className="section bg-gray-50">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Sin límites"
          title={<>Software para <span className="text-gradient">lo que necesites</span></>}
          subtitle="Nos adaptamos a tu negocio: automatizamos procesos y creamos justo la herramienta que imaginas. Estos son solo algunos ejemplos — si se te ocurre, lo construimos."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.t} delay={(i % 4) * 0.05}>
                <div className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{s.t}</span>
                </div>
              </Reveal>
            )
          })}
          <Reveal delay={0.1}>
            <Link
              href="/contacto"
              className="group flex h-full items-center gap-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-sm font-semibold">…y lo que imagines</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
