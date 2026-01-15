'use client'

import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Palette,
  Zap,
  Target,
  Users,
  MessageSquare,
  Rocket,
} from 'lucide-react'
import Image from 'next/image'
import { getHomeContent } from '@/lib/content'

const iconMap: Record<string, any> = {
  Palette,
  Zap,
  Target,
  Users,
  MessageSquare,
  Rocket,
}

const defaultReasons = [
  {
    id: '1',
    number: '01',
    title: 'Diseño que enamora',
    text: 'No hacemos interfaces genéricas. Cada pixel cuenta. Nuestro equipo de diseño crea experiencias visuales que tus usuarios recordarán.',
    metric: '98% satisfacción en UX/UI',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    align: 'left' as const,
  },
  {
    id: '2',
    number: '02',
    title: 'Fluidez en cada interacción',
    text: 'Apps y webs que vuelan. Optimizamos cada línea de código para que la experiencia sea suave como la seda.',
    metric: '< 2s tiempo de carga promedio',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    align: 'right' as const,
  },
  {
    id: '3',
    number: '03',
    title: 'Adaptación total',
    text: 'Tu proyecto, tus reglas. Nos adaptamos a tu visión, no al revés. Metodologías ágiles que evolucionan contigo.',
    metric: '100% proyectos entregados a tiempo',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    align: 'left' as const,
  },
  {
    id: '4',
    number: '04',
    title: 'Recursos de primer nivel',
    text: '+40 desarrolladores senior especializados en las últimas tecnologías. Tu equipo de élite a un click.',
    metric: '+40 desarrolladores especializados',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    align: 'right' as const,
  },
  {
    id: '5',
    number: '05',
    title: 'Sencillez sin complicaciones',
    text: 'Hablamos tu idioma. Sin tecnicismos innecesarios. Comunicación clara, directa y efectiva.',
    metric: '4.9/5 comunicación cliente-equipo',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    align: 'left' as const,
  },
  {
    id: '6',
    number: '06',
    title: 'Rapidez que marca la diferencia',
    text: 'El tiempo es dinero. Nuestros sprints ágiles y procesos optimizados te ponen en el mercado antes que la competencia.',
    metric: '40% más rápido que la media',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    align: 'right' as const,
  },
]

interface Reason {
  id: string
  number: string
  title: string
  text: string
  metric: string
  icon: any
  image: string
  align: 'left' | 'right'
}

interface ReasonCardProps {
  reason: Reason
  index: number
}

function ReasonCard({ reason, index }: ReasonCardProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const Icon = typeof reason.icon === 'function' ? reason.icon : Palette

  const isEven = index % 2 === 0
  const bgColor = isEven ? 'bg-background' : 'bg-fastia-dark-gray'

  // Combinar refs
  const combinedRef = (node: HTMLElement | null) => {
    sectionRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref && 'current' in ref) {
      ;(ref as React.MutableRefObject<HTMLElement | null>).current = node
    }
  }

  return (
    <motion.section
      ref={combinedRef}
      className={`relative py-20 lg:py-32 ${bgColor} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div
          className={`flex flex-col ${
            reason.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center gap-8 lg:gap-12`}
        >
          {/* Imagen */}
          <motion.div
            style={{ y }}
            className="flex-1 w-full lg:w-1/2"
            initial={{ opacity: 0, x: reason.align === 'right' ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reason.align === 'right' ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-foreground/10 group">
              <Image
                src={reason.image}
                alt={reason.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: reason.align === 'right' ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reason.align === 'right' ? -50 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full lg:w-1/2"
          >
            {/* Número con gradiente */}
            <div className="mb-4">
              <span className="text-6xl md:text-7xl lg:text-8xl font-display font-bold bg-gradient-to-r from-accent-orange-500 via-accent-orange-600 to-accent-orange-700 bg-clip-text text-transparent">
                {reason.number}
              </span>
            </div>

            {/* Ícono y título */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 flex items-center justify-center shadow-lg"
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                {reason.title}
              </h3>
            </motion.div>

            {/* Texto */}
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed mb-6">
              {reason.text}
            </p>

            {/* Métrica destacada */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent-orange-500/10 border border-accent-orange-500/20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-accent-orange-500"
              />
              <span className="text-base md:text-lg font-semibold text-accent-orange-400">
                {reason.metric}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export function WhyFastIA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const [reasons, setReasons] = useState(defaultReasons)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const content = await getHomeContent()
      if (content?.whyFastIA && Array.isArray(content.whyFastIA) && content.whyFastIA.length > 0) {
        // Mapear iconos desde strings a componentes
        const mappedReasons = content.whyFastIA.map((reason: any, index: number) => ({
          id: String(index + 1),
          number: reason.number || String(index + 1).padStart(2, '0'),
          title: reason.title || '',
          text: reason.text || '',
          metric: reason.metric || '',
          icon: iconMap[reason.icon] || Palette,
          image: reason.image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
          align: (index % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
        }))
        setReasons(mappedReasons)
      }
    } catch (error) {
      console.error('Error cargando contenido WhyFastIA:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="relative py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Cargando...</p>
          </div>
        </div>
      </section>
    )
  }

  if (reasons.length === 0) {
    return null // No mostrar la sección si no hay razones
  }

  return (
    <section ref={sectionRef} className="relative">
      {/* Título de sección */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="py-16 lg:py-20 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
              ¿Por qué más de <span className="text-gradient">200 empresas</span> confían en FastIA?
            </h2>
            <p className="text-lg md:text-xl text-foreground-muted">
              11 años transformando ideas en productos digitales que triunfan.
              No somos una agencia más. Somos tu partner tecnológico.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Razones */}
      <div>
        {reasons.map((reason, index) => (
          <ReasonCard key={reason.id} reason={reason} index={index} />
        ))}
      </div>
    </section>
  )
}
