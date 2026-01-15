/**
 * API Route para enviar correo cuando se recibe un mensaje de contacto
 * Esta función se puede llamar desde el cliente o configurarse como webhook en Supabase
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Email de destino para todos los correos
const CONTACT_EMAIL = 'hola@fastia.es'

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactMessage {
  name: string
  email: string
  phone?: string
  company?: string
  project_type?: string
  budget_range?: string
  message: string
  start_timeframe?: string
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
                <td style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 30px 20px; text-align: center;">
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
                    ${formatField('Presupuesto', message.budget_range)}
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

    // Verificar si Resend está configurado
    if (!process.env.RESEND_API_KEY) {
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
        budget_range: message.budget_range,
        start_timeframe: message.start_timeframe,
        message: message.message,
      })

      return NextResponse.json({
        success: true,
        message: 'Mensaje registrado correctamente (email no enviado - RESEND_API_KEY no configurada)',
      })
    }

    // Enviar correo usando Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'FastIA <noreply@fastia.es>',
        to: CONTACT_EMAIL,
        replyTo: message.email,
        subject: `Nuevo mensaje de contacto de ${message.name}${message.company ? ` - ${message.company}` : ''}`,
        html: generateEmailHTML(message),
      })

      if (error) {
        console.error('Error enviando correo con Resend:', error)
        throw error
      }

      console.log('✅ Correo enviado exitosamente a', CONTACT_EMAIL, '| ID:', data?.id)

      return NextResponse.json({
        success: true,
        message: 'Correo enviado correctamente a hola@fastia.es',
        emailId: data?.id,
      })
    } catch (emailError: any) {
      console.error('Error enviando correo con Resend:', emailError)
      // No fallar completamente si el email no se envía, el mensaje ya está guardado en BD
      return NextResponse.json({
        success: true,
        message: 'Mensaje registrado correctamente (error al enviar email)',
        warning: emailError.message || 'Error desconocido al enviar email',
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
