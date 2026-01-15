'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, BarChart3, Users, Code2, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { getServices } from '@/lib/api'
import { ServiceCardSkeleton } from '@/components/ui/Skeleton'
import type { Database } from '@/types/supabase'

type Service = Database['public']['Tables']['services']['Row']

const iconMap: Record<string, React.ElementType> = {
  'sparkles': Sparkles,
  'brain': Brain,
  'bar-chart': BarChart3,
  'users': Users,
  'code': Code2,
  'zap': Zap,
}

const categoryGradients: Record<string, string> = {
  'IA Generativa': 'from-accent-orange-500 to-accent-orange-500',
  'Análisis': 'from-accent-orange-500 to-accent-orange-500',
  'Experiencia': 'from-accent-orange-500 to-accent-orange-500',
  'Ingeniería': 'from-accent-orange-500 to-accent-orange-500',
  'Automatización': 'from-accent-orange-500 to-accent-orange-500',
  'default': 'from-accent-orange-500 to-accent-orange-500',
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true)
        const data = await getServices()
        setServices(data)
      } catch (err) {
        console.error('Error cargando servicios:', err)
        setError('Error al cargar servicios')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-r from-accent-orange-500/5 via-accent-orange-500/5 to-accent-orange-500/5"
        />
      </div>

      <div className="relative container mx-auto px-4 lg:px-6">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            The Mesh.{' '}
            <span className="text-gradient">Servicios de desarrollo especializados.</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
            Servicios interconectados de desarrollo de software con IA que se adaptan
            y escalan según las necesidades de tu organización. TypeScript, React, Node.js, Kotlin, iOS, Android y Flux.
          </p>
        </motion.div>

        {/* Servicios en layout alternado */}
        {isLoading ? (
          <div className="space-y-12 lg:space-y-24">
            {[1, 2, 3, 4, 5].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-foreground-muted">
            <p>{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-foreground-muted">
            <p>No hay servicios disponibles</p>
          </div>
        ) : (
          <div className="space-y-12 lg:space-y-24">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Líneas conectoras decorativas (opcional) */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-orange-500/20 to-transparent transform -translate-x-1/2" />
    </section>
  )
}

interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon || 'sparkles'] || Sparkles
  const isEven = index % 2 === 0
  const category = service.category || 'default'
  const gradient = categoryGradients[category] || categoryGradients.default
  const slug = `/servicios/${service.slug}`
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}
      >
        {/* Contenido de texto */}
        <div className={`flex-1 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center lg:text-left`}>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            className="space-y-6"
          >
            {/* Número y badge */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg glow-blue`}
              >
                <span className="text-2xl font-bold text-white">{number}</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent hidden lg:block" />
            </div>

            {/* Icono */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background-secondary border border-foreground/10 mb-4">
              <Icon className={`w-7 h-7 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} />
            </div>

            {/* Título */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
              {service.name}
            </h3>

            {/* Descripción */}
            <p className="text-foreground-muted text-lg leading-relaxed max-w-2xl">
              {service.description || ''}
            </p>

            {/* Link */}
            <Link
              href={slug}
              className="inline-flex items-center gap-2 text-accent-orange-500 hover:text-accent-orange-500 transition-colors duration-300 group mt-6"
            >
              <span className="font-semibold">Saber más</span>
              <motion.div
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Card visual (alternado) */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          className="flex-1 w-full lg:max-w-md"
        >
          <div className="relative group">
            {/* Card con gradiente */}
            <div
              className={`relative h-64 lg:h-80 rounded-2xl bg-gradient-to-br ${gradient} p-1 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-background-secondary rounded-2xl" />
              
              {/* Contenido interno de la card */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 rounded-2xl">
                {/* Icono grande */}
                <div className="mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg glow-blue group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Número decorativo */}
                <div className="absolute top-4 right-4">
                  <span className="text-6xl font-bold text-foreground/5">
                    {number}
                  </span>
                </div>

                {/* Efecto de brillo en hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                />
              </div>
            </div>

            {/* Partículas decorativas */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-orange-400 rounded-full opacity-20 blur-sm animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent-orange-400 rounded-full opacity-20 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
