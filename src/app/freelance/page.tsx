import { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, Calculator } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Desarrollador Freelance Madrid | Apps & Software a Medida',
  description:
    'Desarrolladores freelance expertos en apps móviles (iOS/Android), web (React/Next.js) y software a medida. MVP en 8 semanas. +40 developers disponibles. Precio competitivo, facturación legal. Madrid, Barcelona, Sevilla.',
  keywords:
    'desarrollador freelance madrid, programador freelance españa, desarrollo app freelance, react native freelance, flutter freelance, full stack developer freelance',
  openGraph: {
    title: 'Desarrollador Freelance Madrid | Apps & Software | FastIA',
    description:
      'MVP en 8 semanas. +40 developers. Precio fijo. Facturación empresa española. React, Flutter, Node.js.',
  },
}

const usps = [
  'MVP funcional en 8 semanas (no 6 meses)',
  'Precio fijo acordado (sin sorpresas)',
  'Facturación legal empresa española',
  'Desarrollos 100% escalables (crece con tu negocio)',
  'Código 100% propio, limpio + documentación completa',
  'Soporte post-lanzamiento incluido',
]

const comparison = [
  {
    criterio: 'Precio',
    fastia: '45-75€/hora',
    freelancer: '30-50€/hora',
    agencia: '90-150€/hora',
  },
  {
    criterio: 'Calidad',
    fastia: '★★★★★ Premium',
    freelancer: '★★★ Variable',
    agencia: '★★★★ Alta',
  },
  {
    criterio: 'Velocidad',
    fastia: '⚡ MVP 8 semanas',
    freelancer: '🐌 3-6 meses',
    agencia: '🐢 4-8 meses',
  },
  {
    criterio: 'Disponibilidad',
    fastia: '+40 devs',
    freelancer: '1 persona',
    agencia: 'Cola de espera',
  },
  {
    criterio: 'Facturación',
    fastia: '✅ Empresa legal',
    freelancer: '⚠️ Autónomo',
    agencia: '✅ Empresa',
  },
  {
    criterio: 'Soporte',
    fastia: '12 meses',
    freelancer: 'Limitado',
    agencia: '6 meses',
  },
  {
    criterio: 'Escalabilidad',
    fastia: '100% escalable / Ilimitada',
    freelancer: 'Variable',
    agencia: 'Alta',
  },
  {
    criterio: 'Código',
    fastia: '100% propio (a medida)',
    freelancer: 'Variable',
    agencia: 'Propietario a veces',
  },
]

const developers = [
  {
    category: '📱 Mobile Developers',
    items: [
      '10 developers iOS (Swift/SwiftUI)',
      '12 developers Android (Kotlin/Jetpack)',
      '15 developers Flutter/React Native',
    ],
  },
  {
    category: '🌐 Web Developers',
    items: [
      '8 developers React/Next.js',
      '6 developers Vue/Nuxt',
      '5 Full Stack (MERN/PERN)',
    ],
  },
  {
    category: '🤖 AI/ML Engineers',
    items: [
      '4 ML Engineers (Python/TensorFlow)',
      '3 LLM specialists (OpenAI/Anthropic)',
    ],
  },
  {
    category: '🎯 Especialistas',
    items: [
      '2 DevOps (AWS/GCP/Azure)',
      '2 UI/UX Designers',
      '1 QA Automation Engineer',
    ],
  },
]

const cases = [
  {
    title: 'App Fintech - 6 semanas',
    client: 'Startup fintech Madrid',
    solicitud: 'App nativa iOS/Android + Backend',
    equipo: '2 developers + 1 designer (freelance)',
    timeline: '6 semanas concept → App Store',
    coste: '28.000€ (fijo)',
    resultado: '10K users mes 1, Series A raised',
  },
  {
    title: 'E-commerce headless - 8 semanas',
    client: 'Retail 50 años antigüedad',
    solicitud: 'Migración a headless e-commerce',
    equipo: '3 developers full stack (freelance)',
    timeline: '8 semanas',
    coste: '42.000€',
    resultado: '+150% conversión, -40% costes hosting',
  },
  {
    title: 'MVP SaaS B2B - 10 semanas',
    client: 'Consultora → Product company',
    solicitud: 'MVP de su herramienta interna',
    equipo: '2 developers + product manager (freelance)',
    timeline: '10 semanas',
    coste: '38.000€',
    resultado: '30 clientes paying mes 3',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Consulta gratuita 30min',
    items: ['Entendemos tu proyecto', 'Te asignamos developer ideal', 'Presupuesto fijo en 24h'],
  },
  {
    step: 2,
    title: 'Kick-off (Día 1)',
    items: ['Reunión con tu developer asignado', 'Roadmap detallado', 'Acceso a herramientas (Slack, Jira)'],
  },
  {
    step: 3,
    title: 'Sprints semanales',
    items: ['Deploy cada viernes', 'Demo funcionando', 'Feedback y ajustes'],
  },
  {
    step: 4,
    title: 'Entrega final',
    items: ['Código 100% propio + documentación', 'Arquitectura escalable lista para crecer', 'Capacitación equipo', '12 meses soporte incluido'],
  },
]

const pricingOptions = [
  {
    title: 'Precio fijo por proyecto',
    desc: 'Scope definido, precio cerrado, sin sorpresas',
    example: 'App móvil nativa → 25-45K€',
  },
  {
    title: 'Time & Materials',
    desc: 'Facturación por hora, máxima flexibilidad, reportes semanales',
    example: 'Rates: 45-75€/hora según seniority',
  },
  {
    title: 'Developer dedicado',
    desc: '1 developer full-time para ti. Mes a mes, sin permanencia.',
    example: '5.500-8.500€/mes',
  },
]

const faqs = [
  {
    q: '¿Cómo sé que el developer es bueno?',
    a: 'Portfolio verificado + 2 semanas prueba. Si no estás satisfecho, cambiamos developer sin coste.',
  },
  {
    q: '¿Qué pasa si el developer se enferma?',
    a: 'Tenemos backup. Si tu dev no puede, asignamos otro de mismo nivel en <24h.',
  },
  {
    q: '¿Cómo facturáis?',
    a: 'Somos empresa española (POSPON SL, CIF B19919091). Facturas con IVA, pago por transferencia o Stripe.',
  },
  {
    q: '¿Incluís mantenimiento?',
    a: 'Sí. 12 meses de bugfixes incluidos. Nuevas features se cotizan aparte.',
  },
  {
    q: '¿Puedo contratar solo para un sprint (2 semanas)?',
    a: 'Sí. Mínimo 2 semanas. Ideal para validar antes de comprometerte largo plazo.',
  },
  {
    q: '¿Trabajáis con NDA?',
    a: 'Siempre. Firmamos NDA antes de ver tu proyecto.',
  },
  {
    q: '¿El código es mío?',
    a: '100% tuyo y 100% propio: lo escribimos a medida para tu proyecto, sin plantillas ni low-code. Entregamos repo Git completo + documentación. Arquitectura escalable desde el día uno.',
  },
  {
    q: '¿Qué tecnologías usáis?',
    a: 'React/Next.js, React Native, Flutter, Node.js, Python, PostgreSQL, AWS. Lo que tu proyecto necesite.',
  },
]

export default function FreelancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Desarrolladores Freelance que Entregan
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl">
            Apps, Web y Software a Medida | Código 100% propio y escalabilidad ilimitada | MVP en 8 Semanas
          </p>

          <ul className="space-y-4 mb-12 max-w-2xl">
            {usps.map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-orange-500" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacto?ref=freelance"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Ver disponibilidad developers
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto?ref=presupuesto-freelance"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-600 hover:border-orange-500 text-white rounded-lg transition-colors"
            >
              Calcular presupuesto
            </Link>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Por qué Freelance FastIA vs otros
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Comparativa objetiva: precio, calidad, velocidad y soporte.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Criterio</th>
                  <th className="text-left py-4 px-4 text-orange-400 font-semibold">FastIA Freelance</th>
                  <th className="text-left py-4 px-4 text-gray-400">Freelancer individual</th>
                  <th className="text-left py-4 px-4 text-gray-400">Agencia grande</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r, i) => (
                  <tr key={i} className="border-b border-gray-800/80">
                    <td className="py-4 px-4 text-white">{r.criterio}</td>
                    <td className="py-4 px-4 text-orange-300">{r.fastia}</td>
                    <td className="py-4 px-4 text-gray-400">{r.freelancer}</td>
                    <td className="py-4 px-4 text-gray-400">{r.agencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="py-20 border-b border-gray-800" id="developers">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestros developers freelance
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            +5 años experiencia, portfolio verificado, español nativo + inglés fluido, metodología Agile/Scrum. Código propio a medida y arquitecturas 100% escalables.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {developers.map((cat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-4">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Casos de éxito freelance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-orange-400 mb-4">{c.title}</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Cliente</dt>
                    <dd className="text-white">{c.client}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Solicitud</dt>
                    <dd className="text-gray-300">{c.solicitud}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Equipo</dt>
                    <dd className="text-gray-300">{c.equipo}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Timeline</dt>
                    <dd className="text-gray-300">{c.timeline}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Coste</dt>
                    <dd className="text-white font-medium">{c.coste}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Resultado</dt>
                    <dd className="text-green-400">{c.resultado}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Proceso freelance FastIA
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((p) => (
              <div key={p.step} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    {p.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                </div>
                <ul className="space-y-2 text-gray-400">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {p.step < 4 && (
                  <div className="hidden lg:block absolute top-5 -right-4 w-8 h-0.5 bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-b border-gray-800" id="precios">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pricing transparente
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Elige el modelo que mejor encaja con tu proyecto y etapa.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingOptions.map((opt, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {i === 0 ? 'A' : i === 1 ? 'B' : 'C'}: {opt.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{opt.desc}</p>
                <p className="text-orange-400 font-medium">{opt.example}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-xl bg-gray-900/50 border border-gray-800 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-orange-500" />
              <h3 className="text-xl font-semibold text-white">Calculadora rápida</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Tipo de proyecto, plataformas, complejidad y timeline. Te enviamos un presupuesto estimado en menos de 24h.
            </p>
            <Link
              href="/contacto?ref=calculadora-freelance"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Solicitar presupuesto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Preguntas frecuentes
          </h2>

          <dl className="space-y-8">
            {faqs.map((f, i) => (
              <div key={i}>
                <dt className="text-lg font-semibold text-white mb-2">{f.q}</dt>
                <dd className="text-gray-400">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para arrancar tu proyecto?
          </h2>
          <Link
            href="/contacto?ref=freelance-cta"
            className="inline-flex items-center gap-2 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Agenda consulta gratuita (30min)
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-8 text-gray-500 text-sm">
            O si prefieres: <a href="mailto:hola@fastia.es" className="text-orange-400 hover:underline">hola@fastia.es</a>
            <br />
            <span className="text-gray-600">Respondemos en &lt;2 horas laborables</span>
          </p>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section className="py-16 border-t border-gray-800" id="contacto-freelance">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Cuéntanos tu proyecto
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
