/**
 * API Route para obtener fuentes de tráfico (referrers)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured, parseDateRange } from '@/lib/google-analytics'

export async function POST(request: NextRequest) {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          referrers: [],
          message: 'GA4 no configurado. Configura GA4_PROPERTY_ID y GA4_SERVICE_ACCOUNT_KEY.',
        },
        { status: 400 }
      )
    }

    const { dateRange, limit = 10 } = await request.json()
    const propertyId = getGAPropertyId()
    const client = createGAClient()
    
    if (!client || !propertyId) {
      return NextResponse.json(
        { referrers: [], error: 'Error creando cliente GA4' },
        { status: 500 }
      )
    }

    const { startDate, endDate } = parseDateRange(dateRange)

    // Obtener fuentes de tráfico
    const [response] = await client.runReport({
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
      limit: limit || 10,
    })

    const referrers = (response.rows || []).map((row) => {
      const source = row.dimensionValues?.[0]?.value || 'Directo'
      return {
        source: source === '(direct)' || source === '(none)' ? 'Directo' : source,
        visits: parseInt(row.metricValues?.[0]?.value || '0'),
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      }
    })

    return NextResponse.json({ referrers })
  } catch (error: any) {
    console.error('[Referrers API] Error:', error)
    return NextResponse.json(
      {
        referrers: [],
        error: error.message || 'Error obteniendo referrers',
      },
      { status: 500 }
    )
  }
}
