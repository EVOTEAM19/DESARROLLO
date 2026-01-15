'use client'

import { motion } from 'framer-motion'
import { Zap, Users, Target, Heart, Award, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Velocidad sin comprometer calidad',
    description: 'Entregamos MVPs en 8-12 semanas sin sacrificar código limpio ni arquitectura escalable.'
  },
  {
    icon: Heart,
    title: 'Transparencia radical',
    description: 'Presupuestos claros, timelines realistas, comunicación honesta. Sin sorpresas.'
  },
  {
    icon: Target,
    title: 'Obsesión por el detalle',
    description: 'Desde el pixel en el diseño hasta la query en la base de datos. Todo importa.'
  },
  {
    icon: Users,
    title: 'Clientes convertidos en partners',
    description: 'El 70% de nuestros clientes repiten. No hacemos proyectos, construimos relaciones.'
  },
  {
    icon: Award,
    title: 'Innovación con propósito',
    description: 'IA cuando aporta valor real, no porque esté de moda. Tecnología al servicio del negocio.'
  },
  {
    icon: TrendingUp,
    title: 'Equipo antes que ego',
    description: 'Colaboración, feedback honesto, crecimiento colectivo. Todos remamos en la misma dirección.'
  }
]

const stats = [
  { value: '11', label: 'Años de experiencia', suffix: '' },
  { value: '200', label: 'Proyectos entregados', suffix: '+' },
  { value: '40', label: 'Desarrolladores', suffix: '+' },
  { value: '98', label: 'Satisfacción clientes', suffix: '%' }
]

export default function NosotrosPage() {
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
              Donde la velocidad y la IA 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> impulsan tu negocio</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              FastIA fue creada para ayudar a startups y empresas a prosperar en un mundo moldeado 
              por la inteligencia artificial. Desde el principio, nuestro propósito ha sido claro: 
              aportar claridad, velocidad y dirección a la transformación tecnológica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              La inteligencia, para nosotros, es algo vivo. Se forma con datos, sí, pero también con 
              personas, contexto y evolución constante. Nuestro enfoque combina la precisión de la 
              tecnología con la intuición del conocimiento humano para diseñar sistemas adaptativos 
              que crecen con cada negocio.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              No vemos la IA como una herramienta. La vemos como una mentalidad. Nuestro trabajo comienza 
              con la comprensión — de tu negocio, tu contexto, tus objetivos — y desde ahí diseñamos 
              soluciones inteligentes que se adaptan, evolucionan y escalan.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Nuestros equipos combinan estrategia, diseño e ingeniería para crear soluciones que se mueven 
              rápido, se adaptan fácilmente y generan un impacto duradero. Desde apps que enamoran hasta 
              automatizaciones que liberan tiempo, plataformas que escalan hasta CTO externos que guían tu 
              estrategia — convertimos la complejidad en ventaja competitiva.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
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
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-400">
              Principios que guían cada línea de código y cada decisión estratégica
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all"
                >
                  <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-6">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Madrid, España
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Gran Vía 45, 3ª planta<br />
              28013 Madrid
            </p>
            <p className="text-gray-400 mb-12">
              Remote-first: Equipos distribuidos en toda España
            </p>
            
            <p className="text-2xl text-white font-bold mb-8">
              Construyamos juntos el futuro — ahora.
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
