'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, ChevronLeft, ChevronRight, 
  Building2, Target, Package, Settings, 
  ShoppingCart, Calendar, Euro, 
  CheckCircle, Users, Database, 
  Smartphone, Monitor, Zap, Rocket,
  FileText, BarChart3, CreditCard, Mail,
  Globe, ArrowRight, Layers, 
  Shield, TrendingUp, Clock, Award,
  Eye,
  Shirt, 
  Truck, BarChart,
  Bell, Search, 
  Lock, RefreshCw,
  CheckCircle2,
  Star, Sparkles,
  Box, Boxes,
  Scissors, Ruler, 
  Receipt, Warehouse, Tags,
  Send, Phone, MapPin,
  UserCog, ClipboardList, AlertTriangle,
  Store, Laptop, Tablet,
  FileSpreadsheet,
  UserCheck, History, Fingerprint,
  PackageSearch, Timer, DollarSign,
  Workflow,
  AlertCircle,
  Brain,
  Cpu,
  Bot,
  MessageSquare,
  RotateCcw,
  FileQuestion,
  PackageCheck,
  ScanLine,
  ArrowDownUp,
  BadgeCheck,
  ShieldCheck,
  Banknote,
  QrCode,
  Percent,
  CalendarCheck,
  Play,
  TestTube,
  Repeat,
  CircleDollarSign,
  FileCheck,
  Headphones,
  LayoutDashboard,
  PenTool,
  Code,
  Bug,
  Upload,
  LineChart,
  Megaphone,
  Target as TargetIcon,
  Lightbulb,
  Gauge,
  Network,
  Cog } from 'lucide-react'
import Image from 'next/image'
import { getLogoUrl } from '@/lib/logo'

// Componente para los logos de tecnología (SVGs oficiales simplificados)
const TechLogo = ({ name, color }: { name: string; color: string }) => {
  const logos: { [key: string]: JSX.Element } = {
    // React - logo átomo (elipses + círculo central)
    react: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2.05" fill={color} />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    ),
    // Node.js - hexágono verde característico
    nodejs: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.82L12 11.18 5.1 7.82 12 4.18zM4 8.82l7 3.88v7.64l-7-3.88V8.82zm16 6.36l-7 3.88V11.7l7-3.88v7.64z" />
      </svg>
    ),
    // TypeScript - cuadrado azul con "TS" (rect + texto)
    typescript: (
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="22" height="22" rx="3" fill={color} />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold" fontFamily="system-ui, sans-serif">TS</text>
      </svg>
    ),
    // Supabase - rayo/logo oficial (verde)
    supabase: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 2L3 14h7v8l9.5-12h-7V2z" />
      </svg>
    ),
    // OpenAI - logo abstracto oficial
    openai: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
      </svg>
    ),
  }
  return logos[name] ?? <div className="w-full h-full bg-current rounded" aria-hidden="true" />
}

// ========== SILUETAS SASTRERÍA — LIMPIAS, ELEGANTES Y RECONOCIBLES ==========

// Esmoquin / Tuxedo con pajarita — estilo elegante
const TuxedoSilhouette = ({ className = "", opacity = 0.15 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 200 220" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M85 45 L95 25 L100 30 L105 25 L115 45 L105 50 L100 45 L95 50 Z" />
    <path d="M70 52 Q65 45 72 40 Q85 38 92 50 Q85 62 72 60 Q65 58 70 52 Z" />
    <path d="M130 52 Q135 45 128 40 Q115 38 108 50 Q115 62 128 60 Q135 58 130 52 Z" />
    <ellipse cx="100" cy="50" rx={8} ry={6} />
    <path d="M95 50 L45 70 L25 80 L20 95 L25 180 L35 185 L50 180 L55 140 L70 115 L88 95 L95 70 Z" />
    <path d="M105 50 L155 70 L175 80 L180 95 L175 180 L165 185 L150 180 L145 140 L130 115 L112 95 L105 70 Z" />
    <path d="M88 95 L100 180 L112 95 L100 70 Z" fillOpacity={0.2} />
    <path d="M70 60 L55 90 L60 130" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.5} />
    <path d="M130 60 L145 90 L140 130" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.5} />
    <circle cx="100" cy="175" r={4} fillOpacity={0.6} />
    <path d="M40 130 L55 125 L55 155 L38 155" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
    <path d="M160 130 L145 125 L145 155 L162 155" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
    <path d="M25 180 L30 215 L85 220 L100 185 L115 220 L170 215 L175 180" />
  </svg>
)

// Hombre en traje abotonándose — silueta elegante
const BusinessmanSilhouette = ({ className = "", opacity = 0.15 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 200 300" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <ellipse cx="100" cy="25" rx={18} ry={22} />
    <path d="M90 45 L90 55 L110 55 L110 45" />
    <path d="M90 55 L40 70 L25 85 L20 130 L35 180 L55 185 L50 140 L55 100 L70 85" />
    <path d="M110 55 L160 70 L175 85 L180 130 L165 180 L145 185 L150 140 L145 100 L130 85" />
    <path d="M70 85 L55 100 L50 200 L75 205 L85 160 L100 150 L115 160 L125 205 L150 200 L145 100 L130 85 Z" />
    <path d="M70 85 L85 75 L100 95 L115 75 L130 85 L115 110 L100 130 L85 110 Z" fillOpacity={0.3} />
    <path d="M92 75 L100 85 L108 75 L105 120 L100 130 L95 120 Z" fillOpacity={0.2} />
    <path d="M97 85 L100 90 L103 85 L102 125 L100 135 L98 125 Z" fillOpacity={0.5} />
    <ellipse cx="85" cy="155" rx={12} ry={8} fillOpacity={0.9} />
    <ellipse cx="115" cy="155" rx={12} ry={8} fillOpacity={0.9} />
    <circle cx="100" cy="155" r={4} fillOpacity={0.6} />
    <circle cx="100" cy="175" r={4} fillOpacity={0.6} />
    <path d="M75 205 L65 295 L90 298 L100 220 L110 298 L135 295 L125 205" />
  </svg>
)

// Corbata clásica — limpia y clara
const TieSilhouette = ({ className = "", opacity = 0.2 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 60 180" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M22 8 L38 8 L42 18 L38 25 L30 22 L22 25 L18 18 Z" />
    <path d="M24 25 L26 45 L34 45 L36 25 L30 28 Z" />
    <path d="M26 45 L15 155 L30 175 L45 155 L34 45 Z" />
  </svg>
)

// Corbata con rayas diagonales
const StripedTieSilhouette = ({ className = "", opacity = 0.2 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 60 180" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M22 8 L38 8 L42 18 L38 25 L30 22 L22 25 L18 18 Z" />
    <path d="M24 25 L26 45 L34 45 L36 25 L30 28 Z" />
    <path d="M26 45 L15 155 L30 175 L45 155 L34 45 Z" />
    <line x1="20" y1="60" x2="40" y2="75" stroke="currentColor" strokeWidth={4} strokeOpacity={0.3} />
    <line x1="19" y1="85" x2="41" y2="100" stroke="currentColor" strokeWidth={4} strokeOpacity={0.3} />
    <line x1="17" y1="110" x2="43" y2="125" stroke="currentColor" strokeWidth={4} strokeOpacity={0.3} />
    <line x1="16" y1="135" x2="44" y2="150" stroke="currentColor" strokeWidth={4} strokeOpacity={0.3} />
  </svg>
)

// Tijeras de sastre — exactas y reconocibles
const ScissorsSilhouette = ({ className = "", opacity = 0.2 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 100 200" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M42 5 L52 8 L55 80 L48 85 L40 80 Z" />
    <path d="M58 5 L68 8 L72 75 L60 85 L55 80 Z" />
    <circle cx="55" cy="88" r={10} />
    <circle cx="55" cy="88" r={5} fillOpacity={0.3} />
    <path d="M48 85 L35 100 L25 115 L15 140 L12 160 L20 175 L40 180 L55 170 L50 150 L55 120 L55 95" />
    <ellipse cx="32" cy="155" rx={12} ry={16} fillOpacity={0.2} />
    <path d="M62 85 L75 100 L85 115 L95 140 L98 160 L90 175 L70 180 L55 170 L60 150 L55 120 L55 95" />
    <ellipse cx="78" cy="155" rx={12} ry={16} fillOpacity={0.2} />
  </svg>
)

// Traje en percha — vista frontal elegante
const SuitOnHangerSilhouette = ({ className = "", opacity = 0.15 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 200 240" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M95 0 Q85 5 85 15 Q85 22 100 22 Q115 22 115 15 Q115 5 105 0" fill="none" stroke="currentColor" strokeWidth={4} />
    <path d="M30 35 L85 22 L100 25 L115 22 L170 35 L165 42 L100 30 L35 42 Z" />
    <path d="M35 42 L20 55 L15 70 L20 75 L45 65 L45 50 Z" />
    <path d="M165 42 L180 55 L185 70 L180 75 L155 65 L155 50 Z" />
    <path d="M45 50 L45 65 L35 75 L30 230 L70 235 L75 130 L90 110 L100 95 L100 45 L85 50 Z" />
    <path d="M155 50 L155 65 L165 75 L170 230 L130 235 L125 130 L110 110 L100 95 L100 45 L115 50 Z" />
    <path d="M85 50 L55 75 L60 115 L85 105 L95 80 L100 55 Z" fillOpacity={0.4} />
    <path d="M115 50 L145 75 L140 115 L115 105 L105 80 L100 55 Z" fillOpacity={0.4} />
    <line x1="100" y1="95" x2="100" y2="220" stroke="currentColor" strokeWidth={1} strokeOpacity={0.3} />
    <circle cx="100" cy="130" r={5} fillOpacity={0.5} />
    <circle cx="100" cy="155" r={5} fillOpacity={0.5} />
    <path d="M45 160 L70 155 L70 190 L42 190" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
    <path d="M155 160 L130 155 L130 190 L158 190" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
  </svg>
)

// Pajarita / Bow Tie — elegante
const BowTieSilhouette = ({ className = "", opacity = 0.2 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 120 50" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M8 25 C5 12 15 5 30 8 C45 5 52 18 52 25 C52 32 45 45 30 42 C15 45 5 38 8 25 Z" />
    <path d="M112 25 C115 12 105 5 90 8 C75 5 68 18 68 25 C68 32 75 45 90 42 C105 45 115 38 112 25 Z" />
    <ellipse cx="60" cy="25" rx={10} ry={14} />
  </svg>
)

// Chaleco — vista frontal
const VestSilhouette = ({ className = "", opacity = 0.15 }: { className?: string; opacity?: number }) => (
  <svg viewBox="0 0 160 200" className={className} style={{ opacity }} fill="currentColor" aria-hidden>
    <path d="M60 15 L25 30 L20 45 L30 50 L50 40 L60 30 Z" />
    <path d="M100 15 L135 30 L140 45 L130 50 L110 40 L100 30 Z" />
    <path d="M60 30 L50 40 L30 50 L25 180 L55 185 L60 100 L80 80 L80 30 Z" />
    <path d="M100 30 L110 40 L130 50 L135 180 L105 185 L100 100 L80 80 L80 30 Z" />
    <path d="M60 30 L80 90 L100 30" fillOpacity={0.2} />
    <circle cx="80" cy="100" r={4} fillOpacity={0.6} />
    <circle cx="80" cy="120" r={4} fillOpacity={0.6} />
    <circle cx="80" cy="140" r={4} fillOpacity={0.6} />
    <circle cx="80" cy="160" r={4} fillOpacity={0.6} />
    <path d="M35 120 L55 115 L55 150 L33 150" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
    <path d="M125 120 L105 115 L105 150 L127 150" fill="none" stroke="currentColor" strokeWidth={2} strokeOpacity={0.4} />
  </svg>
)

// Componente Logo FastIA (header) — solo el logo, sin caja. Opción large para slide Sobre FastIA
const LogoFastIA = ({ logoUrl, large }: { logoUrl: string | null; large?: boolean }) => (
  <div className={large ? 'absolute top-4 left-1/2 -translate-x-1/2 z-20' : 'absolute top-4 right-6 z-20'}>
    {logoUrl ? (
      <div className={`relative ${large ? 'w-56 h-20 md:w-72 md:h-24' : 'w-28 h-9'}`} style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(1deg) brightness(98%) contrast(101%)' }}>
        <Image src={logoUrl} alt="FastIA" fill className="object-contain object-center" unoptimized sizes={large ? '288px' : '112px'} />
      </div>
    ) : null}
  </div>
)

// Componente para tarjeta de característica
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="bg-white border border-orange-200 rounded-xl p-4 hover:bg-orange-50/50 transition-all group hover:border-orange-400 shadow-sm">
    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-base text-gray-700 leading-relaxed">{description}</p>
  </div>
)

// Componente para estadística
const StatCard = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => (
  <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-sm">
    <Icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
    <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-base text-gray-700">{label}</div>
  </div>
)

// Wrapper A4 horizontal para cada slide (297×210 mm) — fondo blanco, detalles naranja
const SlideWrapper = ({ children, isPrintMode }: { children: React.ReactNode; isPrintMode: boolean }) => (
  <div
    className={`${isPrintMode ? 'print-slide' : 'slide-container-a4'} overflow-hidden relative flex flex-col`}
    style={{
      backgroundColor: '#ffffff',
      aspectRatio: isPrintMode ? undefined : '297 / 210',
      width: '100%',
      height: isPrintMode ? undefined : 'auto',
      padding: isPrintMode ? 10 : 28,
    }}
  >
    {isPrintMode ? <div className="print-slide-inner h-full w-full flex flex-col">{children}</div> : children}
  </div>
)

export default function PresentacionPratsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPrintMode, setIsPrintMode] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const presentationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getLogoUrl().then(setLogoUrl)
  }, [])

  useEffect(() => {
    const handleBeforePrint = () => setIsPrintMode(true)
    const handleAfterPrint = () => {
      document.body.classList.remove('print-mode')
      setIsPrintMode(false)
    }
    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [])

  const totalSlides = 14

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  const goToSlide = (index: number) => setCurrentSlide(index)

  // Imprimir/Exportar PDF usando window.print() — mucho más fiable
  const handlePrint = () => {
    document.body.classList.add('print-mode')
    setIsPrintMode(true)
    // Esperar a que se rendericen todos los slides (incl. imágenes) antes de abrir el diálogo
    setTimeout(() => {
      window.print()
    }, 800)
  }

  const slides = [
    { title: 'Portada', isCover: true },
    { title: 'Índice', isIndex: true },
    { title: 'Sobre FastIA', icon: Building2 },
    { title: 'Entendemos Vuestro Reto', icon: Target },
    { title: 'Nuestra Visión', icon: Sparkles },
    { title: 'El Flujo Completo del Cliente', icon: Workflow },
    { title: 'Automatización de Proveedores', icon: Truck },
    { title: 'Gestión de Stock', icon: Warehouse },
    { title: 'Gestión de Caja y Cobros', icon: CreditCard },
    { title: 'Analíticas, Reporting y Usuarios', icon: BarChart },
    { title: 'Tienda Online y Marketing', icon: ShoppingCart },
    { title: 'Planificación del Proyecto', icon: Calendar },
    { title: 'Inversión del Proyecto', icon: Euro },
    { title: 'Contacto', isClosing: true },
  ]

  // Función para renderizar el contenido de un slide específico
  const renderSlideContent = (slideIndex: number) => {
    // Este switch renderiza el contenido interno de cada slide
    // Se usará tanto en modo normal como en modo impresión
    return null // El contenido se maneja con currentSlide === X en el JSX principal
  }

  return (
    <>
      {/* Estilos CSS para impresión A4 horizontal — fondo blanco, colores exactos, ajuste al ancho */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          
          html::-webkit-scrollbar,
          body::-webkit-scrollbar,
          *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          
          nav, aside, header, footer, button,
          .sidebar, .app-header, [class*="sidebar"], [class*="Sidebar"],
          .no-print, .print\\:hidden,
          .navigation-dots, .slide-navigation, .slide-nav, .print-button {
            display: none !important;
          }
          
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            max-height: none !important;
            width: 100% !important;
            min-height: auto !important;
            height: auto !important;
            overflow: visible !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
          }
          
          .print-container::-webkit-scrollbar {
            display: none !important;
          }
          
          /* Cada slide: ancho útil A4 horizontal, altura fija para una página por slide */
          .print-slide {
            width: 277mm !important;
            max-width: 100% !important;
            height: 190mm !important;
            min-height: 190mm !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            break-inside: avoid !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            overflow: hidden !important;
            position: relative !important;
            box-sizing: border-box !important;
            padding: 10px !important;
            margin: 0 auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Portada: asegurar que siempre tenga altura y contenido visible */
          .print-slide:first-child {
            min-height: 190mm !important;
            display: block !important;
            visibility: visible !important;
          }
          
          .print-slide > * {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .print-slide:last-child {
            page-break-after: auto !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Forzar fondo blanco en slides y contenedores (no gris) */
          .slide-container-a4,
          .print-slide,
          [class*="slide-container"],
          [class*="print-slide"] {
            background-color: #ffffff !important;
            background: #ffffff !important;
          }
        }
        
        .slide-container-a4 {
          width: 100%;
          max-width: 1188px;
          aspect-ratio: 297 / 210;
          background-color: #ffffff;
          margin: 0 auto;
        }
        
        /* Ocultar barra de desplazamiento a la derecha de la presentación (solo en pantalla) */
        @media not print {
          .presentacion-prats-scroll-wrap {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .presentacion-prats-scroll-wrap::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
        }
      `}</style>

      <div className={`min-h-screen ${isPrintMode ? 'p-0' : 'p-6'} presentacion-prats-root`} style={{ backgroundColor: '#fafafa' }}>
        <div className={`${isPrintMode ? 'print-container' : 'max-w-7xl mx-auto presentacion-prats-scroll-wrap overflow-y-auto overflow-x-hidden max-h-[calc(100vh-2rem)]'}`}>
          {/* Controles - ocultos en impresión */}
          <div className="slide-navigation mb-6 flex items-center justify-between rounded-lg p-4 border print:hidden bg-white border-orange-200 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-orange-50 hover:bg-orange-100 text-gray-900 border border-orange-200">
              <ChevronLeft className="w-5 h-5 text-orange-600" />
            </button>
            <span className="text-gray-900 font-medium text-lg">{currentSlide + 1} / {totalSlides}</span>
            <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-orange-50 hover:bg-orange-100 text-gray-900 border border-orange-200">
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </button>
          </div>
          <button onClick={handlePrint} className="print-button flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-orange-500/30 print:hidden">
            <Download className="w-5 h-5" />
            Imprimir / PDF
          </button>
        </div>

        {/* Navegación por puntos - oculta en impresión */}
        <div className="navigation-dots mb-6 flex flex-wrap gap-2 justify-center print:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all ${currentSlide === index ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50' : 'w-3 bg-orange-200 hover:bg-orange-300'}`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Presentación */}
        <div ref={presentationRef} className={`${isPrintMode ? 'print-container' : 'rounded-xl shadow-2xl border border-orange-100'} overflow-hidden bg-white`}>
          
          {/* ==================== SLIDE 0 - PORTADA ==================== */}
          {(currentSlide === 0 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
                {/* Barra superior dorada */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"></div>
                
                {/* Siluetas sastrería — LIMPIAS y ELEGANTES */}
                <TuxedoSilhouette className="absolute -left-8 top-12 w-72 h-80 text-orange-500" opacity={0.15} />
                <BusinessmanSilhouette className="absolute -right-5 bottom-0 w-56 h-[420px] text-orange-500 scale-x-[-1]" opacity={0.12} />
                <TieSilhouette className="absolute left-[22%] bottom-16 w-14 h-44 text-orange-500 rotate-[-10deg]" opacity={0.18} />
                <ScissorsSilhouette className="absolute right-[18%] top-20 w-20 h-40 text-orange-600 rotate-[25deg]" opacity={0.12} />
                <BowTieSilhouette className="absolute left-[30%] top-28 w-28 h-14 text-orange-500" opacity={0.1} />
                
                {/* Elementos decorativos sutiles */}
                <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-orange-500/5 blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-orange-500/5 blur-3xl"></div>

                {/* Logo FastIA — solo el logo, sin caja (naranja). Fallback texto si no carga (p. ej. en PDF) */}
                <div className="mb-8 flex items-center justify-center min-h-[4rem]">
                  {logoUrl ? (
                    <div className="relative w-48 h-16" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(1deg) brightness(98%) contrast(101%)' }}>
                      <Image
                        src={logoUrl}
                        alt="FastIA"
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="192px"
                      />
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-orange-500 tracking-tight">FastIA</span>
                  )}
                </div>
                
                <h1 className="text-6xl xl:text-7xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  DESARROLLO A MEDIDA
                </h1>
                
                <h2 className="text-5xl xl:text-6xl font-bold text-orange-500 mb-10">
                  SASTRERÍA PRATS
                </h2>
                
                <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-10"></div>
                
                <p className="text-2xl text-gray-700 mb-4 font-light">Plataforma Integral de Gestión</p>
                
                <p className="text-lg text-gray-600 mb-12 italic font-light">
                  Una única plataforma · Todo automatizado · Control total
                </p>
                
                {/* Badges */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-full border border-orange-200">
                    <Store className="w-5 h-5 text-orange-500" />
                    <span className="text-base text-gray-700">3 Tiendas</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-full border border-orange-200">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <span className="text-base text-gray-700">100% Automatizado</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-full border border-orange-200">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <span className="text-base text-gray-700">Control Total</span>
                  </div>
                </div>
                
                <p className="absolute bottom-8 text-base text-gray-700">Enero 2026</p>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 1 - ÍNDICE ==================== */}
          {(currentSlide === 1 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <SuitOnHangerSilhouette className="absolute -right-5 bottom-5 w-48 h-60 text-orange-500" opacity={0.1} />
                <TieSilhouette className="absolute left-3 top-20 w-10 h-32 text-orange-500 rotate-[-12deg]" opacity={0.12} />
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <h2 className="text-5xl font-bold text-gray-900">Índice</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Building2, title: 'Sobre FastIA' },
                    { icon: Target, title: 'Entendemos Vuestro Reto' },
                    { icon: Sparkles, title: 'Nuestra Visión' },
                    { icon: Workflow, title: 'Flujo Completo del Cliente' },
                    { icon: Truck, title: 'Automatización de Proveedores' },
                    { icon: Warehouse, title: 'Gestión de Stock' },
                    { icon: CreditCard, title: 'Gestión de Caja y Cobros' },
                    { icon: BarChart, title: 'Analíticas, Reporting y Usuarios' },
                    { icon: ShoppingCart, title: 'Tienda Online y Marketing' },
                    { icon: Calendar, title: 'Planificación del Proyecto' },
                    { icon: Euro, title: 'Inversión del Proyecto' },
                    { icon: Phone, title: 'Contacto' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-orange-200 rounded-xl p-5 flex items-center gap-5 hover:bg-orange-50 transition-all group hover:border-orange-500/50 cursor-pointer shadow-sm"
                      onClick={() => goToSlide(index + 2)}
                    >
                      <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-xl font-bold text-orange-500">{String(index + 1).padStart(2, '0')}</span>
                        <span className="text-base text-gray-800 font-medium">{item.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-500/50 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 2 - SOBRE FASTIA ==================== */}
          {(currentSlide === 2 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} large />
                {/* Siluetas sastrería — limpias y elegantes */}
                <ScissorsSilhouette className="absolute -left-2 bottom-8 w-16 h-32 text-orange-500 rotate-[-20deg]" opacity={0.1} />
                <VestSilhouette className="absolute -right-3 top-16 w-36 h-48 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-4 mb-4 mt-14">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Sobre FastIA</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div className="bg-white border border-orange-200 rounded-xl p-5">
                      <p className="text-gray-900 leading-relaxed mb-3 text-base">
                        <span className="text-orange-500 font-semibold">Implementar IA en tu negocio</span> te permite <span className="text-gray-900 font-medium">automatizar muchos procesos</span> y conseguir lo que te imaginas: desde atención al cliente y análisis de datos hasta flujos administrativos y toma de decisiones en tiempo real.
                      </p>
                      <p className="text-gray-900 leading-relaxed text-base mb-3">
                        Las empresas que adoptan IA reportan un <span className="text-orange-500 font-medium">aumento medio del 38% en productividad</span>, reducción de costes y mayor velocidad de respuesta. El coste de implementación ha bajado de forma drástica; la IA es más accesible que nunca y permite liberar tiempo para tareas estratégicas.
                      </p>
                      <p className="text-gray-900 leading-relaxed text-base">
                        En <span className="text-orange-500 font-semibold">FastIA</span> combinamos automatización inteligente, plataformas a medida y soluciones de IA para transformar negocios tradicionales en empresas digitales eficientes y <span className="text-orange-500">maximizar la productividad</span> con tecnología de vanguardia.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard value="8 sem" label="MVP Producción" icon={Rocket} />
                      <StatCard value="6 años" label="Experiencia" icon={Award} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FeatureCard icon={Brain} title="Expertos en IA" description="Soluciones inteligentes con OpenAI, Claude y modelos propios" />
                      <FeatureCard icon={Zap} title="Automatización" description="Eliminamos tareas manuales y errores humanos" />
                      <FeatureCard icon={Cpu} title="Procesos Eficaces" description="Optimizamos flujos de trabajo complejos" />
                      <FeatureCard icon={Shield} title="Soporte 24/7" description="Acompañamiento continuo post-lanzamiento" />
                    </div>
                    
                    <div className="bg-white border border-orange-200 rounded-xl p-3">
                      <p className="text-base text-gray-700 mb-3">Stack Tecnológico</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'react', color: '#61DAFB', label: 'React' },
                          { name: 'typescript', color: '#3178C6', label: 'TypeScript' },
                          { name: 'nodejs', color: '#339933', label: 'Node.js' },
                          { name: 'supabase', color: '#3ECF8E', label: 'Supabase' },
                          { name: 'openai', color: '#10A37F', label: 'OpenAI' },
                        ].map((tech) => (
                          <div key={tech.name} className="flex items-center gap-2 px-2 py-1 bg-orange-100 rounded-lg">
                            <div className="w-4 h-4 flex-shrink-0">
                              <TechLogo name={tech.name} color={tech.color} />
                            </div>
                            <span className="text-base text-gray-700">{tech.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 3 - ENTENDEMOS VUESTRO RETO ==================== */}
          {(currentSlide === 3 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <TuxedoSilhouette className="absolute -right-6 bottom-10 w-52 h-64 text-orange-500" opacity={0.1} />
                <BowTieSilhouette className="absolute left-4 bottom-20 w-24 h-12 text-orange-500" opacity={0.1} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Entendemos Vuestro Reto</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  {/* Columna 1 */}
                  <div className="space-y-3">
                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Sistemas Fragmentados</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Boutique y sastrería operan por separado</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Duplicación de esfuerzos y datos</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Pérdida de información entre sistemas</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Imposible tener visión global del cliente</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <Receipt className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Facturación Problemática</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Facturación separada boutique/sastrería</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Pérdida de dinero en cada operación</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Proceso manual propenso a errores</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Sin automatización con contabilidad</li>
                      </ul>
                    </div>
                  </div>

                  {/* Columna 2 */}
                  <div className="space-y-3">
                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <PackageSearch className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Sin Control de Stock</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Telas obsoletas sin detectar</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Productos estancados meses</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Sin visibilidad de rotación real</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Inventarios desactualizados</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Impagos Sin Detectar</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Sin alertas de pagos pendientes</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Clientes con deudas ocultas</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Vencimientos no controlados</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Pérdida de liquidez</li>
                      </ul>
                    </div>
                  </div>

                  {/* Columna 3 */}
                  <div className="space-y-3">
                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <Calendar className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Vencimientos Ocultos</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Calendario proveedores sin visibilidad</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Pagos olvidados o retrasados</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Sin control centralizado</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Recargos por impagos</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-red-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-500/20 rounded-lg">
                          <ClipboardList className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Gestión 100% Manual</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Citas gestionadas a mano</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Medidas en papel/Excel</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Pedidos sin trazabilidad</li>
                        <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>Proveedores descontrolados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                  <p className="text-center text-gray-700 text-sm">
                    <span className="text-orange-500 font-semibold">Resultado actual:</span> Pérdida de dinero, tiempo y oportunidades de negocio por falta de una plataforma unificada y automatizada
                  </p>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 4 - NUESTRA VISIÓN ==================== */}
          {(currentSlide === 4 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <StripedTieSilhouette className="absolute right-5 top-24 w-12 h-36 text-orange-500 rotate-[8deg]" opacity={0.12} />
                <BusinessmanSilhouette className="absolute -left-4 bottom-0 w-40 h-72 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Nuestra Visión</h2>
                      <p className="text-orange-400 text-sm italic">Una única plataforma que lo unifica todo</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  {/* Columna 1: Unificación */}
                  <div className="space-y-3">
                    <div className="bg-white border border-orange-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <Layers className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Sistema Unificado</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Boutique + Sastrería + Web</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />3 tiendas sincronizadas</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Datos centralizados</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Un solo panel de control</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-orange-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <Users className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Cliente 360°</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Historial completo</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Medidas guardadas</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Preferencias y notas</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Estado de pagos</li>
                      </ul>
                    </div>
                  </div>

                  {/* Columna 2: Automatización */}
                  <div className="space-y-3">
                    <div className="bg-white border border-orange-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <Zap className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">100% Automatizado</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Pedidos proveedores auto</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Notificaciones automáticas</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Facturación integrada</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Alertas inteligentes</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-orange-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <DollarSign className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Control Financiero</h4>
                      </div>
                      <ul className="space-y-1.5 text-base text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Rentabilidad por prenda</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Márgenes por proveedor</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Impagos detectados</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Vencimientos control</li>
                      </ul>
                    </div>
                  </div>

                  {/* Columna 3: Acceso */}
                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <Monitor className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">Multiplataforma</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { icon: Laptop, label: 'PC Tienda' },
                          { icon: Globe, label: 'Web' },
                          { icon: Tablet, label: 'Tablet' },
                          { icon: Smartphone, label: 'Móvil' },
                        ].map((item, idx) => (
                          <div key={idx} className="p-2 bg-white rounded-lg text-center">
                            <item.icon className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                            <p className="text-base text-gray-700">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-orange-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                          <Store className="w-4 h-4 text-orange-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold text-sm">3 Tiendas</h4>
                      </div>
                      <div className="space-y-1.5">
                        <div className="px-3 py-1.5 bg-orange-500/10 rounded-lg text-center">
                          <p className="text-base text-orange-400 font-medium">Wellington</p>
                        </div>
                        <div className="px-3 py-1.5 bg-orange-500/10 rounded-lg text-center">
                          <p className="text-base text-orange-400 font-medium">Hermanos Pinzón</p>
                        </div>
                        <div className="px-3 py-1.5 bg-orange-500/10 rounded-lg text-center">
                          <p className="text-base text-orange-400 font-medium">Tienda Web</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer con beneficios de automatización — una línea (sin gestión envío transporte) */}
                <div className="mt-3 grid grid-cols-6 gap-3">
                  {[
                    { icon: Zap, text: 'Automatización total de procesos' },
                    { icon: Gauge, text: 'Máxima eficiencia operativa' },
                    { icon: Brain, text: 'Decisiones basadas en datos' },
                    { icon: Clock, text: 'Ahorro de tiempo y recursos' },
                    { icon: TrendingUp, text: 'Crecimiento escalable' },
                    { icon: Tags, text: 'Sistema de etiquetado' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500/15 to-green-600/10 border border-green-500/25 rounded-xl px-4 py-4 text-center min-h-0">
                      <item.icon className="w-6 h-6 text-green-500 mb-2 flex-shrink-0" />
                      <p className="text-sm text-gray-800 leading-tight text-center font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 5 - FLUJO COMPLETO DEL CLIENTE ==================== */}
          {(currentSlide === 5 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <SuitOnHangerSilhouette className="absolute -right-5 bottom-5 w-48 h-60 text-orange-500" opacity={0.1} />
                <TieSilhouette className="absolute left-3 top-20 w-10 h-32 text-orange-500 rotate-[-12deg]" opacity={0.12} />
                {/* Cabecera arriba a la izquierda, mismo formato que el resto de slides */}
                <div className="flex items-center gap-4 mb-5 flex-shrink-0">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Workflow className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Flujo Completo del Cliente</h2>
                      <p className="text-base text-orange-400">Desde que entra hasta que se lleva el traje</p>
                    </div>
                  </div>
                </div>

                {/* Bloque centrado: 6 cards de fases arriba, 5 cards verdes abajo (más separados) */}
                <div className="flex-1 flex flex-col justify-center items-stretch pt-2 pb-6 -translate-y-[6%] mt-4">
                  {/* 6 cards de fases — contenido inferior (beneficio) alineado en todos */}
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    {[
                      { num: '01', name: 'Recepción', icon: Users, color: 'from-orange-500 to-orange-600', flujo: ['Cliente entra', 'Abrir/crear ficha', 'Ver historial', 'Ver pendientes'], beneficio: 'Información completa del cliente al instante', isLast: false },
                      { num: '02', name: 'Medidas', icon: Ruler, color: 'from-orange-500 to-orange-600', flujo: ['Seleccionar prenda', 'Campos automáticos', 'Guardar medidas', 'Artesanal/Industrial'], beneficio: 'Medidas siempre actualizadas y accesibles', isLast: false },
                      { num: '03', name: 'Tejido', icon: Shirt, color: 'from-orange-500 to-orange-600', flujo: ['Consulta stock', 'Reserva automática', 'Pedido automático', 'Email auto proveedor'], beneficio: 'Sin roturas de stock ni pedidos manuales', isLast: false },
                      { num: '04', name: 'Pedido', icon: FileText, color: 'from-orange-500 to-orange-600', flujo: ['Ficha técnica auto', 'Firma en tablet', 'Email confirmación', 'Registro estado'], beneficio: 'Documentación perfecta sin errores', isLast: false },
                      { num: '05', name: 'Producción', icon: Settings, color: 'from-orange-500 to-orange-600', flujo: ['Tejido pedido', 'Tejido recibido', 'En confección', 'Prueba/Ajustes'], beneficio: 'Trazabilidad total de cada pedido', isLast: false },
                      { num: '06', name: 'Entrega', icon: BadgeCheck, color: 'from-green-500 to-green-600', flujo: ['Notificación auto', 'Cobro TPV', 'Factura automática', 'Rentabilidad calc.'], beneficio: 'Cierre perfecto con datos financieros', isLast: true },
                    ].map((phase, idx) => (
                      <div key={idx} className={`w-[15%] min-w-[140px] min-h-[280px] rounded-xl overflow-hidden flex flex-col ${phase.isLast ? 'border border-green-500/30' : 'border border-orange-200'} bg-white`}>
                        {/* Icono, número y nombre de fase */}
                        <div className={`p-3 flex flex-col flex-1 min-h-0 ${phase.isLast ? 'bg-green-500/10' : 'bg-white'}`}>
                          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <phase.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className={`text-xs font-bold block ${phase.isLast ? 'text-green-400' : 'text-orange-400'}`}>{phase.num}</span>
                              <p className="text-base font-semibold text-gray-900 leading-tight">{phase.name}</p>
                            </div>
                          </div>
                          {/* Flujo — zona flexible para que el beneficio quede abajo alineado en todos */}
                          <div className="flex-1 flex flex-col min-h-0">
                            <p className="text-sm text-gray-600 mb-1 font-medium">Flujo:</p>
                            <ul className="space-y-0.5 mb-2">
                              {phase.flujo.map((item, i) => (
                                <li key={i} className="flex items-center gap-1 text-base text-gray-700">
                                  <CheckCircle2 className={`w-3 h-3 flex-shrink-0 ${phase.isLast ? 'text-green-500' : 'text-orange-500'}`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            {/* Beneficio — siempre al final del card, alineado entre todos */}
                            <div className={`mt-auto p-2 rounded-lg ${phase.isLast ? 'bg-green-500/20' : 'bg-orange-500/10'}`}>
                              <p className={`text-base leading-tight ${phase.isLast ? 'text-green-700' : 'text-gray-800'}`}>
                                <Star className="w-3.5 h-3.5 inline mr-1 flex-shrink-0" />
                                {phase.beneficio}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cards de beneficios generales — más separados de los 6 de arriba */}
                  <div className="grid grid-cols-5 gap-3 mt-8">
                    {[
                      { icon: Eye, text: 'Control total de pedidos' },
                      { icon: ShoppingCart, text: 'Sin perder ventas' },
                      { icon: Clock, text: 'Estado de cada pedido' },
                      { icon: Zap, text: 'Todo 100% automático' },
                      { icon: Bell, text: 'Alertas tiempo real' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg px-2 py-2.5 text-center min-h-0">
                        <item.icon className="w-5 h-5 text-green-500 mb-1.5 flex-shrink-0" />
                        <p className="text-[11px] text-gray-700 leading-tight">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 6 - AUTOMATIZACIÓN DE PROVEEDORES ==================== */}
          {(currentSlide === 6 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <ScissorsSilhouette className="absolute -left-2 bottom-8 w-16 h-32 text-orange-500 rotate-[-20deg]" opacity={0.1} />
                <VestSilhouette className="absolute -right-3 top-16 w-36 h-48 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Automatización de Proveedores</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div className="bg-white border border-orange-200 rounded-xl p-5">
                      <h4 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-orange-500" />
                        Base de Datos (200-500 proveedores)
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { icon: Tags, text: 'Clasificación etiquetas' },
                          { icon: FileText, text: 'Condiciones de pago' },
                          { icon: Clock, text: 'Tiempos de entrega' },
                          { icon: BarChart3, text: 'Estado de cuenta' },
                          { icon: Calendar, text: 'Calendario vencimientos' },
                          { icon: TrendingUp, text: 'Análisis rentabilidad' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-orange-100/80 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-base text-gray-700">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-orange-200 rounded-xl p-5">
                      <h4 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-orange-500" />
                        Alertas y Comunicación
                      </h4>
                      <div className="space-y-2">
                        {[
                          { icon: AlertCircle, text: 'Pagos próximos a vencer' },
                          { icon: Clock, text: 'Proveedores con retrasos' },
                          { icon: MessageSquare, text: 'Canal de incidencias' },
                          { icon: FileQuestion, text: 'Consultas rápidas' },
                          { icon: TrendingUp, text: 'Comparativa rentabilidad' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-orange-100/80 rounded-lg">
                            <item.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-base text-gray-700">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-gray-900 font-semibold">Resultado</span>
                      </div>
                      <p className="text-base text-gray-700">Pedidos sin errores, consolidados, con trazabilidad completa y comunicación fluida</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-5">
                      <h4 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-500" />
                        Automatización Total
                      </h4>
                      <div className="space-y-3">
                        {[
                          { icon: Mail, title: 'Pedidos automáticos', desc: 'Email con plantilla por proveedor' },
                          { icon: RotateCcw, title: 'Repetición de pedidos', desc: 'Un clic para pedir lo mismo' },
                          { icon: Boxes, title: 'Consolidación inteligente', desc: 'Varios clientes = 1 pedido' },
                          { icon: PackageCheck, title: 'Consulta stock proveedor', desc: 'Disponibilidad en tiempo real' },
                          { icon: Timer, title: 'Registro de tiempos', desc: 'Análisis de respuesta' },
                          { icon: Tags, title: 'Sistema de etiquetado', desc: 'Automatización de etiquetado' },
                        ].map((item, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-1">
                              <item.icon className="w-4 h-4 text-orange-500" />
                              <span className="text-base text-gray-900 font-medium">{item.title}</span>
                            </div>
                            <p className="text-base text-gray-700 ml-6">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 7 - GESTIÓN DE STOCK ==================== */}
          {(currentSlide === 7 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <TuxedoSilhouette className="absolute -right-6 bottom-10 w-52 h-64 text-orange-500" opacity={0.1} />
                <BowTieSilhouette className="absolute left-4 bottom-20 w-24 h-12 text-orange-500" opacity={0.1} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Warehouse className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Gestión de Stock</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Store className="w-5 h-5 text-orange-500" />
                      <h4 className="text-gray-900 font-semibold">Control 3 Tiendas</h4>
                    </div>
                    <div className="flex gap-1 mb-3">
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">Wellington</span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">H. Pinzón</span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">Web</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: RefreshCw, text: 'Stock sincronizado tiempo real' },
                        { icon: ScanLine, text: 'Código barras (SKU + color)' },
                        { icon: Tags, text: 'Etiquetas en volumen' },
                        { icon: Package, text: '500-1700 referencias' },
                        { icon: ArrowDownUp, text: 'Traspasos entre tiendas' },
                        { icon: Fingerprint, text: 'Trazabilidad movimientos' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Box className="w-5 h-5 text-orange-500" />
                      <h4 className="text-gray-900 font-semibold">Gestión Completa</h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: Shirt, text: 'Prendas terminadas boutique' },
                        { icon: Scissors, text: 'Telas y tejidos por metro' },
                        { icon: Package, text: 'Accesorios y complementos' },
                        { icon: Tags, text: 'Fornituras y botones' },
                        { icon: Box, text: 'Categorías personalizables' },
                        { icon: QrCode, text: 'Códigos únicos automáticos' },
                        { icon: FileSpreadsheet, text: 'Inventarios programados' },
                        { icon: BarChart, text: 'Valoración de stock' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="w-5 h-5 text-orange-500" />
                      <h4 className="text-gray-900 font-semibold">Alertas Inteligentes</h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: Clock, text: 'Producto estancado (+X días)', alert: true },
                        { icon: AlertTriangle, text: 'Stock mínimo alcanzado', alert: true },
                        { icon: TrendingUp, text: 'Más vendidos automático' },
                        { icon: TrendingUp, text: 'Menos vendidos a revisar', alert: true },
                        { icon: BarChart, text: 'Rotación por producto' },
                        { icon: Calendar, text: 'Análisis por temporada' },
                        { icon: Store, text: 'Comparativa entre tiendas' },
                        { icon: Percent, text: 'Margen por producto o proveedor' },
                      ].map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-base ${item.alert ? 'text-orange-600' : 'text-gray-700'}`}>
                          <item.icon className="w-4 h-4 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <p className="text-center text-gray-700 text-base">
                    <span className="text-green-400 font-semibold">Resultado:</span> Control absoluto del inventario en las 3 tiendas, sin productos olvidados, con alertas proactivas
                  </p>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 8 - GESTIÓN DE CAJA Y COBROS ==================== */}
          {(currentSlide === 8 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <StripedTieSilhouette className="absolute right-5 top-24 w-12 h-36 text-orange-500 rotate-[8deg]" opacity={0.12} />
                <BusinessmanSilhouette className="absolute -left-4 bottom-0 w-40 h-72 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Gestión de Caja y Cobros</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">TPV Multiplataforma</h4>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { icon: Laptop, label: 'PC' },
                        { icon: Tablet, label: 'Tablet' },
                        { icon: Smartphone, label: 'Móvil' },
                        { icon: Globe, label: 'Web' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-2 bg-orange-100/80 rounded-lg text-center">
                          <item.icon className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                          <p className="text-base text-gray-700">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { icon: CreditCard, text: 'Efectivo, tarjeta, Bizum' },
                        { icon: Globe, text: 'Tax Free turistas' },
                        { icon: Receipt, text: 'Tickets y facturas auto' },
                        { icon: QrCode, text: 'Escaneo código barras' },
                        { icon: Percent, text: 'Descuentos y promos' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <Banknote className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Control de Cobros</h4>
                    <div className="space-y-1.5">
                      {[
                        { icon: Eye, text: 'Pendientes por cliente' },
                        { icon: Bell, text: 'Alertas impagos automáticas' },
                        { icon: History, text: 'Histórico pagos y señas' },
                        { icon: UserCheck, text: 'Ver deudas al abrir ficha' },
                        { icon: Calendar, text: 'Vencimientos programados' },
                        { icon: DollarSign, text: 'Pagos fraccionados' },
                        { icon: FileText, text: 'Notas en cada cobro' },
                        { icon: ShieldCheck, text: 'Bloqueo por impago' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Integración Facturación</h4>
                    <div className="p-3 bg-white rounded-lg mb-3">
                      <p className="text-base text-gray-700 mb-2 text-center">API programa externo</p>
                      <div className="flex items-center justify-center gap-2 text-base text-orange-400">
                        <Zap className="w-3 h-3" />
                        Sincronización automática
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        'Facturas automáticas',
                        'Numeración correlativa',
                        'Sin doble trabajo',
                        'Datos fiscales auto',
                        'Exportación contable',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-green-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <p className="text-center text-gray-700 text-sm">
                    <span className="text-green-400 font-semibold">Resultado:</span> Cobros controlados desde cualquier dispositivo, impagos detectados automáticamente, facturación sincronizada
                  </p>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 9 - ANALÍTICAS, REPORTING Y USUARIOS ==================== */}
          {(currentSlide === 9 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <SuitOnHangerSilhouette className="absolute -right-5 bottom-5 w-48 h-60 text-orange-500" opacity={0.1} />
                <TieSilhouette className="absolute left-3 top-20 w-10 h-32 text-orange-500 rotate-[-12deg]" opacity={0.12} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <BarChart className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Analíticas, Reporting y Usuarios</h2>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <CircleDollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Rentabilidad</h4>
                    <div className="space-y-2">
                      {[
                        { icon: Shirt, text: 'Margen por prenda detallado' },
                        { icon: Users, text: 'Rentabilidad por cliente' },
                        { icon: Truck, text: 'Rentabilidad por proveedor' },
                        { icon: TrendingUp, text: 'Comparativa proveedores' },
                        { icon: Store, text: 'Rentabilidad por tienda' },
                        { icon: Calendar, text: 'Evolución mensual/anual' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-2 bg-orange-100/80 rounded-lg">
                      <p className="text-base text-gray-700 mb-1">Por tienda</p>
                      <div className="flex gap-1 flex-wrap">
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-sm rounded">Wellington</span>
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-sm rounded">H.Pinzón</span>
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-sm rounded">Web</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <LayoutDashboard className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Informes Segmentados</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-orange-100/80 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3 h-3 text-orange-500" />
                          <p className="text-base text-orange-400 font-medium">Por Fechas</p>
                        </div>
                        <p className="text-base text-gray-700">Día, semana, mes, año, personalizado</p>
                      </div>
                      <div className="p-2 bg-orange-100/80 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-3 h-3 text-orange-500" />
                          <p className="text-base text-orange-400 font-medium">Por Cliente</p>
                        </div>
                        <p className="text-base text-gray-700">Historial, frecuencia, ticket medio</p>
                      </div>
                      <div className="p-2 bg-orange-100/80 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Shirt className="w-3 h-3 text-orange-500" />
                          <p className="text-base text-orange-400 font-medium">Por Producto</p>
                        </div>
                        <p className="text-base text-gray-700">Más/menos vendidos, estancados</p>
                      </div>
                      <div className="p-2 bg-orange-100/80 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="w-3 h-3 text-orange-500" />
                          <p className="text-base text-orange-400 font-medium">Por Proveedor</p>
                        </div>
                        <p className="text-base text-gray-700">Tiempos, costes, incidencias</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <UserCog className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Usuarios y Roles</h4>
                    <div className="space-y-2">
                      {[
                        { level: '1', role: 'Administrador', desc: 'Acceso total, configuración' },
                        { level: '2', role: 'Contabilidad', desc: 'Finanzas e informes' },
                        { level: '3', role: 'Sastre', desc: 'Pedidos y medidas' },
                        { level: '4', role: 'Vendedor', desc: 'TPV y consultas' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                          <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 text-base font-bold">
                            {item.level}
                          </div>
                          <div className="flex-1">
                            <p className="text-base text-gray-900 font-medium">{item.role}</p>
                            <p className="text-base text-gray-700">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1">
                      {[
                        { icon: Lock, text: 'Código acceso individual' },
                        { icon: Fingerprint, text: 'Trazabilidad acciones' },
                        { icon: Shield, text: 'Permisos configurables' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3 h-3 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 10 - TIENDA ONLINE Y MARKETING ==================== */}
          {(currentSlide === 10 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <ScissorsSilhouette className="absolute -left-2 bottom-8 w-16 h-32 text-orange-500 rotate-[-20deg]" opacity={0.1} />
                <VestSilhouette className="absolute -right-3 top-16 w-36 h-48 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Tienda Online y Marketing</h2>
                      <p className="text-base text-orange-400">Estilo Suit Supply</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">E-commerce Premium</h4>
                    <div className="space-y-1.5">
                      {[
                        { icon: Sparkles, text: 'Diseño tipo Suit Supply' },
                        { icon: Shirt, text: 'Producto por tallas' },
                        { icon: Eye, text: 'Ocultar productos' },
                        { icon: ShoppingCart, text: 'Carrito + checkout' },
                        { icon: CreditCard, text: 'Pago: tarjeta + Bizum' },
                        { icon: Globe, text: 'Tax Free integrado' },
                        { icon: Bell, text: 'Lista de interés' },
                        { icon: Workflow, text: 'Estados de pedido' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">SEO y Tecnología</h4>
                    <div className="space-y-1.5">
                      {[
                        { icon: Search, text: 'SEO optimizado Google' },
                        { icon: Bot, text: 'Posicionamiento agentes IA' },
                        { icon: Monitor, text: 'Responsive total' },
                        { icon: Zap, text: 'PWA (tipo app)' },
                        { icon: Globe, text: 'Multiidioma ES + EN' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-orange-500" />
                        <p className="text-base text-orange-400 font-medium">Búsquedas IA</p>
                      </div>
                      <p className="text-base text-gray-700">"sastrería Madrid", "trajes a medida"</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg">
                      <Megaphone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-3 text-center">Marketing (Resend)</h4>
                    <div className="space-y-1.5">
                      {[
                        { icon: FileText, text: 'Plantillas personalizables' },
                        { icon: Bell, text: 'Confirmación pedido auto' },
                        { icon: Calendar, text: 'Listo para prueba' },
                        { icon: Truck, text: 'Listo para recoger' },
                        { icon: Send, text: 'Emails a proveedores' },
                        { icon: Star, text: 'Campañas de mailing' },
                        { icon: Users, text: 'Segmentación clientes' },
                        { icon: Eye, text: 'Tasa de apertura' },
                        { icon: TrendingUp, text: 'Análisis de clics' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-base text-gray-700">
                          <item.icon className="w-3.5 h-3.5 text-orange-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 11 - PLANIFICACIÓN DEL PROYECTO ==================== */}
          {(currentSlide === 11 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <TuxedoSilhouette className="absolute -right-6 bottom-10 w-52 h-64 text-orange-500" opacity={0.1} />
                <BowTieSilhouette className="absolute left-4 bottom-20 w-24 h-12 text-orange-500" opacity={0.1} />
                {/* Cabecera arriba a la izquierda, misma altura que el resto de slides */}
                <div className="flex items-center gap-4 mb-5 flex-shrink-0">
                  <div className="w-1.5 h-14 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Planificación del Proyecto</h2>
                      <p className="text-base text-orange-400">Duración total: ~12 semanas</p>
                    </div>
                  </div>
                </div>

                {/* Bloque centrado: cards + footer, más separado de la cabecera */}
                <div className="flex-1 flex flex-col justify-center items-stretch pt-2 pb-6 -translate-y-[6%] mt-4">
                  {/* Cards: altura según contenido, no estiran hasta abajo */}
                  <div className="grid grid-cols-6 gap-2 w-full">
                    {[
                      { num: '01', name: 'Discovery', title: 'Discovery + Auditoría', icon: Lightbulb, color: 'from-emerald-500 to-emerald-600', weeks: '1-2 sem', items: ['Análisis del negocio actual', 'Requisitos de usuarios', 'Definición de procesos', 'Stack tecnológico', 'Roadmap con Quick Wins', 'Product Brief'] },
                      { num: '02', name: 'Diseño', title: 'Diseño + Arquitectura', icon: PenTool, color: 'from-cyan-500 to-cyan-600', weeks: '2-3 sem', items: ['Wireframes navegables', 'Prototipos interactivos', 'Design System completo', 'Arquitectura de datos', 'Flujo de información', 'Validación con cliente'] },
                      { num: '03', name: 'Desarrollo', title: 'Desarrollo + IA', icon: Code, color: 'from-orange-500 to-orange-600', weeks: '4-6 sem', items: ['Sprints de 2 semanas', 'MVP funcional iterativo', 'Integraciones APIs', 'Backend + Frontend', 'Automatizaciones', 'Entregas continuas'] },
                      { num: '04', name: 'Testing', title: 'Testing + QA', icon: Bug, color: 'from-violet-500 to-violet-600', weeks: '1-2 sem', items: ['Tests funcionales', 'Pruebas de rendimiento', 'Auditoría seguridad', 'Optimización UX', 'Corrección de bugs', 'Validación final'] },
                      { num: '05', name: 'Lanzamiento', title: 'Lanzamiento', icon: Upload, color: 'from-rose-500 to-rose-600', weeks: '1 sem', items: ['Deploy en producción', 'Configuración servidores', 'Monitorización 24/7', 'Documentación técnica', 'Formación equipo', 'Soporte intensivo'] },
                      { num: '06', name: 'Evolución', title: 'Evolución Continua', icon: Repeat, color: 'from-gray-500 to-gray-600', weeks: 'Ongoing', items: ['Analytics y métricas', 'Mejoras basadas en datos', 'Nuevas funcionalidades', 'Optimización continua', 'Soporte y manten.', 'Escalado según necesidad'] },
                    ].map((phase, idx) => (
                      <div key={idx} className="rounded-xl p-3.5 bg-white border border-orange-200">
                        {/* Icono, número y nombre de fase dentro del card */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <phase.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-orange-400 block">{phase.num}</span>
                            <p className="text-base font-semibold text-gray-900 leading-tight">{phase.name}</p>
                            <p className="text-[10px] text-gray-600">{phase.weeks}</p>
                          </div>
                        </div>
                        <h5 className="text-[11px] font-semibold text-gray-700 mb-2 border-t border-orange-200 pt-2">{phase.title}</h5>
                        <ul className="space-y-1.5">
                          {phase.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-base text-gray-700">
                              <CheckCircle2 className="w-2.5 h-2.5 text-orange-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-3 p-3 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl border border-orange-500/30">
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-900 font-semibold">Plazo de entrega aproximado:</span>
                      <span className="text-2xl font-bold text-orange-500">12 semanas</span>
                    </div>
                    <div className="h-6 w-px bg-orange-200"></div>
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Entregas cada 2 semanas</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 12 - INVERSIÓN DEL PROYECTO ==================== */}
          {(currentSlide === 12 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col relative z-10 min-h-0">
                <LogoFastIA logoUrl={logoUrl} />
                {/* Siluetas sastrería — limpias y elegantes */}
                <StripedTieSilhouette className="absolute right-5 top-24 w-12 h-36 text-orange-500 rotate-[8deg]" opacity={0.12} />
                <BusinessmanSilhouette className="absolute -left-4 bottom-0 w-40 h-72 text-orange-600" opacity={0.08} />
                
                <div className="flex items-center gap-3 mb-2 flex-shrink-0">
                  <div className="w-1.5 h-10 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Euro className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Inversión del Proyecto</h2>
                  </div>
                </div>

                {/* 3 Módulos */}
                <div className="grid grid-cols-3 gap-3 mb-2 flex-1 min-h-0">
                  {/* PLATAFORMA 360 */}
                  <div className="bg-white border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Plataforma 360</h4>
                        <p className="text-sm text-gray-600">Core del sistema</p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3 text-sm text-gray-700">
                      {[
                        'Gestión usuarios y roles',
                        'Ficha cliente 360°',
                        'Flujo pedidos sastrería',
                        'Stock 3 tiendas',
                        'Gestión proveedores',
                        'TPV y caja',
                        'Alertas automáticas',
                        'Reporting y analíticas',
                        'API facturación',
                        'Multiplataforma',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-orange-200 flex-shrink-0">
                      <div className="text-center mb-1">
                        <span className="text-sm text-gray-600 block">Precio sin descuento</span>
                        <span className="text-lg text-red-400 line-through font-bold">15.000 €</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-base font-bold rounded-full">-51% DTO</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-500 text-center">7.368 €</div>
                      <div className="text-sm text-gray-600 text-center">IVA no incluido</div>
                    </div>
                  </div>

                  {/* TIENDA ONLINE (Web) */}
                  <div className="bg-white border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Tienda Online (Web)</h4>
                        <p className="text-sm text-gray-600">E-commerce premium (Web)</p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3 text-sm text-gray-700">
                      {[
                        'Diseño Suit Supply',
                        'Catálogo productos',
                        'Carrito y checkout',
                        'Pago: tarjeta + Bizum',
                        'SEO Google',
                        'Posicionamiento IA',
                        'Lista de interés',
                        'PWA (tipo app)',
                        'Multiidioma (ES+EN)',
                        'Tax Free integrado',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-orange-200 flex-shrink-0">
                      <div className="text-center mb-1">
                        <span className="text-sm text-gray-600 block">Precio sin descuento</span>
                        <span className="text-lg text-red-400 line-through font-bold">1.500 €</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-base font-bold rounded-full">-51% DTO</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-500 text-center">737 €</div>
                      <div className="text-sm text-gray-600 text-center">IVA no incluido</div>
                    </div>
                  </div>

                  {/* INTEGRACIONES Y MARKETING */}
                  <div className="bg-white border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Integraciones y Marketing</h4>
                        <p className="text-sm text-gray-600">Comunicación e integraciones</p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3 text-sm text-gray-700">
                      {[
                        'Sistema emails (Resend)',
                        'Plantillas personalizables',
                        'Notificaciones auto',
                        'Emails a clientes',
                        'Emails a proveedores',
                        'Seguimiento métricas',
                        'Tasa de apertura',
                        'Análisis de clics',
                        'Campañas mailing',
                        'Segmentación',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-orange-200 flex-shrink-0">
                      <div className="text-center mb-1">
                        <span className="text-sm text-gray-600 block">Precio sin descuento</span>
                        <span className="text-lg text-red-400 line-through font-bold">600 €</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-base font-bold rounded-full">-51% DTO</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-500 text-center">295 €</div>
                      <div className="text-sm text-gray-600 text-center">IVA no incluido</div>
                    </div>
                  </div>
                </div>

                {/* TOTAL + Forma de pago — compactos */}
                <div className="flex-shrink-0 space-y-2">
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-2 border-orange-500/50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-gray-900">INVERSIÓN TOTAL</h4>
                          <p className="text-base text-gray-700">Plataforma 360 + Tienda + Integraciones y Marketing</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-0.5 justify-end">
                          <span className="text-[10px] text-gray-600">Precio sin descuento</span>
                          <span className="text-lg text-red-400 line-through font-bold">17.100 €</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-base font-bold rounded-full">-51% DTO</span>
                        </div>
                        <div className="text-3xl font-bold text-orange-500">8.400 €</div>
                        <div className="text-base text-gray-700">IVA no incluido</div>
                      </div>
                    </div>
                  </div>

                  {/* Forma de pago */}
                  <div className="p-2 bg-white rounded-xl border border-orange-200">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-900 font-semibold text-sm">Forma de pago:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/30">
                          <span className="text-orange-400 font-bold text-sm">60%</span>
                          <span className="text-gray-700 ml-1.5 text-sm">a la formalización</span>
                        </div>
                        <span className="text-gray-600 text-sm">+</span>
                        <div className="px-3 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/30">
                          <span className="text-orange-400 font-bold text-sm">40%</span>
                          <span className="text-gray-700 ml-1.5 text-sm">a la entrega</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* ==================== SLIDE 13 - CONTACTO ==================== */}
          {(currentSlide === 13 || isPrintMode) && (
          <SlideWrapper isPrintMode={isPrintMode}>
              <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"></div>
                {/* Siluetas sastrería — limpias y elegantes */}
                <SuitOnHangerSilhouette className="absolute -right-5 bottom-5 w-48 h-60 text-orange-500" opacity={0.1} />
                <TieSilhouette className="absolute left-3 top-20 w-10 h-32 text-orange-500 rotate-[-12deg]" opacity={0.12} />
                
                {/* Logo FastIA — solo el logo, sin caja */}
                <div className="mb-10 flex items-center justify-center">
                  {logoUrl ? (
                    <div className="relative w-52 h-20" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(1deg) brightness(98%) contrast(101%)' }}>
                      <Image
                        src={logoUrl}
                        alt="FastIA"
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="208px"
                      />
                    </div>
                  ) : null}
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  ¿Empezamos?
                </h2>
                
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-10"></div>
                
                {/* Contacto */}
                <div className="flex items-center gap-12 mb-10">
                  <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-orange-500/20">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-base text-gray-700">Teléfono</p>
                      <p className="text-2xl text-gray-900 font-bold">+34 656 396 657</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-orange-500/20">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-base text-gray-700">Email</p>
                      <p className="text-2xl text-gray-900 font-bold">hola@fastia.es</p>
                    </div>
                  </div>
                </div>

                {/* Página web */}
                <div className="flex items-center justify-center gap-2 text-orange-400">
                  <Globe className="w-5 h-5" />
                  <a href="https://www.fastia.es" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold hover:text-orange-300 transition-colors">
                    www.fastia.es
                  </a>
                </div>
              </div>
          </SlideWrapper>
          )}

          {/* FIN DE LAS SLIDES */}
        </div>
      </div>
    </div>
    </>
  )
}