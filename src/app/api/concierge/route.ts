/**
 * /api/concierge — chatbot comercial "Fia" de FastIA.
 *
 * - 100% servidor: la ANTHROPIC_API_KEY nunca llega al navegador.
 * - Llama a la API REST de Anthropic por fetch (sin SDK).
 * - Tool use: cuando Claude llama a `capturar_lead`, disparamos Telegram + email.
 * - Respuesta JSON: { reply, leadCaptured }.
 */

import { NextRequest, NextResponse } from 'next/server'
import { SYSTEM_PROMPT, CAPTURE_TOOL, type CaptureInput } from '@/lib/concierge/config'
import { dispatchLead, type LeadAttachment } from '@/lib/concierge/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 1024
const MAX_TURNS = 4
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

// ─── Tipos mínimos del API de Anthropic ───
type TextBlock = { type: 'text'; text: string }
type ToolUseBlock = { type: 'tool_use'; id: string; name: string; input: unknown }
type ContentBlock = TextBlock | ToolUseBlock | { type: string; [k: string]: unknown }
type AnthropicMessage = { role: 'user' | 'assistant'; content: string | ContentBlock[] }
type AnthropicResponse = { content: ContentBlock[]; stop_reason: string }

// ─── Rate limit en memoria (endpoint público que cuesta dinero) ───
const HITS = new Map<string, { count: number; reset: number }>()
const RL_WINDOW_MS = 60_000
const RL_MAX = 20
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const e = HITS.get(ip)
  if (!e || now > e.reset) {
    HITS.set(ip, { count: 1, reset: now + RL_WINDOW_MS })
    return false
  }
  e.count++
  return e.count > RL_MAX
}

/** Extrae la línea "[OPCIONES] a | b | c" del final del texto y la separa. */
function parseOptions(text: string): { reply: string; options: string[] } {
  const idx = text.lastIndexOf('[OPCIONES]')
  if (idx === -1) return { reply: text.trim(), options: [] }
  const reply = text.slice(0, idx).trim()
  const options = text
    .slice(idx + '[OPCIONES]'.length)
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)
  return { reply, options }
}

function buildTranscript(messages: AnthropicMessage[]): string {
  const lines: string[] = []
  for (const m of messages) {
    const who = m.role === 'user' ? 'Visitante' : 'Maite'
    let text = ''
    if (typeof m.content === 'string') text = m.content
    else if (Array.isArray(m.content)) {
      text = m.content
        .map((b) => (b.type === 'text' ? (b as TextBlock).text : b.type === 'image' ? '[imagen adjunta]' : ''))
        .filter(Boolean)
        .join(' ')
    }
    if (text.trim()) lines.push(`${who}: ${text.trim()}`)
  }
  return lines.join('\n')
}

async function callAnthropic(
  apiKey: string,
  messages: AnthropicMessage[],
): Promise<AnthropicResponse> {
  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      tools: [CAPTURE_TOOL],
      messages,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`anthropic ${res.status}: ${body.slice(0, 300)}`)
  }
  return (await res.json()) as AnthropicResponse
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY no configurada' }, { status: 500 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'anon'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let payload: { messages?: AnthropicMessage[]; attachments?: LeadAttachment[]; pageUrl?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 })
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : []
  if (incoming.length === 0) {
    return NextResponse.json({ error: 'no_messages' }, { status: 400 })
  }

  const messages: AnthropicMessage[] = incoming
    .slice(-24)
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.content }))

  const attachments = (payload.attachments || []).slice(0, 10)
  const pageUrl = typeof payload.pageUrl === 'string' ? payload.pageUrl.slice(0, 300) : undefined

  try {
    let reply = ''
    let leadCaptured = false

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const data = await callAnthropic(apiKey, messages)
      messages.push({ role: 'assistant', content: data.content })

      const textNow = data.content
        .filter((b): b is TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim()
      if (textNow) reply = textNow

      const toolUses = data.content.filter((b): b is ToolUseBlock => b.type === 'tool_use')
      if (toolUses.length === 0) break

      const toolResults: ContentBlock[] = []
      for (const tu of toolUses) {
        if (tu.name === 'capturar_lead') {
          const lead = tu.input as CaptureInput
          const result = await dispatchLead({
            lead,
            transcript: buildTranscript(messages),
            attachments,
            pageUrl,
          })
          const ok = result.telegram === 'sent' || result.email === 'sent'
          if (ok) leadCaptured = true
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tu.id,
            content: ok
              ? 'Lead registrado y notificado al equipo correctamente. Confírmaselo al visitante con calidez.'
              : 'No se pudo notificar (revisar config del servidor), pero los datos quedaron guardados. Confírmale igualmente que el equipo le contactará.',
          } as ContentBlock)
        } else {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: tu.id,
            content: 'Tool desconocida.',
            is_error: true,
          } as ContentBlock)
        }
      }
      messages.push({ role: 'user', content: toolResults })
    }

    const parsed = parseOptions(reply || '…')
    return NextResponse.json({ reply: parsed.reply || '…', options: parsed.options, leadCaptured })
  } catch (err) {
    console.error('[concierge] error:', err)
    return NextResponse.json(
      { reply: 'Ups, he tenido un problema. ¿Lo intentamos de nuevo?', options: [], leadCaptured: false, error: true },
      { status: 200 },
    )
  }
}
