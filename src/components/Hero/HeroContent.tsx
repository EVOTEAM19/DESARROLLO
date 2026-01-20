'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getHomeContent } from '@/lib/content'

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null)
  const [heroData, setHeroData] = useState<any>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const content = await getHomeContent()
      if (content?.hero) {
        setHeroData(content.hero)
      } else {
        // Fallback a datos por defecto
        setHeroData({
          badge: 'FastIA',
          title: 'Transformamos ideas en soluciones inteligentes',
          subtitle: '6 años desarrollando software con IA. +40 desarrolladores especializados en apps móviles, automatización y plataformas web.',
          cta_primary_text: 'Hablemos de tu proyecto',
          cta_primary_link: '/contacto',
          cta_secondary_text: 'Ver servicios',
          cta_secondary_link: '/the-modal',
        })
      }
    } catch (error) {
      console.error('Error cargando contenido hero:', error)
      setHeroData({
        badge: 'FastIA',
        title: 'Transformamos ideas en soluciones inteligentes',
        subtitle: '6 años desarrollando software con IA.',
        cta_primary_text: 'Hablemos de tu proyecto',
        cta_primary_link: '/contacto',
        cta_secondary_text: 'Ver servicios',
        cta_secondary_link: '/the-modal',
      })
    }
  }

  // Transformar scroll a color del título
  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ['#FFFFFF', '#FF6B35', '#FFFFFF', '#FF6B35', '#1A1A1A']
  )

  // Opacidad del contenido según scroll
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7],
    [1, 0.8, 0]
  )

  if (!heroData) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  const titleWords = (heroData.title || 'Transformamos ideas en soluciones inteligentes').split(' ')

  return (
    <motion.div
      ref={ref}
      style={{ opacity: contentOpacity }}
      className="relative z-10 min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative max-w-6xl mx-auto px-4 lg:px-6 text-center">
        {/* Título con animación letra por letra */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
          {titleWords.map((word: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{ color: titleColor }}
              className="inline-block mr-2 sm:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtítulo con fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          <p>{heroData.subtitle || '6 años desarrollando software con IA.'}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={heroData.cta_primary_link || '/contacto'}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-accent-orange-500 via-accent-orange-600 to-accent-orange-700 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-2xl hover:shadow-accent-orange-500/50 group relative overflow-hidden"
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
              <span className="relative z-10">{heroData.cta_primary_text || 'Hablemos de tu proyecto'}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={heroData.cta_secondary_link || '/the-modal'}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-2xl hover:shadow-white/50 group relative overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <span className="relative z-10">{heroData.cta_secondary_text || 'Ver servicios'}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats animados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-orange-500 mb-1">
              +100
            </div>
            <div className="text-sm text-gray-400">Proyectos</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-orange-500 mb-1">
              6
            </div>
            <div className="text-sm text-gray-400">Años</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-orange-500 mb-1">
              +40
            </div>
            <div className="text-sm text-gray-400">Desarrolladores</div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-orange-500 mb-1">
              98%
            </div>
            <div className="text-sm text-gray-400">Satisfacción</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
