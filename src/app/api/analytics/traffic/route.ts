/**
 * API Route para obtener fuentes de tráfico detalladas
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured, parseDateRange } from '@/lib/google-analytics'

export async function POST(request: NextRequest) {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          error: 'GA4 no configurado',
          message: 'Configura GA4_PROPERTY_ID y GA4_SERVICE_ACCOUNT_KEY.',
        },
        { status: 400 }
      )
    }

    const { dateRange = '30d' } = await request.json()
    const propertyId = getGAPropertyId()
    const client = createGAClient()
    
    if (!client || !propertyId) {
      return NextResponse.json(
        { error: 'Error creando cliente GA4' },
        { status: 500 }
      )
    }

    const { startDate, endDate } = parseDateRange(dateRange)

    // Obtener fuentes de tráfico agrupadas
    const [trafficResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'sessions' }],
      dimensions: [{ name: 'sessionSource' }],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true,
        },
      ],
      limit: 20,
    })

    const sources = (trafficResponse.rows || []).map((row) => ({
      source: row.dimensionValues?.[0]?.value || 'Directo',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    // Calcular total de sesiones
    const totalSessions = sources.reduce((sum, s) => sum + s.sessions, 0)

    // Categorizar fuentes
    const categorized = sources.map((s) => {
      const source = s.source.toLowerCase()
      let category = 'Other'
      
      if (source === '(direct)' || source === '(none)') {
        category = 'Direct'
      } else if (source.includes('google') || source.includes('bing') || source.includes('yahoo')) {
        category = 'Organic Search'
      } else if (source.includes('facebook') || source.includes('twitter') || source.includes('linkedin') || source.includes('instagram')) {
        category = 'Social'
      } else if (source.includes('mail') || source.includes('email')) {
        category = 'Email'
      } else if (source.includes('cpc') || source.includes('paid') || source.includes('adwords')) {
        category = 'Paid Search'
      } else if (s.source !== 'Directo' && s.source !== '(direct)') {
        category = 'Referral'
      }

      return {
        ...s,
        category,
        percentage: totalSessions > 0 ? (s.sessions / totalSessions) * 100 : 0,
      }
    })

    // Agrupar por categoría
    const byCategory = categorized.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { category: item.category, sessions: 0, sources: [] }
      }
      acc[item.category].sessions += item.sessions
      acc[item.category].sources.push(item)
      return acc
    }, {} as Record<string, { category: string; sessions: number; sources: typeof categorized }>)

    const categories = Object.values(byCategory)
      .map((cat) => ({
        ...cat,
        percentage: totalSessions > 0 ? (cat.sessions / totalSessions) * 100 : 0,
      }))
      .sort((a, b) => b.sessions - a.sessions)

    return NextResponse.json({
      totalSessions,
      sources: categorized,
      categories,
    })
  } catch (error: any) {
    console.error('[Traffic API] Error:', error)
    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo fuentes de tráfico',
        totalSessions: 0,
        sources: [],
        categories: [],
      },
      { status: 500 }
    )
  }
}
