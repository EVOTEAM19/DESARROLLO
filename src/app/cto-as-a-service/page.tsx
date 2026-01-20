import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CTO as a Service para Startups | CTO Freelance',
  description:
    'CTO externo para tu startup. Estrategia tech, gestión equipos, arquitectura escalable. Desde 2.500€/mes. Sin compromisos largos. 6 años experiencia, +50 startups asesoradas.',
  keywords:
    'cto freelance, cto as a service, cto externo startup, cto temporal, asesor tecnologico startup',
  openGraph: {
    title: 'CTO as a Service para Startups | FastIA',
    description:
      'CTO part-time desde 2.500€/mes. Estrategia, arquitectura, hiring. Sin permanencia.',
  },
}

const problems = [
  'Necesitas CTO pero no puedes pagar 80-120K€/año + equity',
  'Tu CTO técnico no sabe gestionar equipos',
  'Decisiones tech críticas sin expertise',
  'Inversores piden "alguien tech senior"',
]

const plans = [
  {
    name: 'Advisor',
    price: '2.500€/mes',
    hours: '8 horas/mes (2h/semana)',
    features: [
      'Llamadas estrategia tech',
      'Review arquitectura',
      'Decisiones Build vs Buy',
      'Hiring tech (validar candidatos)',
    ],
  },
  {
    name: 'Hands-on',
    price: '5.500€/mes',
    hours: '40 horas/mes (10h/semana)',
    features: [
      'Todo lo de Advisor +',
      'Code reviews',
      'Setup infraestructura',
      'Mentoring developers',
      'Roadmap producto',
    ],
  },
  {
    name: 'Full CTO',
    price: '8.500€/mes',
    hours: '80 horas/mes (20h/semana)',
    features: [
      'Todo lo anterior +',
      'Gestión equipo completa',
      'Presente en board meetings',
      'KPIs + reportes inversores',
      'On-call para emergencias',
    ],
  },
]

const includes = [
  'Arquitectura escalable desde día 1',
  'Tech stack moderno (no legacy)',
  'Evitar errores que cuestan 100K€+',
  'Networking (nos piden candidatos todo el rato)',
  'Leverage con providers (AWS, Stripe descuentos)',
  'Pitch deck técnico para investors',
]

const successCases = [
  'Startup A: De 0 a arquitectura AWS que soporta 100K users (8 meses)',
  'Startup B: Levantó Series A después de nuestra tech due diligence',
  'Startup C: Hiring de 5 developers senior en 2 meses',
]

const faqs = [
  {
    q: '¿Cuánto dura el contrato?',
    a: 'Mes a mes. Sin permanencia. Puedes cancelar cuando quieras.',
  },
  {
    q: '¿Puedo escalar de Advisor a Full CTO?',
    a: 'Claro. Ajustamos según tu crecimiento.',
  },
  {
    q: '¿Qué pasa si necesito más horas?',
    a: 'Horas extra a 85€/hora.',
  },
]

export default function CTOAsAServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            CTO Freelance para tu Startup
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl">
            Estrategia · Arquitectura · Equipo | Desde 2.500€/mes | Sin permanencia
          </p>

          <Link
            href="/contacto?ref=cto-as-a-service"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Hablar con un CTO
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* El problema */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            El problema
          </h2>
          <ul className="space-y-4 max-w-2xl">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="text-orange-500 mt-1">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La solución: planes */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            La solución: CTO part-time
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Tres niveles para que encajes el rol a tu etapa y presupuesto.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border ${
                  i === 1
                    ? 'bg-orange-500/5 border-orange-500/50'
                    : 'bg-gray-900/50 border-gray-800'
                }`}
              >
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-orange-400 font-semibold mb-6">{plan.name}</div>
                <div className="text-gray-400 text-sm mb-6">{plan.hours}</div>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contacto?ref=cto-plan-${plan.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="mt-8 inline-flex w-full justify-center items-center gap-2 px-6 py-3 border-2 border-orange-500 hover:bg-orange-500/10 text-orange-400 rounded-lg transition-colors text-sm font-medium"
                >
                  Solicitar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Qué incluye
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Casos de éxito
          </h2>
          <ul className="space-y-4 max-w-2xl">
            {successCases.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <Building2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
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

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Tu startup necesita un CTO?
          </h2>
          <Link
            href="/contacto?ref=cto-cta"
            className="inline-flex items-center gap-2 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Agenda una llamada
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-gray-500 text-sm">
            También: <Link href="/freelance" className="text-orange-400 hover:underline">developers freelance</Link> y <Link href="/servicios/cto-as-a-service" className="text-orange-400 hover:underline">más sobre CTO as a Service</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
