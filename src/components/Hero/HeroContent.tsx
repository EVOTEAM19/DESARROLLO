'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.28, 0.11, 0.32, 1] as const },
  }),
}

export function HeroContent() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="flex justify-center">
        <span className="pill">Agencia de desarrollo de software a medida</span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tightest text-gray-900 sm:text-6xl md:text-7xl"
      >
        Lo que imaginas,
        <br />
        <span className="text-gradient">hecho software.</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl"
      >
        Convertimos tu idea en una app, web o plataforma a medida.
        <span className="text-gray-900"> Hecha realidad</span> en tiempo récord.
      </motion.p>

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-3 sm:flex-row"
      >
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center rounded-full bg-blue-500 px-7 py-3 text-base font-medium text-white transition-colors hover:bg-blue-600"
        >
          Cuéntanos tu idea
        </Link>
        <Link
          href="/servicios"
          className="group inline-flex items-center gap-0.5 text-base font-medium text-blue-600 transition-colors hover:text-blue-500"
        >
          Cómo trabajamos
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  )
}
