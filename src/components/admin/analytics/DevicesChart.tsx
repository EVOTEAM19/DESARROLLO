'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Smartphone, Monitor, Tablet } from 'lucide-react'
import { motion } from 'framer-motion'

interface DevicesData {
  devices: Array<{ device: string; percentage: number; users?: number }>
}

interface DevicesChartProps {
  dateRange: '7d' | '30d' | '90d'
}

const DEVICE_ICONS: Record<string, any> = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Tablet: Tablet,
}

const DEVICE_COLORS: Record<string, string> = {
  Desktop: '#3B82F6',
  Mobile: '#10B981',
  Tablet: '#8B5CF6',
}

export function DevicesChart({ dateRange }: DevicesChartProps) {
  const [data, setData] = useState<DevicesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDevices = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const endDate = new Date()
        const startDate = new Date()
        
        switch (dateRange) {
          case '7d':
            startDate.setDate(startDate.getDate() - 7)
            break
          case '30d':
            startDate.setDate(startDate.getDate() - 30)
            break
          case '90d':
            startDate.setDate(startDate.getDate() - 90)
            break
        }

        const res = await fetch('/api/analytics/ga4/devices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dateRange: {
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0],
            },
          }),
        })

        if (!res.ok) {
          throw new Error('Error cargando dispositivos')
        }

        const json = await res.json()
        setData(json)
      } catch (err: any) {
        setError(err.message)
        setData({ devices: [] })
      } finally {
        setIsLoading(false)
      }
    }

    loadDevices()
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

  const chartData = (data?.devices || []).map((d) => ({
    name: d.device,
    porcentaje: d.percentage,
    usuarios: d.users || 0,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Dispositivos</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {chartData.length > 0 ? (
        <>
          <div className="mb-6 space-y-3">
            {(data?.devices || []).map((device, i) => {
              const Icon = DEVICE_ICONS[device.device] || Monitor
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-orange-500" />
                      <span className="text-white">{device.device}</span>
                    </div>
                    <span className="text-white font-semibold">{device.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${device.percentage}%`,
                        backgroundColor: DEVICE_COLORS[device.device] || '#6B7280',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" style={{ fontSize: '12px' }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6',
                  }}
                />
                <Bar dataKey="porcentaje" fill="#F97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No hay datos de dispositivos para el período seleccionado</p>
        </div>
      )}
    </motion.div>
  )
}
