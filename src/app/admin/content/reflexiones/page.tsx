'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const reflexionesSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  filters: z.object({
    all_text: z.string(),
    category_text: z.string(),
    search_placeholder: z.string(),
  }),
  empty_state: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

type ReflexionesFormData = z.infer<typeof reflexionesSchema>

export default function ReflexionesContentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, setValue } = useForm<ReflexionesFormData>({
    resolver: zodResolver(reflexionesSchema),
    defaultValues: {
      hero: {
        title: 'Reflexiones sobre IA y Tecnología',
        subtitle: 'Artículos, casos de estudio y pensamientos sobre el futuro del desarrollo de software con IA.',
      },
      filters: {
        all_text: 'Todos',
        category_text: 'Categorías',
        search_placeholder: 'Buscar artículos...',
      },
      empty_state: {
        title: 'No se encontraron artículos',
        description: 'Intenta con otros filtros o términos de búsqueda.',
      },
    },
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
        .eq('section', 'reflexiones')
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

  const onSubmit = async (data: ReflexionesFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          section: 'reflexiones',
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
        <h1 className="text-3xl font-bold text-white mb-2">Reflexiones - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona los textos de la sección de blog/reflexiones</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                {...register('hero.title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
              <textarea
                {...register('hero.subtitle')}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Filtros y Búsqueda</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Texto "Todos"</label>
              <input
                {...register('filters.all_text')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Texto "Categorías"</label>
              <input
                {...register('filters.category_text')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Placeholder de búsqueda</label>
              <input
                {...register('filters.search_placeholder')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Estado Vacío</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                {...register('empty_state.title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
              <textarea
                {...register('empty_state.description')}
                rows={2}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Contenido
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
