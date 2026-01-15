'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const homePageSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta_primary_text: z.string(),
    cta_primary_link: z.string(),
    cta_secondary_text: z.string(),
    cta_secondary_link: z.string(),
  }),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
    suffix: z.string(),
  })),
  whyFastIA: z.array(z.object({
    number: z.string(),
    title: z.string(),
    text: z.string(),
    metric: z.string(),
    icon: z.string(),
    image: z.string(),
  })),
})

type HomePageFormData = z.infer<typeof homePageSchema>

export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, control, setValue } = useForm<HomePageFormData>({
    resolver: zodResolver(homePageSchema),
    defaultValues: {
      hero: {
        badge: 'FastIA',
        title: 'Transformamos ideas en soluciones inteligentes',
        subtitle: '6 años desarrollando software con IA. +40 desarrolladores especializados en apps móviles, automatización y plataformas web.',
        cta_primary_text: 'Hablemos de tu proyecto',
        cta_primary_link: '/contacto',
        cta_secondary_text: 'Ver servicios',
        cta_secondary_link: '/the-modal',
      },
      stats: [
        { value: '6', label: 'Años de experiencia', suffix: '' },
        { value: '100', label: 'Proyectos entregados', suffix: '+' },
        { value: '40', label: 'Desarrolladores', suffix: '+' },
        { value: '98', label: 'Satisfacción clientes', suffix: '%' },
      ],
      whyFastIA: [
        {
          number: '01',
          title: 'Diseño que enamora',
          text: 'No hacemos interfaces genéricas. Cada pixel cuenta. Nuestro equipo de diseño crea experiencias visuales que tus usuarios recordarán.',
          metric: '98% satisfacción en UX/UI',
          icon: 'Palette',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        },
        {
          number: '02',
          title: 'Fluidez en cada interacción',
          text: 'Apps y webs que vuelan. Optimizamos cada línea de código para que la experiencia sea suave como la seda.',
          metric: '< 2s tiempo de carga promedio',
          icon: 'Zap',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        },
        {
          number: '03',
          title: 'Adaptación total',
          text: 'Tu proyecto, tus reglas. Nos adaptamos a tu visión, no al revés. Metodologías ágiles que evolucionan contigo.',
          metric: '100% proyectos entregados a tiempo',
          icon: 'Target',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        },
      ],
    },
  })

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control,
    name: 'stats',
  })

  const { fields: whyFields, append: appendWhy, remove: removeWhy } = useFieldArray({
    control,
    name: 'whyFastIA',
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
        .eq('section', 'home')
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

  const onSubmit = async (data: HomePageFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          section: 'home',
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
        <h1 className="text-3xl font-bold text-white mb-2">Página de Inicio - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona todos los textos e imágenes de la página principal</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hero Section */}
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

        {/* Why FastIA */}
        <Section title="Por qué FastIA (6 razones)">
          {whyFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-white font-semibold">Razón {index + 1}</span>
                <button type="button" onClick={() => removeWhy(index)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <TextInput label="Número (01, 02, etc.)" {...register(`whyFastIA.${index}.number`)} />
                <TextInput label="Título" {...register(`whyFastIA.${index}.title`)} />
                <TextArea label="Texto" {...register(`whyFastIA.${index}.text`)} rows={3} />
                <TextInput label="Métrica destacada" {...register(`whyFastIA.${index}.metric`)} />
                <TextInput label="Icono (nombre)" {...register(`whyFastIA.${index}.icon`)} />
                <TextInput label="URL de imagen" {...register(`whyFastIA.${index}.image`)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendWhy({ number: '', title: '', text: '', metric: '', icon: '', image: '' })} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Añadir Razón
          </button>
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
