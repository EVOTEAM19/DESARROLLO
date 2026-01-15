'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Building2, Heart, ShoppingCart, Plane, Zap, 
  GraduationCap, Factory, Truck, Smartphone, Shield,
  Landmark, Cpu, Globe, Film, Utensils, Home,
  Briefcase, TrendingUp, Wifi, Rocket
} from 'lucide-react'

const sectors = [
  {
    icon: Landmark,
    name: 'Finanzas & Banca',
    description: 'Detección de fraude, scoring crediticio, robo-advisors y análisis de riesgo con ML.',
    solutions: ['Anti-fraude IA', 'Credit scoring', 'Trading algorítmico', 'Chatbots bancarios'],
    color: 'blue'
  },
  {
    icon: Heart,
    name: 'Salud & Healthtech',
    description: 'Diagnóstico asistido, análisis de imágenes médicas, telemedicina y gestión hospitalaria.',
    solutions: ['Diagnóstico IA', 'Análisis imágenes', 'Telemedicina', 'Gestión pacientes'],
    color: 'red'
  },
  {
    icon: ShoppingCart,
    name: 'Retail & E-commerce',
    description: 'Recomendaciones personalizadas, pricing dinámico, inventory management y análisis de comportamiento.',
    solutions: ['Recomendaciones IA', 'Pricing dinámico', 'Gestión inventario', 'Chatbots ventas'],
    color: 'purple'
  },
  {
    icon: Plane,
    name: 'Turismo & Hostelería',
    description: 'Revenue management, chatbots de reservas, análisis de sentimiento y personalización de ofertas.',
    solutions: ['Revenue mgmt IA', 'Asistentes virtuales', 'Análisis reviews', 'Ofertas personalizadas'],
    color: 'cyan'
  },
  {
    icon: Zap,
    name: 'Energía & Utilities',
    description: 'Predicción de demanda, mantenimiento predictivo, smart grids y optimización de recursos.',
    solutions: ['Predicción demanda', 'Mantenimiento predictivo', 'Smart grids', 'Optimización recursos'],
    color: 'yellow'
  },
  {
    icon: GraduationCap,
    name: 'Educación & Edtech',
    description: 'Aprendizaje adaptativo, tutores virtuales, evaluación automatizada y análisis de progreso.',
    solutions: ['Learning paths IA', 'Tutores virtuales', 'Evaluación auto', 'Analytics estudiantes'],
    color: 'green'
  },
  {
    icon: Factory,
    name: 'Industria & Manufacturing',
    description: 'Control de calidad visual, optimización de procesos, mantenimiento predictivo y supply chain.',
    solutions: ['Computer vision QA', 'Optimización procesos', 'Predictive maintenance', 'Supply chain IA'],
    color: 'gray'
  },
  {
    icon: Truck,
    name: 'Logística & Transporte',
    description: 'Optimización de rutas, predicción de demanda, tracking inteligente y gestión de flotas.',
    solutions: ['Rutas optimizadas', 'Demand forecasting', 'Tracking IA', 'Gestión flotas'],
    color: 'orange'
  },
  {
    icon: Smartphone,
    name: 'Telecomunicaciones',
    description: 'Detección de churn, soporte inteligente, optimización de redes y análisis de uso.',
    solutions: ['Churn prediction', 'Soporte IA', 'Network optimization', 'Usage analytics'],
    color: 'indigo'
  },
  {
    icon: Shield,
    name: 'Seguros & Insurtech',
    description: 'Evaluación de riesgo, detección de fraude, pricing personalizado y automatización de claims.',
    solutions: ['Risk scoring IA', 'Fraud detection', 'Pricing dinámico', 'Claims automation'],
    color: 'red'
  },
  {
    icon: Building2,
    name: 'Real Estate & Proptech',
    description: 'Valoración automatizada, recomendaciones de propiedades, análisis de mercado y tours virtuales.',
    solutions: ['Valoración IA', 'Matching properties', 'Market analysis', 'Virtual tours'],
    color: 'brown'
  },
  {
    icon: Cpu,
    name: 'Software & SaaS',
    description: 'Features IA integradas, analytics avanzado, soporte inteligente y product recommendations.',
    solutions: ['IA como feature', 'Analytics ML', 'Support bots', 'Product insights'],
    color: 'purple'
  },
  {
    icon: Globe,
    name: 'Marketing & Agencias',
    description: 'Segmentación inteligente, content generation, campaign optimization y attribution modeling.',
    solutions: ['Segmentación IA', 'Content gen', 'Campaign optimization', 'Attribution ML'],
    color: 'pink'
  },
  {
    icon: Film,
    name: 'Media & Entertainment',
    description: 'Recomendaciones de contenido, análisis de audiencia, content moderation y subtitle generation.',
    solutions: ['Recommendations', 'Audience analytics', 'Moderation IA', 'Subtitles auto'],
    color: 'red'
  },
  {
    icon: Utensils,
    name: 'Restauración & Food',
    description: 'Predicción de demanda, optimización de inventario, personalization de menús y delivery optimization.',
    solutions: ['Demand forecasting', 'Inventory mgmt', 'Menu personalization', 'Delivery routes'],
    color: 'orange'
  },
  {
    icon: Home,
    name: 'Smart Home & IoT',
    description: 'Automatización inteligente, predicción de comportamiento, optimización energética y seguridad.',
    solutions: ['Automation IA', 'Behavior prediction', 'Energy optimization', 'Smart security'],
    color: 'blue'
  },
  {
    icon: Briefcase,
    name: 'Legal & Legaltech',
    description: 'Document analysis, contract review, legal research y case prediction.',
    solutions: ['Doc analysis IA', 'Contract review', 'Legal research', 'Case prediction'],
    color: 'gray'
  },
  {
    icon: TrendingUp,
    name: 'Consultoría & Servicios',
    description: 'Data analytics, reporting automation, insights generation y client intelligence.',
    solutions: ['Analytics IA', 'Report automation', 'Insights gen', 'Client intelligence'],
    color: 'blue'
  },
  {
    icon: Wifi,
    name: 'Startups & Scale-ups',
    description: 'MVP con IA, product-market fit analysis, growth hacking y automation from day 1.',
    solutions: ['MVP con IA', 'PMF analysis', 'Growth automation', 'IA desde día 1'],
    color: 'green'
  },
  {
    icon: Rocket,
    name: 'Deep Tech & Research',
    description: 'Custom AI models, research implementation, paper-to-production y advanced ML.',
    solutions: ['Custom models', 'Research impl', 'Paper-to-prod', 'Advanced ML'],
    color: 'purple'
  },
  {
    icon: Briefcase,
    name: 'Startups/CTO',
    description: 'CTO as a Service, arquitectura escalable, team building y estrategia tecnológica con IA.',
    solutions: ['CTO as a Service', 'Arquitectura escalable', 'Team building', 'Estrategia IA'],
    color: 'orange'
  }
]

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  red: 'from-red-500 to-red-600',
  purple: 'from-purple-500 to-purple-600',
  cyan: 'from-cyan-500 to-cyan-600',
  yellow: 'from-yellow-500 to-yellow-600',
  green: 'from-green-500 to-green-600',
  gray: 'from-gray-500 to-gray-600',
  orange: 'from-orange-500 to-orange-600',
  indigo: 'from-indigo-500 to-indigo-600',
  brown: 'from-amber-700 to-amber-800',
  pink: 'from-pink-500 to-pink-600'
}

export default function SectoresPage() {
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
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              IA para 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> cada industria</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              6 años trabajando con empresas de 20+ sectores. Sabemos qué funciona en cada industria 
              porque lo hemos implementado antes. Sin teoría, solo casos reales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectores Grid */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="h-full p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${colorClasses[sector.color as keyof typeof colorClasses]} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                      {sector.name}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {sector.description}
                    </p>
                    
                    {/* Soluciones */}
                    <div className="space-y-2">
                      {sector.solutions.map((solution, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                          <span>{solution}</span>
                        </div>
                      ))}
                    </div>
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
              ¿Tu sector no está aquí?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Hablemos. Si tiene datos, tiene potencial para IA. Te contamos cómo en 30 minutos.
            </p>
            
            <Link
              href="/contacto"
              className="inline-block px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-orange-500/50"
            >
              Demo gratuita 30min →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
