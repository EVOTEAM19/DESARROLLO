/**
 * GET /api/contact/resend-status
 * Diagnóstico: comprueba si Resend está configurado (para depurar por qué no llegan los emails).
 * No expone la API key. Útil en desarrollo o para comprobar en producción.
 */

import { NextResponse } from 'next/server'

const CONTACT_EMAIL = 'hola@fastia.es'

export async function GET() {
  const rawKey = process.env.RESEND_API_KEY?.trim() || ''
  const hasKey = rawKey.length >= 20
  const from = (process.env.RESEND_FROM_EMAIL || 'FastIA <noreply@fastia.es>').trim()

  // Extraer dominio del from (ej: "FastIA <noreply@fastia.es>" → fastia.es)
  let fromDomain = ''
  const match = from.match(/@([a-zA-Z0-9.-]+)/)
  if (match) fromDomain = match[1]

  let hint = ''
  if (!hasKey) {
    hint = 'Añade RESEND_API_KEY en .env.local (local) o en variables de entorno del hosting (Vercel, etc.). Obtén la key en https://resend.com/api-keys'
  } else if (from.includes('onboarding@resend.dev')) {
    hint = 'RESEND_FROM_EMAIL usa onboarding@resend.dev: Resend SOLO envía al email de tu cuenta Resend, NO a hola@fastia.es. Verifica fastia.es en https://resend.com/domains y usa RESEND_FROM_EMAIL=FastIA <noreply@fastia.es>'
  } else if (fromDomain && !fromDomain.includes('resend.dev')) {
    hint = 'Si el dominio ' + fromDomain + ' está verificado en Resend, los correos deberían llegar a ' + CONTACT_EMAIL + '. Si no: Resend → Domains → Añadir y configurar SPF/DKIM.'
  } else {
    hint = 'Usa RESEND_FROM_EMAIL con un @fastia.es (ej: FastIA <noreply@fastia.es>) y verifica fastia.es en https://resend.com/domains'
  }

  return NextResponse.json({
    configured: hasKey,
    from,
    fromDomain: fromDomain || '(no detectado)',
    to: CONTACT_EMAIL,
    hint,
  })
}
