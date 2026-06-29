'use client'

import { motion } from 'framer-motion'
import { SectionHeading, Reveal } from './_shared'

/** Cursor que se mueve y "pincha" botones */
function LiveCursor() {
  const dur = 8
  const times = [0, 0.15, 0.22, 0.27, 0.45, 0.6, 0.66, 0.72, 0.9, 1]
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <motion.div
        className="absolute"
        initial={{ left: '55%', top: '60%' }}
        animate={{
          left: ['55%', '20%', '20%', '20%', '46%', '83%', '83%', '83%', '55%', '55%'],
          top: ['60%', '70%', '70%', '70%', '40%', '78%', '78%', '78%', '60%', '60%'],
        }}
        transition={{ duration: dur, times, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* onda de clic */}
        <motion.span
          className="absolute -left-2 -top-2 h-7 w-7 rounded-full border-2 border-blue-500"
          animate={{ scale: [0, 0, 1.6, 0, 0, 0, 1.6, 0, 0, 0], opacity: [0, 0, 0.7, 0, 0, 0, 0.7, 0, 0, 0] }}
          transition={{ duration: dur, times, repeat: Infinity, ease: 'easeOut' }}
        />
        <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          <path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1d1d1f" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )
}

/** Ventana de navegador realista con scroll y cursor */
function BrowserFrame({ src, url }: { src: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 hidden flex-1 sm:block">
          <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1 text-center text-xs text-gray-400">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 10V8a6 6 0 1112 0v2" stroke="#9aa" strokeWidth="2" /><rect x="4" y="10" width="16" height="10" rx="2" fill="#cdd" /></svg>
            {url}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        <motion.img
          src={src}
          alt="Plataforma a medida"
          className="absolute left-0 top-0 w-full"
          animate={{ y: ['0%', '0%', '-48%', '-48%', '0%'] }}
          transition={{ duration: 11, times: [0, 0.2, 0.5, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
        />
        <LiveCursor />
      </div>
    </div>
  )
}

/** iPhone realista (Dynamic Island, marco titanio, botones) */
function IPhone({ src }: { src: string }) {
  return (
    <div className="relative mx-auto w-[238px]">
      <div className="rounded-[3rem] bg-gradient-to-b from-gray-200 via-gray-400 to-gray-300 p-[2px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
        <div className="rounded-[2.9rem] bg-black p-[10px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.3rem] bg-white">
            <motion.img
              src={src}
              alt="App a medida"
              className="absolute left-0 top-0 w-full"
              animate={{ y: ['0%', '0%', '-14%', '-14%', '0%'] }}
              transition={{ duration: 12, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 z-10 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
            {/* reflejo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
          </div>
        </div>
      </div>
      {/* botones laterales */}
      <div className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-sm bg-gray-400" />
      <div className="absolute -left-[3px] top-[150px] h-12 w-[3px] rounded-l-sm bg-gray-400" />
      <div className="absolute -left-[3px] top-[200px] h-12 w-[3px] rounded-l-sm bg-gray-400" />
      <div className="absolute -right-[3px] top-[170px] h-16 w-[3px] rounded-r-sm bg-gray-400" />
    </div>
  )
}

export function DeviceMockups() {
  return (
    <section id="demos" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full bg-blue-400/10 blur-[120px]" />
      <div className="container-tight relative">
        <SectionHeading
          eyebrow="Ejemplos reales"
          title={<>Plataformas y apps que <span className="text-gradient">cobran vida</span></>}
          subtitle="Interfaces reales, rápidas y cuidadas hasta el último detalle. Esto es el tipo de producto que construimos a medida sobre tu idea."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="animate-float-slow">
              <BrowserFrame src="/generated/mocks/mock-web-v2.jpg" url="app.tuempresa.com" />
              <div className="mt-5 flex flex-wrap gap-2">
                {['Dashboard en tiempo real', 'Multiusuario', 'Pagos con Stripe'].map((t) => (
                  <span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="animate-float-slow" style={{ animationDelay: '1.2s' }}>
              <IPhone src="/generated/mocks/mock-app-v2.jpg" />
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['iOS + Android', 'Notificaciones', 'Modo offline'].map((t) => (
                  <span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
