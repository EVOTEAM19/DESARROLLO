'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

export function LinkedInInsight() {
  const pathname = usePathname()

  useEffect(() => {
    if (!LINKEDIN_PARTNER_ID) return

    // Cargar LinkedIn Insight Tag
    if (typeof window !== 'undefined' && !(window as any)._linkedin_partner_id) {
      ;(window as any)._linkedin_partner_id = LINKEDIN_PARTNER_ID
      const script = document.createElement('script')
      script.innerHTML = `
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(${LINKEDIN_PARTNER_ID});
      `
      document.head.appendChild(script)

      const script2 = document.createElement('script')
      script2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
      script2.async = true
      document.head.appendChild(script2)
    }

    // Track page views (LinkedIn usa identificador de conversión)
    // La página se trackea automáticamente cuando se carga el script
    if ((window as any).lintrk) {
      ;(window as any).lintrk('page')
    }
  }, [pathname])

  if (!LINKEDIN_PARTNER_ID) {
    return null
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
      />
    </noscript>
  )
}
