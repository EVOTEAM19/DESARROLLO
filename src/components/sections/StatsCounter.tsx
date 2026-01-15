'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import {
  FolderKanban,
  Users,
  Calendar,
  Heart,
  Star,
  Code2,
} from 'lucide-react'
import { getHomeContent } from '@/lib/content'

const iconMap: Record<string, any> = {
  FolderKanban,
  Users,
  Calendar,
  Heart,
  Star,
  Code2,
}

const defaultStats = [
  {
    id: '1',
    icon: Calendar,
    value: 11,
    prefix: '',
    suffix: '',
    label: 'Años de experiencia',
    duration: 2,
  },
  {
    id: '2',
    icon: FolderKanban,
    value: 200,
    prefix: '+',
    suffix: '',
    label: 'Proyectos entregados',
    duration: 2.5,
  },
  {
    id: '3',
    icon: Users,
    value: 40,
    prefix: '+',
    suffix: '',
    label: 'Desarrolladores',
    duration: 2,
  },
  {
    id: '4',
    icon: Heart,
    value: 98,
    prefix: '',
    suffix: '%',
    label: 'Satisfacción clientes',
    duration: 2.5,
  },
  {
    id: '5',
    icon: Star,
    value: 4.9,
    prefix: '',
    suffix: '/5',
    label: 'Rating promedio',
    duration: 2.5,
  },
  {
    id: '6',
    icon: Code2,
    value: 30,
    prefix: '+',
    suffix: '',
    label: 'Tecnologías dominadas',
    duration: 2,
  },
]

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.3, once: true })
  const [stats, setStats] = useState(defaultStats)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const content = await getHomeContent()
      if (content?.stats && Array.isArray(content.stats) && content.stats.length > 0) {
        const mappedStats = content.stats.map((stat: any, index: number) => ({
          id: String(index + 1),
          icon: iconMap[stat.icon] || Calendar,
          value: parseFloat(stat.value) || 0,
          prefix: stat.prefix || '',
          suffix: stat.suffix || '',
          label: stat.label || '',
          duration: 2,
        }))
        setStats(mappedStats)
      }
    } catch (error) {
      console.error('Error cargando stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="relative py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Cargando...</p>
          </div>
        </div>
      </section>
    )
  }

  if (stats.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Background con gradiente naranja sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-orange-500/10 via-accent-orange-600/5 to-accent-orange-700/10" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="relative container mx-auto px-4 lg:px-6">
        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Separador vertical (solo en desktop, no en el último de cada fila) */}
                {index < stats.length - 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-px h-16 bg-foreground/10" />
                )}
                {index === 1 && (
                  <div className="hidden md:block lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-px h-16 bg-foreground/10" />
                )}

                {/* Ícono */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-orange-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-orange-500" />
                  </div>
                </motion.div>

                {/* Número con CountUp */}
                <div className="mb-2">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                    {isInView && (
                      <CountUp
                        end={stat.value}
                        duration={stat.duration}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    )}
                    {!isInView && (
                      <span>
                        {stat.prefix}0{stat.suffix}
                      </span>
                    )}
                  </h3>
                </div>

                {/* Descripción */}
                <p className="text-sm md:text-base text-foreground-muted max-w-xs">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
