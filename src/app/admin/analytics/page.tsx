'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick,
  Globe,
  Calendar,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { getGA4Metrics, getGA4TopPages, getGA4Referrers, getGA4Devices } from '@/lib/ga4-api'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ path: string; views: number }>
  topReferrers: Array<{ source: string; visits: number }>
  deviceBreakdown: Array<{ device: string; percentage: number }>
  trafficGrowth: number
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [isGA4Configured, setIsGA4Configured] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [metricsResponse, setMetricsResponse] = useState<any>(null)

  useEffect(() => {
    loadAnalytics()
  }, [dateRange])

  const loadAnalytics = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Intentar obtener datos reales de GA4
      const metrics = await getGA4Metrics(dateRange)
      const pages = await getGA4TopPages(dateRange, 10)
      const referrers = await getGA4Referrers(dateRange, 10)
      const devices = await getGA4Devices(dateRange)

      setMetricsResponse(metrics)

      // Verificar estado de configuración desde API
      try {
        const statusResponse = await fetch('/api/analytics/status')
        const status = await statusResponse.json()
        setIsGA4Configured(status.configured)
      } catch (error) {
        // Si no se puede verificar, asumir que no está configurado si hay mensaje
        setIsGA4Configured(metrics && !metrics.message && metrics.pageViews !== undefined)
      }

      // Si hay datos reales y no es mensaje de configuración, usarlos (incluso si son 0)
      // Verificamos que pageViews esté definido (no undefined) y que no haya mensaje de error
      if (metrics && metrics.pageViews !== undefined && !metrics.message && !metrics.error) {
        console.log('[Analytics Dashboard] Mostrando datos REALES de GA4:', {
          pageViews: metrics.pageViews,
          uniqueVisitors: metrics.uniqueVisitors,
          bounceRate: metrics.bounceRate,
          avgSessionDuration: metrics.avgSessionDuration,
        })
        
        setData({
          pageViews: metrics.pageViews || 0,
          uniqueVisitors: metrics.uniqueVisitors || 0,
          bounceRate: metrics.bounceRate || 0,
          avgSessionDuration: metrics.avgSessionDuration || 0,
          topPages: pages?.pages?.map((p: any) => ({
            path: p.path || p.pagePath || '/',
            views: parseInt(p.views || p.screenPageViews || '0'),
          })) || [],
          topReferrers: referrers?.referrers?.map((r: any) => ({
            source: r.source || r.sessionSource || 'Directo',
            visits: parseInt(r.visits || r.sessions || '0'),
          })) || [],
          deviceBreakdown: devices?.devices?.map((d: any) => ({
            device: d.device || 'Unknown',
            percentage: parseFloat(d.percentage || '0'),
          })) || [],
          trafficGrowth: metrics.trafficGrowth || 0,
        })
        setIsGA4Configured(true)
        return
      }
      
      // Si hay un error o mensaje, loguearlo para debugging
      if (metrics && (metrics.message || metrics.error)) {
        console.warn('[Analytics Dashboard] Respuesta con error/mensaje:', metrics.message || metrics.error)
      }

      // Si no hay datos reales, usar datos de ejemplo
      setData({
        pageViews: 12450,
        uniqueVisitors: 8230,
        bounceRate: 42.5,
        avgSessionDuration: 185,
        topPages: [
          { path: '/', views: 3450 },
          { path: '/the-modal', views: 2100 },
          { path: '/servicios/ia-conversacional', views: 1890 },
          { path: '/reflexiones', views: 1650 },
          { path: '/contacto', views: 1420 },
        ],
        topReferrers: [
          { source: 'Google', visits: 6800 },
          { source: 'Directo', visits: 2100 },
          { source: 'LinkedIn', visits: 890 },
          { source: 'Twitter', visits: 440 },
        ],
        deviceBreakdown: [
          { device: 'Desktop', percentage: 58 },
          { device: 'Mobile', percentage: 35 },
          { device: 'Tablet', percentage: 7 },
        ],
        trafficGrowth: 12.5,
      })
    } catch (error: any) {
      console.error('Error cargando analytics:', error)
      setError(error.message || 'Error cargando métricas')
      
      // En caso de error, mostrar datos de ejemplo
      setData({
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        topPages: [],
        topReferrers: [],
        deviceBreakdown: [],
        trafficGrowth: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Métricas</h1>
          <p className="text-gray-400">Estadísticas de tráfico y comportamiento de usuarios</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => {
              const value = e.target.value as '7d' | '30d' | '90d'
              if (value === '7d' || value === '30d' || value === '90d') {
                setDateRange(value)
              }
            }}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          <button
            onClick={loadAnalytics}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-orange-500" />
            <span className="text-sm text-gray-400">Vistas</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {data?.pageViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>+{data?.trafficGrowth}% vs período anterior</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-400">Visitantes únicos</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {data?.uniqueVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            {data && ((data.uniqueVisitors / data.pageViews) * 100).toFixed(1)}% tasa de retorno
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <MousePointerClick className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-400">Tasa de rebote</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {data?.bounceRate.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400">
            {data ? (data.bounceRate < 50 ? 'Excelente' : data.bounceRate < 70 ? 'Bueno' : 'Mejorable') : 'N/A'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-400">Duración media</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {data && formatDuration(data.avgSessionDuration)}
          </div>
          <div className="text-sm text-gray-400">por sesión</div>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Páginas más visitadas</h2>
        <div className="space-y-4">
          {data?.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{page.path}</div>
                  <div className="text-sm text-gray-400">
                    {((page.views / (data?.pageViews || 1)) * 100).toFixed(1)}% del tráfico total
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-white">{page.views.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referrers & Devices */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Fuentes de tráfico</h2>
          <div className="space-y-4">
            {data?.topReferrers.map((ref, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{ref.source}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${(ref.visits / (data?.topReferrers[0]?.visits || 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-white font-semibold w-20 text-right">
                    {ref.visits.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Dispositivos</h2>
          <div className="space-y-4">
            {data?.deviceBreakdown.map((device, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{device.device}</span>
                  <span className="text-white font-semibold">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Status & Configuration */}
      <div className={`p-4 rounded-lg border ${
        isGA4Configured 
          ? 'bg-green-500/10 border-green-500/50' 
          : 'bg-yellow-500/10 border-yellow-500/50'
      }`}>
        <div className="flex items-start gap-3">
          {isGA4Configured ? (
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          )}
          <div className="flex-1">
            <p className={`text-sm font-semibold mb-1 ${
              isGA4Configured ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {isGA4Configured 
                ? '✅ Google Analytics configurado' 
                : '⚠️ Google Analytics no configurado'}
            </p>
            {!isGA4Configured && (
              <p className="text-sm text-yellow-300">
                Para ver métricas reales, configura <code className="bg-yellow-500/20 px-1 rounded">GA4_PROPERTY_ID</code> y <code className="bg-yellow-500/20 px-1 rounded">GA4_SERVICE_ACCOUNT_KEY</code> en las variables de entorno. 
                Consulta <code className="bg-yellow-500/20 px-1 rounded">GA4_SETUP.md</code> para instrucciones.
              </p>
            )}
            {isGA4Configured && (
              <p className="text-sm text-green-300 mt-1">
                {data?.pageViews === 0 
                  ? '✅ Mostrando datos reales de GA4. No hay visitas registradas aún en el período seleccionado. Visita tu sitio para generar datos.'
                  : `✅ Mostrando datos reales de GA4. ${data?.pageViews || 0} vistas en el período seleccionado.`
                }
              </p>
            )}
            {isGA4Configured && metricsResponse?.message && (
              <p className="text-sm text-blue-300 mt-1">
                {metricsResponse.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-400">
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
