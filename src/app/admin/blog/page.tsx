'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Calendar,
  Tag,
  User,
  FileText,
  Save,
  EyeOff,
  Globe,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Schema de validación
const blogPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'El título es demasiado largo'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(200, 'El slug es demasiado largo')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  excerpt: z.string().min(10, 'El extracto debe tener al menos 10 caracteres').max(500, 'El extracto es demasiado largo'),
  content: z.string().min(50, 'El contenido debe tener al menos 50 caracteres'),
  image_url: z.string().optional(),
  author: z.string().min(1, 'El autor es requerido'),
  category: z.string().min(1, 'La categoría es requerida'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
  meta_title: z.string().max(60, 'El meta título no debe exceder 60 caracteres').optional(),
  meta_description: z.string().max(160, 'La meta descripción no debe exceder 160 caracteres').optional(),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  author: string | null
  category: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

const ITEMS_PER_PAGE = 10
const STORAGE_BUCKET = 'blog'

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'all' | 'drafts'>('all')
  const [uploading, setUploading] = useState(false)
  const [showSEOPreview, setShowSEOPreview] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      tags: [],
      published: false,
      published_at: null,
    },
  })

  const watchedTitle = watch('title')
  const watchedMetaTitle = watch('meta_title')
  const watchedMetaDescription = watch('meta_description')
  const watchedExcerpt = watch('excerpt')

  // Auto-generar slug desde título
  useEffect(() => {
    if (watchedTitle && !editingPost) {
      const slug = watchedTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [watchedTitle, editingPost, setValue])

  // Auto-generar meta desde título y excerpt
  useEffect(() => {
    if (!editingPost && watchedTitle && !watchedMetaTitle) {
      setValue('meta_title', watchedTitle.length > 60 ? watchedTitle.substring(0, 57) + '...' : watchedTitle)
    }
  }, [watchedTitle, watchedMetaTitle, editingPost, setValue])

  useEffect(() => {
    if (!editingPost && watchedExcerpt && !watchedMetaDescription) {
      setValue('meta_description', watchedExcerpt.length > 160 ? watchedExcerpt.substring(0, 157) + '...' : watchedExcerpt)
    }
  }, [watchedExcerpt, watchedMetaDescription, editingPost, setValue])

  // Cargar posts
  useEffect(() => {
    loadPosts()
  }, [])

  // Filtrar posts
  useEffect(() => {
    let filtered = [...posts]

    // Vista: todos o solo drafts
    if (viewMode === 'drafts') {
      filtered = filtered.filter((p) => !p.published)
    }

    // Búsqueda
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    // Filtro por estado
    if (statusFilter === 'published') {
      filtered = filtered.filter((p) => p.published)
    } else if (statusFilter === 'draft') {
      filtered = filtered.filter((p) => !p.published)
    }

    // Filtro por fecha
    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      if (dateFilter === 'today') {
        filterDate.setHours(0, 0, 0, 0)
        filtered = filtered.filter((p) => new Date(p.created_at) >= filterDate)
      } else if (dateFilter === 'week') {
        filterDate.setDate(now.getDate() - 7)
        filtered = filtered.filter((p) => new Date(p.created_at) >= filterDate)
      } else if (dateFilter === 'month') {
        filterDate.setMonth(now.getMonth() - 1)
        filtered = filtered.filter((p) => new Date(p.created_at) >= filterDate)
      }
    }

    // Ordenar por fecha
    filtered.sort((a, b) => {
      const dateA = a.published_at || a.created_at
      const dateB = b.published_at || b.created_at
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [posts, searchQuery, categoryFilter, statusFilter, dateFilter, viewMode])

  const loadPosts = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error cargando posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategories = () => {
    const categories = new Set<string>()
    posts.forEach((p) => {
      if (p.category) categories.add(p.category)
    })
    return Array.from(categories)
  }

  const getAllTags = () => {
    const tags = new Set<string>()
    posts.forEach((p) => {
      p.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      setUploading(true)
      const supabase = createBrowserClient()

      // Verificar bucket
      const { data: buckets } = await supabase.storage.listBuckets()
      if (!buckets?.find((b) => b.name === STORAGE_BUCKET)) {
        const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
          public: true,
        })
        if (createError && createError.message !== 'Bucket already exists') {
          throw createError
        }
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error subiendo imagen:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      const supabase = createBrowserClient()

      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image_url: data.image_url || null,
        author: data.author,
        category: data.category,
        tags: data.tags,
        published: data.published,
        meta_title: data.meta_title || undefined,
        meta_description: data.meta_description || undefined,
        published_at: data.published && !data.published_at 
          ? new Date().toISOString() 
          : data.published_at || null,
      }

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          // @ts-ignore - Supabase type inference issue
          .update(postData as any)
          .eq('id', editingPost.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from('blog_posts') as any).insert([postData])

        if (error) throw error
      }

      await loadPosts()
      setIsModalOpen(false)
      setEditingPost(null)
      reset()
    } catch (error: any) {
      console.error('Error guardando post:', error)
      alert(error.message || 'Error al guardar el artículo')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      image_url: post.image_url || '',
      author: post.author || '',
      category: post.category || '',
      tags: post.tags || [],
      published: post.published,
      published_at: post.published_at || null,
      meta_title: (post as any).meta_title || undefined,
      meta_description: (post as any).meta_description || undefined,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.from('blog_posts').delete().eq('id', id)

      if (error) throw error

      await loadPosts()
      setDeleteConfirm(null)
    } catch (error: any) {
      console.error('Error eliminando post:', error)
      alert(error.message || 'Error al eliminar el artículo')
    }
  }

  const togglePublished = async (post: BlogPost) => {
    try {
      const supabase = createBrowserClient()
      const updateData: any = { published: !post.published }
      
      if (!post.published && !post.published_at) {
        updateData.published_at = new Date().toISOString()
      }

      const { error } = await supabase
        .from('blog_posts')
        // @ts-ignore - Supabase type inference issue
        .update(updateData as any)
        .eq('id', post.id)

      if (error) throw error

      await loadPosts()
    } catch (error: any) {
      console.error('Error actualizando estado:', error)
      alert(error.message || 'Error al actualizar el estado')
    }
  }

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <>
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Gestión de Artículos
            </h1>
            <p className="text-foreground-muted">
              Administra los artículos y reflexiones del blog
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'all' ? 'drafts' : 'all')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                viewMode === 'drafts'
                  ? 'bg-accent-orange-500 text-white'
                  : 'bg-white border border-foreground/20 text-foreground hover:bg-background-secondary'
              )}
            >
              {viewMode === 'drafts' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {viewMode === 'drafts' ? 'Solo Borradores' : 'Todos los Artículos'}
            </button>
            <button
              onClick={() => {
                setEditingPost(null)
                reset({
                  title: '',
                  slug: '',
                  excerpt: '',
                  content: '',
                  image_url: '',
                  author: '',
                  category: '',
                  tags: [],
                  published: false,
                  published_at: null,
                  meta_title: '',
                  meta_description: '',
                })
                setIsModalOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-orange-600 to-accent-orange-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Nuevo Artículo
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg p-4 border border-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 focus:border-accent-orange-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
            >
              <option value="all">Todas las categorías</option>
              {getCategories().map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
            >
              <option value="all">Todos los estados</option>
              <option value="published">Publicados</option>
              <option value="draft">Borradores</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
            >
              <option value="all">Todas las fechas</option>
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
            </select>
          </div>
        </div>

        {/* Tabla de artículos */}
        <div className="bg-white rounded-lg border border-foreground/10 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-orange-500" />
              <p className="text-foreground-muted">Cargando artículos...</p>
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
              <p className="text-foreground-muted">No se encontraron artículos</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Autor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {paginatedPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-background-secondary transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">{post.title}</div>
                          <div className="text-sm text-foreground-muted">/{post.slug}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground-muted">
                          {post.author || 'Sin autor'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-accent-orange-500/10 text-accent-orange-500 rounded">
                            {post.category || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePublished(post)}
                            className={cn(
                              'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                              post.published
                                ? 'bg-success/10 text-success'
                                : 'bg-foreground-muted/10 text-foreground-muted'
                            )}
                          >
                            {post.published ? 'Publicado' : 'Borrador'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground-muted">
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('es-ES')
                            : new Date(post.created_at).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2 text-accent-orange-500 hover:bg-accent-orange-500/10 rounded-lg transition-colors"
                              aria-label="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(post.id)}
                              className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                              aria-label="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-foreground/10 flex items-center justify-between">
                  <div className="text-sm text-foreground-muted">
                    Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredPosts.length)} de{' '}
                    {filteredPosts.length} artículos
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-foreground/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-foreground/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-secondary transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de creación/edición */}
      <AnimatePresence>
        {isModalOpen && (
          <BlogPostModal
            editingPost={editingPost}
            onClose={() => {
              setIsModalOpen(false)
              setEditingPost(null)
              reset()
            }}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            uploading={uploading}
            onImageUpload={handleImageUpload}
            setValue={setValue}
            watch={watch}
            showSEOPreview={showSEOPreview}
            setShowSEOPreview={setShowSEOPreview}
            allTags={getAllTags()}
            categories={getCategories()}
          />
        )}
      </AnimatePresence>

      {/* Modal de confirmación de eliminación */}
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteConfirmModal
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Componente Modal de Artículo
interface BlogPostModalProps {
  editingPost: BlogPost | null
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  register: any
  errors: any
  isSubmitting: boolean
  uploading: boolean
  onImageUpload: (file: File) => Promise<string>
  setValue: any
  watch: any
  showSEOPreview: boolean
  setShowSEOPreview: (show: boolean) => void
  allTags: string[]
  categories: string[]
}

function BlogPostModal({
  editingPost,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
  uploading,
  onImageUpload,
  setValue,
  watch,
  showSEOPreview,
  setShowSEOPreview,
  allTags,
  categories,
}: BlogPostModalProps) {
  const [tags, setTags] = useState<string[]>(watch('tags') || [])
  const [newTag, setNewTag] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(watch('image_url') || null)
  const [content, setContent] = useState(watch('content') || '')

  const watchedMetaTitle = watch('meta_title')
  const watchedMetaDescription = watch('meta_description')

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await onImageUpload(file)
      setValue('image_url', url)
      setImagePreview(url)
    } catch (error) {
      alert('Error al subir la imagen')
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updated = [...tags, newTag.trim()]
      setTags(updated)
      setValue('tags', updated)
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updated = tags.filter((t) => t !== tagToRemove)
    setTags(updated)
    setValue('tags', updated)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setValue('content', value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-foreground/10 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Título <span className="text-error">*</span>
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                    errors.title
                      ? 'border-error focus:ring-error/20'
                      : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                  )}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-error">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Slug <span className="text-error">*</span>
                </label>
                <input
                  {...register('slug')}
                  type="text"
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                    errors.slug
                      ? 'border-error focus:ring-error/20'
                      : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                  )}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-error">{errors.slug.message}</p>
                )}
              </div>

              {/* Extracto */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Extracto <span className="text-error">*</span>
                </label>
                <textarea
                  {...register('excerpt')}
                  rows={3}
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y',
                    errors.excerpt
                      ? 'border-error focus:ring-error/20'
                      : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                  )}
                />
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-error">{errors.excerpt.message}</p>
                )}
              </div>

              {/* Contenido (Editor básico - se puede mejorar con Tiptap) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Contenido <span className="text-error">*</span>
                </label>
                <div className="mb-2 flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                      if (textarea) {
                        const start = textarea.selectionStart
                        const end = textarea.selectionEnd
                        const selected = content.substring(start, end)
                        const newContent = content.substring(0, start) + `**${selected}**` + content.substring(end)
                        setContent(newContent)
                        setValue('content', newContent)
                      }
                    }}
                    className="px-3 py-1 text-sm border border-foreground/20 rounded hover:bg-background-secondary"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                      if (textarea) {
                        const start = textarea.selectionStart
                        const end = textarea.selectionEnd
                        const selected = content.substring(start, end)
                        const newContent = content.substring(0, start) + `*${selected}*` + content.substring(end)
                        setContent(newContent)
                        setValue('content', newContent)
                      }
                    }}
                    className="px-3 py-1 text-sm border border-foreground/20 rounded hover:bg-background-secondary"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                      if (textarea) {
                        const start = textarea.selectionStart
                        const newContent = content.substring(0, start) + '\n## ' + content.substring(start)
                        setContent(newContent)
                        setValue('content', newContent)
                      }
                    }}
                    className="px-3 py-1 text-sm border border-foreground/20 rounded hover:bg-background-secondary"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                      if (textarea) {
                        const start = textarea.selectionStart
                        const newContent = content.substring(0, start) + '\n- ' + content.substring(start)
                        setContent(newContent)
                        setValue('content', newContent)
                      }
                    }}
                    className="px-3 py-1 text-sm border border-foreground/20 rounded hover:bg-background-secondary"
                  >
                    Lista
                  </button>
                </div>
                <textarea
                  {...register('content')}
                  name="content"
                  rows={15}
                  value={content}
                  onChange={handleContentChange}
                  className={cn(
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y font-mono text-sm',
                    errors.content
                      ? 'border-error focus:ring-error/20'
                      : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
                  )}
                  placeholder="Escribe el contenido del artículo... (Markdown básico soportado)"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-error">{errors.content.message}</p>
                )}
              </div>

              {/* Imagen destacada */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Imagen Destacada
                </label>
                {imagePreview && (
                  <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="100%"
                    />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg cursor-pointer hover:bg-background-secondary transition-colors">
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Subiendo...' : 'Subir imagen'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setValue('image_url', '')
                      }}
                      className="px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar de metadatos */}
            <div className="space-y-6">
              {/* Estado y publicación */}
              <div className="bg-background-secondary rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Publicación</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register('published')}
                    type="checkbox"
                    className="w-4 h-4 rounded border-foreground/20 text-accent-orange-500 focus:ring-accent-orange-500"
                  />
                  <span className="text-sm font-medium text-foreground">Publicado</span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Fecha de publicación
                  </label>
                  <input
                    {...register('published_at')}
                    type="datetime-local"
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
                  />
                </div>
              </div>

              {/* Autor y categoría */}
              <div className="bg-background-secondary rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Información</h3>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Autor <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('author')}
                    type="text"
                    className={cn(
                      'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                      errors.author
                        ? 'border-error focus:ring-error/20'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20'
                    )}
                  />
                  {errors.author && (
                    <p className="mt-1 text-xs text-error">{errors.author.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Categoría <span className="text-error">*</span>
                  </label>
                  <input
                    {...register('category')}
                    type="text"
                    list="categories-list"
                    className={cn(
                      'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                      errors.category
                        ? 'border-error focus:ring-error/20'
                        : 'border-foreground/20 focus:ring-accent-orange-500/20'
                    )}
                  />
                  <datalist id="categories-list">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                    <option value="IA Generativa" />
                    <option value="Tecnología" />
                    <option value="Transformación" />
                    <option value="IA Conversacional" />
                    <option value="Análisis de Datos" />
                    <option value="Ingeniería" />
                    <option value="Automatización" />
                    <option value="Ética IA" />
                    <option value="Experiencia" />
                  </datalist>
                  {errors.category && (
                    <p className="mt-1 text-xs text-error">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-background-secondary rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-accent-orange-500/10 text-accent-orange-500 rounded text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-error"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Nuevo tag..."
                    list="tags-list"
                    className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 text-sm"
                  />
                  <datalist id="tags-list">
                    {allTags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-accent-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-background-secondary rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">SEO</h3>
                  <button
                    type="button"
                    onClick={() => setShowSEOPreview(!showSEOPreview)}
                    className="text-sm text-accent-orange-500 hover:text-accent-orange-500 transition-colors flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    {showSEOPreview ? 'Ocultar' : 'Ver'} Preview
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Meta Título
                    <span className="text-xs text-foreground-muted ml-2">
                      ({watchedMetaTitle?.length || 0}/60)
                    </span>
                  </label>
                  <input
                    {...register('meta_title')}
                    type="text"
                    maxLength={60}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 text-sm"
                    placeholder="Título para SEO (opcional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Meta Descripción
                    <span className="text-xs text-foreground-muted ml-2">
                      ({watchedMetaDescription?.length || 0}/160)
                    </span>
                  </label>
                  <textarea
                    {...register('meta_description')}
                    rows={3}
                    maxLength={160}
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 resize-y text-sm"
                    placeholder="Descripción para SEO (opcional)"
                  />
                </div>

                {/* Preview SEO */}
                {showSEOPreview && (
                  <div className="mt-4 p-4 bg-white border border-foreground/20 rounded-lg">
                    <div className="text-xs text-accent-orange-500 mb-1">
                      {typeof window !== 'undefined' ? window.location.origin : 'https://thinkia.com'}
                      /reflexiones/{watch('slug') || 'slug-del-articulo'}
                    </div>
                    <div className="text-lg text-blue-600 hover:underline mb-1">
                      {watchedMetaTitle || watch('title') || 'Título del artículo'}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {watchedMetaDescription || watch('excerpt') || 'Descripción del artículo...'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-6 border-t border-foreground/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className="px-6 py-2 bg-gradient-to-r from-accent-orange-600 to-accent-orange-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingPost ? 'Actualizar' : 'Crear'} Artículo
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Componente Modal de Confirmación de Eliminación
function DeleteConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-error" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Confirmar eliminación</h3>
            <p className="text-sm text-foreground-muted">
              ¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-error text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
