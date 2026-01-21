'use client'

import { useState, useEffect } from 'react'
import { Loader2, RefreshCw, AlertCircle, CheckCircle, Download } from 'lucide-react'
import { RealtimeMetrics } from '@/components/admin/analytics/RealtimeMetrics'
import { OverviewMetrics } from '@/components/admin/analytics/OverviewMetrics'
import { ConversionsChart } from '@/components/admin/analytics/ConversionsChart'
import { TrafficSources } from '@/components/admin/analytics/TrafficSources'
import { TopPages } from '@/components/admin/analytics/TopPages'
import { DevicesChart } from '@/components/admin/analytics/DevicesChart'

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [isGA4Configured, setIsGA4Configured] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkGA4Status()
  }, [])

  const checkGA4Status = async () => {
    try {
      const res = await fetch('/api/analytics/status')
      const json = await res.json()
      setIsGA4Configured(json.configured)
    } catch (err) {
      setIsGA4Configured(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    // TODO: Implementar exportación a CSV/PDF
    alert('Funcionalidad de exportación próximamente disponible')
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
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Métricas</h1>
          <p className="text-gray-400">Estadísticas completas de tráfico y comportamiento de usuarios</p>
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
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors flex items-center gap-2"
            title="Exportar datos"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Status Banner */}
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
                ? '✅ Google Analytics 4 configurado correctamente' 
                : '⚠️ Google Analytics 4 no configurado'}
            </p>
            {!isGA4Configured && (
              <p className="text-sm text-yellow-300">
                Configura <code className="bg-yellow-500/20 px-1 rounded">GA4_PROPERTY_ID</code> y{' '}
                <code className="bg-yellow-500/20 px-1 rounded">GA4_SERVICE_ACCOUNT_KEY</code> en las variables de entorno.
                Consulta <code className="bg-yellow-500/20 px-1 rounded">GA4_SETUP.md</code> para instrucciones.
              </p>
            )}
            {isGA4Configured && (
              <p className="text-sm text-green-300 mt-1">
                Mostrando datos reales de Google Analytics 4. Los datos se actualizan automáticamente.
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

      {/* Sección 1: Métricas en Tiempo Real */}
      <RealtimeMetrics />

      {/* Sección 2: Resumen General */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Resumen General</h2>
        <OverviewMetrics dateRange={dateRange} />
      </div>

      {/* Sección 3: Conversiones */}
      <ConversionsChart dateRange={dateRange} />

      {/* Sección 4: Fuentes de Tráfico y Páginas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TrafficSources dateRange={dateRange} />
        <TopPages dateRange={dateRange} />
      </div>

      {/* Sección 5: Dispositivos */}
      <DevicesChart dateRange={dateRange} />
    </div>
  )
}
