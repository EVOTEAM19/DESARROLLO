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
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Package,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Schema de validación
const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200, 'El nombre es demasiado largo'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(200, 'El slug es demasiado largo')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  category: z.string().min(1, 'La categoría es requerida'),
  image_url: z.string().min(1, 'La imagen es requerida'),
  features: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  order: z.number().default(0),
})

type ProductFormData = z.infer<typeof productSchema>

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  category: string | null
  image_url: string | null
  features: any
  published: boolean
  order: number
  created_at: string
  updated_at: string
}

const ITEMS_PER_PAGE = 10
const STORAGE_BUCKET = 'products'

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at')
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      features: [],
      published: false,
      order: 0,
    },
  })

  const watchedName = watch('name')

  // Auto-generar slug desde nombre
  useEffect(() => {
    if (watchedName && !editingProduct) {
      const slug = watchedName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [watchedName, editingProduct, setValue])

  // Cargar productos
  useEffect(() => {
    loadProducts()
  }, [])

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...products]

    // Búsqueda
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchQuery, categoryFilter, sortBy])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error cargando productos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategories = () => {
    const categories = new Set<string>()
    products.forEach((p) => {
      if (p.category) categories.add(p.category)
    })
    return Array.from(categories)
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      setUploading(true)
      const supabase = createBrowserClient()

      // Verificar que el bucket existe, si no crearlo
      const { data: buckets } = await supabase.storage.listBuckets()
      if (!buckets?.find((b) => b.name === STORAGE_BUCKET)) {
        const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
          public: true,
        })
        if (createError && createError.message !== 'Bucket already exists') {
          throw createError
        }
      }

      // Generar nombre único
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Obtener URL pública
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

  const onSubmit = async (data: ProductFormData) => {
    try {
      const supabase = createBrowserClient()

      if (editingProduct) {
        // Actualizar
        const { error } = await supabase
          .from('products')
          .update({
            name: data.name,
            slug: data.slug,
            description: data.description,
            category: data.category,
            image_url: data.image_url,
            features: data.features,
            published: data.published,
            order: data.order,
          })
          .eq('id', editingProduct.id)

        if (error) throw error
      } else {
        // Crear
        const { error } = await supabase.from('products').insert([
          {
            name: data.name,
            slug: data.slug,
            description: data.description,
            category: data.category,
            image_url: data.image_url,
            features: data.features,
            published: data.published,
            order: data.order,
          },
        ])

        if (error) throw error
      }

      await loadProducts()
      setIsModalOpen(false)
      setEditingProduct(null)
      reset()
    } catch (error: any) {
      console.error('Error guardando producto:', error)
      alert(error.message || 'Error al guardar el producto')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    reset({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      category: product.category || '',
      image_url: product.image_url || '',
      features: Array.isArray(product.features) ? product.features : [],
      published: product.published,
      order: product.order,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.from('products').delete().eq('id', id)

      if (error) throw error

      await loadProducts()
      setDeleteConfirm(null)
    } catch (error: any) {
      console.error('Error eliminando producto:', error)
      alert(error.message || 'Error al eliminar el producto')
    }
  }

  const togglePublished = async (product: Product) => {
    try {
      const supabase = createBrowserClient()
      const { error } = await supabase
        .from('products')
        .update({ published: !product.published })
        .eq('id', product.id)

      if (error) throw error

      await loadProducts()
    } catch (error: any) {
      console.error('Error actualizando estado:', error)
      alert(error.message || 'Error al actualizar el estado')
    }
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
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
              Gestión de Productos
            </h1>
            <p className="text-foreground-muted">
              Administra los productos de IA disponibles en el sitio
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null)
              reset({
                name: '',
                slug: '',
                description: '',
                category: '',
                image_url: '',
                features: [],
                published: false,
                order: 0,
              })
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-orange-600 to-accent-orange-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg p-4 border border-foreground/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 focus:border-accent-orange-500"
              />
            </div>
            <div className="flex gap-2">
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'created_at')}
                className="px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
              >
                <option value="created_at">Ordenar por fecha</option>
                <option value="name">Ordenar por nombre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg border border-foreground/10 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-orange-500" />
              <p className="text-foreground-muted">Cargando productos...</p>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
              <p className="text-foreground-muted">No se encontraron productos</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Imagen
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {paginatedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-background-secondary transition-colors">
                        <td className="px-6 py-4">
                          {product.image_url ? (
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-background-secondary rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-foreground-muted" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">{product.name}</div>
                          <div className="text-sm text-foreground-muted">/{product.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-accent-orange-500/10 text-accent-orange-500 rounded">
                            {product.category || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePublished(product)}
                            className={cn(
                              'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                              product.published
                                ? 'bg-success/10 text-success'
                                : 'bg-foreground-muted/10 text-foreground-muted'
                            )}
                          >
                            {product.published ? 'Publicado' : 'Borrador'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 text-accent-orange-500 hover:bg-accent-orange-500/10 rounded-lg transition-colors"
                              aria-label="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
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
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de{' '}
                    {filteredProducts.length} productos
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
          <ProductModal
            editingProduct={editingProduct}
            onClose={() => {
              setIsModalOpen(false)
              setEditingProduct(null)
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

// Componente Modal de Producto
interface ProductModalProps {
  editingProduct: Product | null
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  register: any
  errors: any
  isSubmitting: boolean
  uploading: boolean
  onImageUpload: (file: File) => Promise<string>
  setValue: any
  watch: any
}

function ProductModal({
  editingProduct,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
  uploading,
  onImageUpload,
  setValue,
  watch,
}: ProductModalProps) {
  const [features, setFeatures] = useState<string[]>(watch('features') || [])
  const [newFeature, setNewFeature] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(watch('image_url') || null)

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

  const addFeature = () => {
    if (newFeature.trim()) {
      const updated = [...features, newFeature.trim()]
      setFeatures(updated)
      setValue('features', updated)
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index)
    setFeatures(updated)
    setValue('features', updated)
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
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-foreground/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Nombre <span className="text-error">*</span>
            </label>
            <input
              {...register('name')}
              type="text"
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                errors.name
                  ? 'border-error focus:ring-error/20'
                  : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
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

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Descripción <span className="text-error">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y',
                errors.description
                  ? 'border-error focus:ring-error/20'
                  : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error">{errors.description.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Categoría <span className="text-error">*</span>
            </label>
            <input
              {...register('category')}
              type="text"
              list="categories"
              className={cn(
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
                errors.category
                  ? 'border-error focus:ring-error/20'
                  : 'border-foreground/20 focus:ring-accent-orange-500/20 focus:border-accent-orange-500'
              )}
            />
            <datalist id="categories">
              <option value="Plataforma" />
              <option value="Experiencia" />
              <option value="Analytics" />
              <option value="Automatización" />
            </datalist>
            {errors.category && (
              <p className="mt-1 text-sm text-error">{errors.category.message}</p>
            )}
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Imagen <span className="text-error">*</span>
            </label>
            {imagePreview && (
              <div className="mb-4 relative w-32 h-32 rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="128px"
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
            {errors.image_url && (
              <p className="mt-1 text-sm text-error">{errors.image_url.message}</p>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Características</label>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const updated = [...features]
                      updated[index] = e.target.value
                      setFeatures(updated)
                      setValue('features', updated)
                    }}
                    className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                  placeholder="Nueva característica..."
                  className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-accent-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('published')}
                type="checkbox"
                className="w-4 h-4 rounded border-foreground/20 text-accent-orange-500 focus:ring-accent-orange-500"
              />
              <span className="text-sm font-medium text-foreground">Publicado</span>
            </label>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Orden</label>
              <input
                {...register('order', { valueAsNumber: true })}
                type="number"
                className="w-24 px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4 border-t border-foreground/10">
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
                  <CheckCircle className="w-4 h-4" />
                  {editingProduct ? 'Actualizar' : 'Crear'} Producto
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
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
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
