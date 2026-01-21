/**
 * API Route para obtener métricas de conversiones (evento generate_lead)
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

    // Obtener conversiones totales (evento generate_lead)
    const [conversionsResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
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

    const totalConversions = parseInt(
      conversionsResponse.totals?.[0]?.metricValues?.[0]?.value || '0'
    )

    // Obtener sesiones totales para calcular tasa de conversión
    const [sessionsResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'sessions' }],
    })

    const totalSessions = parseInt(
      sessionsResponse.totals?.[0]?.metricValues?.[0]?.value || '0'
    )

    const conversionRate = totalSessions > 0 
      ? (totalConversions / totalSessions) * 100 
      : 0

    // Obtener conversiones por día (últimos 30 días para gráfico)
    const [dailyConversionsResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'eventCount' }],
      dimensions: [{ name: 'date' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: 'generate_lead',
          },
        },
      },
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    })

    const dailyConversions = (dailyConversionsResponse.rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0'),
    }))

    return NextResponse.json({
      totalConversions,
      conversionRate: Math.round(conversionRate * 10) / 10, // 1 decimal
      totalSessions,
      dailyConversions,
    })
  } catch (error: any) {
    console.error('[Conversions API] Error:', error)
    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo conversiones',
        totalConversions: 0,
        conversionRate: 0,
        totalSessions: 0,
        dailyConversions: [],
      },
      { status: 500 }
    )
  }
}
