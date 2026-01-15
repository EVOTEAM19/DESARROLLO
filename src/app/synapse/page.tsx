'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Zap, Cloud, Lock, TrendingUp, Users } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Gobernanza Total',
    description: 'Control completo de accesos, permisos y auditoría de uso de IA en tu organización.'
  },
  {
    icon: Zap,
    title: 'Velocidad de Implementación',
    description: 'De la idea a producción en 8-12 semanas. Sin meses de consultorías.'
  },
  {
    icon: Cloud,
    title: 'Multi-Cloud',
    description: 'AWS, Azure, GCP o on-premise. Tú eliges dónde vive tu IA.'
  },
  {
    icon: Lock,
    title: 'Seguridad Empresarial',
    description: 'Tus datos nunca salen de tu infraestructura. Compliance GDPR garantizado.'
  },
  {
    icon: TrendingUp,
    title: 'Escalabilidad',
    description: 'Desde 10 hasta 10.000 usuarios. La plataforma crece contigo.'
  },
  {
    icon: Users,
    title: 'Equipos Unificados',
    description: 'Un solo dashboard para toda la empresa. Marketing, ventas, soporte, IT.'
  }
]

const useCases = [
  {
    industry: 'Finanzas',
    title: 'Análisis de riesgo con IA',
    description: 'Detección de fraude, scoring crediticio y análisis predictivo de mercados.',
    impact: '40% reducción en fraude detectado'
  },
  {
    industry: 'Salud',
    title: 'Diagnóstico asistido',
    description: 'IA que analiza imágenes médicas y sugiere diagnósticos con 95%+ precisión.',
    impact: '30% más rápido diagnóstico'
  },
  {
    industry: 'Retail',
    title: 'Personalización extrema',
    description: 'Recomendaciones de producto y pricing dinámico en tiempo real.',
    impact: '25% aumento conversión'
  },
  {
    industry: 'Telecom',
    title: 'Soporte inteligente',
    description: 'Chatbots que resuelven 70% de consultas sin escalar a humanos.',
    impact: '60% reducción tickets'
  }
]

export default function SynapsePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
              <span className="text-orange-500 font-semibold">Synapse · Plataforma Empresarial</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Tu plataforma de IA 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> empresarial</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              De la IA en la sombra al control total. Synapse es la plataforma unificada para 
              gobernanza, seguridad y escalabilidad de IA empresarial. Sin vendor lock-in, sin sorpresas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50"
              >
                Solicitar demo →
              </Link>
              <Link
                href="/the-modal"
                className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-lg font-semibold transition-all"
              >
                Ver servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* El Problema */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              El Problema: IA en la Sombra
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Mientras tus equipos experimentan con ChatGPT y otras herramientas SaaS, 
              tu organización acumula riesgos críticos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'IA Descontrolada',
                description: 'Múltiples equipos usando claves API sin auditoría. Sin visibilidad de quién usa qué.',
                impact: 'Riesgo de seguridad crítico'
              },
              {
                title: 'Costes Desbocados',
                description: 'Sin control centralizado, el gasto en tokens crece exponencialmente.',
                impact: 'Presupuestos desbordados'
              },
              {
                title: 'Datos Expuestos',
                description: 'Información sensible subida a la nube de proveedores externos.',
                impact: 'Pérdida de confidencialidad'
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-red-500/10 border border-red-500/30 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-300 mb-4">{problem.description}</p>
                <div className="text-sm text-red-400 font-semibold">{problem.impact}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La Solución: Synapse */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              La Solución: FastIA Synapse
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Plataforma unificada para gobernanza, seguridad y control de costes de IA.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all"
                >
                  <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-6">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Casos de Uso por Industria */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Casos de Uso por Industria
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Synapse adaptada a las necesidades específicas de cada sector
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-gray-900 rounded-2xl border border-gray-700"
              >
                <div className="text-sm text-orange-500 font-semibold mb-2">{useCase.industry}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                <div className="inline-flex px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                  <span className="text-green-500 font-semibold text-sm">{useCase.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              ¿Listo para controlar tu IA?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Demo de 30 minutos. Te mostramos Synapse funcionando con tus propios datos.
            </p>
            
            <Link
              href="/contacto"
              className="inline-block px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-orange-500/50"
            >
              Solicitar demo →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
