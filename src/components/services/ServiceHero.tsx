'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ServiceHeroProps {
  badge: string
  title: string
  subtitle: string
  image: string
}

export function ServiceHero({ badge, title, subtitle, image }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6 px-4 py-2 bg-accent-orange-500/20 border border-accent-orange-500/50 rounded-full"
        >
          <span className="text-accent-orange-500 text-sm font-semibold">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
