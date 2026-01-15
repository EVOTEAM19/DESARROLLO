'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  published_at: string
  image_url: string
  content?: string
}

export default function ReflexionesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      
      if (data && !error) {
        setArticles(data)
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-orange-500/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Reflexiones sobre 
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> IA y Desarrollo</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Insights, tutoriales y casos de estudio de 11 años desarrollando software con IA. 
              Sin marketing, solo experiencia real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Artículos */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Cargando artículos...</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No hay artículos disponibles.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={`/reflexiones/${article.slug}`}>
                    <div className="h-full bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all overflow-hidden">
                      {/* Imagen de portada */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                        
                        {/* Badge de categoría sobre la imagen */}
                        {article.category && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500 text-white shadow-lg">
                              {article.category.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        {/* Título */}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs text-gray-500 flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Quieres más contenido como este?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Suscríbete para recibir nuevos artículos cada semana. Sin spam, solo contenido de valor.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/50"
              >
                Suscribirme →
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
