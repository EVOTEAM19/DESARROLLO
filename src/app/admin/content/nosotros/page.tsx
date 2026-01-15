'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const nosotrosSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
    suffix: z.string(),
  })),
  values: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  team: z.object({
    title: z.string(),
    description: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    button_text: z.string(),
    button_link: z.string(),
  }),
})

type NosotrosFormData = z.infer<typeof nosotrosSchema>

export default function NosotrosContentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, control, setValue } = useForm<NosotrosFormData>({
    resolver: zodResolver(nosotrosSchema),
    defaultValues: {
      hero: {
        title: '11 años transformando ideas en productos que triunfan',
        subtitle: 'Somos FastIA. Un equipo de +40 desarrolladores especializados en IA, obsesionados con la calidad y la velocidad.',
      },
      stats: [
        { value: '11', label: 'Años de experiencia', suffix: '' },
        { value: '200', label: 'Proyectos entregados', suffix: '+' },
        { value: '40', label: 'Desarrolladores', suffix: '+' },
        { value: '98', label: 'Satisfacción clientes', suffix: '%' },
      ],
      values: [],
      team: {
        title: 'Nuestro equipo',
        description: 'Desarrolladores, diseñadores y product managers que aman lo que hacen.',
      },
      cta: {
        title: '¿Quieres formar parte del equipo?',
        description: 'Estamos siempre buscando talento. Envíanos tu CV.',
        button_text: 'Ver ofertas',
        button_link: '/contacto',
      },
    },
  })

  const { fields: valueFields, append: appendValue, remove: removeValue } = useFieldArray({
    control,
    name: 'values',
  })

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control,
    name: 'stats',
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
        .eq('section', 'nosotros')
        .eq('key', 'content')
        .single()

      if (data?.value) {
        const content = typeof data.value === 'string' ? JSON.parse(data.value) : data.value
        Object.keys(content).forEach((key) => {
          setValue(key as any, content[key])
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: NosotrosFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          section: 'nosotros',
          key: 'content',
          value: data,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'section,key' })

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
        <h1 className="text-3xl font-bold text-white mb-2">Nosotros - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona todos los textos de la página Nosotros</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hero */}
        <Section title="Hero Section">
          <TextInput label="Título" {...register('hero.title')} />
          <TextArea label="Subtítulo" {...register('hero.subtitle')} rows={3} />
        </Section>

        {/* Stats */}
        <Section title="Estadísticas">
          {statFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-white font-semibold">Estadística {index + 1}</span>
                <button type="button" onClick={() => removeStat(index)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <TextInput label="Valor" {...register(`stats.${index}.value`)} />
                <TextInput label="Etiqueta" {...register(`stats.${index}.label`)} />
                <TextInput label="Sufijo" {...register(`stats.${index}.suffix`)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendStat({ value: '', label: '', suffix: '' })} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Añadir Estadística
          </button>
        </Section>

        {/* Values */}
        <Section title="Valores">
          {valueFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-white font-semibold">Valor {index + 1}</span>
                <button type="button" onClick={() => removeValue(index)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <TextInput label="Icono (nombre)" {...register(`values.${index}.icon`)} />
              <TextInput label="Título" {...register(`values.${index}.title`)} />
              <TextArea label="Descripción" {...register(`values.${index}.description`)} rows={2} />
            </div>
          ))}
          <button type="button" onClick={() => appendValue({ icon: '', title: '', description: '' })} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Añadir Valor
          </button>
        </Section>

        {/* Team */}
        <Section title="Equipo">
          <TextInput label="Título" {...register('team.title')} />
          <TextArea label="Descripción" {...register('team.description')} rows={2} />
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
