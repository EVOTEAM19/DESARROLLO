'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import { Brain, TrendingUp, Database, Zap, Shield } from 'lucide-react'

const serviceIcons = {
  'ia-conversacional': Brain,
  'analisis-predictivo': TrendingUp,
  'procesamiento-datos': Database,
  'automatizacion-inteligente': Zap,
  'seguridad-ia': Shield,
}

const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Título requerido'),
  description: z.string().min(1, 'Descripción requerida'),
  href: z.string().min(1, 'Enlace requerido'),
  color: z.string(),
  icon: z.enum(['ia-conversacional', 'analisis-predictivo', 'procesamiento-datos', 'automatizacion-inteligente', 'seguridad-ia']),
})

const theModalSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta_primary_text: z.string(),
    cta_primary_link: z.string(),
    cta_secondary_text: z.string(),
    cta_secondary_link: z.string(),
  }),
  services: z.array(serviceSchema),
  expertise: z.object({
    title: z.string(),
    subtitle: z.string(),
    seo_title: z.string(),
    seo_description: z.string(),
    apps_title: z.string(),
    apps_description: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    button_text: z.string(),
    button_link: z.string(),
  }),
})

type TheModalFormData = z.infer<typeof theModalSchema>

export default function TheModalContentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TheModalFormData>({
    resolver: zodResolver(theModalSchema),
    defaultValues: {
      hero: {
        badge: 'The Mesh',
        title: 'Servicios de desarrollo especializados',
        subtitle: 'Servicios interconectados de desarrollo de software con IA que se adaptan y escalan según las necesidades de tu organización. TypeScript, React, Node.js, Kotlin, iOS, Android y Flux.',
        cta_primary_text: 'Hablemos de tu proyecto',
        cta_primary_link: '/contacto',
        cta_secondary_text: 'Conoce FastIA',
        cta_secondary_link: '/nosotros',
      },
      services: [
        {
          id: '1',
          title: 'IA Conversacional',
          description: 'Chatbots inteligentes y asistentes virtuales que entienden contexto y aprenden de cada interacción.',
          href: '/servicios/ia-conversacional',
          color: 'from-orange-500 to-orange-600',
          icon: 'ia-conversacional',
        },
        {
          id: '2',
          title: 'Análisis Predictivo',
          description: 'Machine Learning para predecir tendencias, detectar patrones y tomar decisiones basadas en datos.',
          href: '/servicios/analisis-predictivo',
          color: 'from-blue-500 to-blue-600',
          icon: 'analisis-predictivo',
        },
        {
          id: '3',
          title: 'Procesamiento de Datos',
          description: 'Transformación y análisis de grandes volúmenes de datos para extraer insights accionables.',
          href: '/servicios/procesamiento-datos',
          color: 'from-green-500 to-green-600',
          icon: 'procesamiento-datos',
        },
        {
          id: '4',
          title: 'Automatización Inteligente',
          description: 'RPA con IA que automatiza procesos complejos y toma decisiones en tiempo real.',
          href: '/servicios/automatizacion-inteligente',
          color: 'from-purple-500 to-purple-600',
          icon: 'automatizacion-inteligente',
        },
        {
          id: '5',
          title: 'Seguridad con IA',
          description: 'Protección avanzada con detección de amenazas, análisis de vulnerabilidades y respuesta automática.',
          href: '/servicios/seguridad-ia',
          color: 'from-red-500 to-red-600',
          icon: 'seguridad-ia',
        },
      ],
      expertise: {
        title: 'Expertos en SEO y Posicionamiento en Buscadores IA',
        subtitle: 'No solo desarrollamos software, lo hacemos visible. Somos especialistas en posicionamiento SEO tradicional y en los nuevos buscadores impulsados por IA como ChatGPT, Perplexity y Claude.',
        seo_title: 'SEO Técnico Avanzado',
        seo_description: 'Core Web Vitals, Schema.org, structured data y indexación perfecta.',
        apps_title: 'Especialistas en Apps Nativas e Híbridas',
        apps_description: '6 años desarrollando apps móviles. Sabemos cuándo elegir nativo (Swift/Kotlin) y cuándo híbrido (Flutter/React Native). No te vendemos tecnología, te recomendamos la mejor para tu caso.',
      },
      cta: {
        title: '¿Listo para transformar tu idea?',
        description: 'Agenda una sesión de 60 minutos gratis. Sin coste, sin compromiso.',
        button_text: 'Hablemos de tu proyecto',
        button_link: '/contacto',
      },
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'the-modal')
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if ((data as any)?.value) {
        const content = typeof (data as any).value === 'string' ? JSON.parse((data as any).value) : (data as any).value
        Object.keys(content).forEach((key) => {
          if (key === 'services' && Array.isArray(content[key])) {
            setValue('services', content[key])
          } else if (content[key]) {
            setValue(key as any, content[key])
          }
        })
      }
    } catch (error) {
      console.error('Error cargando contenido:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: TheModalFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_content')
        .upsert(
          {
            section: 'the-modal',
            key: 'content',
            value: data,
            updated_at: new Date().toISOString(),
          } as any,
          { onConflict: 'section,key' }
        )

      if (error) throw error
      alert('Contenido guardado exitosamente')
    } catch (error: any) {
      console.error('Error guardando:', error)
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
        <h1 className="text-3xl font-bold text-white mb-2">The Modal - Gestión de Contenido</h1>
        <p className="text-gray-400">Gestiona los textos e imágenes de la sección The Modal</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Badge</label>
              <input
                {...register('hero.badge')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                placeholder="The Mesh"
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CTA Principal - Texto</label>
                <input
                  {...register('hero.cta_primary_text')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CTA Principal - Enlace</label>
                <input
                  {...register('hero.cta_primary_link')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CTA Secundario - Texto</label>
                <input
                  {...register('hero.cta_secondary_text')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CTA Secundario - Enlace</label>
                <input
                  {...register('hero.cta_secondary_link')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Servicios (5 servicios de IA)</h2>
          </div>
          <div className="space-y-6">
            {fields.map((field, index) => {
              const Icon = serviceIcons[watch(`services.${index}.icon`) as keyof typeof serviceIcons] || Brain
              return (
                <div key={field.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-br ${watch(`services.${index}.color`)} rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">Servicio {index + 1}</span>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Icono</label>
                      <select
                        {...register(`services.${index}.icon`)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      >
                        <option value="ia-conversacional">IA Conversacional</option>
                        <option value="analisis-predictivo">Análisis Predictivo</option>
                        <option value="procesamiento-datos">Procesamiento de Datos</option>
                        <option value="automatizacion-inteligente">Automatización Inteligente</option>
                        <option value="seguridad-ia">Seguridad con IA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                      <input
                        {...register(`services.${index}.title`)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                      <textarea
                        {...register(`services.${index}.description`)}
                        rows={2}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Enlace</label>
                        <input
                          {...register(`services.${index}.href`)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Color (Tailwind gradient)</label>
                        <input
                          {...register(`services.${index}.color`)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          placeholder="from-orange-500 to-orange-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Sección Expertise</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título SEO</label>
              <input
                {...register('expertise.title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción SEO</label>
              <textarea
                {...register('expertise.subtitle')}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título SEO - Detalle</label>
              <input
                {...register('expertise.seo_title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción SEO - Detalle</label>
              <textarea
                {...register('expertise.seo_description')}
                rows={2}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título Apps</label>
              <input
                {...register('expertise.apps_title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción Apps</label>
              <textarea
                {...register('expertise.apps_description')}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">CTA Final</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                {...register('cta.title')}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
              <textarea
                {...register('cta.description')}
                rows={2}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Texto del Botón</label>
                <input
                  {...register('cta.button_text')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enlace del Botón</label>
                <input
                  {...register('cta.button_link')}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
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
