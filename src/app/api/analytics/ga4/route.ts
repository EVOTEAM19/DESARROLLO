/**
 * API Route para obtener métricas básicas de Google Analytics 4
 * Esta ruta actúa como proxy entre el cliente y Google Analytics Data API
 */

import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import path from 'path'
import fs from 'fs'

// Tipos de métricas disponibles
const METRICS = {
  PAGE_VIEWS: 'screenPageViews',
  ACTIVE_USERS: 'activeUsers',
  SESSIONS: 'sessions',
  BOUNCE_RATE: 'bounceRate',
  AVG_SESSION_DURATION: 'averageSessionDuration',
}

/**
 * Carga las credenciales del Service Account desde variables de entorno
 */
function loadCredentials() {
  // Opción 1: Desde ruta de archivo (desarrollo local)
  if (process.env.GA4_SERVICE_ACCOUNT_KEY_PATH) {
    try {
      // Resolver la ruta desde el directorio raíz del proyecto
      const keyPath = path.isAbsolute(process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
        ? process.env.GA4_SERVICE_ACCOUNT_KEY_PATH
        : path.resolve(process.cwd(), process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
      
      // Verificar que el archivo existe
      if (!fs.existsSync(keyPath)) {
        console.error(`Error: Archivo no encontrado en ruta: ${keyPath}`)
        console.error(`CWD actual: ${process.cwd()}`)
        return null
      }
      
      // Leer y parsear el JSON
      const keyContent = fs.readFileSync(keyPath, 'utf8')
      return JSON.parse(keyContent)
    } catch (error: any) {
      console.error('Error cargando credenciales desde archivo:', error.message)
      console.error('Ruta intentada:', process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
      console.error('CWD actual:', process.cwd())
      return null
    }
  }

  // Opción 2: Desde string JSON (producción)
  if (process.env.GA4_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.GA4_SERVICE_ACCOUNT_KEY)
    } catch (error) {
      console.error('Error parseando GA4_SERVICE_ACCOUNT_KEY:', error)
      return null
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  // Declarar variables fuera del try para que estén disponibles en el catch
  let propertyId: string | undefined
  let credentials: any = null
  
  try {
    const { dateRange } = await request.json()

    // Obtener Property ID desde variables de entorno (servidor)
    propertyId = process.env.GA4_PROPERTY_ID
    credentials = loadCredentials()

    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 API] Property ID:', propertyId || 'NO CONFIGURADO')
      console.log('[GA4 API] Service Account Key Path:', process.env.GA4_SERVICE_ACCOUNT_KEY_PATH || 'NO CONFIGURADO')
      console.log('[GA4 API] Credentials loaded:', credentials ? 'SÍ' : 'NO')
      if (credentials) {
        console.log('[GA4 API] Service Account Email:', credentials.client_email)
        console.log('[GA4 API] Project ID:', credentials.project_id)
      }
    }

    // Validar configuración
    if (!propertyId) {
      return NextResponse.json({
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        message: 'GA4_PROPERTY_ID no configurado en variables de entorno. Consulta GA4_CONFIG_GUIDE.md para configurarlo.',
      })
    }

    if (!credentials) {
      const errorMessage = process.env.GA4_SERVICE_ACCOUNT_KEY_PATH
        ? `GA4_SERVICE_ACCOUNT_KEY no configurado. No se pudo cargar desde ${process.env.GA4_SERVICE_ACCOUNT_KEY_PATH}. Verifica que el archivo existe y tiene el formato JSON correcto. Consulta GA4_CONFIG_GUIDE.md.`
        : 'GA4_SERVICE_ACCOUNT_KEY no configurado. Configure GA4_SERVICE_ACCOUNT_KEY o GA4_SERVICE_ACCOUNT_KEY_PATH. Consulta GA4_CONFIG_GUIDE.md.'
      
      return NextResponse.json({
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        message: errorMessage,
      })
    }

    // Crear cliente de Analytics Data API
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    })

    // Parsear rango de fechas
    let startDate = '7daysAgo'
    let endDate = 'today'

    if (dateRange) {
      if (dateRange === '7d' || dateRange === '7daysAgo') {
        startDate = '7daysAgo'
        endDate = 'today'
      } else if (dateRange === '30d' || dateRange === '30daysAgo') {
        startDate = '30daysAgo'
        endDate = 'today'
      } else if (dateRange === '90d' || dateRange === '90daysAgo') {
        startDate = '90daysAgo'
        endDate = 'today'
      } else if (typeof dateRange === 'object' && dateRange.startDate && dateRange.endDate) {
        startDate = dateRange.startDate
        endDate = dateRange.endDate
      }
    }

    // Calcular período anterior para comparación de crecimiento
    const previousStartDate = calculatePreviousPeriod(startDate, endDate)

    // Obtener métricas del período actual
    const [currentResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      metrics: [
        { name: METRICS.PAGE_VIEWS },
        { name: METRICS.ACTIVE_USERS },
        { name: METRICS.BOUNCE_RATE },
        { name: METRICS.AVG_SESSION_DURATION },
      ],
    })

    // Obtener métricas del período anterior para calcular crecimiento
    let trafficGrowth = 0
    try {
      const [previousResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: previousStartDate.start,
            endDate: previousStartDate.end,
          },
        ],
        metrics: [{ name: METRICS.PAGE_VIEWS }],
      })

      const currentPageViews = parseInt(
        currentResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      )
      const previousPageViews = parseInt(
        previousResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      )

      if (previousPageViews > 0) {
        trafficGrowth = ((currentPageViews - previousPageViews) / previousPageViews) * 100
      }
    } catch (error) {
      console.warn('No se pudo calcular el crecimiento de tráfico:', error)
    }

    // Procesar respuesta
    const rows = currentResponse.rows || []
    const metrics = rows[0]?.metricValues || []

    const pageViews = parseInt(metrics[0]?.value || '0')
    const uniqueVisitors = parseInt(metrics[1]?.value || '0')
    const bounceRate = parseFloat(metrics[2]?.value || '0') * 100 // Convertir a porcentaje
    const avgSessionDuration = Math.round(parseFloat(metrics[3]?.value || '0'))

    return NextResponse.json({
      pageViews,
      uniqueVisitors,
      bounceRate: Math.round(bounceRate * 10) / 10, // Redondear a 1 decimal
      avgSessionDuration,
      trafficGrowth: Math.round(trafficGrowth * 10) / 10, // Redondear a 1 decimal
    })
  } catch (error: any) {
    console.error('[GA4 API] Error completo:', error)
    console.error('[GA4 API] Error message:', error.message)
    console.error('[GA4 API] Error code:', error.code)
    console.error('[GA4 API] Error stack:', error.stack)
    
    // Si es error de autenticación o permisos, dar mensaje más específico
    if (error.message?.includes('permission') || error.message?.includes('Permission') || error.code === 7) {
      return NextResponse.json(
        {
          error: 'Error de permisos. Verifica que el Service Account tenga rol "Viewer" en GA4.',
          details: error.message || 'Permission denied',
          code: error.code,
          message: `El Service Account ${credentials?.client_email || 'desconocido'} no tiene permisos para acceder a la propiedad ${propertyId}. Añade el email del Service Account a Google Analytics con rol "Viewer".`,
        },
        { status: 403 }
      )
    }

    // Si es error de autenticación
    if (error.message?.includes('auth') || error.message?.includes('credential') || error.code === 16) {
      return NextResponse.json(
        {
          error: 'Error de autenticación. Verifica las credenciales del Service Account.',
          details: error.message,
          code: error.code,
          message: 'Las credenciales del Service Account no son válidas. Verifica que el archivo JSON es correcto.',
        },
        { status: 401 }
      )
    }

    // Si es error de propiedad no encontrada
    if (error.message?.includes('not found') || error.code === 5) {
      return NextResponse.json(
        {
          error: `La propiedad GA4 ${propertyId} no existe o no es accesible.`,
          details: error.message,
          code: error.code,
          message: 'Verifica que el Property ID es correcto y que el Service Account tiene acceso.',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        error: error.message || 'Error obteniendo métricas',
        code: error.code || 'UNKNOWN',
        message: 'Error al conectar con Google Analytics Data API. Verifica las credenciales y permisos.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

/**
 * Calcula el período anterior para comparación
 */
function calculatePreviousPeriod(startDate: string, endDate: string): { start: string; end: string } {
  // Para períodos estándar
  if (startDate === '7daysAgo' && endDate === 'today') {
    return { start: '14daysAgo', end: '7daysAgo' }
  }
  if (startDate === '30daysAgo' && endDate === 'today') {
    return { start: '60daysAgo', end: '30daysAgo' }
  }
  if (startDate === '90daysAgo' && endDate === 'today') {
    return { start: '180daysAgo', end: '90daysAgo' }
  }

  // Para fechas personalizadas, intentar parsear (formato: YYYY-MM-DD)
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end.getTime() - start.getTime()
    const prevEnd = new Date(start.getTime() - 1) // Un día antes del inicio
    const prevStart = new Date(prevEnd.getTime() - diff)

    return {
      start: prevStart.toISOString().split('T')[0],
      end: prevEnd.toISOString().split('T')[0],
    }
  } catch {
    // Si no se puede parsear, usar valores por defecto
    return { start: '14daysAgo', end: '7daysAgo' }
  }
}
