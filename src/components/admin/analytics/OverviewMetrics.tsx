'use client'

import { useState, useEffect } from 'react'
import { Eye, Users, MousePointerClick, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { getGA4Metrics } from '@/lib/ga4-api'

interface OverviewMetricsProps {
  dateRange: '7d' | '30d' | '90d'
}

export function OverviewMetrics({ dateRange }: OverviewMetricsProps) {
  const [data, setData] = useState<{
    pageViews: number
    uniqueVisitors: number
    bounceRate: number
    avgSessionDuration: number
    trafficGrowth: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const metrics = await getGA4Metrics(dateRange)
        
        if (metrics.error || metrics.message) {
          throw new Error(metrics.error || metrics.message || 'Error cargando métricas')
        }
        
        setData({
          pageViews: metrics.pageViews || 0,
          uniqueVisitors: metrics.uniqueVisitors || 0,
          bounceRate: metrics.bounceRate || 0,
          avgSessionDuration: metrics.avgSessionDuration || 0,
          trafficGrowth: metrics.trafficGrowth || 0,
        })
      } catch (err: any) {
        setError(err.message)
        setData({
          pageViews: 0,
          uniqueVisitors: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          trafficGrowth: 0,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMetrics()
  }, [dateRange])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}m ${secs}s`
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-6 animate-pulse">
            <div className="h-20 bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    )
  }

  const metrics = [
    {
      icon: Eye,
      iconColor: 'text-orange-500',
      label: 'Vistas',
      value: data?.pageViews.toLocaleString() || '0',
      growth: data?.trafficGrowth,
      unit: '',
    },
    {
      icon: Users,
      iconColor: 'text-blue-500',
      label: 'Visitantes únicos',
      value: data?.uniqueVisitors.toLocaleString() || '0',
      growth: null,
      unit: '',
    },
    {
      icon: MousePointerClick,
      iconColor: 'text-green-500',
      label: 'Tasa de rebote',
      value: data?.bounceRate.toFixed(1) || '0',
      growth: null,
      unit: '%',
    },
    {
      icon: Calendar,
      iconColor: 'text-purple-500',
      label: 'Duración media',
      value: data ? formatDuration(data.avgSessionDuration) : '0m 0s',
      growth: null,
      unit: '',
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const isPositive = metric.growth !== null && metric.growth !== undefined && metric.growth > 0
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`w-8 h-8 ${metric.iconColor}`} />
              <span className="text-sm text-gray-400">{metric.label}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {metric.value}{metric.unit}
            </div>
            {metric.growth !== null && metric.growth !== undefined && (
              <div className={`flex items-center gap-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(metric.growth).toFixed(1)}% vs período anterior</span>
              </div>
            )}
            {metric.growth === null && (
              <div className="text-sm text-gray-400">
                {metric.label === 'Tasa de rebote' 
                  ? (data && data.bounceRate < 50 ? 'Excelente' : data && data.bounceRate < 70 ? 'Bueno' : 'Mejorable')
                  : metric.label === 'Duración media'
                  ? 'por sesión'
                  : ''
                }
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
