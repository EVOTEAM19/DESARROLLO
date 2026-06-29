'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Aparición suave al entrar en viewport */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.5, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
      <span className="h-px w-6 bg-blue-600/50" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
}) {
  const isCenter = align === 'center'
  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={`mt-5 text-lg leading-relaxed text-foreground-muted ${isCenter ? 'mx-auto max-w-2xl' : ''}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
