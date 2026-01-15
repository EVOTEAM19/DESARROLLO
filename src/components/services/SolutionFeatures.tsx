'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface Deliverable {
  text: string
}

interface Feature {
  title: string
  duration: string
  description: string
  deliverables: Deliverable[]
}

interface SolutionFeaturesProps {
  title: string
  features: Feature[]
}

export function SolutionFeatures({ title, features }: SolutionFeaturesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {title}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-accent-orange-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-orange-500/20 rounded-full mb-4">
                    <span className="text-2xl font-bold text-accent-orange-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{feature.duration}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-400 mb-3">
                      Entregables:
                    </p>
                    {feature.deliverables.map((deliverable, dIndex) => (
                      <div key={dIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{deliverable.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
