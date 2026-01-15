'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { getBlogPosts } from '@/lib/api'
import { BlogCardSkeleton } from '@/components/ui/Skeleton'
import type { Database } from '@/types/supabase'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

const categoryColors: Record<string, string> = {
  'IA Generativa': 'from-accent-orange-500 to-accent-orange-500',
  'Tecnología': 'from-accent-orange-500 to-accent-orange-500',
  'Transformación': 'from-accent-orange-500 to-accent-orange-500',
  'IA Conversacional': 'from-accent-orange-500 to-accent-orange-500',
  'Análisis de Datos': 'from-accent-orange-500 to-accent-orange-500',
  'Ingeniería': 'from-accent-orange-500 to-accent-orange-500',
  'Automatización': 'from-accent-orange-500 to-accent-orange-500',
  'Ética IA': 'from-accent-orange-500 to-accent-orange-500',
  'Experiencia': 'from-accent-orange-500 to-accent-orange-500',
  'default': 'from-accent-orange-500 to-accent-orange-500',
}

export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const data = await getBlogPosts(9)
        setPosts(data)
      } catch (err) {
        console.error('Error cargando posts:', err)
        setError('Error al cargar artículos')
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <section className="py-20 lg:py-32 bg-background-secondary">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
            Reflexiones sobre{' '}
            <span className="text-gradient">Desarrollo y IA</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted">
            Artículos técnicos, mejores prácticas y tendencias sobre desarrollo de plataformas digitales, 
            TypeScript, React, Node.js, Kotlin, iOS, Android, Flux e inteligencia artificial
          </p>
        </motion.div>

        {/* Grid de artículos */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-foreground-muted mb-12">
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-foreground-muted mb-12">
            <p>No hay artículos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {/* Botón "Ver todos los artículos" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/reflexiones"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

function BlogCard({ post, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const category = post.category || 'default'
  const gradient = categoryColors[category] || categoryColors.default
  const imageUrl = post.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
  const slug = `/reflexiones/${post.slug}`
  const publishedDate = post.published_at || post.created_at
  const readTime = Math.ceil((post.content?.length || 0) / 1000) || 5

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={slug} className="block h-full">
        <div className="relative h-full bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent-orange-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          {/* Imagen destacada (16:9 ratio) */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay con gradiente en hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Badge de categoría */}
            {category && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white shadow-lg`}
                >
                  {category}
                </span>
              </div>
            )}
          </div>

          {/* Contenido de la card */}
          <div className="p-6">
            {/* Fecha y tiempo de lectura */}
            <div className="flex items-center gap-4 text-sm text-foreground-muted mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedDate}>
                  {new Date(publishedDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readTime} min</span>
              </div>
            </div>

            {/* Título */}
            <h3 
              className="text-xl lg:text-2xl font-display font-bold mb-3 text-foreground group-hover:text-accent-orange-400 transition-colors duration-300 overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.title}
            </h3>

            {/* Extracto */}
            <p 
              className="text-foreground-muted mb-4 leading-relaxed overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.excerpt || ''}
            </p>

            {/* Autor y link */}
            <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
              {post.author && (
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-accent-orange-500 group-hover:text-accent-orange-500 transition-colors duration-300">
                <span className="font-semibold text-sm">Leer más</span>
                <motion.div
                  animate={{
                    x: isHovered ? 4 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Efecto de brillo en hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
          />
        </div>
      </Link>
    </motion.article>
  )
}
