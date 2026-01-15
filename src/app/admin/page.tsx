'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TrendingUp,
  MessageSquare,
  Eye,
  Package,
  BookOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPosts: 0,
    totalMessages: 0,
    monthlyVisits: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const supabase = createBrowserClient()

      const [productsResult, postsResult, messagesResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        totalProducts: productsResult.count || 0,
        totalPosts: postsResult.count || 0,
        totalMessages: messagesResult.count || 0,
        monthlyVisits: 0,
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="space-y-6">
        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Total Productos"
            value={stats.totalProducts}
            icon={Package}
            gradient="from-accent-orange-500 to-accent-orange-500"
            delay={0}
          />
          <StatCard
            title="Artículos Publicados"
            value={stats.totalPosts}
            icon={BookOpen}
            gradient="from-accent-orange-500 to-accent-orange-500"
            delay={0.1}
          />
          <StatCard
            title="Mensajes de Contacto"
            value={stats.totalMessages}
            icon={MessageSquare}
            gradient="from-accent-orange-500 to-accent-orange-500"
            delay={0.2}
          />
          <StatCard
            title="Visitas del Mes"
            value={stats.monthlyVisits}
            icon={Eye}
            gradient="from-accent-orange-500 to-accent-orange-500"
            delay={0.3}
          />
        </div>

        {/* Actividad reciente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-foreground">
              Actividad Reciente
            </h3>
            <TrendingUp className="w-5 h-5 text-foreground-muted" />
          </div>

          <div className="space-y-4">
            {[
              { type: 'producto', action: 'creado', name: 'Synapse', time: 'Hace 2 horas' },
              { type: 'artículo', action: 'publicado', name: 'OpenAI Agent Builder', time: 'Hace 5 horas' },
              { type: 'mensaje', action: 'recibido', name: 'Nuevo contacto', time: 'Hace 1 día' },
              { type: 'producto', action: 'actualizado', name: 'Digital Humans', time: 'Hace 2 días' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center">
                  {activity.type === 'producto' && <Package className="w-5 h-5 text-accent-orange-500" />}
                  {activity.type === 'artículo' && <BookOpen className="w-5 h-5 text-accent-orange-500" />}
                  {activity.type === 'mensaje' && <MessageSquare className="w-5 h-5 text-accent-orange-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    <span className="capitalize">{activity.type}</span> "{activity.name}" {activity.action}
                  </p>
                  <p className="text-xs text-foreground-muted">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  gradient: string
  delay: number
}

function StatCard({ title, value, icon: Icon, gradient, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-sm border border-foreground/10 p-6 hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-foreground-muted">{title}</p>
      </div>
    </motion.div>
  )
}
