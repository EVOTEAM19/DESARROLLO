'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, MessageSquare, Zap, Shield, TrendingUp, Check } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Chatbots Inteligentes',
    description: 'Entienden contexto, intención y responden como humanos.'
  },
  {
    icon: Zap,
    title: 'Respuesta Instantánea',
    description: 'De 48h a 2 minutos. Atención 24/7 sin contratar.'
  },
  {
    icon: Shield,
    title: 'Datos Seguros',
    description: 'Tu información nunca sale de tu infraestructura.'
  },
  {
    icon: TrendingUp,
    title: 'Aprende Continuamente',
    description: 'Cada conversación mejora el modelo automáticamente.'
  }
]

const useCases = [
  {
    title: 'Atención al Cliente',
    description: 'Resuelve 70% de consultas sin escalar a humanos.',
    metrics: ['70% resueltas', '-60% tickets', '24/7']
  },
  {
    title: 'Ventas Automatizadas',
    description: 'Cualifica leads y agenda demos automáticamente.',
    metrics: ['+35% conversión', '-40% ciclo', '3x leads']
  },
  {
    title: 'Soporte Interno',
    description: 'Asistente para empleados sobre políticas y procedimientos.',
    metrics: ['-80% consultas RRHH', 'Instantáneo', '95% precisión']
  }
]

const pricing = [
  {
    name: 'Starter',
    price: '2.500€',
    setup: '5.000€',
    features: [
      '1 bot conversacional',
      'Hasta 1.000 conversaciones/mes',
      'Web + WhatsApp',
      'Dashboard analytics'
    ]
  },
  {
    name: 'Professional',
    price: '5.000€',
    setup: '12.000€',
    features: [
      'Hasta 3 bots',
      '10.000 conversaciones/mes',
      'Todas las integraciones',
      'RAG con tu documentación',
      'Fine-tuning mensual'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    setup: 'A medida',
    features: [
      'Bots ilimitados',
      'Conversaciones ilimitadas',
      'Modelo custom',
      'Infraestructura dedicada',
      'SLA 99.9%'
    ]
  }
]

export default function IAConversacionalPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <section className="relative py-32 bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
              <Brain className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 font-semibold">IA Conversacional</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Chatbots que no parecen 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> robots</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              De 48 horas a 2 minutos. Asistentes que entienden contexto, intención y resuelven problemas reales.
            </p>
            
            <div className="flex gap-4">
              <Link href="/contacto" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors">
                Ver demo →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                  <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400">{f.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Casos de Uso Reales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-gray-900 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-gray-400 mb-6">{c.description}</p>
                {c.metrics.map((m, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-green-500 mb-2">
                    <Check className="w-4 h-4" />
                    <span>{m}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Precios Transparentes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`p-8 rounded-2xl border ${p.popular ? 'bg-gradient-to-br from-orange-500/20 to-gray-800 border-orange-500' : 'bg-gray-800 border-gray-700'}`}>
                {p.popular && <div className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-4">MÁS POPULAR</div>}
                <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
                <div className="text-4xl font-bold text-orange-500 mb-2">{p.price}<span className="text-lg text-gray-400">/mes</span></div>
                <div className="text-sm text-gray-400 mb-6">{p.setup} setup</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contacto" className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${p.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-2 border-gray-600 hover:border-orange-500 text-white'}`}>
                  Contratar →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
