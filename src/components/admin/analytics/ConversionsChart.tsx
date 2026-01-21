'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Target, TrendingUp, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface ConversionsData {
  totalConversions: number
  conversionRate: number
  totalSessions: number
  dailyConversions: Array<{ date: string; count: number }>
}

interface ConversionsChartProps {
  dateRange: '7d' | '30d' | '90d'
}

export function ConversionsChart({ dateRange }: ConversionsChartProps) {
  const [data, setData] = useState<ConversionsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConversions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch('/api/analytics/conversions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateRange }),
        })
        const json = await res.json()
        
        if (!res.ok) {
          throw new Error(json.error || 'Error cargando conversiones')
        }
        
        setData(json)
      } catch (err: any) {
        setError(err.message)
        setData({
          totalConversions: 0,
          conversionRate: 0,
          totalSessions: 0,
          dailyConversions: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadConversions()
  }, [dateRange])

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  // Formatear fechas para el gráfico
  const chartData = (data?.dailyConversions || []).map((item) => ({
    date: new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    conversiones: item.count,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          Conversiones (generate_lead)
        </h2>
        <p className="text-sm text-gray-400">Evento de conversión del formulario de contacto</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total conversiones</div>
          <div className="text-3xl font-bold text-white">{data?.totalConversions || 0}</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Tasa de conversión</div>
          <div className="text-3xl font-bold text-white flex items-center gap-2">
            {data?.conversionRate.toFixed(1) || '0.0'}%
            {data && data.conversionRate > 0 && (
              <TrendingUp className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="conversiones"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ fill: '#F97316', r: 4 }}
                name="Conversiones"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No hay datos de conversiones para el período seleccionado</p>
        </div>
      )}
    </motion.div>
  )
}
