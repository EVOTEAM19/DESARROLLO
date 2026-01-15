'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { trackCTAClickAll } from '@/lib/analytics'

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
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            {description}
          </p>
          <p className="text-lg text-orange-400 mb-10 font-semibold max-w-2xl mx-auto">
            ROI en 6 meses o devolvemos dinero
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButton.href}
              onClick={() => trackCTAClickAll(primaryButton.text, 'Service CTA - Primary', primaryButton.href)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-accent-orange-500/50"
            >
              {primaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                onClick={() => trackCTAClickAll(secondaryButton!.text, 'Service CTA - Secondary', secondaryButton!.href)}
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
