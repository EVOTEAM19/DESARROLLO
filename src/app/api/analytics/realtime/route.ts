/**
 * API Route para obtener métricas en tiempo real de Google Analytics 4
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured } from '@/lib/google-analytics'

export async function GET() {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          error: 'GA4 no configurado',
          message: 'Configura GA4_PROPERTY_ID y GA4_SERVICE_ACCOUNT_KEY en las variables de entorno.',
          activeUsers: 0,
          pageViews: 0,
          conversions: 0,
          recentEvents: [],
        },
        { status: 200 } // Status 200 para que el frontend pueda mostrar el mensaje
      )
    }

    const propertyId = getGAPropertyId()
    const client = createGAClient()
    
    if (!client || !propertyId) {
      return NextResponse.json(
        {
          error: 'Error creando cliente GA4',
          activeUsers: 0,
          pageViews: 0,
          conversions: 0,
          recentEvents: [],
        },
        { status: 200 }
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
    
    // Si es error de permisos o configuración, devolver status 200 para que el frontend lo muestre
    const isConfigError = error?.message?.includes('permission') || 
                          error?.message?.includes('Permission') || 
                          error?.code === 7 ||
                          error?.message?.includes('not found') ||
                          error?.code === 5
    
    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo métricas en tiempo real',
        activeUsers: 0,
        pageViews: 0,
        conversions: 0,
        recentEvents: [],
      },
      { status: isConfigError ? 200 : 500 }
    )
  }
}
