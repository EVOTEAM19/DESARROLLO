'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Brain, TrendingUp, Database, Zap, Shield } from 'lucide-react'
import { getLogoUrl } from '@/lib/logo'

const modalServices = [
  {
    icon: Brain,
    label: 'IA Conversacional',
    description: 'Chatbots y asistentes virtuales',
    href: '/servicios/ia-conversacional',
    color: 'orange'
  },
  {
    icon: TrendingUp,
    label: 'Análisis Predictivo',
    description: 'Machine Learning y predicciones',
    href: '/servicios/analisis-predictivo',
    color: 'blue'
  },
  {
    icon: Database,
    label: 'Procesamiento de Datos',
    description: 'Big Data y transformación',
    href: '/servicios/procesamiento-datos',
    color: 'green'
  },
  {
    icon: Zap,
    label: 'Automatización Inteligente',
    description: 'RPA con IA integrada',
    href: '/servicios/automatizacion-inteligente',
    color: 'purple'
  },
  {
    icon: Shield,
    label: 'Seguridad con IA',
    description: 'Protección avanzada y detección',
    href: '/servicios/seguridad-ia',
    color: 'red'
  }
]

const colorClasses = {
  orange: 'from-orange-500 to-orange-600',
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  red: 'from-red-500 to-red-600'
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    loadLogo()
  }, [])

  const loadLogo = async () => {
    const url = await getLogoUrl()
    setLogoUrl(url)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-between h-20 relative">
          {/* Logo - Centrado en móvil, izquierda en desktop */}
          <Link href="/" className="flex items-center group absolute left-1/2 lg:left-0 transform -translate-x-1/2 lg:transform-none">
            {logoUrl ? (
              <div className="relative w-48 sm:w-72 h-12 sm:h-16 rounded-lg overflow-hidden shadow-lg group-hover:shadow-orange-500/50 transition-all">
                <Image
                  src={logoUrl}
                  alt="FastIA Logo"
                  fill
                  className="object-contain scale-110"
                  unoptimized
                  priority
                />
              </div>
            ) : (
              <div className="w-48 sm:w-72 h-12 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-6xl sm:text-8xl shadow-lg group-hover:shadow-orange-500/50 transition-all">
                F
              </div>
            )}
          </Link>
          
          {/* Desktop Nav - CENTRADO */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {/* Dropdown The Modal */}
            <div
              className="relative"
              onMouseEnter={() => setModalDropdownOpen(true)}
              onMouseLeave={() => setModalDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-orange-500 transition-colors font-medium">
                The Modal
                <ChevronDown className={`w-4 h-4 transition-transform ${modalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {modalDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[600px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 overflow-hidden"
                    style={{ left: '-200px' }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {modalServices.map((service, i) => {
                        const Icon = service.icon
                        return (
                          <Link
                            key={i}
                            href={service.href}
                            className="flex items-start gap-4 p-4 hover:bg-gray-700 rounded-lg transition-all group"
                          >
                            <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${colorClasses[service.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white mb-1 group-hover:text-orange-500 transition-colors">
                                {service.label}
                              </div>
                              <div className="text-sm text-gray-400">
                                {service.description}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    
                    {/* Ver todos */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <Link
                        href="/the-modal"
                        className="block text-center py-2 text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                      >
                        Ver todos los servicios →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href="/freelance" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
              Freelance
            </Link>
            
            <Link href="/sectores" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
              Sectores
            </Link>
            
            <Link href="/reflexiones" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
              Reflexiones
            </Link>
          </nav>
          
          {/* Botón Contacto - DERECHA */}
          <Link 
            href="/contacto"
            className="hidden lg:block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50 absolute right-0"
          >
            Contacto
          </Link>
          
          {/* Mobile menu button - Posición absoluta a la derecha */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors absolute right-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
          >
            <div className="p-4 space-y-2 max-h-[80vh] overflow-y-auto">
              {/* The Modal mobile */}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-400 px-4 py-2">The Modal</div>
                {modalServices.map((service, i) => (
                  <Link
                    key={i}
                    href={service.href}
                    className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {service.label}
                  </Link>
                ))}
                {/* Ver todos los servicios */}
                <Link
                  href="/the-modal"
                  className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-all text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ver todos los servicios →
                </Link>
              </div>
              
              <Link
                href="/freelance"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Freelance
              </Link>
              
              <Link
                href="/sectores"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sectores
              </Link>
              
              <Link
                href="/reflexiones"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-500 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reflexiones
              </Link>
              
              <Link
                href="/contacto"
                className="block px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-lg font-semibold transition-all mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
