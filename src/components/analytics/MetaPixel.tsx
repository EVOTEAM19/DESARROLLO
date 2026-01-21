'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || ''

// Validar que el ID sea numérico (formato típico de Meta Pixel)
const isValidPixelId = /^\d+$/.test(META_PIXEL_ID)

export function MetaPixel() {
  const pathname = usePathname()
  const initializedRef = useRef(false)
  const scriptLoadedRef = useRef(false)

  // Inicialización única del pixel
  useEffect(() => {
    if (!META_PIXEL_ID || !isValidPixelId || typeof window === 'undefined') return
    if (initializedRef.current) return

    // Verificar si ya existe fbq (puede haber sido cargado por GTM u otro script)
    if ((window as any).fbq && typeof (window as any).fbq === 'function') {
      initializedRef.current = true
      scriptLoadedRef.current = true
      // Si ya existe, solo trackear PageView inicial
      try {
        ;(window as any).fbq('track', 'PageView')
      } catch (err) {
        console.warn('[MetaPixel] Error tracking pageview:', err)
      }
      return
    }

    // Verificar si el script ya está cargado
    const existingScript = document.querySelector('script[src*="fbevents.js"]')
    if (existingScript) {
      scriptLoadedRef.current = true
      // Esperar a que el script existente cargue
      const checkInterval = setInterval(() => {
        if ((window as any).fbq && typeof (window as any).fbq === 'function') {
          try {
            ;(window as any).fbq('init', META_PIXEL_ID)
            ;(window as any).fbq('track', 'PageView')
            initializedRef.current = true
          } catch (err) {
            console.warn('[MetaPixel] Error inicializando pixel:', err)
          }
          clearInterval(checkInterval)
        }
      }, 100)
      
      // Timeout después de 5 segundos
      setTimeout(() => clearInterval(checkInterval), 5000)
      return
    }

    // Inicializar fbq queue
    ;(window as any)._fbq = (window as any)._fbq || []
    ;(window as any).fbq = function(...args: any[]) {
      ;(window as any)._fbq.push(args)
    }
    ;(window as any).fbq.loaded = true
    ;(window as any).fbq.version = '2.0'

    // Crear y cargar el script de forma segura
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    
    // Insertar el script de forma segura
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      // Fallback: insertar en head si no hay scripts
      document.head.appendChild(script)
    }

    // Inicializar Meta Pixel después de cargar el script
    script.onload = () => {
      scriptLoadedRef.current = true
      try {
        ;(window as any).fbq('init', META_PIXEL_ID)
        ;(window as any).fbq('track', 'PageView')
        initializedRef.current = true
      } catch (err) {
        console.error('[MetaPixel] Error inicializando pixel:', err)
      }
    }

    script.onerror = () => {
      console.error('[MetaPixel] Error cargando fbevents.js')
    }
  }, []) // Solo ejecutar una vez al montar

  // Trackear cambios de página
  useEffect(() => {
    if (!META_PIXEL_ID || !isValidPixelId || typeof window === 'undefined') return
    if (!initializedRef.current || !scriptLoadedRef.current) return

    // Solo trackear cambio de página si ya está inicializado
    if ((window as any).fbq && typeof (window as any).fbq === 'function') {
      try {
        ;(window as any).fbq('track', 'PageView')
      } catch (err) {
        console.warn('[MetaPixel] Error tracking pageview:', err)
      }
    }
  }, [pathname])

  if (!META_PIXEL_ID || !isValidPixelId) {
    return null
  }

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
