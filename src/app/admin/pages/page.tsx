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
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

const pageSchema = z.object({
  slug: z.string().min(1, 'El slug es requerido').max(200, 'El slug es demasiado largo'),
  title: z.string().min(1, 'El título es requerido').max(200, 'El título es demasiado largo'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  meta_title: z.string().max(200).optional(),
  meta_description: z.string().max(500).optional(),
  published: z.boolean().default(false),
})

type PageFormData = z.infer<typeof pageSchema>

type Page = {
  id: string
  slug: string
  title: string
  content: any
  meta_title: string | null
  meta_description: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
  })

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    let filtered = [...pages]
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredPages(filtered)
  }, [pages, searchQuery])

  const loadPages = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false })

      if (error) throw error
      setPages(data || [])
    } catch (error) {
      console.error('Error cargando páginas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (page?: Page) => {
    if (page) {
      setEditingPage(page)
      setValue('slug', page.slug)
      setValue('title', page.title)
      setValue('content', typeof page.content === 'string' ? page.content : JSON.stringify(page.content))
      setValue('meta_title', page.meta_title || '')
      setValue('meta_description', page.meta_description || '')
      setValue('published', page.published)
    } else {
      setEditingPage(null)
      reset()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPage(null)
    reset()
  }

  const onSubmit = async (data: PageFormData) => {
    try {
      setIsSaving(true)
      const supabase = createBrowserClient()

      let content
      try {
        content = JSON.parse(data.content)
      } catch {
        content = { sections: [data.content] }
      }

      if (editingPage) {
        const { error } = await supabase
          .from('pages')
          .update({
            slug: data.slug,
            title: data.title,
            content,
            meta_title: data.meta_title || null,
            meta_description: data.meta_description || null,
            published: data.published,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingPage.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('pages').insert({
          slug: data.slug,
          title: data.title,
          content,
          meta_title: data.meta_title || null,
          meta_description: data.meta_description || null,
          published: data.published,
        })

        if (error) throw error
      }

      await loadPages()
      closeModal()
    } catch (error: any) {
      console.error('Error guardando página:', error)
      alert('Error al guardar la página: ' + (error.message || 'Error desconocido'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta página?')) return

    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.from('pages').delete().eq('id', id)

      if (error) throw error
      await loadPages()
    } catch (error) {
      console.error('Error eliminando página:', error)
      alert('Error al eliminar la página')
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Páginas</h1>
            <p className="text-foreground-muted mt-1">Gestiona las páginas de tu sitio web</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-accent-orange-500 text-white rounded-lg hover:bg-accent-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Página
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            placeholder="Buscar páginas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue-500"
          />
        </div>

        {/* Pages List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent-blue-500" />
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-12 text-foreground-muted">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay páginas disponibles</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPages.map((page) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{page.title}</h3>
                      {page.published ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Publicada
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          Borrador
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">/{page.slug}</p>
                    {page.meta_description && (
                      <p className="text-sm text-foreground-muted">{page.meta_description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(page)}
                      className="p-2 text-accent-blue-500 hover:bg-accent-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
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
                    {editingPage ? 'Editar Página' : 'Nueva Página'}
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
                  <label className="block text-sm font-semibold mb-2 text-foreground">Slug</label>
                  <input
                    {...register('slug')}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="mi-pagina"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-error">{errors.slug.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Título</label>
                  <input
                    {...register('title')}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Título de la página"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-error">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Contenido (JSON)</label>
                  <textarea
                    {...register('content')}
                    rows={8}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground font-mono text-sm"
                    placeholder='{"sections": ["hero", "content"]}'
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-error">{errors.content.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Meta Título</label>
                  <input
                    {...register('meta_title')}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Título para SEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Meta Descripción</label>
                  <textarea
                    {...register('meta_description')}
                    rows={3}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground"
                    placeholder="Descripción para SEO"
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
                    Publicada
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-accent-orange-500 text-white rounded-lg hover:bg-accent-orange-600 transition-colors disabled:opacity-50"
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
