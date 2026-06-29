'use client'

/**
 * ConciergeWidget — chatbot comercial "Fia" de FastIA.
 *
 * Burbuja flotante abajo-derecha que abre un panel de chat conectado a
 * /api/concierge (Claude). Resuelve dudas, cualifica y captura el lead
 * (teléfono / proyecto), notificado al equipo por Telegram + email.
 *
 * Dependencias ya presentes en el proyecto: framer-motion, lucide-react.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Paperclip, Check } from 'lucide-react'
import { CONCIERGE } from '@/lib/concierge/brand'

const ACCENT = CONCIERGE.accent
const GRADIENT = CONCIERGE.accentGradient

type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
type ApiMessage = { role: 'user' | 'assistant'; content: string | ContentBlock[] }

type Attachment = { filename: string; contentBase64: string; mediaType: string; isImage: boolean }

type UIMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  images?: string[]
  files?: string[]
  options?: string[]
}

const MAX_TOTAL_BYTES = 8 * 1024 * 1024
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const res = reader.result as string
      resolve(res.includes(',') ? res.split(',')[1] : res)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function ConciergeWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [pending, setPending] = useState<Attachment[]>([])
  const [pendingPreviews, setPendingPreviews] = useState<{ name: string; url?: string }[]>([])
  const [leadCaptured, setLeadCaptured] = useState(false)

  const apiMessagesRef = useRef<ApiMessage[]>([])
  const sessionAttachmentsRef = useRef<Attachment[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const greetedRef = useRef(false)
  const interactedRef = useRef(false)
  const titleId = useId()

  const openChat = useCallback(() => {
    interactedRef.current = true
    setOpen(true)
  }, [])
  const closeChat = useCallback(() => {
    interactedRef.current = true
    setOpen(false)
  }, [])

  // Auto-abrir a los 12s si el visitante no ha interactuado aún (1 vez por sesión).
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('fia_seen')) return
    const t = setTimeout(() => {
      if (!interactedRef.current) setOpen(true)
    }, 12000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true
      if (typeof window !== 'undefined') sessionStorage.setItem('fia_seen', '1')
      setMessages([{ id: uid(), role: 'assistant', text: CONCIERGE.greeting }])
    }
  }, [open])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files)
    let total = sessionAttachmentsRef.current.reduce((n, a) => n + (a.contentBase64.length * 3) / 4, 0)
    for (const f of arr) {
      if (total + f.size > MAX_TOTAL_BYTES) {
        alert('Has superado el límite de 8 MB en adjuntos.')
        break
      }
      total += f.size
      const b64 = await fileToBase64(f)
      const isImage = IMAGE_TYPES.includes(f.type)
      setPending((p) => [...p, { filename: f.name, contentBase64: b64, mediaType: f.type || 'application/octet-stream', isImage }])
      setPendingPreviews((p) => [...p, { name: f.name, url: isImage ? `data:${f.type};base64,${b64}` : undefined }])
    }
  }, [])

  const removePending = (idx: number) => {
    setPending((p) => p.filter((_, i) => i !== idx))
    setPendingPreviews((p) => p.filter((_, i) => i !== idx))
  }

  const send = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? input).trim()
      if ((!text && pending.length === 0) || sending) return

      setSending(true)
      setInput('')
      const myPending = pending
      const myPreviews = pendingPreviews
      setPending([])
      setPendingPreviews([])
      sessionAttachmentsRef.current.push(...myPending)

      const blocks: ContentBlock[] = []
      if (text) blocks.push({ type: 'text', text })
      for (const a of myPending) {
        if (a.isImage) {
          blocks.push({ type: 'image', source: { type: 'base64', media_type: a.mediaType, data: a.contentBase64 } })
        }
      }
      const nonImages = myPending.filter((a) => !a.isImage)
      if (nonImages.length) {
        blocks.push({ type: 'text', text: `[El visitante ha adjuntado: ${nonImages.map((a) => a.filename).join(', ')}]` })
      }
      const userApiContent: ApiMessage['content'] = blocks.length === 1 && blocks[0].type === 'text' ? text : blocks
      apiMessagesRef.current.push({ role: 'user', content: userApiContent })

      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'user',
          text,
          images: myPreviews.filter((p) => p.url).map((p) => p.url!),
          files: myPending.filter((a) => !a.isImage).map((a) => a.filename),
        },
      ])

      try {
        const res = await fetch('/api/concierge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessagesRef.current,
            attachments: sessionAttachmentsRef.current.map(({ filename, contentBase64, mediaType }) => ({ filename, contentBase64, mediaType })),
            pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
          }),
        })

        if (res.status === 429) throw new Error('rate')
        const data = (await res.json()) as { reply?: string; options?: string[]; leadCaptured?: boolean }
        const reply = data.reply || 'Perdona, no te he entendido. ¿Me lo repites?'
        if (data.leadCaptured) setLeadCaptured(true)
        apiMessagesRef.current.push({ role: 'assistant', content: reply })
        setMessages((m) => [...m, { id: uid(), role: 'assistant', text: reply, options: data.options }])
      } catch (err) {
        const msg =
          err instanceof Error && err.message === 'rate'
            ? 'Estás yendo muy rápido 😄. Espera unos segundos y seguimos.'
            : 'Uy, se me ha ido la conexión. ¿Lo reintentamos?'
        setMessages((m) => [...m, { id: uid(), role: 'assistant', text: msg }])
      } finally {
        setSending(false)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
    },
    [input, pending, pendingPreviews, sending],
  )

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 2147483000 }}
          >
            <button
              onClick={openChat}
              aria-label="Abrir chat de ayuda"
              style={{
                width: 60, height: 60, borderRadius: '50%', background: GRADIENT, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 10px 30px ${ACCENT}66, 0 4px 12px rgba(0,0,0,.2)`, color: '#fff',
              }}
            >
              <span style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: ACCENT, opacity: 0.5, animation: 'fiaPulse 2.2s ease-out infinite' }} />
              <MessageCircle size={28} strokeWidth={2} style={{ position: 'relative' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files)
            }}
            style={{
              position: 'fixed', right: 20, bottom: 20, zIndex: 2147483000,
              width: 'min(400px, calc(100vw - 32px))', height: 'min(640px, calc(100vh - 100px))',
              background: '#fff', borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,.28)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(0,0,0,.06)',
            }}
          >
            <div style={{ background: GRADIENT, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, color: '#fff', flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
                {CONCIERGE.assistantName[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div id={titleId} style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  {CONCIERGE.assistantName} · {CONCIERGE.brand}
                </div>
                <div style={{ fontSize: 12, opacity: 0.92, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Respondemos al momento
                </div>
              </div>
              <button onClick={closeChat} aria-label="Cerrar chat" style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', background: '#f6f7f9', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((m) => (
                <MessageBubble key={m.id} m={m} />
              ))}

              {sending && <TypingDots />}

              {leadCaptured && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'center', background: '#dcfce7', color: '#166534', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, marginTop: 4 }}>
                  <Check size={14} /> Datos enviados al equipo
                </div>
              )}

              {!sending && (() => {
                const last = messages[messages.length - 1]
                const chips: string[] =
                  messages.length <= 1
                    ? [...CONCIERGE.quickReplies]
                    : last?.role === 'assistant' && last.options?.length
                      ? last.options
                      : []
                if (!chips.length) return null
                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 6 }}>
                    {chips.map((q) => (
                      <button key={q} onClick={() => send(q)} style={{ background: '#fff', border: `1px solid ${ACCENT}55`, color: ACCENT, borderRadius: 100, padding: '7px 13px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                        {q}
                      </button>
                    ))}
                  </div>
                )
              })()}
            </div>

            {pendingPreviews.length > 0 && (
              <div style={{ display: 'flex', gap: 8, padding: '8px 12px', background: '#fff', borderTop: '1px solid #eee', flexWrap: 'wrap' }}>
                {pendingPreviews.map((p, i) => (
                  <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, background: '#f1f1f3', borderRadius: 8, padding: p.url ? 0 : '6px 10px', maxWidth: 140 }}>
                    {p.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.url} alt={p.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} />
                    ) : (
                      <span style={{ fontSize: 12, color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📎 {p.name}</span>
                    )}
                    <button onClick={() => removePending(i)} aria-label="Quitar adjunto" style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ padding: '10px 12px', background: '#fff', borderTop: '1px solid #eee', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <button onClick={() => fileInputRef.current?.click()} aria-label="Adjuntar archivo" style={{ background: '#f1f1f3', border: 'none', borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#555', flexShrink: 0 }}>
                  <Paperclip size={18} />
                </button>
                <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.ppt,.pptx" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = '' }} />
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  rows={1}
                  placeholder="Escribe tu mensaje…"
                  style={{ flex: 1, resize: 'none', border: '1px solid #e5e5e5', borderRadius: 12, padding: '10px 12px', fontSize: 14, fontFamily: 'inherit', maxHeight: 110, outline: 'none', color: '#111', background: '#fff' }}
                />
                <button
                  onClick={() => send()}
                  disabled={sending || (!input.trim() && pending.length === 0)}
                  aria-label="Enviar"
                  style={{ background: ACCENT, border: 'none', borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: sending ? 'default' : 'pointer', color: '#fff', flexShrink: 0, opacity: sending || (!input.trim() && pending.length === 0) ? 0.5 : 1 }}
                >
                  <Send size={17} />
                </button>
              </div>
              <div style={{ textAlign: 'center', fontSize: 10.5, color: '#aaa', marginTop: 6 }}>
                Asistente con IA · te llamamos en minutos
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes fiaPulse{0%{transform:scale(1);opacity:.5}70%{transform:scale(1.6);opacity:0}100%{opacity:0}}
        @keyframes fiaBlink{0%,80%,100%{opacity:.3}40%{opacity:1}}`}</style>
    </>
  )
}

function MessageBubble({ m }: { m: UIMessage }) {
  const isUser = m.role === 'user'
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '82%', background: isUser ? ACCENT : '#fff', color: isUser ? '#fff' : '#1a1a1a',
          borderRadius: 16, borderBottomRightRadius: isUser ? 4 : 16, borderBottomLeftRadius: isUser ? 16 : 4,
          padding: '9px 13px', fontSize: 14, lineHeight: 1.5, boxShadow: isUser ? 'none' : '0 1px 2px rgba(0,0,0,.06)',
          wordBreak: 'break-word', whiteSpace: 'pre-wrap',
        }}
      >
        {m.images && m.images.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: m.text ? 6 : 0 }}>
            {m.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="adjunto" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8 }} />
            ))}
          </div>
        )}
        {m.files && m.files.length > 0 && (
          <div style={{ fontSize: 12, opacity: 0.9, marginBottom: m.text ? 6 : 0 }}>{m.files.map((f) => `📎 ${f}`).join('  ')}</div>
        )}
        {m.text}
      </div>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: '#fff', borderRadius: 16, borderBottomLeftRadius: 4, alignSelf: 'flex-start', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#bbb', display: 'inline-block', animation: 'fiaBlink 1.2s infinite', animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  )
}
