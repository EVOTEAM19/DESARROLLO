'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Zap, Shield, TrendingUp, Database } from 'lucide-react'
import { getTheModalContent } from '@/lib/content'

// Hook para generar partículas estables (solo en cliente)
function useParticlePositions(count: number) {
  const [positions, setPositions] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])
  
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
      }))
    )
  }, [count])
  
  return positions
}

const serviceIcons: Record<string, any> = {
  'ia-conversacional': Brain,
  'analisis-predictivo': TrendingUp,
  'procesamiento-datos': Database,
  'automatizacion-inteligente': Zap,
  'seguridad-ia': Shield,
}

export default function TheModalPage() {
  const particles = useParticlePositions(20)
  const [content, setContent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const data = await getTheModalContent()
      if (data) {
        setContent(data)
      } else {
        // Fallback a datos por defecto
        setContent({
          hero: {
            badge: 'The Mesh',
            title: 'Servicios de desarrollo especializados',
            subtitle: 'Servicios interconectados de desarrollo de software con IA que se adaptan y escalan según las necesidades de tu organización.',
            cta_primary_text: 'Hablemos de tu proyecto',
            cta_primary_link: '/contacto',
            cta_secondary_text: 'Conoce FastIA',
            cta_secondary_link: '/nosotros',
          },
          services: [
            {
              id: '1',
              title: 'IA Conversacional',
              description: 'Chatbots inteligentes y asistentes virtuales que entienden contexto y aprenden de cada interacción.',
              href: '/servicios/ia-conversacional',
              color: 'from-orange-500 to-orange-600',
              icon: 'ia-conversacional',
            },
            {
              id: '2',
              title: 'Análisis Predictivo',
              description: 'Machine Learning para predecir tendencias, detectar patrones y tomar decisiones basadas en datos.',
              href: '/servicios/analisis-predictivo',
              color: 'from-blue-500 to-blue-600',
              icon: 'analisis-predictivo',
            },
            {
              id: '3',
              title: 'Procesamiento de Datos',
              description: 'Transformación y análisis de grandes volúmenes de datos para extraer insights accionables.',
              href: '/servicios/procesamiento-datos',
              color: 'from-green-500 to-green-600',
              icon: 'procesamiento-datos',
            },
            {
              id: '4',
              title: 'Automatización Inteligente',
              description: 'RPA con IA que automatiza procesos complejos y toma decisiones en tiempo real.',
              href: '/servicios/automatizacion-inteligente',
              color: 'from-purple-500 to-purple-600',
              icon: 'automatizacion-inteligente',
            },
            {
              id: '5',
              title: 'Seguridad con IA',
              description: 'Protección avanzada con detección de amenazas, análisis de vulnerabilidades y respuesta automática.',
              href: '/servicios/seguridad-ia',
              color: 'from-red-500 to-red-600',
              icon: 'seguridad-ia',
            },
          ],
          expertise: {
            title: 'Expertos en SEO y Posicionamiento en Buscadores IA',
            subtitle: 'No solo desarrollamos software, lo hacemos visible.',
            seo_title: 'SEO Técnico Avanzado',
            seo_description: 'Core Web Vitals, Schema.org, structured data y indexación perfecta.',
            apps_title: 'Especialistas en Apps Nativas e Híbridas',
            apps_description: '11 años desarrollando apps móviles.',
          },
          cta: {
            title: '¿Listo para transformar tu idea?',
            description: 'Agenda una sesión de 60 minutos gratis.',
            button_text: 'Hablemos de tu proyecto',
            button_link: '/contacto',
          },
        })
      }
    } catch (error) {
      console.error('Error cargando contenido:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  const services = content.services || []
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-gray-900" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
              <span className="text-orange-500 font-semibold">{content.hero?.badge || 'The Mesh'}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              {content.hero?.title || 'Servicios de desarrollo especializados'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              {content.hero?.subtitle || 'Servicios interconectados de desarrollo de software con IA.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={content.hero?.cta_primary_link || '/contacto'}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50"
              >
                {content.hero?.cta_primary_text || 'Hablemos de tu proyecto'} →
              </Link>
              <Link
                href={content.hero?.cta_secondary_link || '/nosotros'}
                className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-lg font-semibold transition-all"
              >
                {content.hero?.cta_secondary_text || 'Conoce FastIA'}
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Partículas decorativas */}
        {particles.length > 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {particles.map((pos, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-500 rounded-full animate-float"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${pos.delay}s`,
                  animationDuration: `${pos.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Servicios Grid */}
      <section className="relative py-24 bg-gray-800/50 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Expertos en posicionamiento SEO, buscadores IA, apps nativas e híbridas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => {
              const Icon = serviceIcons[service.icon] || Brain
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={service.href || service.href || '#'}>
                    <div className="h-full p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all">
                      <div className={`inline-flex p-4 bg-gradient-to-br ${service.color || 'from-orange-500 to-orange-600'} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="mt-6 text-orange-500 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                        Explorar →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative py-24 bg-gray-900 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {content.expertise?.title || 'Expertos en SEO y Posicionamiento en Buscadores IA'}
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {content.expertise?.subtitle || 'No solo desarrollamos software, lo hacemos visible.'}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{content.expertise?.seo_title || 'SEO Técnico Avanzado'}</h3>
                    <p className="text-gray-400">{content.expertise?.seo_description || 'Core Web Vitals, Schema.org, structured data y indexación perfecta.'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Optimización para IA</h3>
                    <p className="text-gray-400">Tu contenido visible en ChatGPT, Perplexity, Claude y futuros buscadores IA.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Estrategia de Contenido</h3>
                    <p className="text-gray-400">Keyword research, content gap analysis y roadmap de 12 meses.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {content.expertise?.apps_title || 'Especialistas en Apps Nativas e Híbridas'}
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {content.expertise?.apps_description || '11 años desarrollando apps móviles.'}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Nativas (Swift/Kotlin)</h3>
                    <p className="text-gray-400">Performance máxima, acceso completo al hardware, UX perfecta.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Híbridas (Flutter)</h3>
                    <p className="text-gray-400">1 codebase, 2 plataformas. Desarrollo 60% más rápido, coste optimizado.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Recomendación Honesta</h3>
                    <p className="text-gray-400">Te decimos la verdad: qué tecnología usar y por qué. Sin agendas ocultas.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-32 bg-gradient-to-br from-orange-500/10 to-gray-900 z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              {content.cta?.title || '¿Listo para transformar tu idea?'}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {content.cta?.description || 'Agenda una sesión de 60 minutos gratis. Sin coste, sin compromiso.'}
            </p>
            
            <Link
              href={content.cta?.button_link || '/contacto'}
              className="inline-block px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg font-semibold transition-all shadow-2xl hover:shadow-orange-500/50"
            >
              {content.cta?.button_text || 'Hablemos de tu proyecto'} →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
