'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Search,
  Palette,
  Code,
  TestTube,
  Rocket,
  TrendingUp,
} from 'lucide-react'

const phases = [
  {
    icon: Search,
    phase: '01',
    title: 'Discovery',
    duration: '1-2 semanas',
    description: 'Entendemos tu negocio, usuarios y objetivos. Research, benchmarking y definición de scope.',
    deliverables: ['Product Brief', 'User Research', 'Tech Stack', 'Roadmap'],
  },
  {
    icon: Palette,
    phase: '02',
    title: 'Design',
    duration: '2-3 semanas',
    description: 'Diseño UX/UI centrado en conversión. Wireframes, prototipos interactivos y design system.',
    deliverables: ['Wireframes', 'Prototipos', 'Design System', 'UI Kit'],
  },
  {
    icon: Code,
    phase: '03',
    title: 'Development',
    duration: '4-8 semanas',
    description: 'Desarrollo ágil con sprints de 2 semanas. Entregas continuas para ver el progreso.',
    deliverables: ['MVP funcional', 'Integraciones', 'Backend', 'Frontend'],
  },
  {
    icon: TestTube,
    phase: '04',
    title: 'Testing',
    duration: '1-2 semanas',
    description: 'QA exhaustivo: funcional, performance, seguridad, UX. Fix de bugs y optimizaciones.',
    deliverables: ['Test Plan', 'Bug Reports', 'Performance Audit', 'Security Scan'],
  },
  {
    icon: Rocket,
    phase: '05',
    title: 'Launch',
    duration: '1 semana',
    description: 'Despliegue en producción, monitorización, y soporte intensivo post-launch.',
    deliverables: ['Deploy', 'Monitorización', 'Documentation', 'Training'],
  },
  {
    icon: TrendingUp,
    phase: '06',
    title: 'Evolution',
    duration: 'Ongoing',
    description: 'Iteraciones basadas en datos reales. Nuevas features, optimizaciones y escalado.',
    deliverables: ['Analytics', 'A/B Testing', 'Optimizations', 'New Features'],
  },
]

interface PhaseCardProps {
  phase: typeof phases[0]
  index: number
  isLast: boolean
}

function PhaseCard({ phase, index, isLast }: PhaseCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const Icon = phase.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className={`flex items-start gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
        {/* Contenido */}
        <div className="flex-1 p-6 lg:p-8 bg-background-secondary backdrop-blur-sm rounded-2xl border border-foreground/10 hover:border-accent-orange-500/50 transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-accent-orange-500/20 rounded-lg group-hover:bg-accent-orange-500/30 transition-colors"
            >
              <Icon className="w-6 h-6 text-accent-orange-500" />
            </motion.div>
            <div className="flex-1">
              <div className="text-sm text-accent-orange-500 font-semibold mb-1">
                Fase {phase.phase}
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-accent-orange-400 transition-colors">
                {phase.title}
              </h3>
            </div>
            <div className="ml-auto text-sm text-foreground-muted whitespace-nowrap">
              {phase.duration}
            </div>
          </div>

          <p className="text-foreground-muted mb-6 leading-relaxed">{phase.description}</p>

          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                className="px-3 py-1 bg-fastia-medium-gray rounded-full text-sm text-fastia-text-gray border border-fastia-light-gray/30"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Punto en timeline */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            className="w-4 h-4 bg-accent-orange-500 rounded-full ring-4 ring-accent-orange-500/30 z-10"
          />

          {!isLast && (
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              className="w-0.5 bg-gradient-to-b from-accent-orange-500 to-transparent flex-1 mt-2 min-h-[100px]"
            />
          )}
        </div>

        {/* Espacio para alternancia */}
        <div className="flex-1" />
      </div>
    </motion.div>
  )
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Nuestro <span className="text-gradient">proceso</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
            Metodología probada en +100 proyectos. Ágil, transparente y orientada a resultados.
          </p>
        </motion.div>

        <div className="space-y-8 lg:space-y-12">
          {phases.map((phase, index) => (
            <PhaseCard
              key={phase.phase}
              phase={phase}
              index={index}
              isLast={index === phases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
