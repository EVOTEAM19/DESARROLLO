'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import { trackFormSubmit, trackConversion } from '@/lib/analytics'
import { getContactoContent } from '@/lib/content'

// Schema de validación con Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor, ingresa un email válido')
    .max(255, 'El email es demasiado largo'),
  phone: z
    .string()
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(200, 'El nombre de la empresa no puede exceder 200 caracteres')
    .optional()
    .or(z.literal('')),
  project_type: z
    .string()
    .min(1, 'Por favor, selecciona qué necesitas'),
  budget_range: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
  start_timeframe: z
    .string()
    .optional()
    .or(z.literal('')),
})

type ContactFormData = z.infer<typeof contactSchema>

type FormState = 'idle' | 'loading' | 'success' | 'error'

const defaultProjectTypes = [
  'Desarrollo de app móvil',
  'Plataforma web',
  'Automatización con IA',
  'Consultoría tecnológica',
  'Migración cloud',
  'Mantenimiento',
  'Otro',
]

const defaultBudgetRanges = [
  '< 10.000€',
  '10.000€ - 30.000€',
  '30.000€ - 50.000€',
  '50.000€ - 100.000€',
  '+100.000€',
  'No lo sé aún',
]

const defaultStartTimeframes = [
  'Lo antes posible',
  'En 1 mes',
  'En 2-3 meses',
  'Más de 3 meses',
]

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [content, setContent] = useState<any>(null)
  const [isLoadingContent, setIsLoadingContent] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const contactoContent = await getContactoContent()
      if (contactoContent) {
        setContent(contactoContent)
      }
    } catch (error) {
      console.error('Error cargando contenido de contacto:', error)
    } finally {
      setIsLoadingContent(false)
    }
  }

  const projectTypes = content?.form?.project_types || defaultProjectTypes
  const budgetRanges = content?.form?.budget_ranges || defaultBudgetRanges
  const startTimeframes = content?.form?.start_timeframes || defaultStartTimeframes
  const formTitle = content?.form?.title || '¿Hablamos de tu proyecto?'
  const formDescription = content?.form?.description || 'Estamos aquí para ayudarte. Cuéntanos tu idea y te respondemos en menos de 24 horas.'
  const successMessage = content?.form?.success_message || '¡Mensaje enviado! Te responderemos pronto.'
  const errorMessageText = content?.form?.error_message || 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.'
  
  const contactInfo = content?.contact_info || {
    email: 'hola@fastia.com',
    phone: '+34 910 123 456',
    address_madrid: 'Gran Vía 45, 3ª planta, 28013 Madrid',
    address_barcelona: 'Passeig de Gràcia 21, 08007 Barcelona',
    address_sevilla: 'Av. Constitución 18, 41001 Sevilla',
    hours: 'Lunes a Viernes, 9:00 - 18:00h',
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  // Función para sanitizar inputs
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
  }

  const onSubmit = async (data: ContactFormData) => {
    setFormState('loading')
    setErrorMessage('')

    try {
      // Sanitizar los datos
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email).toLowerCase(),
        phone: data.phone ? sanitizeInput(data.phone) : null,
        company: data.company ? sanitizeInput(data.company) : null,
        project_type: data.project_type || null,
        budget_range: data.budget_range || null,
        message: sanitizeInput(data.message),
        start_timeframe: data.start_timeframe || null,
        status: 'new' as const,
      }

      // Obtener cliente de Supabase
      const supabase = createBrowserClient()

      // Insertar en la tabla contact_messages
      const { error } = await supabase.from('contact_messages').insert([
        sanitizedData,
      ])

      if (error) {
        throw error
      }

      // Éxito
      setFormState('success')
      reset()

      // Tracking de analytics
      trackFormSubmit('contact_form', {
        project_type: sanitizedData.project_type,
        budget_range: sanitizedData.budget_range,
      })
      trackConversion('contact_form_submit', 1)

      // Resetear a idle después de 5 segundos
      setTimeout(() => {
        setFormState('idle')
      }, 5000)
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error al enviar mensaje:', error)
      }
      setFormState('error')
      setErrorMessage(
        error?.message || errorMessageText
      )

      // Resetear error después de 5 segundos
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* COLUMNA IZQUIERDA: Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Título y descripción */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-foreground">
                {formTitle}
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                {formDescription}
              </p>
            </div>

            {/* Información de contacto */}
            <div className="space-y-6">
              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1 uppercase tracking-wider">
                    Dirección
                  </h3>
                  <div className="text-base text-foreground space-y-1">
                    <p><strong className="text-white">Madrid:</strong> {contactInfo.address_madrid}</p>
                    <p><strong className="text-white">Barcelona:</strong> {contactInfo.address_barcelona}</p>
                    <p><strong className="text-white">Sevilla:</strong> {contactInfo.address_sevilla}</p>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1 uppercase tracking-wider">
                    Teléfono
                  </h3>
                  <a
                    href={`tel:${contactInfo.phone?.replace(/\s/g, '')}`}
                    className="text-base text-foreground hover:text-accent-orange-500 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1 uppercase tracking-wider">
                    Email
                  </h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-base text-foreground hover:text-accent-orange-500 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-muted mb-1 uppercase tracking-wider">
                    Horario
                  </h3>
                  <p className="text-base text-foreground">
                    {contactInfo.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa (opcional) */}
            {content?.map?.enabled && content?.map?.iframe_url && (
              <div className="mt-8 rounded-xl overflow-hidden border border-foreground/10">
                <div
                  className="aspect-video"
                  dangerouslySetInnerHTML={{ __html: content.map.iframe_url }}
                />
              </div>
            )}
          </motion.div>

          {/* COLUMNA DERECHA: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-background-secondary rounded-2xl p-6 md:p-8 border border-foreground/10"
              noValidate
            >
              {/* Mensaje de éxito */}
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <p className="text-success font-medium">
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mensaje de error */}
              <AnimatePresence>
                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                    <p className="text-error font-medium">
                      {errorMessage || errorMessageText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                {/* Campo: Nombre completo */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Nombre completo <span className="text-accent-orange-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: Email corporativo */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Email corporativo <span className="text-accent-orange-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: Teléfono */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Teléfono <span className="text-foreground-muted text-xs">(opcional)</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                    placeholder="+34 600 000 000"
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: Empresa */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Empresa <span className="text-foreground-muted text-xs">(opcional)</span>
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    aria-invalid={errors.company ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 ${
                      errors.company
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                    placeholder="Tu empresa"
                  />
                  {errors.company && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.company.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: ¿Qué necesitas? */}
                <div>
                  <label
                    htmlFor="project_type"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    ¿Qué necesitas? <span className="text-accent-orange-500">*</span>
                  </label>
                  <select
                    {...register('project_type')}
                    id="project_type"
                    name="project_type"
                    aria-required="true"
                    aria-invalid={errors.project_type ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground focus:outline-none focus:ring-2 ${
                      errors.project_type
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                  >
                    <option value="">Selecciona una opción</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.project_type && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.project_type.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: Presupuesto estimado */}
                <div>
                  <label
                    htmlFor="budget_range"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Presupuesto estimado <span className="text-foreground-muted text-xs">(opcional)</span>
                  </label>
                  <select
                    {...register('budget_range')}
                    id="budget_range"
                    name="budget_range"
                    aria-invalid={errors.budget_range ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground focus:outline-none focus:ring-2 ${
                      errors.budget_range
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                  >
                    <option value="">Selecciona una opción</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.budget_range && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.budget_range.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: Cuéntanos tu proyecto */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Cuéntanos tu proyecto <span className="text-accent-orange-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    name="message"
                    rows={6}
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 resize-y min-h-[120px] ${
                      errors.message
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo: ¿Cuándo necesitas empezar? */}
                <div>
                  <label
                    htmlFor="start_timeframe"
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    ¿Cuándo necesitas empezar? <span className="text-foreground-muted text-xs">(opcional)</span>
                  </label>
                  <select
                    {...register('start_timeframe')}
                    id="start_timeframe"
                    name="start_timeframe"
                    aria-invalid={errors.start_timeframe ? 'true' : 'false'}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-background text-foreground focus:outline-none focus:ring-2 ${
                      errors.start_timeframe
                        ? 'border-error focus:ring-error/20 focus:border-error'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                    }`}
                  >
                    <option value="">Selecciona una opción</option>
                    {startTimeframes.map((timeframe) => (
                      <option key={timeframe} value={timeframe}>
                        {timeframe}
                      </option>
                    ))}
                  </select>
                  {errors.start_timeframe && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.start_timeframe.message}
                    </motion.p>
                  )}
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isSubmitting || formState === 'loading'}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-orange-500 via-accent-orange-600 to-accent-orange-700 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-glow-orange hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-accent-orange-500/50"
                  aria-label="Enviar mensaje de contacto"
                >
                  {isSubmitting || formState === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
