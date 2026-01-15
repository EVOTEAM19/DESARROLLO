'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { StructuredData } from './StructuredData'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
  title?: string
}

export function FAQ({ faqs, title = 'Preguntas frecuentes' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Schema markup
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <StructuredData schema={faqSchema} />
      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8 text-white">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="group p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-semibold text-left text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
