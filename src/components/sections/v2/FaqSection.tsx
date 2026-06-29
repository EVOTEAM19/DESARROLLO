'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading, Reveal } from './_shared'

const FAQS = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'La mayoría de proyectos arrancan desde 2.000 € y casi todos quedan por debajo de 6.000 €, siempre con precio cerrado. En la primera llamada definimos el alcance y te damos un presupuesto exacto, sin compromiso.',
  },
  {
    q: '¿Cuánto tarda mi proyecto?',
    a: 'Trabajamos en sprints semanales. Un producto a medida o una web suele estar en producción entre 2 y 8 semanas, según la complejidad. Verás avances funcionando cada semana desde el primer día.',
  },
  {
    q: '¿De quién es el código?',
    a: 'Tuyo, al 100%. Te entregamos todo el código fuente y los accesos. Sin cajas negras, sin dependencias forzadas y sin quedar atado a nosotros para siempre.',
  },
  {
    q: '¿Y si no tengo claro lo que quiero?',
    a: 'Perfecto, es lo normal. Parte de nuestro trabajo es ayudarte a aterrizar la idea: en la fase de descubrimiento la convertimos en un alcance concreto y un prototipo que puedes ver antes de desarrollar nada.',
  },
  {
    q: '¿Hacéis mantenimiento después?',
    a: 'Sí. Cada proyecto incluye 30 días de soporte y, si quieres, seguimos contigo con un plan de mantenimiento y evolución para hacer crecer el producto.',
  },
  {
    q: '¿Con qué tecnologías trabajáis?',
    a: 'Stack moderno y probado: Next.js, React, React Native, Node.js, Python, PostgreSQL/Supabase, e integraciones con IA (OpenAI), pagos (Stripe) y la nube (AWS/Vercel). Elegimos la herramienta adecuada para cada proyecto.',
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900">{q}</span>
        <Plus
          className={`h-5 w-5 flex-shrink-0 text-blue-600 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-foreground-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que sueles querer saber" />
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <Item q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
