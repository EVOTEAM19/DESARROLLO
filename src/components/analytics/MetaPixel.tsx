'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function MetaPixel() {
  const pathname = usePathname()

  useEffect(() => {
    if (!META_PIXEL_ID) return

    // Cargar Meta Pixel (Facebook Pixel)
    if (typeof window !== 'undefined' && !(window as any).fbq) {
      ;(window as any).fbq = function(...args: any[]) {
        ;((window as any)._fbq = (window as any)._fbq || []).push(args)
      }
      ;(window as any).fbq.loaded = true
      ;(window as any).fbq.version = '2.0'
      const n = document.createElement('script')
      n.async = true
      n.src = 'https://connect.facebook.net/en_US/fbevents.js'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode?.insertBefore(n, s)

      // Inicializar Meta Pixel
      ;(window as any).fbq('init', META_PIXEL_ID)
      ;(window as any).fbq('track', 'PageView')
    }

    // Track page views en cambio de ruta
    if ((window as any).fbq) {
      ;(window as any).fbq('track', 'PageView')
      ;(window as any).fbq('trackCustom', 'PageView', {
        page_path: pathname,
      })
    }
  }, [pathname])

  if (!META_PIXEL_ID) {
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
