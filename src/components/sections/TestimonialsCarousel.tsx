'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

// Datos hardcodeados de testimonios FastIA
const testimonials = [
  {
    id: '1',
    clientName: 'Carlos Méndez',
    clientRole: 'Director de Operaciones',
    company: 'Aval Rent a Car',
    companyInitials: 'AR',
    text: 'Trabajar con FastIA ha sido un antes y un después para nosotros. Drivix nos ha permitido automatizar procesos que antes nos llevaban horas. El equipo entendió perfectamente nuestras necesidades y nos entregó una solución que supera nuestras expectativas. Rápidos, profesionales y siempre disponibles.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: '2',
    clientName: 'Javier Rodríguez',
    clientRole: 'CEO & Fundador',
    company: 'Evoteam',
    companyInitials: 'ET',
    text: 'Como startup necesitábamos un partner tecnológico que entendiera la urgencia de lanzar rápido sin sacrificar calidad. FastIA no solo cumplió plazos imposibles, sino que aportó ideas que mejoraron nuestro producto. Su expertise en IA marcó la diferencia. Hoy somos líderes en nuestro sector gracias a ellos.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: '3',
    clientName: 'Ana Martínez',
    clientRole: 'Directora de Sistemas',
    company: 'New Sport',
    companyInitials: 'NS',
    text: 'Migrar 15 tiendas a un sistema unificado era un reto enorme. El equipo de FastIA gestionó el proyecto con una profesionalidad impecable. Cero errores, cero interrupciones. El ROI fue inmediato. Recomendables al 100%.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calcular cuántos testimonios mostrar según el tamaño de pantalla
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
  }

  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const newCount = getVisibleCount()
      setVisibleCount(newCount)
      setIsDesktop(newCount === 3)
      if (newCount === 3) {
        setCurrentIndex(0) // En desktop, mostrar todos siempre
      }
    }

    setIsDesktop(getVisibleCount() === 3)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Autoplay - solo rotar en móvil/tablet
  useEffect(() => {
    if (isPaused || isDesktop) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, isDesktop])

  const goToSlide = (index: number) => {
    if (!isDesktop) {
      setCurrentIndex(index)
    }
  }

  const goToPrevious = () => {
    if (!isDesktop) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  const goToNext = () => {
    if (!isDesktop) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }
  }

  // Obtener testimonios visibles
  const getVisibleTestimonials = () => {
    if (isDesktop) {
      // En desktop, mostrar los 3 siempre
      return testimonials
    }
    // En móvil/tablet, mostrar uno a la vez
    return [testimonials[currentIndex]]
  }

  return (
    <section
      className="py-20 lg:py-32 bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
            Lo que dicen <span className="text-gradient">nuestros clientes</span>
          </h2>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          {/* Contenedor de testimonios */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación (solo en móvil/tablet) */}
          {!isDesktop && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-background-secondary border border-foreground/20 hover:border-accent-orange-500/50 flex items-center justify-center text-foreground hover:text-accent-orange-500 transition-all duration-300 hover:shadow-glow-orange"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-background-secondary border border-foreground/20 hover:border-accent-orange-500/50 flex items-center justify-center text-foreground hover:text-accent-orange-500 transition-all duration-300 hover:shadow-glow-orange"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots indicadores (solo en móvil/tablet) */}
        {!isDesktop && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent-orange-500 w-8'
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0]
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative h-full bg-background-secondary rounded-2xl p-6 lg:p-8 border border-foreground/10 hover:border-accent-orange-500/30 transition-all duration-300 hover:shadow-glow-orange group"
    >
      {/* Comillas decorativas en background */}
      <div className="absolute top-4 right-4 text-6xl font-serif text-accent-orange-500/10 select-none">
        "
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-accent-orange-500 text-accent-orange-500"
          />
        ))}
      </div>

      {/* Texto del testimonio */}
      <p className="text-lg text-foreground leading-relaxed mb-6 relative z-10">
        {testimonial.text}
      </p>

      {/* Información del cliente */}
      <div className="flex items-center gap-4 mt-auto">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent-orange-500/30 flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.clientName}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground mb-1">{testimonial.clientName}</p>
          <p className="text-sm text-foreground-muted">
            {testimonial.clientRole}
          </p>
          <p className="text-sm text-foreground-muted">{testimonial.company}</p>
        </div>

        {/* Logo de empresa (placeholder con iniciales) */}
        <div className="w-12 h-12 rounded-full bg-accent-orange-500/10 border border-accent-orange-500/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-accent-orange-500">
            {testimonial.companyInitials}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
