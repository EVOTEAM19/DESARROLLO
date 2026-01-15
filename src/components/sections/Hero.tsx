'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSkeleton } from '@/components/ui/Skeleton'

// Videos corporativos profesionales
const defaultVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4'
const fallbackVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-data-flow-36904-large.mp4'
const alternativeVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-connection-36906-large.mp4'
const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80'

interface HeroData {
  title?: string
  subtitle?: string
  cta_text?: string
  cta_link?: string
  video_url?: string
}

interface HeroProps {
  data?: HeroData | null
  isLoading?: boolean
}

// Componente para animación de contador
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export function Hero({ data: heroDataProp, isLoading: isLoadingProp }: HeroProps) {
  const [heroData, setHeroData] = useState<HeroData | null>(heroDataProp || null)
  const [isLoading, setIsLoading] = useState(isLoadingProp ?? true)
  const [error, setError] = useState<string | null>(null)
  const [videoError, setVideoError] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  // Sincronizar con props cuando cambien
  useEffect(() => {
    if (heroDataProp) {
      setHeroData(heroDataProp)
    } else if (!heroDataProp && !isLoadingProp) {
      // Valores por defecto FastIA
      setHeroData({
        title: 'Nacidos para la era de la IA',
        subtitle: 'Transformamos ideas en soluciones inteligentes mediante inteligencia artificial.\nSoluciones innovadoras que impulsan el futuro digital.',
        cta_text: 'Descubre nuestro enfoque',
        cta_link: '/productos',
        video_url: defaultVideoUrl,
      })
    }
    setIsLoading(isLoadingProp ?? false)
  }, [heroDataProp, isLoadingProp])

  // Intersection Observer para pausar video cuando no está visible
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current

    if (!video || !section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silenciar error si el navegador bloquea autoplay
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleVideoError = () => {
    setVideoError(true)
  }

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  // Animaciones con stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (isLoading) {
    return <HeroSkeleton />
  }

  if (error && !heroData) {
    return (
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        <div className="text-center text-foreground-muted">
          <p>Error al cargar el contenido</p>
        </div>
      </section>
    )
  }

  const videoUrl = heroData?.video_url || defaultVideoUrl
  const title = heroData?.title || 'Nacidos para la era de la IA'
  const subtitle = heroData?.subtitle || 'Transformamos ideas en soluciones inteligentes mediante inteligencia artificial.\nSoluciones innovadoras que impulsan el futuro digital.'
  const subtitleLines = subtitle.split('\n')

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
              className="absolute inset-0 w-full h-full object-cover scale-110"
              preload="auto"
              style={{ filter: 'brightness(0.3) contrast(1.2) saturate(1.1)' }}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={fallbackVideoUrl} type="video/mp4" />
              <source src={alternativeVideoUrl} type="video/mp4" />
            </video>
            {/* Overlay mejorado con más contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255, 140, 90, 0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0"
            />
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={fallbackImage}
              alt="Hero background"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
          </div>
        )}

        {/* Loading overlay */}
        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 bg-background flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-accent-orange-500 border-t-transparent rounded-full"
              />
              <span className="text-sm text-foreground-muted font-medium">Cargando video...</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Badge superior animado */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-lg">🚀</span>
              <span className="text-sm font-semibold text-white">
                #1 en IA | +40 Desarrolladores | Madrid
              </span>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 text-white leading-tight drop-shadow-2xl"
            style={{ fontWeight: 900, textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            {title.split(' ').map((word, i) => {
              const isIA = word === 'IA' || word.includes('IA')
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  className={isIA ? 'bg-gradient-to-r from-accent-orange-400 via-accent-orange-500 to-accent-orange-600 bg-clip-text text-transparent' : ''}
                >
                  {word}{' '}
                </motion.span>
              )
            })}
          </motion.h1>

          {/* Subtítulo (2 líneas) */}
          <motion.div
            variants={itemVariants}
            className="mb-12 space-y-4"
          >
            {subtitleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-lg"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* CTAs (2 botones) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/productos"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-orange-500 via-accent-orange-600 to-accent-orange-700 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-2xl hover:shadow-accent-orange-500/50 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10">Descubre nuestro enfoque</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/productos"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent-orange-500 text-accent-orange-500 rounded-xl font-bold text-lg hover:bg-accent-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/5"
              >
                Ver proyectos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {[
              { value: 100, suffix: '+', label: 'proyectos entregados' },
              { value: 6, suffix: '', label: 'años de experiencia' },
              { value: 40, suffix: '+', label: 'desarrolladores' },
              { value: 98, suffix: '%', label: 'clientes satisfechos' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {statsInView ? (
                    <>
                      {stat.suffix === '+' && stat.value === 100 && (
                        <>
                          <AnimatedCounter end={100} />+
                        </>
                      )}
                      {stat.suffix === '' && stat.value === 6 && (
                        <>
                          <AnimatedCounter end={6} />
                        </>
                      )}
                      {stat.suffix === '+' && stat.value === 40 && (
                        <>
                          <AnimatedCounter end={40} />+
                        </>
                      )}
                      {stat.suffix === '%' && stat.value === 98 && (
                        <>
                          <AnimatedCounter end={98} />%
                        </>
                      )}
                    </>
                  ) : (
                    `${stat.value}${stat.suffix}`
                  )}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator mejorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors cursor-pointer group"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            })
          }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.div>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 via-white/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Efectos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-orange-400 rounded-full opacity-20 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent-orange-500 rounded-full opacity-15 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent-orange-600 rounded-full opacity-20 blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  )
}
