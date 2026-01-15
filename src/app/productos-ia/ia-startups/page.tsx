'use client'

import { motion } from 'framer-motion'
import { Rocket, Sparkles, Zap, Brain, MessageSquare, BarChart3 } from 'lucide-react'

const products = [
  {
    icon: MessageSquare,
    title: 'Chatbot Starter',
    description: 'Chatbot inteligente listo para usar en 24 horas. Integración con WhatsApp, web y Telegram.',
    price: 'Desde 299€/mes',
    features: ['Setup en 24h', 'Multi-canal', 'IA pre-entrenada', 'Soporte incluido']
  },
  {
    icon: Brain,
    title: 'AI Content Generator',
    description: 'Genera contenido automáticamente: blogs, emails, posts sociales. Ahorra 20+ horas semanales.',
    price: 'Desde 199€/mes',
    features: ['Generación automática', 'Múltiples formatos', 'SEO optimizado', 'Brand voice']
  },
  {
    icon: BarChart3,
    title: 'Analytics AI',
    description: 'Dashboard de analytics con IA que identifica oportunidades y alerta sobre problemas.',
    price: 'Desde 399€/mes',
    features: ['Insights automáticos', 'Alertas inteligentes', 'Integración fácil', 'Sin código']
  },
  {
    icon: Zap,
    title: 'Automation Builder',
    description: 'Automatiza workflows sin código. Conecta tus herramientas y crea flujos en minutos.',
    price: 'Desde 149€/mes',
    features: ['Sin código', 'Integraciones pre-built', 'Templates', 'Escalado automático']
  },
  {
    icon: Sparkles,
    title: 'Personalization Engine',
    description: 'Personaliza experiencia de usuario con IA. Recomendaciones, contenido dinámico, A/B testing.',
    price: 'Desde 499€/mes',
    features: ['Recomendaciones IA', 'A/B testing', 'Real-time', 'API simple']
  },
  {
    icon: Rocket,
    title: 'Growth AI Suite',
    description: 'Suite completa para crecimiento: SEO, email marketing, social media. Todo automatizado.',
    price: 'Desde 799€/mes',
    features: ['SEO automático', 'Email campaigns', 'Social scheduling', 'Analytics integrado']
  }
]

export default function IAStartupsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-500/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full mb-6">
              <span className="text-blue-500 font-semibold">IA para Startups</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Productos de IA para 
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"> Startups</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Productos de IA listos para usar que permiten a startups competir con empresas grandes. 
              Sin desarrollo desde cero, sin esperas. IA que funciona desde el primer día.
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
                  <div className="h-full p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
                    <div className="inline-flex p-4 bg-blue-500/20 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    <div className="text-blue-500 font-bold text-lg mb-4">
                      {product.price}
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all">
                      Empezar gratis →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-500/10 to-gray-900">
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
              Desarrollamos productos de IA específicos para tu startup.
            </p>
            
            <a
              href="/contacto"
              className="inline-block px-12 py-6 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-blue-500/50"
            >
              Hablemos de tu proyecto →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
