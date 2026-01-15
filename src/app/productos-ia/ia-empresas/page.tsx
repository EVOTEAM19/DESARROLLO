'use client'

import { motion } from 'framer-motion'
import { Building2, Shield, TrendingUp, Database, Zap, Lock } from 'lucide-react'

const products = [
  {
    icon: Database,
    title: 'Data Intelligence Platform',
    description: 'Plataforma completa para procesar, analizar y visualizar grandes volúmenes de datos en tiempo real.',
    price: 'Desde 5K€/mes',
    features: ['ETL automatizado', 'Dashboards interactivos', 'ML integrado', 'Escalabilidad ilimitada']
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics Suite',
    description: 'Suite de análisis predictivo para predecir ventas, demanda, churn y tendencias de negocio.',
    price: 'Desde 8K€/mes',
    features: ['Forecasting avanzado', 'Modelos pre-entrenados', 'API REST', 'Integración con ERP/CRM']
  },
  {
    icon: Zap,
    title: 'Intelligent Automation Hub',
    description: 'Hub centralizado para automatizar procesos de negocio con IA y RPA integrados.',
    price: 'Desde 6K€/mes',
    features: ['RPA con IA', 'Workflows visuales', 'Integración con sistemas', 'Monitoreo en tiempo real']
  },
  {
    icon: Shield,
    title: 'AI Security Center',
    description: 'Centro de seguridad con IA para detectar y responder a amenazas automáticamente.',
    price: 'Desde 10K€/mes',
    features: ['Detección de amenazas', 'Respuesta automática', 'Cumplimiento normativo', 'Monitoreo 24/7']
  },
  {
    icon: Building2,
    title: 'Enterprise Chatbot Platform',
    description: 'Plataforma de chatbots empresariales con integración profunda con sistemas internos.',
    price: 'Desde 4K€/mes',
    features: ['Multi-canal', 'Integración con CRM/ERP', 'Análisis de conversaciones', 'Escalado automático']
  },
  {
    icon: Lock,
    title: 'Compliance AI Assistant',
    description: 'Asistente de IA para mantener cumplimiento normativo (GDPR, ISO 27001, SOC 2).',
    price: 'Desde 7K€/mes',
    features: ['Auditorías automáticas', 'Reportes de cumplimiento', 'Alertas proactivas', 'Documentación automática']
  }
]

export default function IAEmpresasPage() {
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
              <span className="text-orange-500 font-semibold">IA para Empresas</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Soluciones de IA para 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Empresas</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Productos de IA diseñados para empresas establecidas. Integración con sistemas legacy, 
              escalabilidad enterprise y soporte dedicado. Transforma tu negocio sin cambiar todo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="h-full p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all">
                    <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-orange-500" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    <div className="text-orange-500 font-bold text-lg mb-4">
                      {product.price}
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-orange-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all">
                      Solicitar demo →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              ¿Necesitas algo customizado?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Desarrollamos productos de IA específicos para tu empresa.
            </p>
            
            <a
              href="/contacto"
              className="inline-block px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-orange-500/50"
            >
              Hablemos de tu proyecto →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
