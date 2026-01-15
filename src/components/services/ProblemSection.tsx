'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface Problem {
  title: string
  description: string
}

interface ProblemSectionProps {
  problems: Problem[]
}

export function ProblemSection({ problems }: ProblemSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Problemas que resolvemos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Estos son los errores más comunes que vemos. Nosotros los evitamos desde el día 1.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
