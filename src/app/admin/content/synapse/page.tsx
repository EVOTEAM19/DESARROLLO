'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const synapseSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta_primary_text: z.string(),
    cta_primary_link: z.string(),
    cta_secondary_text: z.string(),
    cta_secondary_link: z.string(),
  }),
  problems: z.array(z.object({
    title: z.string(),
    description: z.string(),
    impact: z.string(),
  })),
  solution: z.object({
    title: z.string(),
    subtitle: z.string(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
  useCases: z.array(z.object({
    industry: z.string(),
    title: z.string(),
    description: z.string(),
    impact: z.string(),
  })),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    button_text: z.string(),
    button_link: z.string(),
  }),
})

type SynapseFormData = z.infer<typeof synapseSchema>

export default function SynapseContentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<SynapseFormData>({
    resolver: zodResolver(synapseSchema),
    defaultValues: {
      hero: {
        badge: 'Synapse · Plataforma Empresarial',
        title: 'Tu plataforma de IA empresarial',
        subtitle: 'De la IA en la sombra al control total. Synapse es la plataforma unificada para gobernanza, seguridad y escalabilidad de IA empresarial.',
        cta_primary_text: 'Solicitar demo',
        cta_primary_link: '/contacto',
        cta_secondary_text: 'Ver servicios',
        cta_secondary_link: '/the-modal',
      },
      problems: [
        { title: 'IA en la sombra', description: 'Empleados usando ChatGPT sin control', impact: 'Riesgo de seguridad y compliance' },
        { title: 'Costos ocultos', description: 'Gastos en APIs de terceros sin visibilidad', impact: 'Presupuestos descontrolados' },
        { title: 'Falta de gobernanza', description: 'Sin control sobre qué IA se usa y cómo', impact: 'Riesgo regulatorio' },
      ],
      solution: {
        title: 'La Solución: FastIA Synapse',
        subtitle: 'Plataforma unificada para gobernanza, seguridad y escalabilidad',
        features: [
          { icon: 'Shield', title: 'Gobernanza Total', description: 'Control completo de accesos y permisos' },
          { icon: 'Zap', title: 'Velocidad', description: 'Implementación en 8-12 semanas' },
          { icon: 'Cloud', title: 'Multi-Cloud', description: 'AWS, Azure, GCP o on-premise' },
        ],
      },
      useCases: [
        { industry: 'Finanzas', title: 'Análisis de riesgo', description: 'Detección de fraude y scoring', impact: '40% reducción fraude' },
        { industry: 'Salud', title: 'Diagnóstico asistido', description: 'IA para análisis de imágenes', impact: '95% precisión' },
      ],
      cta: {
        title: '¿Listo para controlar tu IA?',
        description: 'Agenda una demo personalizada',
        button_text: 'Solicitar demo',
        button_link: '/contacto',
      },
    },
  })

  const { fields: problemFields, append: appendProblem, remove: removeProblem } = useFieldArray({
    control,
    name: 'problems',
  })

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'solution.features',
  })

  const { fields: useCaseFields, append: appendUseCase, remove: removeUseCase } = useFieldArray({
    control,
    name: 'useCases',
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('section', 'synapse')
        .eq('key', 'content')
        .single()

      if ((data as any)?.value) {
        const content = typeof (data as any).value === 'string' ? JSON.parse((data as any).value) : (data as any).value
        Object.keys(content).forEach((key) => {
          setValue(key as any, content[key])
        })
      }
    } catch (error) {
      console.error('Error cargando:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: SynapseFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          section: 'synapse',
          key: 'content',
          value: data,
          updated_at: new Date().toISOString(),
        } as any, { onConflict: 'section,key' })

      if (error) throw error
      alert('Contenido guardado exitosamente')
    } catch (error: any) {
      alert('Error: ' + (error.message || 'Error desconocido'))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Synapse - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona todos los textos de la página Synapse</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hero */}
        <Section title="Hero Section">
          <TextInput label="Badge" {...register('hero.badge')} />
          <TextInput label="Título" {...register('hero.title')} />
          <TextArea label="Subtítulo" {...register('hero.subtitle')} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="CTA Principal - Texto" {...register('hero.cta_primary_text')} />
            <TextInput label="CTA Principal - Enlace" {...register('hero.cta_primary_link')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="CTA Secundario - Texto" {...register('hero.cta_secondary_text')} />
            <TextInput label="CTA Secundario - Enlace" {...register('hero.cta_secondary_link')} />
          </div>
        </Section>

        {/* Problems */}
        <Section title="Problemas (IA en la Sombra)">
          {problemFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-white font-semibold">Problema {index + 1}</span>
                <button type="button" onClick={() => removeProblem(index)} className="text-red-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <TextInput label="Título" {...register(`problems.${index}.title`)} />
              <TextArea label="Descripción" {...register(`problems.${index}.description`)} rows={2} />
              <TextInput label="Impacto" {...register(`problems.${index}.impact`)} />
            </div>
          ))}
          <button type="button" onClick={() => appendProblem({ title: '', description: '', impact: '' })} className="btn-secondary">
            <Plus className="w-4 h-4" /> Añadir Problema
          </button>
        </Section>

        {/* Solution */}
        <Section title="Solución">
          <TextInput label="Título" {...register('solution.title')} />
          <TextArea label="Subtítulo" {...register('solution.subtitle')} rows={2} />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Features</h3>
            {featureFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex justify-between mb-4">
                  <span className="text-white font-semibold">Feature {index + 1}</span>
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <TextInput label="Icono (nombre)" {...register(`solution.features.${index}.icon`)} />
                <TextInput label="Título" {...register(`solution.features.${index}.title`)} />
                <TextArea label="Descripción" {...register(`solution.features.${index}.description`)} rows={2} />
              </div>
            ))}
            <button type="button" onClick={() => appendFeature({ icon: '', title: '', description: '' })} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Añadir Feature
            </button>
          </div>
        </Section>

        {/* Use Cases */}
        <Section title="Casos de Uso">
          {useCaseFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-white font-semibold">Caso {index + 1}</span>
                <button type="button" onClick={() => removeUseCase(index)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <TextInput label="Industria" {...register(`useCases.${index}.industry`)} />
              <TextInput label="Título" {...register(`useCases.${index}.title`)} />
              <TextArea label="Descripción" {...register(`useCases.${index}.description`)} rows={2} />
              <TextInput label="Impacto" {...register(`useCases.${index}.impact`)} />
            </div>
          ))}
          <button type="button" onClick={() => appendUseCase({ industry: '', title: '', description: '', impact: '' })} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Añadir Caso de Uso
          </button>
        </Section>

        {/* CTA */}
        <Section title="CTA Final">
          <TextInput label="Título" {...register('cta.title')} />
          <TextArea label="Descripción" {...register('cta.description')} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Texto Botón" {...register('cta.button_text')} />
            <TextInput label="Enlace Botón" {...register('cta.button_link')} />
          </div>
        </Section>

        <div className="flex justify-end">
          <button type="submit" disabled={isSaving} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSaving ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</> : <><Save className="w-5 h-5" /> Guardar</>}
          </button>
        </div>
      </form>
    </div>
  )
}

// Componentes auxiliares
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}

function TextInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
        {...props}
      />
    </div>
  )
}

function TextArea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <textarea
        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
        {...props}
      />
    </div>
  )
}

