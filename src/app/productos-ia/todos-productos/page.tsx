'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Rocket, Sparkles } from 'lucide-react'

const products = [
  {
    icon: Building2,
    title: 'IA para Empresas',
    description: 'Soluciones de IA diseñadas para empresas establecidas que buscan transformar procesos y mejorar eficiencia.',
    href: '/productos-ia/ia-empresas',
    color: 'from-orange-500 to-orange-600',
    features: ['Automatización de procesos', 'Análisis predictivo', 'Seguridad avanzada', 'Integración con sistemas legacy']
  },
  {
    icon: Rocket,
    title: 'IA para Startups',
    description: 'Productos de IA listos para usar que permiten a startups competir con empresas grandes desde el día uno.',
    href: '/productos-ia/ia-startups',
    color: 'from-blue-500 to-blue-600',
    features: ['Time to market rápido', 'Escalabilidad automática', 'Coste optimizado', 'Soporte dedicado']
  }
]

export default function TodosProductosPage() {
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
              <span className="text-orange-500 font-semibold">Productos IA</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Productos de IA 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> listos para usar</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Soluciones de inteligencia artificial pre-construidas que se adaptan a tu negocio. 
              Sin desarrollo desde cero, sin esperas. IA que funciona desde el primer día.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
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
                  <Link href={product.href}>
                    <div className="h-full p-10 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all">
                      <div className={`inline-flex p-5 bg-gradient-to-br ${product.color} rounded-xl mb-8 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                        {product.title}
                      </h2>
                      
                      <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                        {product.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="text-orange-500 font-semibold group-hover:translate-x-2 transition-transform inline-block text-lg">
                        Explorar productos →
                      </div>
                    </div>
                  </Link>
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
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Desarrollamos productos de IA customizados para tu caso específico.
            </p>
            
            <Link
              href="/contacto"
              className="inline-block px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-orange-500/50"
            >
              Hablemos de tu proyecto →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
