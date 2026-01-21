'use client'

import { useState, useEffect } from 'react'
import { FileText, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface TopPagesProps {
  dateRange: '7d' | '30d' | '90d'
}

interface PageData {
  path: string
  views: number
}

export function TopPages({ dateRange }: TopPagesProps) {
  const [pages, setPages] = useState<PageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPages = async () => {
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

        const res = await fetch('/api/analytics/ga4/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dateRange: {
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0],
            },
            limit: 10,
          }),
        })

        if (!res.ok) {
          throw new Error('Error cargando páginas')
        }

        const json = await res.json()
        const totalViews = (json.pages || []).reduce((sum: number, p: any) => 
          sum + parseInt(p.views || p.screenPageViews || '0'), 0
        )

        setPages(
          (json.pages || []).map((p: any) => ({
            path: p.path || p.pagePath || '/',
            views: parseInt(p.views || p.screenPageViews || '0'),
            percentage: totalViews > 0 
              ? ((parseInt(p.views || p.screenPageViews || '0') / totalViews) * 100).toFixed(1)
              : '0',
          }))
        )
      } catch (err: any) {
        setError(err.message)
        setPages([])
      } finally {
        setIsLoading(false)
      }
    }

    loadPages()
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-orange-500" />
        Páginas Más Visitadas
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {pages.length > 0 ? (
        <div className="space-y-3">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{page.path}</div>
                  <div className="text-sm text-gray-400">
                    {'percentage' in page ? `${page.percentage}% del tráfico total` : ''}
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-white ml-4">
                {page.views.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No hay datos de páginas para el período seleccionado</p>
        </div>
      )}
    </motion.div>
  )
}
