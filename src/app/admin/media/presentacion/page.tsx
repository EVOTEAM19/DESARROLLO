'use client'

import { useState, useRef } from 'react'
import { Download, ChevronLeft, ChevronRight, 
  Building2, Target, Package, Settings, Code2, 
  Palette, ShoppingCart, Calendar, Euro, 
  CheckCircle, Users, Database, Cloud, 
  Smartphone, Monitor, Zap, Rocket,
  FileText, BarChart3, CreditCard, Mail,
  Globe, ArrowRight, Layers, Cpu, 
  Shield, TrendingUp, Clock, Award,
  Briefcase, MessageSquare, Eye, MousePointer,
  Upload, Image as ImageIcon, Shirt, Tag, Percent,
  Truck, BarChart,
  Bell, Search, Filter,
  GitBranch, Server, Lock, RefreshCw,
  Play, CheckCircle2, Circle, ArrowUpRight,
  Star, Heart, ThumbsUp, Sparkles,
  Box, Boxes,
  Paintbrush, Move, ZoomIn, ShoppingBag,
  Receipt, Package2, Warehouse, Tags,
  Send, Phone, MapPin, ExternalLink, X } from 'lucide-react'
import { getLogoUrl } from '@/lib/logo'
import NextImage from 'next/image'
import { useEffect } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Componente para los logos de tecnología
const TechLogo = ({ name, color }: { name: string; color: string }) => {
  const logos: { [key: string]: JSX.Element } = {
    react: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <circle cx="12" cy="12" r="2.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.18 3.43L12 11.04 5.82 7.61 12 4.18zM5 8.82l6 3.33v6.67l-6-3.33V8.82zm14 6.67l-6 3.33v-6.67l6-3.33v6.67z"/>
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <rect x="2" y="2" width="20" height="20" rx="2"/>
        <text x="6" y="17" fontSize="10" fill="white" fontWeight="bold">TS</text>
      </svg>
    ),
    supabase: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M12.5 2L3 14h7v8l9.5-12h-7V2z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M12 2L2 20h20L12 2z"/>
      </svg>
    ),
    firebase: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M4.5 3l2.5 4.5L4.5 21l7.5-4.5L19.5 21l-3-13.5L19.5 3l-7.5 4.5L4.5 3z"/>
      </svg>
    ),
    stripe: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color}>
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
      </svg>
    ),
  }
  return logos[name] || <div className="w-full h-full bg-current rounded"/>
}

// Componente para formas decorativas flotantes
const FloatingShape = ({ className, type = 'circle' }: { className?: string; type?: 'circle' | 'square' | 'triangle' | 'dots' }) => {
  if (type === 'circle') {
    return <div className={`absolute rounded-full ${className}`} />
  }
  if (type === 'square') {
    return <div className={`absolute rounded-lg rotate-45 ${className}`} />
  }
  if (type === 'triangle') {
    return (
      <div className={`absolute ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,0 100,100 0,100" fill="currentColor" />
        </svg>
      </div>
    )
  }
  if (type === 'dots') {
    return (
      <div className={`absolute grid grid-cols-3 gap-2 ${className}`}>
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-current opacity-30" />
        ))}
      </div>
    )
  }
  return null
}

// Componente para tarjeta de característica
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 hover:bg-white/10 transition-all group hover:border-orange-500/40 hover:scale-[1.02]">
    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
    <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
  </div>
)

// Componente para estadística
const StatCard = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => (
  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
    <Icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
)

// Componente para item de timeline
const TimelineItem = ({ phase, title, duration, items, isLast = false }: { phase: string; title: string; duration: string; items: string[]; isLast?: boolean }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30">
        {phase}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-orange-500/30 mt-2" />}
    </div>
    <div className="pb-6">
      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">{duration}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-lg border border-white/10">
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
)

// Componente para precio
const PriceItem = ({ title, description, price, features, highlighted = false }: { title: string; description: string; price: string; features: string[]; highlighted?: boolean }) => (
  <div className={`rounded-xl p-6 ${highlighted ? 'bg-gradient-to-br from-orange-500/30 to-orange-600/20 border-2 border-orange-500/50' : 'bg-white/5 border border-orange-500/20'}`}>
    <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <div className="mb-4">
      <div className="text-3xl font-bold text-orange-500">{price}</div>
      <div className="text-xs text-gray-400 mt-1">IVA No Incluido</div>
    </div>
    <ul className="space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
)

export default function PresentacionPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfReady, setPdfReady] = useState(false)
  const [isPreparingPDF, setIsPreparingPDF] = useState(false)
  const generatedPDFRef = useRef<jsPDF | null>(null)
  const presentationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadLogo = async () => {
      const url = await getLogoUrl()
      setLogoUrl(url)
    }
    loadLogo()
  }, [])

  // Pre-generar PDF en background cuando la página esté lista
  useEffect(() => {
    if (logoUrl && presentationRef.current) {
      // Esperar un poco para que todo se renderice
      const timer = setTimeout(() => {
        generatePDFInBackground()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [logoUrl])

  const totalSlides = 12

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Generar PDF en background
  const generatePDFInBackground = async () => {
    if (isPreparingPDF || generatedPDFRef.current) return
    
    setIsPreparingPDF(true)
    
    const presentationContainer = presentationRef.current
    if (!presentationContainer) {
      setIsPreparingPDF(false)
      return
    }

    // Buscar contenedores
    let mainContainer: HTMLElement | null = null
    let slideContainer: HTMLElement | null = null
    const allDivs = presentationContainer.querySelectorAll('div')
    
    for (const div of Array.from(allDivs)) {
      const classList = Array.from(div.classList)
      if (classList.some(cls => cls.includes('bg-gradient-to-br') && cls.includes('from-gray-900'))) {
        mainContainer = div as HTMLElement
      }
      if (classList.some(cls => cls.includes('aspect') && cls.includes('16') && cls.includes('9'))) {
        slideContainer = div as HTMLElement
      }
    }

    if (!slideContainer) {
      setIsPreparingPDF(false)
      return
    }

    const originalSlide = currentSlide
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    try {
      const containerRect = slideContainer.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height

      for (let i = 0; i < totalSlides; i++) {
        setCurrentSlide(i)
        
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setTimeout(resolve, 500)
              })
            })
          })
        })

        // Esperar imágenes
        const images = slideContainer.querySelectorAll('img')
        await Promise.all(
          Array.from(images).map((img) => {
            if (img.complete && img.naturalHeight !== 0 && img.naturalWidth > 0) {
              return Promise.resolve(null)
            }
            return new Promise((resolve) => {
              const timeout = setTimeout(resolve, 3000)
              img.onload = () => clearTimeout(timeout)
              img.onerror = () => clearTimeout(timeout)
            })
          })
        )

        await new Promise(resolve => setTimeout(resolve, 300))

        // Capturar slide
        const canvas = await html2canvas(slideContainer, {
          backgroundColor: '#1a1a2e',
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          width: containerWidth,
          height: containerHeight,
          windowWidth: containerWidth,
          windowHeight: containerHeight,
          imageTimeout: 20000,
          foreignObjectRendering: false,
        })

        const imgData = canvas.toDataURL('image/png', 1.0)
        
        if (i > 0) {
          pdf.addPage()
        }
        
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const aspectRatio = canvasHeight / canvasWidth
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        
        let imgWidth = pdfWidth
        let imgHeight = imgWidth * aspectRatio
        
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight
          imgWidth = imgHeight / aspectRatio
        }
        
        const xOffset = (pdfWidth - imgWidth) / 2
        const yOffset = (pdfHeight - imgHeight) / 2
        
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST')
      }

      setCurrentSlide(originalSlide)
      generatedPDFRef.current = pdf
      setPdfReady(true)
    } catch (error) {
      console.error('Error generando PDF en background:', error)
      setCurrentSlide(originalSlide)
    } finally {
      setIsPreparingPDF(false)
    }
  }

  const handlePrint = async () => {
    // Si el PDF ya está generado, descargarlo directamente
    if (generatedPDFRef.current && pdfReady) {
      generatedPDFRef.current.save('presentacion-fastia-proyecto-automatizacion.pdf')
      return
    }

    // Si está preparándose, esperar
    if (isPreparingPDF) {
      alert('El PDF se está preparando. Por favor, espera unos segundos.')
      return
    }

    // Si no está listo, usar la función de generación en background
    setIsGeneratingPDF(true)
    await generatePDFInBackground()
    setIsGeneratingPDF(false)
    
    if (generatedPDFRef.current) {
      generatedPDFRef.current.save('presentacion-fastia-proyecto-automatizacion.pdf')
    }
  }

  const slides = [
    {
      title: 'Proyecto de Automatización de Personalización y E-commerce',
      subtitle: 'Propuesta de desarrollo de software personalizado',
      company: 'FastIA',
      isCover: true,
    },
    {
      title: 'Índice',
      isIndex: true,
      items: [
        'Sobre FastIA',
        'Contexto y Objetivo',
        'Alcance del Proyecto',
        'Panel de Administración',
        'Stack Tecnológico',
        'Experiencia de Usuario',
        'Metodología Ágil',
        'Inversión',
      ],
    },
    { title: 'Sobre FastIA', icon: Building2 },
    { title: 'Contexto y Objetivo del Proyecto', icon: Target },
    { title: 'Alcance del Proyecto', icon: Package },
    { title: 'Panel de Administración', icon: Settings },
    { title: 'Stack Tecnológico', icon: Code2 },
    { title: 'Experiencia de Usuario - Personalización', icon: Palette },
    { title: 'Plataforma E-commerce', icon: ShoppingCart },
    { title: 'Metodología y Planificación', icon: Calendar },
    { title: 'Inversión del Proyecto', icon: Euro, isPricing: true },
    {
      title: 'Gracias',
      subtitle: 'FastIA – Soluciones digitales diseñadas para escalar tu negocio',
      isClosing: true,
      contact: {
        email: 'hola@fastia.es',
        web: 'www.fastia.es',
        phone: '+34 656 396 657',
        address: 'Calle Columela, 9, 28001 Madrid',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Controles */}
        <div className="mb-6 flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-medium">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <button
            onClick={handlePrint}
            disabled={isGeneratingPDF || isPreparingPDF}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF || isPreparingPDF ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isPreparingPDF ? 'Preparando PDF...' : 'Generando PDF...'}
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                {pdfReady ? 'Descargar PDF ✓' : 'Descargar PDF'}
              </>
            )}
          </button>
        </div>

        {/* Navegación por puntos */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50'
                  : 'bg-gray-700 hover:bg-gray-600 w-3'
              }`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Presentación */}
        <div
          ref={presentationRef}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 print:shadow-none print-content"
        >
          <div className="aspect-[16/9] p-8 relative overflow-hidden">
            
            {/* SLIDE 0 - PORTADA */}
            {currentSlide === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
                <FloatingShape type="circle" className="w-96 h-96 bg-orange-500/5 -top-20 -right-20 blur-3xl" />
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -bottom-10 -left-10 blur-2xl" />
                <FloatingShape type="dots" className="top-20 right-20 text-orange-500/30 w-20 h-20" />
                <FloatingShape type="square" className="w-16 h-16 bg-orange-500/10 bottom-32 right-32" />
                <FloatingShape type="square" className="w-8 h-8 bg-orange-500/20 top-40 left-20" />
                
                <div className="absolute top-24 left-32 p-3 bg-white/5 rounded-xl border border-orange-500/20 animate-pulse">
                  <Shirt className="w-6 h-6 text-orange-500/60" />
                </div>
                <div className="absolute bottom-32 left-24 p-3 bg-white/5 rounded-xl border border-orange-500/20">
                  <ShoppingCart className="w-6 h-6 text-orange-500/60" />
                </div>
                <div className="absolute top-32 right-40 p-3 bg-white/5 rounded-xl border border-orange-500/20">
                  <Paintbrush className="w-6 h-6 text-orange-500/60" />
                </div>
                <div className="absolute bottom-40 right-28 p-3 bg-white/5 rounded-xl border border-orange-500/20 animate-pulse">
                  <Package className="w-6 h-6 text-orange-500/60" />
                </div>

                {logoUrl && (
                  <div className="mb-8 relative w-72 h-36">
                    <NextImage src={logoUrl} alt="FastIA Logo" fill className="object-contain brightness-0 invert" unoptimized />
                  </div>
                )}
                
                <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg max-w-4xl">
                  {slides[0].title}
                </h1>
                <div className="w-32 h-1 bg-orange-500 mx-auto mb-6 shadow-lg shadow-orange-500/50"></div>
                <p className="text-xl xl:text-2xl text-gray-300 mb-8">{slides[0].subtitle}</p>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-5 h-5"><TechLogo name="react" color="#61DAFB" /></div>
                    <span className="text-sm text-gray-400">React</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-5 h-5"><TechLogo name="typescript" color="#3178C6" /></div>
                    <span className="text-sm text-gray-400">TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-5 h-5"><TechLogo name="supabase" color="#3ECF8E" /></div>
                    <span className="text-sm text-gray-400">Supabase</span>
                  </div>
                </div>
                
                <div className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl inline-flex items-center gap-3 shadow-xl shadow-orange-500/30">
                  <Rocket className="w-6 h-6" />
                  <p className="text-xl font-semibold">{slides[0].company}</p>
                </div>
              </div>
            )}

            {/* SLIDE 1 - ÍNDICE */}
            {currentSlide === 1 && (
              <div className="h-full relative z-10">
                <FloatingShape type="circle" className="w-64 h-64 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                <FloatingShape type="dots" className="bottom-10 right-10 text-orange-500/20 w-16 h-16" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <h2 className="text-4xl font-bold text-white">{slides[1].title}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {slides[1].items?.map((item, index) => {
                    const icons = [Building2, Target, Package, Settings, Code2, Palette, Calendar, Euro]
                    const Icon = icons[index] || FileText
                    return (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 transition-all group hover:border-orange-500/40 cursor-pointer"
                        onClick={() => goToSlide(index + 2)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl font-bold text-orange-500">{String(index + 1).padStart(2, '0')}</span>
                          <span className="text-lg text-gray-200 font-medium">{item}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-orange-500/50 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* SLIDE 2 - SOBRE FASTIA */}
            {currentSlide === 2 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-80 h-80 bg-orange-500/10 -top-20 -right-20 blur-3xl" />
                <FloatingShape type="square" className="w-12 h-12 bg-orange-500/20 bottom-20 right-40" />
                <FloatingShape type="dots" className="top-20 right-20 text-orange-500/30 w-16 h-16" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[2].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
                      <p className="text-gray-200 leading-relaxed mb-4">
                        <span className="text-orange-500 font-semibold">FastIA</span> es una empresa tecnológica especializada en el desarrollo de <span className="text-white font-medium">plataformas web personalizadas</span> y <span className="text-white font-medium">aplicaciones móviles</span>.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Diseñamos y construimos soluciones digitales escalables, eficientes y automatizadas enfocadas en el <span className="text-orange-400">crecimiento empresarial</span>, la <span className="text-orange-400">optimización de procesos</span> y la <span className="text-orange-400">experiencia de usuario</span>.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard value="+40" label="Developers Freelance" icon={Users} />
                      <StatCard value="8 sem" label="MVP en Producción" icon={Rocket} />
                      <StatCard value="+100" label="Proyectos Entregados" icon={CheckCircle} />
                      <StatCard value="6 años" label="De Experiencia" icon={Award} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FeatureCard icon={Smartphone} title="Apps Móviles" description="iOS, Android, Flutter, React Native" />
                      <FeatureCard icon={Globe} title="Plataformas Web" description="SaaS, E-commerce, Dashboards" />
                      <FeatureCard icon={Zap} title="Automatización IA" description="Procesos inteligentes y eficientes" />
                      <FeatureCard icon={Shield} title="Consultoría Tech" description="CTO as a Service para startups" />
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-4 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {['react', 'typescript', 'nodejs', 'supabase'].map((tech, i) => (
                          <div key={tech} className="w-10 h-10 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center">
                            <div className="w-6 h-6">
                              <TechLogo name={tech} color={['#61DAFB', '#3178C6', '#339933', '#3ECF8E'][i]} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-white font-medium">Stack Moderno</p>
                        <p className="text-sm text-gray-400">Tecnologías líderes del mercado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3 - CONTEXTO Y OBJETIVO */}
            {currentSlide === 3 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                <FloatingShape type="square" className="w-10 h-10 bg-orange-500/15 bottom-32 left-20" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[3].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-5 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <Briefcase className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">El Proyecto</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Desarrollar una <span className="text-orange-400 font-medium">plataforma de e-commerce B2B y B2C</span> enfocada en productos promocionales y personalización textil que permita a los usuarios diseñar, personalizar y comprar productos de forma completamente autónoma.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-red-500/20 rounded-lg">
                            <X className="w-4 h-4 text-red-400" />
                          </div>
                          <h4 className="text-white font-medium">Problema Actual</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li className="flex items-center gap-2"><Circle className="w-1.5 h-1.5 text-red-400" />Cotizaciones manuales lentas</li>
                          <li className="flex items-center gap-2"><Circle className="w-1.5 h-1.5 text-red-400" />Alto tiempo operativo</li>
                          <li className="flex items-center gap-2"><Circle className="w-1.5 h-1.5 text-red-400" />Dependencia del equipo</li>
                          <li className="flex items-center gap-2"><Circle className="w-1.5 h-1.5 text-red-400" />Sin visualización previa</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <h4 className="text-white font-medium">Solución FastIA</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Precios instantáneos</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Proceso 100% automatizado</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Autonomía total del cliente</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Preview en tiempo real</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 space-y-4">
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-5">
                      <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-orange-500" />
                        Objetivos Clave
                      </h4>
                      <div className="space-y-3">
                        {[
                          { icon: Shirt, text: 'Personalización de productos textiles' },
                          { icon: Eye, text: 'Visualización en tiempo real' },
                          { icon: Euro, text: 'Cálculo automático de precios' },
                          { icon: ShoppingCart, text: 'Compra sin intervención manual' },
                          { icon: Clock, text: 'Reducción tiempo operativo' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-300">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                        <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">B2B</p>
                        <p className="text-xs text-gray-400">Empresas</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                        <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">B2C</p>
                        <p className="text-xs text-gray-400">Consumidor final</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4 - ALCANCE */}
            {currentSlide === 4 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-64 h-64 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Package className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[4].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                      <Users className="w-5 h-5" />Perfiles de Usuario
                    </h3>
                    <div className="bg-white/5 border border-orange-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Administrador</p>
                          <p className="text-xs text-gray-400">Control total</p>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Gestión de productos, creación de productos y variable</li>
                        <li>• Control de pedidos</li>
                        <li>• Analytics y reportes</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 border border-orange-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Cliente B2B/B2C</p>
                          <p className="text-xs text-gray-400">Compra autónoma</p>
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Personalización productos</li>
                        <li>• Historial de pedidos</li>
                        <li>• Descuentos por volumen</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                      <Box className="w-5 h-5" />Tipos de Producto
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shirt, name: 'Camisetas' },
                        { icon: Shirt, name: 'Sudaderas' },
                        { icon: Shirt, name: 'Polos' },
                        { icon: Box, name: 'Merchandising' },
                        { icon: Package2, name: 'Imprenta' },
                        { icon: Package2, name: 'Materiales rígidos' },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Paintbrush className="w-4 h-4 text-orange-500" />Personalización
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Múltiples áreas de diseño</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Upload de archivos</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-400" />Preview en tiempo real</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                      <Zap className="w-5 h-5" />Funcionalidades
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: Eye, title: 'Vista previa real-time', desc: 'Mockups interactivos' },
                        { icon: Euro, title: 'Precios dinámicos', desc: 'Por tamaño y ubicación' },
                        { icon: Percent, title: 'Descuentos volumen', desc: 'Compras colectivas' },
                        { icon: Globe, title: 'APIs externas', desc: 'Integración proveedores' },
                        { icon: Smartphone, title: 'Responsive', desc: 'Móvil y escritorio' },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                          <div className="p-2 bg-orange-500/20 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 5 - PANEL DE ADMINISTRACIÓN */}
            {currentSlide === 5 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -top-20 -right-20 blur-3xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Settings className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[5].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4">
                  {[
                    { icon: ShoppingBag, title: 'Gestión de Pedidos', features: ['Seguimiento estado', 'Historial completo', 'Notificaciones', 'Exportación datos'] },
                    { icon: Users, title: 'Clientes', features: ['CRM integrado', 'Segmentación', 'Analytics clientes', 'Comunicación'] },
                    { icon: BarChart, title: 'Analytics', features: ['Ventas en tiempo real', 'KPIs dashboard', 'Reportes automáticos', 'Insights IA'] },
                    { icon: Warehouse, title: 'Inventario', features: ['Control stock', 'Alertas mínimos', 'Proveedores', 'Histórico'] },
                    { icon: Tags, title: 'Cupones', features: ['Códigos descuento', 'Campañas', 'Límites uso', 'Análisis ROI'] },
                    { icon: CreditCard, title: 'Pagos', features: ['TPV integrado', 'Stripe', 'Facturación', 'Reembolsos'] },
                    { icon: Mail, title: 'Marketing', features: ['Email campaigns', 'Automatizaciones', 'Segmentación', 'A/B Testing'] },
                    { icon: Palette, title: 'Personalización', features: ['Colores y logos', 'Textos y precios', 'Banners', 'SEO'] },
                  ].map((module, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4 hover:bg-white/10 transition-all group">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                        <module.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2 text-sm">{module.title}</h4>
                      <ul className="space-y-1">
                        {module.features.map((f, i) => (
                          <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                            <Circle className="w-1 h-1 text-orange-500" />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layers className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="text-white font-medium">Integraciones Incluidas</p>
                      <p className="text-sm text-gray-400">Conexión automática con tus herramientas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {['Google Analytics', 'Holded', 'Stripe', 'Resend'].map((int, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300 border border-white/10">{int}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 6 - STACK TECNOLÓGICO */}
            {currentSlide === 6 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-64 h-64 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                <FloatingShape type="dots" className="bottom-20 left-10 text-orange-500/20 w-16 h-16" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Code2 className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[6].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg"><Monitor className="w-5 h-5 text-blue-400" /></div>
                      <h3 className="text-lg font-semibold text-white">Frontend</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'React', logo: 'react', color: '#61DAFB', desc: 'Librería UI' },
                        { name: 'TypeScript', logo: 'typescript', color: '#3178C6', desc: 'Tipado estático' },
                        { name: 'Next.js', logo: 'vercel', color: '#ffffff', desc: 'Framework React' },
                        { name: 'Tailwind CSS', logo: null, color: '#06B6D4', desc: 'Estilos utility-first' },
                      ].map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            {tech.logo ? (
                              <div className="w-6 h-6"><TechLogo name={tech.logo} color={tech.color} /></div>
                            ) : (
                              <Palette className="w-5 h-5" style={{ color: tech.color }} />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{tech.name}</p>
                            <p className="text-xs text-gray-400">{tech.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg"><Server className="w-5 h-5 text-green-400" /></div>
                      <h3 className="text-lg font-semibold text-white">Backend</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Node.js', logo: 'nodejs', color: '#339933', desc: 'Runtime JavaScript' },
                        { name: 'TypeScript', logo: 'typescript', color: '#3178C6', desc: 'Tipado seguro' },
                        { name: 'Express/Fastify', logo: null, color: '#ffffff', desc: 'API REST' },
                      ].map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            {tech.logo ? (
                              <div className="w-6 h-6"><TechLogo name={tech.logo} color={tech.color} /></div>
                            ) : (
                              <Cpu className="w-5 h-5" style={{ color: tech.color }} />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{tech.name}</p>
                            <p className="text-xs text-gray-400">{tech.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg"><Database className="w-5 h-5 text-emerald-400" /></div>
                        <h4 className="text-white font-medium">Base de Datos</h4>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6"><TechLogo name="supabase" color="#3ECF8E" /></div>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Supabase / Firebase</p>
                          <p className="text-xs text-gray-400">PostgreSQL + Auth + Storage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg"><Cloud className="w-5 h-5 text-purple-400" /></div>
                      <h3 className="text-lg font-semibold text-white">DevOps & Deploy</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'GitHub', logo: 'github', color: '#ffffff', desc: 'Control de versiones' },
                        { name: 'Vercel', logo: 'vercel', color: '#ffffff', desc: 'Deploy automático' },
                        { name: 'CI/CD', logo: null, color: '#4CAF50', desc: 'Integración continua' },
                      ].map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                            {tech.logo ? (
                              <div className="w-6 h-6"><TechLogo name={tech.logo} color={tech.color} /></div>
                            ) : (
                              <RefreshCw className="w-5 h-5" style={{ color: tech.color }} />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{tech.name}</p>
                            <p className="text-xs text-gray-400">{tech.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium mb-3 text-sm">¿Por qué este stack?</h4>
                      <div className="space-y-2">
                        {[
                          { icon: Zap, text: 'Rendimiento óptimo' },
                          { icon: Shield, text: 'Seguridad robusta' },
                          { icon: TrendingUp, text: 'Escalabilidad' },
                          { icon: RefreshCw, text: 'Mantenibilidad' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <item.icon className="w-3 h-3 text-orange-500" />{item.text}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400">*Hosting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 7 - EXPERIENCIA DE USUARIO */}
            {currentSlide === 7 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Palette className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[7].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-orange-500" />Flujo de Personalización
                    </h3>
                    <div className="space-y-3">
                      {[
                        { step: 1, icon: MousePointer, title: 'Selecciona producto', desc: 'Elige del catálogo' },
                        { step: 2, icon: Upload, title: 'Sube tu diseño', desc: 'Formatos: PNG, SVG, AI' },
                        { step: 3, icon: Move, title: 'Posiciona y ajusta', desc: 'Drag & drop interactivo' },
                        { step: 4, icon: Eye, title: 'Preview en tiempo real', desc: 'Mockup 3D realista' },
                        { step: 5, icon: Tag, title: 'Tallas y cantidades', desc: 'Selección múltiple' },
                        { step: 6, icon: ShoppingCart, title: 'Checkout', desc: 'Pago seguro' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
                            {item.step}
                          </div>
                          <div className="flex-1 flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <div>
                              <p className="text-sm text-white font-medium">{item.title}</p>
                              <p className="text-xs text-gray-400">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Paintbrush className="w-5 h-5 text-orange-500" />Editor de Personalización
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Layers, title: 'Múltiples capas' },
                          { icon: ZoomIn, title: 'Zoom y rotación' },
                          { icon: Palette, title: 'Selector de colores' },
                          { icon: FileText, title: 'Añadir textos' },
                          { icon: ImageIcon, title: 'Librería de imágenes' },
                          { icon: RefreshCw, title: 'Deshacer/Rehacer' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-200">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-orange-500/20 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Euro className="w-5 h-5 text-orange-500" />Precios Dinámicos
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Box className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Precio base producto</span>
                          </div>
                          <span className="text-orange-500 font-medium">Variable</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Paintbrush className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">+ Personalización</span>
                          </div>
                          <span className="text-orange-500 font-medium">Por área</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">- Descuento volumen</span>
                          </div>
                          <span className="text-green-500 font-medium">Automático</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/20 to-transparent rounded-lg border border-orange-500/30">
                          <span className="text-white font-semibold">= Precio final</span>
                          <span className="text-orange-500 font-bold">Tiempo real</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 8 - E-COMMERCE */}
            {currentSlide === 8 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-64 h-64 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <ShoppingCart className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[8].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-6">
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    {[
                      { icon: Search, title: 'Búsqueda avanzada', desc: 'Filtros, categorías y búsqueda inteligente' },
                      { icon: Filter, title: 'Filtros dinámicos', desc: 'Por precio, color, talla, tipo' },
                      { icon: ShoppingBag, title: 'Carrito persistente', desc: 'Guardado automático entre sesiones' },
                      { icon: CreditCard, title: 'Checkout optimizado', desc: 'Proceso de pago en 3 pasos' },
                      { icon: Truck, title: 'Envíos integrados', desc: 'Cálculo automático de costes' },
                      { icon: Receipt, title: 'Facturación automática', desc: 'PDF generado al instante' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/5 border border-orange-500/20 rounded-xl p-4 hover:bg-white/10 transition-all group">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-orange-500" />Mobile-First
                      </h3>
                      <div className="space-y-3">
                        {['Diseño responsive', 'Touch-friendly', 'Carga ultrarrápida', 'PWA compatible'].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />{item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-orange-500/20 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-500" />Optimizado para Conversión
                      </h3>
                      <div className="space-y-2">
                        {[
                          { label: 'UX intuitiva', value: '+40% conv.' },
                          { label: 'Checkout rápido', value: '-60% abandono' },
                          { label: 'Trust badges', value: '+25% confianza' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <span className="text-sm text-gray-300">{item.label}</span>
                            <span className="text-xs text-green-400 font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 9 - METODOLOGÍA */}
            {currentSlide === 9 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-64 h-64 bg-orange-500/10 -top-10 -right-10 blur-2xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[9].title}</h2>
                      <p className="text-gray-400">Duración total: <span className="text-orange-500 font-semibold">8 semanas</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 overflow-y-auto">
                    <TimelineItem phase="1" title="Descubrimiento" duration="Semana 1" items={['Análisis de negocio', 'Investigación de usuarios', 'Stack tecnológico', 'Hoja de ruta']} />
                    <TimelineItem phase="2" title="Diseño" duration="Semanas 2-3" items={['Wireframes', 'Prototipos', 'Sistema de diseño', 'Validación']} />
                    <TimelineItem phase="3" title="Desarrollo" duration="Semanas 4-7" items={['Sprints 2 sem', 'MVP funcional', 'Integraciones', 'Pruebas']} />
                    <TimelineItem phase="4" title="Lanzamiento" duration="Semana 8" items={['Despliegue', 'QA Final', 'Documentación', 'Puesta en marcha']} isLast />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-orange-500" />Metodología Ágil
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: GitBranch, text: 'Sprints de 2 semanas' },
                          { icon: MessageSquare, text: 'Reuniones diarias' },
                          { icon: Eye, text: 'Demos semanales' },
                          { icon: RefreshCw, text: 'Iteraciones rápidas' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-200">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-orange-500/20 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-500" />Entregables por Fase
                      </h3>
                      <div className="space-y-3">
                        {[
                          { phase: 'Descubrimiento', items: 'Brief, Alcance, Cronograma' },
                          { phase: 'Diseño', items: 'Figma, Prototipo, UI Kit' },
                          { phase: 'Desarrollo', items: 'Código, Documentación, Pruebas' },
                          { phase: 'Lanzamiento', items: 'Despliegue, Formación, Soporte' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-white font-medium">{item.phase}</span>
                            <span className="text-sm text-gray-400">{item.items}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-green-500/30 rounded-xl p-4 flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Soporte Post-Launch</p>
                        <p className="text-sm text-gray-400">30 días de soporte incluidos tras el lanzamiento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 10 - INVERSIÓN */}
            {currentSlide === 10 && (
              <div className="h-full flex flex-col relative z-10">
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -top-20 -right-20 blur-3xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Euro className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl xl:text-4xl font-bold text-white">{slides[10].title}</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-6">
                  <PriceItem 
                    title="Plataforma Base"
                    description="Core del proyecto"
                    price="3.500 €"
                    features={['E-commerce completo', 'Editor de personalización', 'Panel de administración', 'Gestión de pedidos', 'Autenticación usuarios', 'Responsive design']}
                  />
                  
                  <PriceItem 
                    title="Módulos Avanzados"
                    description="Marketing y funcionalidades"
                    price="1.200 €"
                    features={['Email marketing', 'Cupones y descuentos', 'Analytics avanzados', 'Segmentación clientes', 'Automatizaciones', 'A/B Testing', 'Integración Holded']}
                  />
                  
                  <PriceItem 
                    title="Infraestructura"
                    description="Integraciones y config"
                    price="600 €"
                    features={['Integración API', 'Pasarela de pagos', 'Google Analytics', 'Configuración DNS', 'SSL y seguridad', 'Documentación']}
                  />
                </div>

                <div className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Inversión Total del Proyecto</p>
                      <div>
                        <p className="text-3xl font-bold text-white">5.300 €</p>
                        <p className="text-xs text-white/60 mt-1">IVA No Incluido</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm mb-1">Forma de pago</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">50% inicio</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">50% entrega</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 11 - CIERRE */}
            {currentSlide === 11 && (
              <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
                <FloatingShape type="circle" className="w-96 h-96 bg-orange-500/5 -top-20 -right-20 blur-3xl" />
                <FloatingShape type="circle" className="w-72 h-72 bg-orange-500/10 -bottom-10 -left-10 blur-2xl" />
                <FloatingShape type="dots" className="top-20 left-20 text-orange-500/30 w-16 h-16" />
                <FloatingShape type="square" className="w-12 h-12 bg-orange-500/10 bottom-32 right-32" />
                
                <h2 className="text-5xl xl:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {slides[11].title}
                </h2>
                <div className="w-32 h-1 bg-orange-500 mx-auto mb-6 shadow-lg shadow-orange-500/50"></div>
                <p className="text-2xl xl:text-3xl text-gray-300 mb-8 font-medium max-w-2xl">
                  {slides[11].subtitle}
                </p>
                
                {logoUrl && (
                  <div className="mb-8 relative w-56 h-28">
                    <NextImage src={logoUrl} alt="FastIA Logo" fill className="object-contain brightness-0 invert" unoptimized />
                  </div>
                )}
                
                <div className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg"><Mail className="w-5 h-5 text-orange-500" /></div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-white">{slides[11].contact?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg"><Globe className="w-5 h-5 text-orange-500" /></div>
                      <div>
                        <p className="text-xs text-gray-400">Web</p>
                        <p className="text-white">{slides[11].contact?.web}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg"><Phone className="w-5 h-5 text-orange-500" /></div>
                      <div>
                        <p className="text-xs text-gray-400">Teléfono</p>
                        <p className="text-white">{slides[11].contact?.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg"><MapPin className="w-5 h-5 text-orange-500" /></div>
                      <div>
                        <p className="text-xs text-gray-400">Dirección</p>
                        <p className="text-white">{slides[11].contact?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { background: #1a1a2e; }
          body > *:not(.print-content) { display: none !important; }
          .print-content { display: block !important; }
        }
      `}</style>
    </div>
  )
}
