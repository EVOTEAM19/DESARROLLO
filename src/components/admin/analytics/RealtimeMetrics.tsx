'use client'

import { useState, useEffect } from 'react'
import { Users, Eye, Target, Clock, Loader2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface RealtimeData {
  activeUsers: number
  pageViews: number
  conversions: number
  recentEvents: Array<{ name: string; count: number }>
  timestamp?: string
}

export function RealtimeMetrics() {
  const [data, setData] = useState<RealtimeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRealtime = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const url = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/analytics/realtime`
        : '/api/analytics/realtime'
      
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      
      const json = await res.json().catch(() => ({
        error: `Error ${res.status}: No se pudo parsear la respuesta`,
        activeUsers: 0,
        pageViews: 0,
        conversions: 0,
        recentEvents: [],
      }))
      
      // Si hay error en la respuesta (incluso con status 200)
      if (json.error) {
        setError(json.error || json.message || 'Error obteniendo métricas en tiempo real')
        setData({
          activeUsers: 0,
          pageViews: 0,
          conversions: 0,
          recentEvents: [],
        })
        return
      }
      
      // Si el status no es OK, mostrar error
      if (!res.ok) {
        throw new Error(json.error || json.message || `Error ${res.status}: ${res.statusText}`)
      }
      
      setData(json)
      setError(null)
    } catch (err: any) {
      const errorMsg = err.message || 'Error de conexión. Verifica que el servidor esté corriendo.'
      setError(errorMsg)
      console.error('[RealtimeMetrics] Error:', err)
      setData({
        activeUsers: 0,
        pageViews: 0,
        conversions: 0,
        recentEvents: [],
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRealtime()
    const interval = setInterval(loadRealtime, 30000) // Actualizar cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  if (isLoading && !data) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Tiempo Real</h2>
          <p className="text-sm text-gray-400">Últimos 30 minutos</p>
        </div>
        <button
          onClick={loadRealtime}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          title="Actualizar"
        >
          <RefreshCw className="w-4 h-4 text-white" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-400">Usuarios activos</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.activeUsers || 0}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400">Páginas vistas</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.pageViews || 0}</div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-400">Conversiones</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.conversions || 0}</div>
        </div>
      </div>

      {data?.recentEvents && data.recentEvents.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Eventos recientes</h3>
          <div className="space-y-2">
            {data.recentEvents.slice(0, 5).map((event, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-white">{event.name}</span>
                </div>
                <span className="text-sm text-gray-400">{event.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
