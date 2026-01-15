'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  Search,
  Filter,
  Trash2,
  Copy,
  Download,
  X,
  Image as ImageIcon,
  Video,
  File,
  Loader2,
  Check,
  Eye,
  Edit,
  CheckSquare,
  Square,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type MediaFile = {
  id: string
  filename: string
  url: string
  type: 'image' | 'video' | 'document' | 'audio'
  size: number | null
  alt_text: string | null
  created_at: string
}

const STORAGE_BUCKET = 'media'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg']
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES]

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [isDragOver, setIsDragOver] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'document' | 'audio'>('all')
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [editingAlt, setEditingAlt] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cargar archivos
  useEffect(() => {
    loadMedia()
  }, [])

  // Filtrar archivos
  useEffect(() => {
    let filtered = [...mediaFiles]

    // Búsqueda
    if (searchQuery) {
      filtered = filtered.filter((file) =>
        file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter((file) => file.type === typeFilter)
    }

    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredFiles(filtered)
  }, [mediaFiles, searchQuery, typeFilter])

  const loadMedia = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMediaFiles(data || [])
    } catch (error) {
      console.error('Error cargando media:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Tipo de archivo no permitido: ${file.type}`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `El archivo es demasiado grande. Máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    }
    return null
  }

  const getFileType = (file: File): 'image' | 'video' | 'document' | 'audio' => {
    if (ALLOWED_IMAGE_TYPES.includes(file.type)) return 'image'
    if (ALLOWED_VIDEO_TYPES.includes(file.type)) return 'video'
    if (file.type.startsWith('audio/')) return 'audio'
    return 'document'
  }

  const uploadFile = async (file: File): Promise<void> => {
    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    try {
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

      // Generar nombre único
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload con progreso
      const fileId = fileName
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

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

      // Guardar metadata en tabla media
      const fileType = getFileType(file)
      const { data: mediaData, error: mediaError } = await supabase.from('media').insert([
        {
          filename: file.name,
          url: publicUrl,
          type: fileType,
          size: file.size,
          alt_text: null,
        },
      ])

      if (mediaError) throw mediaError

      setUploadProgress((prev) => {
        const newProgress = { ...prev }
        delete newProgress[fileId]
        return newProgress
      })

      await loadMedia()
    } catch (error: any) {
      console.error('Error subiendo archivo:', error)
      alert(error.message || 'Error al subir el archivo')
      setUploadProgress((prev) => {
        const newProgress = { ...prev }
        delete newProgress[file.name]
        return newProgress
      })
    }
  }

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    setIsUploading(true)

    try {
      await Promise.all(fileArray.map((file) => uploadFile(file)))
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        await handleFiles(files)
      }
    },
    [handleFiles]
  )

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await handleFiles(files)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createBrowserClient()
      const file = mediaFiles.find((f) => f.id === id)
      if (!file) return

      // Eliminar de storage
      const fileName = file.url.split('/').pop() || ''
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([fileName])

      if (storageError) {
        console.error('Error eliminando de storage:', storageError)
      }

      // Eliminar de tabla media
      const { error: mediaError } = await supabase.from('media').delete().eq('id', id)

      if (mediaError) throw mediaError

      await loadMedia()
      setSelectedFiles(new Set())
    } catch (error: any) {
      console.error('Error eliminando archivo:', error)
      alert(error.message || 'Error al eliminar el archivo')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return

    if (!confirm(`¿Eliminar ${selectedFiles.size} archivo(s) seleccionado(s)?`)) return

    try {
      await Promise.all(Array.from(selectedFiles).map((id) => handleDelete(id)))
      setSelectedFiles(new Set())
    } catch (error) {
      console.error('Error en eliminación masiva:', error)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copiada al portapapeles')
  }

  const toggleSelection = (id: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleSelectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set())
    } else {
      setSelectedFiles(new Set(filteredFiles.map((f) => f.id)))
    }
  }

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'N/A'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return ImageIcon
      case 'video':
        return Video
      case 'audio':
        return File
      default:
        return File
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header con acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Biblioteca de Medios
            </h1>
            <p className="text-foreground-muted">
              Gestiona imágenes, videos y otros archivos multimedia
            </p>
          </div>
          {selectedFiles.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-error text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
              Eliminar seleccionados ({selectedFiles.size})
            </button>
          )}
        </div>

        {/* Área de upload con drag & drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            isDragOver
              ? 'border-accent-orange-500 bg-accent-orange-500/10'
              : 'border-foreground/20 bg-background-secondary'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
          <p className="text-lg font-medium text-foreground mb-2">
            Arrastra archivos aquí o{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-accent-orange-500 hover:text-accent-purple-500 transition-colors"
            >
              selecciona archivos
            </button>
          </p>
          <p className="text-sm text-foreground-muted">
            Imágenes y videos hasta 10MB. Formatos: JPG, PNG, GIF, WebP, SVG, MP4, WebM
          </p>
          {isUploading && (
            <div className="mt-4 space-y-2">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-accent-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg p-4 border border-foreground/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Buscar por nombre o alt text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20 focus:border-accent-orange-500"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
            >
              <option value="all">Todos los tipos</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="document">Documentos</option>
              <option value="audio">Audio</option>
            </select>
          </div>
        </div>

        {/* Grid de archivos */}
        {isLoading ? (
          <div className="bg-white rounded-lg p-12 text-center border border-foreground/10">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-orange-500" />
            <p className="text-foreground-muted">Cargando archivos...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-foreground/10">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
            <p className="text-foreground-muted">No se encontraron archivos</p>
          </div>
        ) : (
          <>
            {/* Seleccionar todos */}
            <div className="flex items-center gap-2 px-4">
              <button
                onClick={toggleSelectAll}
                className="p-1 hover:bg-background-secondary rounded transition-colors"
              >
                {selectedFiles.size === filteredFiles.length ? (
                  <CheckSquare className="w-5 h-5 text-accent-orange-500" />
                ) : (
                  <Square className="w-5 h-5 text-foreground-muted" />
                )}
              </button>
              <span className="text-sm text-foreground-muted">
                {selectedFiles.size > 0
                  ? `${selectedFiles.size} seleccionado(s)`
                  : 'Seleccionar todos'}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <MediaCard
                  key={file.id}
                  file={file}
                  isSelected={selectedFiles.has(file.id)}
                  onSelect={() => toggleSelection(file.id)}
                  onView={() => setSelectedFile(file)}
                  onDelete={() => handleDelete(file.id)}
                  onCopyUrl={() => copyUrl(file.url)}
                  formatFileSize={formatFileSize}
                  getFileIcon={getFileIcon}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {selectedFile && (
          <MediaDetailModal
            file={selectedFile}
            onClose={() => {
              setSelectedFile(null)
              setEditingAlt('')
            }}
            onSaveAlt={async (altText: string) => {
              try {
                const supabase = createBrowserClient()
                const { error } = await supabase
                  .from('media')
                  .update({ alt_text: altText })
                  .eq('id', selectedFile.id)

                if (error) throw error

                await loadMedia()
                setSelectedFile({ ...selectedFile, alt_text: altText })
              } catch (error: any) {
                alert(error.message || 'Error al actualizar alt text')
              }
            }}
            onDelete={() => {
              handleDelete(selectedFile.id)
              setSelectedFile(null)
            }}
            onCopyUrl={() => copyUrl(selectedFile.url)}
            formatFileSize={formatFileSize}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Componente Card de Media
interface MediaCardProps {
  file: MediaFile
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onDelete: () => void
  onCopyUrl: () => void
  formatFileSize: (bytes: number | null) => string
  getFileIcon: (type: string) => React.ElementType
}

function MediaCard({
  file,
  isSelected,
  onSelect,
  onView,
  onDelete,
  onCopyUrl,
  formatFileSize,
  getFileIcon,
}: MediaCardProps) {
  const Icon = getFileIcon(file.type)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative group bg-white rounded-lg border-2 overflow-hidden transition-all',
        isSelected ? 'border-accent-orange-500' : 'border-foreground/10 hover:border-accent-orange-500/50'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        className="absolute top-2 left-2 z-10 p-1 bg-white/90 rounded hover:bg-white transition-colors"
      >
        {isSelected ? (
          <CheckSquare className="w-5 h-5 text-accent-orange-500" />
        ) : (
          <Square className="w-5 h-5 text-foreground-muted" />
        )}
      </button>

      {/* Preview */}
      <div
        onClick={onView}
        className="aspect-square relative bg-background-secondary cursor-pointer"
      >
        {file.type === 'image' ? (
          <Image
            src={file.url}
            alt={file.alt_text || file.filename}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-foreground-muted" />
          </div>
        )}

        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onView()
            }}
            className="p-2 bg-white rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCopyUrl()
            }}
            className="p-2 bg-white rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Copiar URL"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (confirm('¿Eliminar este archivo?')) onDelete()
            }}
            className="p-2 bg-error text-white rounded-lg hover:opacity-90 transition-opacity"
            aria-label="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-xs font-medium text-foreground truncate" title={file.filename}>
          {file.filename}
        </p>
        <p className="text-xs text-foreground-muted">{formatFileSize(file.size)}</p>
      </div>
    </motion.div>
  )
}

// Modal de detalles
interface MediaDetailModalProps {
  file: MediaFile
  onClose: () => void
  onSaveAlt: (altText: string) => Promise<void>
  onDelete: () => void
  onCopyUrl: () => void
  formatFileSize: (bytes: number | null) => string
}

function MediaDetailModal({
  file,
  onClose,
  onSaveAlt,
  onDelete,
  onCopyUrl,
  formatFileSize,
}: MediaDetailModalProps) {
  const [altText, setAltText] = useState(file.alt_text || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSaveAlt(altText)
    } finally {
      setIsSaving(false)
    }
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-foreground/10 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-display font-bold text-foreground">Detalles del Archivo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Vista Previa</h3>
              {file.type === 'image' ? (
                <div className="relative w-full aspect-video bg-background-secondary rounded-lg overflow-hidden">
                  <Image
                    src={file.url}
                    alt={file.alt_text || file.filename}
                    fill
                    className="object-contain"
                    sizes="50vw"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-background-secondary rounded-lg flex items-center justify-center">
                  <File className="w-16 h-16 text-foreground-muted" />
                </div>
              )}
            </div>

            {/* Información */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Nombre</label>
                <p className="text-sm text-foreground-muted bg-background-secondary p-3 rounded-lg">
                  {file.filename}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Tipo</label>
                <p className="text-sm text-foreground-muted bg-background-secondary p-3 rounded-lg capitalize">
                  {file.type}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Tamaño</label>
                <p className="text-sm text-foreground-muted bg-background-secondary p-3 rounded-lg">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Fecha</label>
                <p className="text-sm text-foreground-muted bg-background-secondary p-3 rounded-lg">
                  {new Date(file.created_at).toLocaleString('es-ES')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Alt Text (para accesibilidad)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange-500/20"
                    placeholder="Descripción de la imagen..."
                  />
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-accent-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">URL Pública</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={file.url}
                    readOnly
                    className="flex-1 px-4 py-2 border border-foreground/20 rounded-lg bg-background-secondary text-sm"
                  />
                  <button
                    onClick={onCopyUrl}
                    className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors"
                    title="Copiar URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors flex items-center"
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-foreground/10 flex justify-end gap-4">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-error text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Eliminar Archivo
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-background-secondary transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
