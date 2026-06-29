/**
 * Concierge — dispatch de notificaciones de lead (FastIA).
 *
 * Envía el lead por DOS canales en paralelo:
 *   - Telegram (instantáneo, vía TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)
 *   - Email (vía Resend, reutilizando RESEND_API_KEY + RESEND_FROM_EMAIL)
 *
 * Si falta la config de un canal, ese canal se omite (el otro sigue) y queda
 * log en el servidor como red de seguridad.
 */

import { Resend } from 'resend'
import type { CaptureInput } from './config'

export type LeadAttachment = {
  filename: string
  /** base64 SIN el prefijo data: */
  contentBase64: string
  mediaType: string
}

export type LeadContext = {
  lead: CaptureInput
  transcript: string
  attachments?: LeadAttachment[]
  pageUrl?: string
}

export type DispatchResult = {
  telegram: 'sent' | 'skipped' | 'error'
  email: 'sent' | 'skipped' | 'error'
  errors: string[]
}

const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || 'hola@fastia.es'
const EMAIL_FROM = (process.env.RESEND_FROM_EMAIL || 'FastIA <noreply@fastia.es>').trim()

function fmtLine(label: string, value?: string | boolean): string {
  if (value === undefined || value === '' || value === false) return ''
  const v = value === true ? 'Sí' : value
  return `${label}: ${v}\n`
}

/** Texto compacto para Telegram (sin emojis). */
function buildPushText(ctx: LeadContext): string {
  const l = ctx.lead
  const urg = l.urgencia ? ` (${l.urgencia.toUpperCase()})` : ''
  let t = `NUEVO LEAD (chatbot)${urg}\n`
  t += `Telefono: ${l.telefono || '(sin telefono)'}${l.quiere_llamada ? ' - QUIERE LLAMADA' : ''}\n`
  t += fmtLine('Nombre', l.nombre)
  t += fmtLine('Email', l.email)
  t += fmtLine('Interes', l.servicio_interes)
  t += fmtLine('Presupuesto', l.presupuesto_estimado)
  t += fmtLine('Plazo', l.plazo)
  t += `\nResumen: ${l.resumen_proyecto}`
  if (l.adjuntos) t += `\nAdjuntos: ${l.adjuntos}`
  if (ctx.attachments?.length) t += `\n(${ctx.attachments.length} archivo/s en el email)`
  if (ctx.pageUrl) t += `\nOrigen: ${ctx.pageUrl}`
  return t
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

function buildEmailHtml(ctx: LeadContext): string {
  const l = ctx.lead
  const row = (label: string, value?: string | boolean) => {
    if (value === undefined || value === '' || value === false) return ''
    const v = value === true ? 'Sí' : String(value)
    return `<tr><td style="padding:6px 12px;color:#666;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#111;font-size:14px;font-weight:500">${escapeHtml(v)}</td></tr>`
  }
  return `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif">
  <div style="max-width:560px;margin:24px auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#0062c4,#0a84ff);padding:18px 24px">
      <div style="color:#fff;font-size:18px;font-weight:700">🔥 Nuevo lead desde la web</div>
      ${l.urgencia ? `<span style="display:inline-block;margin-top:6px;background:rgba(255,255,255,.25);color:#fff;font-size:11px;font-weight:700;padding:2px 10px;border-radius:100px">URGENCIA ${l.urgencia.toUpperCase()}</span>` : ''}
      ${l.quiere_llamada ? `<span style="display:inline-block;margin-top:6px;margin-left:6px;background:#0b1220;color:#fff;font-size:11px;font-weight:700;padding:2px 10px;border-radius:100px">QUIERE LLAMADA</span>` : ''}
    </div>
    ${l.telefono ? `<div style="padding:16px 24px;background:#eff6ff;border-bottom:1px solid #dbeafe"><a href="tel:${(l.telefono || '').replace(/[^\d+]/g, '')}" style="color:#0a84ff;font-size:22px;font-weight:800;text-decoration:none">📞 ${escapeHtml(l.telefono)}</a></div>` : ''}
    <table style="width:100%;border-collapse:collapse;margin:8px 0">
      ${row('Nombre', l.nombre)}
      ${row('Email', l.email)}
      ${row('Interés', l.servicio_interes)}
      ${row('Presupuesto', l.presupuesto_estimado)}
      ${row('Plazo', l.plazo)}
      ${row('Adjuntos', l.adjuntos)}
    </table>
    <div style="padding:8px 24px 4px;color:#666;font-size:13px;font-weight:600">📝 Resumen del proyecto</div>
    <div style="padding:0 24px 16px;color:#222;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(l.resumen_proyecto)}</div>
    <details style="padding:0 24px 20px">
      <summary style="cursor:pointer;color:#888;font-size:13px;font-weight:600">Ver conversación completa</summary>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #eee;border-radius:8px;padding:12px;font-size:12px;color:#444;margin-top:8px;font-family:ui-monospace,monospace">${escapeHtml(ctx.transcript)}</pre>
    </details>
    ${ctx.pageUrl ? `<div style="padding:0 24px 18px;color:#999;font-size:12px">Origen: ${escapeHtml(ctx.pageUrl)}</div>` : ''}
  </div>
</body></html>`
}

/** Envía un mensaje de texto a Telegram. Reutilizable (chatbot y formulario). */
export async function sendTelegramMessage(text: string): Promise<'sent' | 'skipped' | 'error'> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return 'skipped'
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    })
    return res.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}

async function sendEmail(ctx: LeadContext): Promise<'sent' | 'skipped' | 'error'> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey.length < 20) return 'skipped'
  const l = ctx.lead
  const subject = `🔥 Lead${l.urgencia === 'alta' ? ' URGENTE' : ''}${l.telefono ? ` · ${l.telefono}` : ''}${l.nombre ? ` · ${l.nombre}` : ''} — ${(l.servicio_interes || 'proyecto').slice(0, 40)}`
  const attachments = (ctx.attachments || [])
    .slice(0, 8)
    .map((a) => ({ filename: a.filename, content: a.contentBase64 }))
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: LEAD_EMAIL_TO,
    replyTo: l.email || undefined,
    subject,
    html: buildEmailHtml(ctx),
    ...(attachments.length ? { attachments } : {}),
  })
  return error ? 'error' : 'sent'
}

/** Envía el lead por todos los canales. Nunca lanza: agrega errores en el resultado. */
export async function dispatchLead(ctx: LeadContext): Promise<DispatchResult> {
  const errors: string[] = []
  const [tg, em] = await Promise.allSettled([sendTelegramMessage(buildPushText(ctx)), sendEmail(ctx)])

  const telegram = tg.status === 'fulfilled' ? tg.value : 'error'
  const email = em.status === 'fulfilled' ? em.value : 'error'
  if (tg.status === 'rejected') errors.push(`telegram: ${tg.reason}`)
  if (em.status === 'rejected') errors.push(`email: ${em.reason}`)

  if (telegram !== 'sent' && email !== 'sent') {
    console.error('[concierge] Lead NO notificado por ningún canal:', JSON.stringify(ctx.lead))
  } else {
    console.log(`[concierge] Lead notificado (telegram=${telegram}, email=${email})`)
  }
  return { telegram, email, errors }
}
