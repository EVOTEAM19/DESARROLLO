'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import Image from 'next/image'

interface Client {
  id: string
  name: string
  logo_url: string
  website?: string
  industry?: string
}

// Componente para manejar errores de imágenes
function ClientLogoImage({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
    setImgError(false)
    
    // Detectar URLs problemáticas que sabemos que fallan (como via.placeholder.com con errores 502)
    // Si la URL contiene via.placeholder.com, marcarla como error inmediatamente
    if (src && src.includes('via.placeholder.com')) {
      // Verificar si es una URL de placeholder que sabemos que falla
      // En este caso, mejor mostrar el nombre de la empresa directamente
      setImgError(true)
    }
  }, [src])

  // Si la imagen falla o no hay src, mostrar placeholder con el nombre
  if (imgError || !imgSrc) {
    return (
      <div className="w-full h-16 flex items-center justify-center">
        <div className="text-gray-600 text-xs font-medium text-center px-2">
          {alt}
        </div>
      </div>
    )
  }

  // Desactivar optimización para URLs problemáticas o rutas locales
  const shouldUnoptimize = imgSrc.startsWith('/') || 
                           imgSrc.includes('via.placeholder.com') ||
                           imgSrc.includes('placeholder.com')

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
      onError={() => {
        // Una vez que hay un error, no intentar cargar de nuevo
        setImgError(true)
      }}
      unoptimized={shouldUnoptimize}
    />
  )
}

export function ClientLogos() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [sectionEnabled, setSectionEnabled] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      try {
        const supabase = createBrowserClient()
        
        // Primero verificar si la sección está habilitada
        const { data: setting, error: settingError } = await supabase
          .from('site_settings')
          .select('value')
          .eq('section', 'general')
          .eq('key', 'clients_section_enabled')
          .single()
        
        let enabled = true // Por defecto está habilitada
        if (!settingError && setting) {
          // El valor puede estar como string JSON o como boolean
          try {
            enabled = typeof setting.value === 'string' 
              ? JSON.parse(setting.value) 
              : setting.value ?? true
          } catch {
            enabled = setting.value ?? true
          }
        }
        
        setSectionEnabled(enabled)
        
        // Si la sección está deshabilitada, no cargar clientes
        if (!enabled) {
          setClients([])
          setLoading(false)
          return
        }
        
        // Cargar clientes solo si la sección está habilitada
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('published', true)
          .order('order_index', { ascending: true })
        
        if (error) {
          // Si la tabla no existe, simplemente no mostrar nada
          if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('No such table')) {
            console.warn('Tabla clients no existe. Ejecuta add_clients_table.sql en Supabase.')
            setClients([])
          } else {
            console.error('Error fetching clients:', error)
          }
        } else if (data) {
          setClients(data)
        }
      } catch (err) {
        console.error('Error fetching clients:', err)
        setClients([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchClients()
  }, [])

  // Si la sección está deshabilitada, no renderizar nada
  if (!sectionEnabled) {
    return null
  }

  if (loading) {
    return (
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800 rounded w-64 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-800 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (clients.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Empresas que confían en nosotros
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            6 años transformando ideas en productos digitales que triunfan para empresas líderes.
          </p>
        </motion.div>

        {/* Grid de logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <a
                href={client.website || '#'}
                target={client.website ? '_blank' : undefined}
                rel={client.website ? 'noopener noreferrer' : undefined}
                className="block p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-accent-orange-500 transition-all h-full flex items-center justify-center"
              >
                <div className="relative w-full h-16">
                  <ClientLogoImage src={client.logo_url} alt={client.name} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            ¿Quieres ser el próximo?
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            Hablemos de tu proyecto →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
