'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const sectorSchema = z.object({
  icon: z.string(),
  name: z.string(),
  description: z.string(),
  solutions: z.array(z.string()),
  color: z.string(),
})

const sectoresSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  sectors: z.array(sectorSchema),
})

type SectoresFormData = z.infer<typeof sectoresSchema>

export default function SectoresContentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, control, setValue } = useForm<SectoresFormData>({
    resolver: zodResolver(sectoresSchema),
    defaultValues: {
      hero: {
        title: 'Soluciones de IA para 20 Industrias',
        subtitle: 'Desde finanzas hasta salud, desde retail hasta energía. IA personalizada para cada sector.',
      },
      sectors: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sectors',
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const { data } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'sectores')
        .eq('key', 'content')
        .single()

      if ((data as any)?.value) {
        const content = typeof (data as any).value === 'string' ? JSON.parse((data as any).value) : (data as any).value
        setValue('hero', content.hero || { title: '', subtitle: '' })
        setValue('sectors', content.sectors || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: SectoresFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section: 'sectores',
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
        <h1 className="text-3xl font-bold text-white mb-2">Sectores - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona los 20 sectores industriales</p>
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
                rows={2}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Sectores ({fields.length})</h2>
            <button
              type="button"
              onClick={() => append({ icon: '', name: '', description: '', solutions: [], color: 'blue' })}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Añadir Sector
            </button>
          </div>
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex justify-between mb-4">
                  <span className="text-white font-semibold">Sector {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icono (nombre)</label>
                    <input
                      {...register(`sectors.${index}.icon`)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      placeholder="Building2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                    <input
                      {...register(`sectors.${index}.color`)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      placeholder="blue"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                  <input
                    {...register(`sectors.${index}.name`)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                  <textarea
                    {...register(`sectors.${index}.description`)}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Soluciones (separadas por comas)</label>
                  <input
                    {...register(`sectors.${index}.solutions`)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Solución 1, Solución 2, Solución 3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separa las soluciones con comas</p>
                </div>
              </div>
            ))}
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
