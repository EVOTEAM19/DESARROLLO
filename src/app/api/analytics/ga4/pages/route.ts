/**
 * API Route para obtener páginas más visitadas
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured, parseDateRange } from '@/lib/google-analytics'

export async function POST(request: NextRequest) {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          pages: [],
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
        { pages: [], error: 'Error creando cliente GA4' },
        { status: 500 }
      )
    }

    const { startDate, endDate } = parseDateRange(dateRange)

    // Obtener páginas más visitadas
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'screenPageViews' }],
      dimensions: [{ name: 'pagePath' }],
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: limit || 10,
    })

    const pages = (response.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
      screenPageViews: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    return NextResponse.json({ pages })
  } catch (error: any) {
    console.error('[Pages API] Error:', error)
    return NextResponse.json(
      {
        pages: [],
        error: error.message || 'Error obteniendo páginas',
      },
      { status: 500 }
    )
  }
}
