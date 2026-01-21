'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const RAW_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID?.trim() || ''

// Solo activar si hay un ID que parezca real (numérico). Evita placeholders como "tu_partner_id"
// que generarían "ReferenceError: tu_partner_id is not defined" al insertarlos sin comillas en el script.
const LINKEDIN_PARTNER_ID = /^\d+$/.test(RAW_ID) ? RAW_ID : null

export function LinkedInInsight() {
  const pathname = usePathname()

  useEffect(() => {
    if (!LINKEDIN_PARTNER_ID || typeof window === 'undefined') return

    // Cargar LinkedIn Insight Tag
    if (!(window as any)._linkedin_partner_id) {
      ;(window as any)._linkedin_partner_id = LINKEDIN_PARTNER_ID
      const script = document.createElement('script')
      // JSON.stringify evita que placeholders (ej. "tu_partner_id") se inserten como identificador
      // y causen "X is not defined". Con ID válido produce push("123456") o push(123456).
      script.innerHTML = `window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(${JSON.stringify(LINKEDIN_PARTNER_ID)});`
      document.head.appendChild(script)

      const script2 = document.createElement('script')
      script2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
      script2.async = true
      document.head.appendChild(script2)
    }

    if ((window as any).lintrk) {
      ;(window as any).lintrk('page')
    }
  }, [pathname])

  if (!LINKEDIN_PARTNER_ID) return null

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
