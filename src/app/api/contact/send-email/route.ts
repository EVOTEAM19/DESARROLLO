/**
 * API Route para enviar correo cuando se recibe un mensaje de contacto
 * Esta función se puede llamar desde el cliente o configurarse como webhook en Supabase
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sendTelegramMessage } from '@/lib/concierge/notify'

// Email de destino para todos los correos
const CONTACT_EMAIL = 'hola@fastia.es'

/** Aviso instantáneo a Telegram del lead recibido por el formulario de contacto. */
function buildContactTelegramText(m: {
  name: string
  email: string
  phone?: string
  company?: string
  project_type?: string
  start_timeframe?: string
  message: string
}): string {
  let t = 'NUEVO LEAD (formulario de contacto)\n'
  t += `Nombre: ${m.name}\n`
  t += `Email: ${m.email}\n`
  if (m.phone) t += `Telefono: ${m.phone}\n`
  if (m.company) t += `Empresa: ${m.company}\n`
  if (m.project_type) t += `Tipo: ${m.project_type}\n`
  if (m.start_timeframe) t += `Inicio: ${m.start_timeframe}\n`
  t += `\nMensaje: ${m.message}`
  return t
}

function getResendStatus() {
  const rawKey = process.env.RESEND_API_KEY?.trim() || ''
  const hasKey = rawKey.length >= 20
  const from = (process.env.RESEND_FROM_EMAIL || 'FastIA <noreply@fastia.es>').trim()
  const match = from.match(/@([a-zA-Z0-9.-]+)/)
  const fromDomain = match ? match[1] : ''
  let hint = ''
  if (!hasKey) {
    hint = 'Añade RESEND_API_KEY en .env.local o en las variables de entorno del hosting. https://resend.com/api-keys'
  } else if (from.includes('onboarding@resend.dev')) {
    hint = 'RESEND_FROM_EMAIL usa onboarding@resend.dev: Resend SOLO envía al email de tu cuenta Resend, NO a hola@fastia.es. Verifica fastia.es en https://resend.com/domains y usa RESEND_FROM_EMAIL=FastIA <noreply@fastia.es>'
  } else if (fromDomain && !fromDomain.includes('resend.dev')) {
    hint = 'Si ' + fromDomain + ' está verificado en Resend, los correos deberían llegar. Si no: Resend → Domains → SPF/DKIM.'
  } else {
    hint = 'Usa RESEND_FROM_EMAIL=FastIA <noreply@fastia.es> y verifica fastia.es en https://resend.com/domains'
  }
  return { configured: hasKey, from, fromDomain: fromDomain || '(no detectado)', to: CONTACT_EMAIL, hint }
}

/**
 * Obtiene una instancia de Resend (lazy initialization)
 * Solo se crea cuando se necesita y si hay API key configurada
 */
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey.length < 20) {
    return null
  }
  return new Resend(apiKey)
}

interface ContactMessage {
  name: string
  email: string
  phone?: string
  company?: string
  project_type?: string
  message: string
  start_timeframe?: string
  attachments?: { filename: string; content: string }[]
}

/**
 * Genera el HTML del email con formato profesional
 */
function generateEmailHTML(message: ContactMessage): string {
  const formatField = (label: string, value: string | null | undefined): string => {
    if (!value) return ''
    return `
      <tr>
        <td style="padding: 8px 0; font-weight: 600; color: #1f2937; width: 150px;">${label}:</td>
        <td style="padding: 8px 0; color: #374151;">${escapeHtml(value)}</td>
      </tr>
    `
  }

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo mensaje de contacto</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #0062c4 0%, #0a84ff 100%); padding: 30px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Nuevo Mensaje de Contacto</h1>
                  <p style="margin: 8px 0 0 0; color: #fed7aa; font-size: 14px;">FastIA - Formulario de Contacto</p>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 30px 20px;">
                  <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.5;">
                    Has recibido un nuevo mensaje a través del formulario de contacto de tu sitio web.
                  </p>
                  
                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                    ${formatField('Nombre', message.name)}
                    ${formatField('Email', message.email)}
                    ${formatField('Teléfono', message.phone)}
                    ${formatField('Empresa', message.company)}
                    ${formatField('Tipo de proyecto', message.project_type)}
                    ${formatField('Tiempo de inicio', message.start_timeframe)}
                  </table>
                  
                  <div style="margin: 20px 0; padding: 20px; background-color: #f9fafb; border-left: 4px solid #ea580c; border-radius: 4px;">
                    <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px; font-weight: 600;">Mensaje:</h3>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message.message)}</p>
                  </div>
                  
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                      Puedes responder directamente a este correo. Se enviará a: <a href="mailto:${message.email}" style="color: #ea580c; text-decoration: none; font-weight: 500;">${escapeHtml(message.email)}</a>
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #1f2937; padding: 20px; text-align: center;">
                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    © ${new Date().getFullYear()} FastIA - POSPON SL | Calle Columela, 9, 28001 Madrid
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/** GET /api/contact/send-email → mismo diagnóstico que /api/contact/resend-status (por si resend-status da 404 en producción) */
export async function GET() {
  return NextResponse.json(getResendStatus())
}

export async function POST(request: NextRequest) {
  try {
    const message: ContactMessage = await request.json()

    // Validar datos básicos
    if (!message.name || !message.email || !message.message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    // Aviso instantáneo a Telegram (además del email). No bloquea si falla.
    await sendTelegramMessage(buildContactTelegramText(message))

    // Verificar si Resend está configurado
    const resend = getResendClient()
    
    if (!resend) {
      console.warn('⚠️ RESEND_API_KEY no configurada. Los correos no se enviarán.')
      console.log('📧 Nuevo mensaje de contacto recibido (no enviado por email):')
      console.log({
        to: CONTACT_EMAIL,
        from: message.email,
        subject: `Nuevo mensaje de contacto de ${message.name}`,
        name: message.name,
        email: message.email,
        phone: message.phone,
        company: message.company,
        project_type: message.project_type,
        start_timeframe: message.start_timeframe,
        message: message.message,
      })

      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Mensaje registrado correctamente (email no enviado - RESEND_API_KEY no configurada)',
        warning: 'Añade RESEND_API_KEY en .env.local o en las variables de entorno de tu hosting.',
      })
    }

    // Enviar correo usando Resend
    // IMPORTANTE: Para que llegue a hola@fastia.es debes tener el dominio fastia.es
    // verificado en Resend y usar RESEND_FROM_EMAIL con @fastia.es (ej: FastIA <noreply@fastia.es>).
    // onboarding@resend.dev solo envía al email de tu cuenta Resend, no a hola@fastia.es (403).
    const fromEmail = (process.env.RESEND_FROM_EMAIL || 'FastIA <noreply@fastia.es>').trim()
    if (fromEmail.includes('onboarding@resend.dev')) {
      console.warn('⚠️ RESEND_FROM_EMAIL=...@resend.dev: Resend solo envía al email de tu cuenta, NO a hola@fastia.es. Verifica fastia.es en Resend y usa noreply@fastia.es')
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Resend: intentando envío → to:', CONTACT_EMAIL, '| from:', fromEmail)
    }

    try {
      // to puede ser string o string[]; usamos string según la doc
      const attachments = (message.attachments || [])
        .filter((a) => a && a.filename && a.content)
        .slice(0, 6)
        .map((a) => ({ filename: a.filename, content: a.content }))

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: CONTACT_EMAIL,
        replyTo: message.email,
        subject: `Nuevo mensaje de contacto de ${message.name}${message.company ? ` - ${message.company}` : ''}`,
        html: generateEmailHTML(message),
        ...(attachments.length ? { attachments } : {}),
      })

      if (error) {
        console.error('Error Resend:', error)
        throw typeof error === 'object' ? new Error((error as any)?.message || JSON.stringify(error)) : error
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Resend: correo enviado a', CONTACT_EMAIL, '| id:', data?.id)
      }

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: 'Correo enviado correctamente a hola@fastia.es',
        emailId: data?.id,
      })
    } catch (emailError: any) {
      const errMsg = emailError?.message || String(emailError)
      console.error('Error enviando correo con Resend:', errMsg)
      // Ayuda específica para 403 / dominio no verificado
      if (/403|domain|resend\.dev|recipient|verif|unauthorized/i.test(errMsg)) {
        console.error('💡 Resend: 1) https://resend.com/domains → añade y verifica fastia.es (SPF/DKIM) 2) RESEND_FROM_EMAIL=FastIA <noreply@fastia.es> 3) onboarding@resend.dev NO envía a hola@fastia.es')
      }
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Mensaje registrado correctamente (error al enviar email)',
        warning: errMsg,
      })
    }
  } catch (error: any) {
    console.error('Error en send-email route:', error)
    return NextResponse.json(
      { error: error.message || 'Error procesando solicitud' },
      { status: 500 }
    )
  }
}
