'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServiceCTAProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

export function ServiceCTA({ title, description, primaryButton, secondaryButton }: ServiceCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButton.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg font-semibold transition-colors"
            >
              {primaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-gray-700 hover:border-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
