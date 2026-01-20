'use client'

import { useEffect } from 'react'

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

export function MicrosoftClarity() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return

    // Cargar Microsoft Clarity
    if (typeof window !== 'undefined' && !(window as any).clarity) {
      ;(function(c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) }
        t = l.createElement(r)
        t.async = 1
        t.src = 'https://www.clarity.ms/tag/' + i
        y = l.getElementsByTagName(r)[0]
        y.parentNode?.insertBefore(t, y)
      })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID)
    }
  }, [])

  if (!CLARITY_PROJECT_ID) {
    return null
  }

  return null
}
