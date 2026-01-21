'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Globe, Search, Link2, Share2, Mail, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

interface TrafficData {
  totalSessions: number
  sources: Array<{ source: string; sessions: number; category: string; percentage: number }>
  categories: Array<{ category: string; sessions: number; percentage: number }>
}

interface TrafficSourcesProps {
  dateRange: '7d' | '30d' | '90d'
}

const COLORS = {
  'Organic Search': '#F97316',
  'Direct': '#3B82F6',
  'Social': '#10B981',
  'Referral': '#8B5CF6',
  'Email': '#EC4899',
  'Paid Search': '#F59E0B',
  'Other': '#6B7280',
}

const CATEGORY_ICONS: Record<string, any> = {
  'Organic Search': Search,
  'Direct': Globe,
  'Social': Share2,
  'Referral': Link2,
  'Email': Mail,
  'Paid Search': DollarSign,
  'Other': Globe,
}

export function TrafficSources({ dateRange }: TrafficSourcesProps) {
  const [data, setData] = useState<TrafficData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTraffic = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch('/api/analytics/traffic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateRange }),
        })
        const json = await res.json()
        
        if (!res.ok) {
          throw new Error(json.error || 'Error cargando fuentes de tráfico')
        }
        
        setData(json)
      } catch (err: any) {
        setError(err.message)
        setData({
          totalSessions: 0,
          sources: [],
          categories: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTraffic()
  }, [dateRange])

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  const chartData = (data?.categories || []).map((cat) => ({
    name: cat.category,
    value: cat.sessions,
    percentage: cat.percentage,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Fuentes de Tráfico</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.Other} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No hay datos disponibles
          </div>
        )}

        {/* Lista de categorías */}
        <div className="space-y-3">
          {(data?.categories || []).slice(0, 6).map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.category] || Globe
            return (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-medium">{cat.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: COLORS[cat.category as keyof typeof COLORS] || COLORS.Other,
                      }}
                    />
                  </div>
                  <span className="text-white font-semibold w-20 text-right">
                    {cat.sessions.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm w-12 text-right">
                    {cat.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
