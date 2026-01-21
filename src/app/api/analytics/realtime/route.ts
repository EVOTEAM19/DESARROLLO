/**
 * API Route para obtener métricas en tiempo real de Google Analytics 4
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured } from '@/lib/google-analytics'

export async function GET(request: NextRequest) {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          error: 'GA4 no configurado',
          message: 'Configura GA4_PROPERTY_ID y GA4_SERVICE_ACCOUNT_KEY en las variables de entorno.',
        },
        { status: 400 }
      )
    }

    const propertyId = getGAPropertyId()
    const client = createGAClient()
    
    if (!client || !propertyId) {
      return NextResponse.json(
        { error: 'Error creando cliente GA4' },
        { status: 500 }
      )
    }

    // Obtener usuarios activos y páginas vistas en tiempo real
    const [realtimeResponse] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
    })

    // Procesar usuarios activos
    const activeUsers = parseInt(
      realtimeResponse.totals?.[0]?.metricValues?.[0]?.value || '0'
    )

    // Procesar páginas vistas (últimos 30 minutos)
    const pageViews = parseInt(
      realtimeResponse.totals?.[0]?.metricValues?.[1]?.value || '0'
    )

    // Obtener eventos recientes (últimos 30 minutos)
    const [eventsResponse] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'eventCount' }],
      dimensions: [{ name: 'eventName' }],
      orderBys: [
        {
          metric: { metricName: 'eventCount' },
          desc: true,
        },
      ],
      limit: 10,
    })

    const recentEvents = (eventsResponse.rows || []).map((row) => ({
      name: row.dimensionValues?.[0]?.value || 'unknown',
      count: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    // Obtener conversiones en tiempo real (evento generate_lead)
    const [conversionsResponse] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'eventCount' }],
      dimensions: [{ name: 'eventName' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: 'generate_lead',
          },
        },
      },
    })

    const conversions = parseInt(
      conversionsResponse.totals?.[0]?.metricValues?.[0]?.value || '0'
    )

    return NextResponse.json({
      activeUsers,
      pageViews,
      conversions,
      recentEvents,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[Realtime API] Error:', error)
    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo métricas en tiempo real',
        activeUsers: 0,
        pageViews: 0,
        conversions: 0,
        recentEvents: [],
      },
      { status: 500 }
    )
  }
}
