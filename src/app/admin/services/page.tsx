'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Loader2,
  Briefcase,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const serviceSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200, 'El nombre es demasiado largo'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(200, 'El slug es demasiado largo')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  icon: z.string().min(1, 'El icono es requerido'),
  category: z.string().min(1, 'La categoría es requerida'),
  published: z.boolean().default(false),
  order: z.number().default(0),
})

type ServiceFormData = z.infer<typeof serviceSchema>

type Service = {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  category: string
  published: boolean
  order: number
  created_at: string
  updated_at: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  })

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    let filtered = [...services]
    if (searchQuery) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredServices(filtered)
  }, [services, searchQuery])

  const loadServices = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase.from('services').select('*').order('order', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error cargando servicios:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setValue('name', service.name)
      setValue('slug', service.slug)
      setValue('description', service.description)
      setValue('icon', service.icon)
      setValue('category', service.category)
      setValue('published', service.published)
      setValue('order', service.order)
    } else {
      setEditingService(null)
      reset()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingService(null)
    reset()
  }

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsSaving(true)
      const supabase = createBrowserClient()

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update({
            name: data.name,
            slug: data.slug,
            description: data.description,
            icon: data.icon,
            category: data.category,
            published: data.published,
            order: data.order,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingService.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('services').insert({
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          category: data.category,
          published: data.published,
          order: data.order,
        })

        if (error) throw error
      }

      await loadServices()
      closeModal()
    } catch (error: any) {
      console.error('Error guardando servicio:', error)
      alert('Error al guardar el servicio: ' + (error.message || 'Error desconocido'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este servicio?')) return

    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) throw error
      await loadServices()
    } catch (error) {
      console.error('Error eliminando servicio:', error)
      alert('Error al eliminar el servicio')
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Servicios</h1>
            <p className="text-foreground-muted mt-1">Gestiona los servicios de tu sitio web</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-accent-orange-600 text-white rounded-lg hover:bg-accent-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Servicio
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent-orange-500"
          />
        </div>

        {/* Services List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent-orange-500" />
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12 text-foreground-muted">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay servicios disponibles</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                      {service.published ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Publicado
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          Borrador
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">/{service.slug}</p>
                    <p className="text-sm text-foreground-muted">{service.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-foreground-muted">
                      <span>Categoría: {service.category}</span>
                      <span>Orden: {service.order}</span>
                      <span>Icono: {service.icon}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(service)}
                      className="p-2 text-accent-orange-500 hover:bg-accent-orange-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-foreground/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Nombre</label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Nombre del servicio"
                  />
                  {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Slug</label>
                  <input
                    {...register('slug')}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="mi-servicio"
                  />
                  {errors.slug && <p className="mt-1 text-sm text-error">{errors.slug.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Descripción</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Descripción del servicio"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Icono</label>
                    <input
                      {...register('icon')}
                      className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                      placeholder="sparkles"
                    />
                    {errors.icon && <p className="mt-1 text-sm text-error">{errors.icon.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Categoría</label>
                    <input
                      {...register('category')}
                      className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                      placeholder="IA Generativa"
                    />
                    {errors.category && (
                      <p className="mt-1 text-sm text-error">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Orden</label>
                  <input
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('published')}
                    id="published"
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="text-sm text-foreground">
                    Publicado
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-accent-orange-600 text-white rounded-lg hover:bg-accent-orange-700 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                        Guardando...
                      </>
                    ) : (
                      'Guardar'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
