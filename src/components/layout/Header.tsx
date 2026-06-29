'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Zap } from 'lucide-react'
import { Logo } from './Logo'

const NAV = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#freelance', label: 'Freelance' },
  { href: '/nosotros', label: 'Nosotros' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header initial={{ y: -110 }} animate={{ y: 0 }} transition={{ duration: 0.4 }} className="fixed inset-x-0 top-0 z-50">
      {/* Topbar: precio y tiempos */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container-tight flex h-10 items-center justify-center gap-x-2 text-center text-[13px] font-medium sm:gap-x-3">
          <Zap className="hidden h-3.5 w-3.5 shrink-0 sm:block" />
          <span>Software a medida <strong className="font-semibold">desde 2.000 €</strong></span>
          <span className="text-white/50">·</span>
          <span><strong className="font-semibold">Sin cuotas mensuales</strong></span>
          <span className="hidden text-white/50 sm:inline">·</span>
          <span className="hidden sm:inline">Producto terminado <strong className="font-semibold">en semanas, no meses</strong></span>
          <Link href="/contacto" className="hidden items-center gap-1 underline-offset-2 hover:underline md:inline-flex">
            Pide presupuesto <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Barra de navegación */}
      <div className={`transition-all duration-300 ${scrolled ? 'border-b border-gray-200 bg-white/75 backdrop-blur-xl' : 'border-b border-transparent bg-white/0'}`}>
        <div className="container-tight flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-gray-900">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600">
              Cuéntanos tu idea
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button className="rounded-lg p-2 text-gray-900 transition-colors hover:bg-gray-100 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 top-[6.5rem] z-40 bg-white/95 backdrop-blur-xl lg:hidden">
            <nav className="container-tight flex flex-col gap-1 py-8">
              {NAV.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block border-b border-gray-200 py-4 text-2xl font-semibold text-gray-900">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/contacto" onClick={() => setOpen(false)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-4 text-lg font-medium text-white">
                Cuéntanos tu idea <ArrowRight className="h-5 w-5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
