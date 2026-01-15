/**
 * API Route para obtener métricas básicas de Google Analytics 4
 * Esta ruta actúa como proxy entre el cliente y Google Analytics Data API
 */

import { NextRequest, NextResponse } from 'next/server'

// Tipos de métricas disponibles
const METRICS = {
  PAGE_VIEWS: 'screenPageViews',
  ACTIVE_USERS: 'activeUsers',
  SESSIONS: 'sessions',
  BOUNCE_RATE: 'bounceRate',
  AVG_SESSION_DURATION: 'averageSessionDuration',
}

export async function POST(request: NextRequest) {
  try {
    const { dateRange } = await request.json()

    // Obtener Property ID desde variables de entorno (servidor)
    const propertyId = process.env.GA4_PROPERTY_ID
    const serviceAccountKey = process.env.GA4_SERVICE_ACCOUNT_KEY
    const serviceAccountKeyPath = process.env.GA4_SERVICE_ACCOUNT_KEY_PATH

    if (!propertyId) {
      return NextResponse.json({
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        message: 'GA4_PROPERTY_ID no configurado en variables de entorno. Consulta GA4_SETUP.md para configurarlo.',
      })
    }
    
    if (!serviceAccountKey) {
      // Si no hay credenciales, retornar datos de ejemplo por ahora
      return NextResponse.json({
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        message: 'GA4_SERVICE_ACCOUNT_KEY no configurado. Configure las credenciales para ver datos reales.',
      })
    }

    // TODO: Implementar llamada real a Google Analytics Data API
    // Por ahora, retornamos datos vacíos
    // Para implementar esto necesitarías:
    // 1. Instalar @google-analytics/data
    // 2. Autenticar con Service Account
    // 3. Llamar a runReport con las métricas

    return NextResponse.json({
      pageViews: 0,
      uniqueVisitors: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
      message: 'Google Analytics Data API no implementada aún. Consulta la documentación para configurarla.',
    })
  } catch (error: any) {
    console.error('Error en API GA4:', error)
    return NextResponse.json(
      { error: error.message || 'Error obteniendo métricas' },
      { status: 500 }
    )
  }
}
