'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, FileText, Home } from 'lucide-react'

const caseStudies = [
  {
    badge: 'E-commerce',
    title: 'Chatbot de ventas 24/7',
    description: 'Automatizamos atención al cliente con IA. Resultado: +250% conversión, -60% costes de soporte.',
    metrics: [
      { value: '+250%', label: 'ventas' },
      { value: '-60%', label: 'costes' },
      { value: '24/7', label: 'disponible' },
    ],
    icon: TrendingUp,
  },
  {
    badge: 'SaaS B2B',
    title: 'Análisis predictivo de churn',
    description: 'IA que predice qué clientes van a cancelar antes de que lo hagan. -45% churn en 3 meses.',
    metrics: [
      { value: '-45%', label: 'churn' },
      { value: '+30%', label: 'retention' },
      { value: 'ROI 8x', label: '' },
    ],
    icon: Users,
  },
  {
    badge: 'Consultoría',
    title: 'Automatización de informes',
    description: 'IA genera informes personalizados automáticamente. 40 horas/mes ahorradas por consultor.',
    metrics: [
      { value: '40h', label: 'ahorradas/mes' },
      { value: '0', label: 'errores' },
      { value: 'Entrega', label: 'instant' },
    ],
    icon: FileText,
  },
  {
    badge: 'Inmobiliaria',
    title: 'Asistente IA para captación',
    description: 'IA que cualifica leads, agenda visitas y hace seguimiento. +180% productividad comercial.',
    metrics: [
      { value: '+180%', label: 'leads cualificados' },
      { value: '3x', label: 'visitas agendadas' },
      { value: '-70%', label: 'tiempo admin' },
    ],
    icon: Home,
  },
]

export function AICaseStudies() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Casos reales: Cómo la IA ha{' '}
            <span className="text-gradient">transformado estos negocios</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {caseStudies.map((caseStudy, index) => {
            const Icon = caseStudy.icon
            return (
              <motion.div
                key={caseStudy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background-secondary rounded-2xl p-8 border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 hover:shadow-glow-orange"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-accent-orange-500/20 text-accent-orange-500 rounded-full text-sm font-semibold">
                    {caseStudy.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
                  {caseStudy.title}
                </h3>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  {caseStudy.description}
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-accent-orange-500 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-foreground-muted">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-orange-500 via-accent-orange-600 to-accent-orange-700 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-glow-orange"
          >
            Ver más casos de éxito
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
