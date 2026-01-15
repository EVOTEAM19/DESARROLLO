'use client'

import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Save,
  Loader2,
  Settings as SettingsIcon,
  Globe,
  Mail,
  Bell,
  Video,
  Type,
  Image as ImageIcon,
  Upload,
  X,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import Image from 'next/image'

const settingsSchema = z.object({
  site_name: z.string().min(1, 'El nombre del sitio es requerido'),
  site_url: z.string().url('Debe ser una URL válida'),
  contact_email: z.string().email('Debe ser un email válido'),
  enable_notifications: z.boolean().default(true),
  hero_title: z.string().min(1, 'El título del hero es requerido'),
  hero_subtitle: z.string().min(1, 'El subtítulo del hero es requerido'),
  hero_cta_text: z.string().min(1, 'El texto del CTA es requerido'),
  hero_cta_link: z.string().min(1, 'El enlace del CTA es requerido'),
  hero_video_url: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
})

type SettingsFormData = z.infer<typeof settingsSchema>

const STORAGE_BUCKET = 'logos'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase.from('site_settings').select('*')

      if (error) throw error

      const settingsMap: Record<string, any> = {}
      data?.forEach((setting) => {
        settingsMap[setting.key] = setting.value
      })

      setSettings(settingsMap)

      // Cargar valores en el formulario
      if (settingsMap.site_name) {
        try {
          const parsed = typeof settingsMap.site_name === 'string' ? JSON.parse(settingsMap.site_name) : settingsMap.site_name
          setValue('site_name', parsed || 'FastIA')
        } catch {
          setValue('site_name', settingsMap.site_name || 'FastIA')
        }
      }
      if (settingsMap.site_url) {
        try {
          const parsed = typeof settingsMap.site_url === 'string' ? JSON.parse(settingsMap.site_url) : settingsMap.site_url
          setValue('site_url', parsed || '')
        } catch {
          setValue('site_url', settingsMap.site_url || '')
        }
      }
      if (settingsMap.contact_email) {
        try {
          const parsed = typeof settingsMap.contact_email === 'string' ? JSON.parse(settingsMap.contact_email) : settingsMap.contact_email
          setValue('contact_email', parsed || '')
        } catch {
          setValue('contact_email', settingsMap.contact_email || '')
        }
      }
      if (settingsMap.enable_notifications !== undefined) {
        try {
          const parsed = typeof settingsMap.enable_notifications === 'string' ? JSON.parse(settingsMap.enable_notifications) : settingsMap.enable_notifications
          setValue('enable_notifications', parsed ?? true)
        } catch {
          setValue('enable_notifications', settingsMap.enable_notifications ?? true)
        }
      }
      
      // Cargar datos del Hero
      if (settingsMap.hero_section) {
        try {
          const heroData = typeof settingsMap.hero_section === 'string' ? JSON.parse(settingsMap.hero_section) : settingsMap.hero_section
          setValue('hero_title', heroData?.title || '')
          setValue('hero_subtitle', heroData?.subtitle || '')
          setValue('hero_cta_text', heroData?.cta_text || '')
          setValue('hero_cta_link', heroData?.cta_link || '')
          setValue('hero_video_url', heroData?.video_url || '')
        } catch {
          // Si hay error, usar valores por defecto
          setValue('hero_title', 'Desarrollo de Plataformas Digitales con IA')
          setValue('hero_subtitle', 'TypeScript, React, Node.js, Kotlin, iOS, Android, Flux.\nSoluciones empresariales que transforman negocios.')
          setValue('hero_cta_text', 'Descubre nuestras soluciones')
          setValue('hero_cta_link', '/productos')
          setValue('hero_video_url', 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4')
        }
      }

      // Cargar logo
      if (settingsMap.logo_url) {
        try {
          const logo = typeof settingsMap.logo_url === 'string' ? JSON.parse(settingsMap.logo_url) : settingsMap.logo_url
          setLogoUrl(logo || '')
        } catch {
          setLogoUrl(settingsMap.logo_url || '')
        }
      }
    } catch (error) {
      console.error('Error cargando configuración:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, sube solo archivos de imagen')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede ser mayor a 5MB')
      return
    }

    try {
      setIsUploadingLogo(true)
      const supabase = createBrowserClient()

      // VERIFICAR AUTENTICACIÓN PRIMERO
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Error de autenticación:', authError)
        alert('Error: No estás autenticado. Por favor, inicia sesión nuevamente.')
        return
      }
      console.log('Usuario autenticado:', user.email)

      // El bucket debe existir (creado desde Supabase Dashboard o SQL)
      // No verificamos aquí para evitar problemas de permisos
      // Si el bucket no existe, el upload fallará con un error claro
      console.log('Intentando subir a bucket:', STORAGE_BUCKET)

      // Eliminar logo anterior si existe
      if (logoUrl) {
        try {
          const oldFileName = logoUrl.split('/').pop()?.split('?')[0]
          if (oldFileName) {
            await supabase.storage.from(STORAGE_BUCKET).remove([`logo/${oldFileName}`])
          }
        } catch (error) {
          console.warn('No se pudo eliminar el logo anterior:', error)
        }
      }

      // Generar nombre único
      const fileExt = file.name.split('.').pop()
      const fileName = `logo/fastia-logo-${Date.now()}.${fileExt}`
      
      // Upload con mejor manejo de errores
      console.log('Iniciando upload a:', STORAGE_BUCKET, 'archivo:', fileName)
      
      const uploadResult = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })
      
      if (uploadResult.error) {
        console.error('Error en upload:', uploadResult.error)
        console.error('Detalles:', {
          message: uploadResult.error.message,
          statusCode: uploadResult.error.statusCode,
          error: uploadResult.error,
        })
        
        // Si el archivo ya existe, intentar con upsert
        if (uploadResult.error.message?.includes('already exists') || uploadResult.error.message?.includes('duplicate')) {
          console.log('Archivo existe, intentando con upsert...')
          const upsertResult = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: true,
            })
          
          if (upsertResult.error) {
            console.error('Error en upsert:', upsertResult.error)
            throw upsertResult.error
          }
          
          console.log('Upload exitoso con upsert')
        } else {
          throw uploadResult.error
        }
      } else {
        console.log('Upload exitoso')
      }

      // Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName)

      // Guardar URL en site_settings
      // La tabla tiene UNIQUE(section, key), así que necesitamos especificar ambos
      const { error: saveError } = await supabase
        .from('site_settings')
        .upsert(
          {
            section: 'general',
            key: 'logo_url',
            value: publicUrl, // Guardar como string directamente, no JSON.stringify
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'section,key' }
        )

      if (saveError) throw saveError

      setLogoUrl(publicUrl)
      alert('Logo actualizado exitosamente')
    } catch (error: any) {
      console.error('Error subiendo logo:', error)
      alert('Error al subir el logo: ' + (error.message || 'Error desconocido'))
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleRemoveLogo = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar el logo?')) return

    try {
      const supabase = createBrowserClient()
      
      // Eliminar de storage
      if (logoUrl) {
        try {
          const fileName = logoUrl.split('/').pop()?.split('?')[0]
          if (fileName) {
            await supabase.storage.from(STORAGE_BUCKET).remove([`logo/${fileName}`])
          }
        } catch (error) {
          console.warn('No se pudo eliminar el logo del storage:', error)
        }
      }

      // Eliminar de site_settings
      const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('key', 'logo_url')

      if (error) throw error

      setLogoUrl('')
      alert('Logo eliminado exitosamente')
    } catch (error: any) {
      console.error('Error eliminando logo:', error)
      alert('Error al eliminar el logo: ' + (error.message || 'Error desconocido'))
    }
  }

  const onSubmit = async (data: SettingsFormData) => {
    try {
      setIsSaving(true)
      const supabase = createBrowserClient()

      const updates = [
        { key: 'site_name', value: JSON.stringify(data.site_name) },
        { key: 'site_url', value: JSON.stringify(data.site_url) },
        { key: 'contact_email', value: JSON.stringify(data.contact_email) },
        { key: 'enable_notifications', value: JSON.stringify(data.enable_notifications) },
        { 
          key: 'hero_section', 
          value: JSON.stringify({
            title: data.hero_title,
            subtitle: data.hero_subtitle,
            cta_text: data.hero_cta_text,
            cta_link: data.hero_cta_link,
            video_url: data.hero_video_url || 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4',
          })
        },
      ]

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            {
              key: update.key,
              value: update.value,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'key' }
          )

        if (error) throw error
      }

      alert('Configuración guardada exitosamente')
      await loadSettings()
    } catch (error: any) {
      console.error('Error guardando configuración:', error)
      alert('Error al guardar la configuración: ' + (error.message || 'Error desconocido'))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent-orange-500" />
      </div>
    )
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Configuración</h1>
          <p className="text-foreground-muted mt-1">Gestiona la configuración general del sitio</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="w-5 h-5 text-accent-orange-500" />
              <h2 className="text-xl font-semibold text-foreground">Logo del Sitio</h2>
            </div>

            <div className="space-y-4">
              {/* Preview del logo actual */}
              {logoUrl && (
                <div className="relative">
                  <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={logoUrl}
                      alt="Logo actual"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Eliminar logo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload area */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  {logoUrl ? 'Cambiar Logo' : 'Subir Logo'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleLogoUpload(file)
                      }
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={isUploadingLogo}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-orange-500 hover:bg-accent-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isUploadingLogo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        {logoUrl ? 'Cambiar Logo' : 'Subir Logo'}
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-foreground-muted">
                  Formatos aceptados: JPG, PNG, GIF, WebP, SVG. Tamaño máximo: 5MB
                </p>
              </div>
            </div>
          </motion.div>

          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-5 h-5 text-accent-orange-500" />
              <h2 className="text-xl font-semibold text-foreground">Configuración General</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Nombre del Sitio</label>
                <input
                  {...register('site_name')}
                  className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="FastIA"
                />
                {errors.site_name && (
                  <p className="mt-1 text-sm text-error">{errors.site_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">URL del Sitio</label>
                <input
                  {...register('site_url')}
                  type="url"
                  className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                  placeholder="https://thinkia.com"
                />
                {errors.site_url && (
                  <p className="mt-1 text-sm text-error">{errors.site_url.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-accent-orange-500" />
              <h2 className="text-xl font-semibold text-foreground">Contacto</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Email de Contacto</label>
              <input
                {...register('contact_email')}
                type="email"
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                placeholder="contacto@thinkia.com"
              />
              {errors.contact_email && (
                <p className="mt-1 text-sm text-error">{errors.contact_email.message}</p>
              )}
            </div>
          </motion.div>

          {/* Hero Section Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Type className="w-5 h-5 text-accent-orange-500" />
              <h2 className="text-xl font-semibold text-foreground">Sección Hero (Página Principal)</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Título Principal <span className="text-error">*</span>
                </label>
                <input
                  {...register('hero_title')}
                  type="text"
                  className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                  placeholder="Desarrollo de Plataformas Digitales con IA"
                />
                {errors.hero_title && (
                  <p className="mt-1 text-sm text-error">{errors.hero_title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Subtítulo <span className="text-error">*</span>
                </label>
                <textarea
                  {...register('hero_subtitle')}
                  rows={3}
                  className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                  placeholder="TypeScript, React, Node.js, Kotlin, iOS, Android, Flux.&#10;Soluciones empresariales que transforman negocios."
                />
                {errors.hero_subtitle && (
                  <p className="mt-1 text-sm text-error">{errors.hero_subtitle.message}</p>
                )}
                <p className="mt-1 text-xs text-foreground-muted">Usa \n para saltos de línea</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Texto del Botón CTA <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('hero_cta_text')}
                    type="text"
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Descubre nuestras soluciones"
                  />
                  {errors.hero_cta_text && (
                    <p className="mt-1 text-sm text-error">{errors.hero_cta_text.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Enlace del Botón CTA <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('hero_cta_link')}
                    type="text"
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="/productos"
                  />
                  {errors.hero_cta_link && (
                    <p className="mt-1 text-sm text-error">{errors.hero_cta_link.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  URL del Video de Fondo
                </label>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-foreground-muted" />
                  <input
                    {...register('hero_video_url')}
                    type="url"
                    className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="https://assets.mixkit.co/videos/preview/..."
                  />
                </div>
                {errors.hero_video_url && (
                  <p className="mt-1 text-sm text-error">{errors.hero_video_url.message}</p>
                )}
                <p className="mt-1 text-xs text-foreground-muted">
                  URL del video que se mostrará como fondo del hero. Si está vacío, se usará el video por defecto.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-accent-orange-500" />
              <h2 className="text-xl font-semibold text-foreground">Notificaciones</h2>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('enable_notifications')}
                id="enable_notifications"
                className="w-4 h-4"
              />
              <label htmlFor="enable_notifications" className="text-sm text-foreground">
                Habilitar notificaciones
              </label>
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-accent-orange-600 text-white rounded-lg hover:bg-accent-orange-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Configuración
                </>
              )}
            </button>
          </div>
        </form>
      </div>
  )
}
