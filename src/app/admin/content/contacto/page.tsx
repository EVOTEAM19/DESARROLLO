'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2, Mail, Phone, MapPin, Clock, Globe, Sparkles } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const contactoPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  contact_info: z.object({
    email: z.string().email(),
    phone: z.string(),
    address_madrid: z.string(),
    address_barcelona: z.string(),
    address_sevilla: z.string(),
    hours: z.string(),
  }),
  form: z.object({
    title: z.string(),
    description: z.string(),
    project_types: z.array(z.string()),
    budget_ranges: z.array(z.string()),
    start_timeframes: z.array(z.string()),
    success_message: z.string(),
    error_message: z.string(),
  }),
  map: z.object({
    enabled: z.boolean(),
    iframe_url: z.string().optional(),
  }),
})

type ContactoPageFormData = z.infer<typeof contactoPageSchema>

export default function ContactoPageContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createBrowserClient()

  const { register, handleSubmit, control, setValue, watch } = useForm<ContactoPageFormData>({
    resolver: zodResolver(contactoPageSchema),
    defaultValues: {
      hero: {
        title: 'Hablemos de tu proyecto',
        subtitle: 'Respondemos en menos de 24h. Sin comerciales pesados, solo una conversación honesta.',
      },
      contact_info: {
        email: 'hola@fastia.es',
        phone: '+34 910 123 456',
        address_madrid: 'Calle Columela, 9 28001 Madrid',
        address_barcelona: 'Barcelona',
        address_sevilla: 'Sevilla',
        hours: 'Lunes a Viernes, 9:00 - 18:00h',
      },
      form: {
        title: '¿Hablamos de tu proyecto?',
        description: 'Estamos aquí para ayudarte. Cuéntanos tu idea y te respondemos en menos de 24 horas.',
        project_types: [
          'Desarrollo de app móvil',
          'Plataforma web',
          'Automatización con IA',
          'Consultoría tecnológica',
          'Migración cloud',
          'Mantenimiento',
          'Otro',
        ],
        budget_ranges: [
          '< 10.000€',
          '10.000€ - 30.000€',
          '30.000€ - 50.000€',
          '50.000€ - 100.000€',
          '+100.000€',
          'No lo sé aún',
        ],
        start_timeframes: [
          'Lo antes posible',
          'En 1 mes',
          'En 2-3 meses',
          'Más de 3 meses',
        ],
        success_message: '¡Mensaje enviado! Te responderemos pronto.',
        error_message: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.',
      },
      map: {
        enabled: false,
        iframe_url: '',
      },
    },
  })

  // @ts-ignore - useFieldArray type inference issue
  const { fields: projectTypeFields, append: appendProjectType, remove: removeProjectType } = useFieldArray({
    control,
    // @ts-ignore
    name: 'form.project_types' as any,
  })

  // @ts-ignore - useFieldArray type inference issue
  const { fields: budgetFields, append: appendBudget, remove: removeBudget } = useFieldArray({
    control,
    // @ts-ignore
    name: 'form.budget_ranges' as any,
  })

  // @ts-ignore - useFieldArray type inference issue
  const { fields: timeframeFields, append: appendTimeframe, remove: removeTimeframe } = useFieldArray({
    control,
    // @ts-ignore
    name: 'form.start_timeframes' as any,
  })

  const mapEnabled = watch('map.enabled')

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const { data } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'contacto')
        .eq('key', 'content')
        .single()

      if ((data as any)?.value) {
        const content = typeof (data as any).value === 'string' ? JSON.parse((data as any).value) : (data as any).value
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

  const onSubmit = async (data: ContactoPageFormData) => {
    try {
      setIsSaving(true)
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section: 'contacto',
          key: 'content',
          value: data,
          updated_at: new Date().toISOString(),
        } as any, { onConflict: 'section,key' })

      if (error) throw error
      alert('✅ Contenido guardado exitosamente')
    } catch (error: any) {
      alert('❌ Error: ' + (error.message || 'Error desconocido'))
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
      {/* Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-gray-900 border border-orange-500/20 p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Gestión de Contacto</h1>
              <p className="text-gray-400">Personaliza todos los textos y opciones de la página de contacto</p>
            </div>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hero Section */}
        <Section
          title="Hero Section"
          icon={Sparkles}
          description="Título y subtítulo principal de la página"
        >
          <TextInput label="Título Principal" {...register('hero.title')} />
          <TextArea label="Subtítulo" {...register('hero.subtitle')} rows={2} />
        </Section>

        {/* Información de Contacto */}
        <Section
          title="Información de Contacto"
          icon={Phone}
          description="Datos de contacto que se muestran en la página"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <Mail className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Email</label>
                <input
                  {...register('contact_info.email')}
                  type="email"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <Phone className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Teléfono</label>
                <input
                  {...register('contact_info.phone')}
                  type="tel"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Dirección Madrid</label>
                <input
                  {...register('contact_info.address_madrid')}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Dirección Barcelona</label>
                <input
                  {...register('contact_info.address_barcelona')}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <MapPin className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Dirección Sevilla</label>
                <input
                  {...register('contact_info.address_sevilla')}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <Clock className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Horario</label>
                <input
                  {...register('contact_info.hours')}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Formulario */}
        <Section
          title="Configuración del Formulario"
          icon={Mail}
          description="Textos y opciones del formulario de contacto"
        >
          <TextInput label="Título del Formulario" {...register('form.title')} />
          <TextArea label="Descripción" {...register('form.description')} rows={2} />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Tipos de Proyecto</label>
              {projectTypeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`form.project_types.${index}`)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeProjectType(index)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendProjectType('')}
                className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Añadir Tipo
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Rangos de Presupuesto</label>
              {budgetFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`form.budget_ranges.${index}`)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeBudget(index)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendBudget('')}
                className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Añadir Rango
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Timeframes de Inicio</label>
              {timeframeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`form.start_timeframes.${index}`)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeTimeframe(index)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendTimeframe('')}
                className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Añadir Timeframe
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <TextArea label="Mensaje de Éxito" {...register('form.success_message')} rows={2} />
            <TextArea label="Mensaje de Error" {...register('form.error_message')} rows={2} />
          </div>
        </Section>

        {/* Mapa */}
        <Section
          title="Mapa de Google Maps"
          icon={Globe}
          description="Configuración del mapa (opcional)"
        >
          <div className="flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              {...register('map.enabled')}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500"
            />
            <label className="text-white font-medium">Mostrar mapa en la página</label>
          </div>
          {mapEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <TextInput
                label="URL del iframe de Google Maps"
                {...register('map.iframe_url')}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="mt-2 text-xs text-gray-400">
                💡 Obtén la URL desde Google Maps: Compartir → Insertar un mapa → Copiar HTML
              </p>
            </motion.div>
          )}
        </Section>

        {/* Botón de guardar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="sticky bottom-6 z-10"
        >
          <button
            type="submit"
            disabled={isSaving}
            className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  )
}

function Section({
  title,
  icon: Icon,
  description,
  children,
}: {
  title: string
  icon: any
  description?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
        <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}

function TextInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <input
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
        {...props}
      />
    </div>
  )
}

function TextArea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <textarea
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
        {...props}
      />
    </div>
  )
}
