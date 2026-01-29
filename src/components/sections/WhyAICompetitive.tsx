'use client'

import { motion } from 'framer-motion'
import { Rocket, DollarSign, Users, Zap, TrendingUp, Brain } from 'lucide-react'

const advantages = [
  {
    icon: Rocket,
    title: 'Tus competidores ya lo están haciendo',
    description: 'El 67% de empresas líderes ya usan IA para automatizar y escalar. Si esperas, será tarde.',
  },
  {
    icon: DollarSign,
    title: 'ROI medible en semanas, no años',
    description: 'Reducción de costes del 40-70% en los primeros 3 meses. Automatización que se paga sola.',
  },
  {
    icon: Users,
    title: 'Menos recursos, más resultados',
    description: 'Tu equipo hace el trabajo de 10 personas. Sin contratar, sin formar, sin esperar.',
  },
  {
    icon: Zap,
    title: 'Velocidad imposible para humanos',
    description: 'Procesamos en minutos lo que a tu equipo le tomaría semanas. Sin errores.',
  },
  {
    icon: TrendingUp,
    title: 'Escalabilidad sin límites',
    description: 'Creces 10x sin multiplicar tus costes. La IA escala contigo sin contratar más personal.',
  },
  {
    icon: Brain,
    title: 'Decisiones más inteligentes',
    description: 'Datos en tiempo real, insights predictivos, detección de patrones invisibles para humanos.',
  },
]

export function WhyAICompetitive() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
            Por qué integrar IA ahora{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              (o quedarte atrás para siempre)
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-glow-orange"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 text-white">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
