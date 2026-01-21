/**
 * API Route para obtener resumen general de métricas
 * Similar a /api/analytics/ga4 pero con formato mejorado
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured, parseDateRange, calculatePreviousPeriod } from '@/lib/google-analytics'

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
    const previousPeriod = calculatePreviousPeriod(startDate, endDate)

    // Obtener métricas del período actual
    const [currentResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    })

    // Obtener métricas del período anterior para comparación
    let previousMetrics = {
      pageViews: 0,
      users: 0,
      sessions: 0,
    }

    try {
      const [previousResponse] = await client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: previousPeriod.start,
            endDate: previousPeriod.end,
          },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'sessions' },
        ],
      })

      const prevRows = previousResponse.rows?.[0]?.metricValues || []
      previousMetrics = {
        pageViews: parseInt(prevRows[0]?.value || '0'),
        users: parseInt(prevRows[1]?.value || '0'),
        sessions: parseInt(prevRows[2]?.value || '0'),
      }
    } catch (error) {
      console.warn('No se pudo obtener métricas del período anterior:', error)
    }

    const rows = currentResponse.rows || []
    const metrics = rows[0]?.metricValues || []

    const pageViews = parseInt(metrics[0]?.value || '0')
    const uniqueVisitors = parseInt(metrics[1]?.value || '0')
    const sessions = parseInt(metrics[2]?.value || '0')
    const bounceRate = parseFloat(metrics[3]?.value || '0') * 100
    const avgSessionDuration = Math.round(parseFloat(metrics[4]?.value || '0'))

    // Calcular crecimiento
    const pageViewsGrowth = previousMetrics.pageViews > 0
      ? ((pageViews - previousMetrics.pageViews) / previousMetrics.pageViews) * 100
      : 0
    const usersGrowth = previousMetrics.users > 0
      ? ((uniqueVisitors - previousMetrics.users) / previousMetrics.users) * 100
      : 0
    const sessionsGrowth = previousMetrics.sessions > 0
      ? ((sessions - previousMetrics.sessions) / previousMetrics.sessions) * 100
      : 0

    return NextResponse.json({
      pageViews,
      uniqueVisitors,
      sessions,
      bounceRate: Math.round(bounceRate * 10) / 10,
      avgSessionDuration,
      growth: {
        pageViews: Math.round(pageViewsGrowth * 10) / 10,
        users: Math.round(usersGrowth * 10) / 10,
        sessions: Math.round(sessionsGrowth * 10) / 10,
      },
    })
  } catch (error: any) {
    console.error('[Overview API] Error:', error)
    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo resumen',
        pageViews: 0,
        uniqueVisitors: 0,
        sessions: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        growth: { pageViews: 0, users: 0, sessions: 0 },
      },
      { status: 500 }
    )
  }
}
