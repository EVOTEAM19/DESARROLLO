'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = '/contacto',
}: {
  eyebrow: string
  title: ReactNode
  subtitle: ReactNode
  ctaLabel?: string
  ctaHref?: string
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px] animate-aurora" />

      <div className="container-tight relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pill"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted"
        >
          {subtitle}
        </motion.p>
        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9"
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 font-medium text-white transition-all hover:bg-blue-600"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
