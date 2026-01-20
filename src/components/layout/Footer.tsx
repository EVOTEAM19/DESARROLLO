'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react'
import { getLogoUrl } from '@/lib/logo'
import { getContactoContent } from '@/lib/content'

const locations = [
  { city: 'Madrid', label: 'Sede Central', address: 'Calle Columela, 9 28001 Madrid' },
  { city: 'Barcelona', label: 'Barcelona', address: null },
  { city: 'Sevilla', label: 'Sevilla', address: null }
]

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [phone, setPhone] = useState<string>('+34 910 123 456')

  useEffect(() => {
    loadLogo()
    loadContactInfo()
  }, [])

  const loadLogo = async () => {
    const url = await getLogoUrl()
    setLogoUrl(url)
  }

  const loadContactInfo = async () => {
    try {
      const contactoContent = await getContactoContent()
      if (contactoContent?.contact_info?.phone) {
        setPhone(contactoContent.contact_info.phone)
      }
    } catch (error) {
      console.error('Error cargando información de contacto:', error)
    }
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              {logoUrl ? (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={logoUrl}
                    alt="FastIA Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl">
                  F
                </div>
              )}
              <span className="text-2xl font-bold text-white">FastIA</span>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              6 años transformando ideas en productos digitales que triunfan. 
              Desarrollo de software con IA integrada desde el primer día.
            </p>
            
            {/* Locations */}
            <div className="space-y-3 text-sm mb-6">
              {locations.map((location, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">{location.label}</strong>
                    {location.address && <span>: {location.address}</span>}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-orange-500 transition-colors">
                  {phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:hola@fastia.es" className="hover:text-orange-500 transition-colors">
                  hola@fastia.es
                </a>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a href="https://linkedin.com/company/fastia" target="_blank" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="https://twitter.com/fastia" target="_blank" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-colors">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="https://github.com/fastia" target="_blank" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-lg transition-colors">
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Servicios Freelance */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios Freelance</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/freelance" className="text-gray-400 hover:text-orange-500 transition-colors">Developers Freelance</Link></li>
              <li><Link href="/cto-as-a-service" className="text-gray-400 hover:text-orange-500 transition-colors">CTO as a Service</Link></li>
              <li><Link href="/servicios/desarrollo-apps-moviles" className="text-gray-400 hover:text-orange-500 transition-colors">Desarrollo App Móvil</Link></li>
              <li><Link href="/servicios/plataformas-web-ia" className="text-gray-400 hover:text-orange-500 transition-colors">Desarrollo Web</Link></li>
              <li><Link href="/freelance#precios" className="text-gray-400 hover:text-orange-500 transition-colors">MVP Rápido</Link></li>
            </ul>
          </div>

          {/* The Modal */}
          <div>
            <h3 className="text-white font-semibold mb-4">The Modal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/servicios/ia-conversacional" className="text-gray-400 hover:text-orange-500 transition-colors">IA Conversacional</Link></li>
              <li><Link href="/servicios/analisis-predictivo" className="text-gray-400 hover:text-orange-500 transition-colors">Análisis Predictivo</Link></li>
              <li><Link href="/servicios/procesamiento-datos" className="text-gray-400 hover:text-orange-500 transition-colors">Procesamiento de Datos</Link></li>
              <li><Link href="/servicios/automatizacion-inteligente" className="text-gray-400 hover:text-orange-500 transition-colors">Automatización Inteligente</Link></li>
              <li><Link href="/servicios/seguridad-ia" className="text-gray-400 hover:text-orange-500 transition-colors">Seguridad con IA</Link></li>
            </ul>
          </div>
          
          {/* Empresa */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/nosotros" className="text-gray-400 hover:text-orange-500 transition-colors">Nosotros</Link></li>
              <li><Link href="/sectores" className="text-gray-400 hover:text-orange-500 transition-colors">Sectores</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-orange-500 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          
          {/* Recursos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/reflexiones" className="text-gray-400 hover:text-orange-500 transition-colors">Reflexiones</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-orange-500 transition-colors">Aviso Legal</Link></li>
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-orange-500 transition-colors">Privacidad</Link></li>
              <li><Link href="/legal/cookies" className="text-gray-400 hover:text-orange-500 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            © 2025 FastIA. Todos los derechos reservados. Madrid · Barcelona · Sevilla
          </p>
        </div>
      </div>
    </footer>
  )
}
