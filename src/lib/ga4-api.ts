/**
 * Google Analytics 4 Data API Client
 * Conecta con Google Analytics para obtener métricas reales
 */

interface GADateRange {
  startDate: string
  endDate: string
}

interface GAMetric {
  name: string
}

interface GADimension {
  name: string
}

interface GARequest {
  dateRanges: GADateRange[]
  metrics: GAMetric[]
  dimensions?: GADimension[]
  limit?: number
}

interface GAResponse {
  rows?: Array<{
    dimensionValues?: Array<{ value: string }>
    metricValues: Array<{ value: string }>
  }>
  totals?: Array<{
    metricValues: Array<{ value: string }>
  }>
}

/**
 * Obtiene el Property ID de GA4 desde el Measurement ID
 * G-XXXXXXXXXX -> properties/XXXXXXX
 */
function getPropertyIdFromMeasurementId(measurementId: string): string | null {
  if (!measurementId) return null
  
  // Formato: G-XXXXXXXXXX
  const match = measurementId.match(/^G-([A-Z0-9]+)$/)
  if (!match) return null
  
  // Necesitamos el Property ID numérico, no el Measurement ID
  // Por ahora, retornamos null y el usuario deberá configurar GA4_PROPERTY_ID
  return null
}

/**
 * Obtiene métricas básicas de GA4
 * Nota: Las variables de entorno no están disponibles en el cliente
 * La verificación se hace en la API route del servidor
 */
export async function getGA4Metrics(dateRange: '7d' | '30d' | '90d' = '7d') {
  try {
    // Enviar el dateRange en el formato que espera la API (7d, 30d, 90d)
    // La API route lo convertirá a '7daysAgo', 'today', etc.
    const response = await fetch('/api/analytics/ga4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRange: dateRange, // Enviar directamente '7d', '30d', o '90d'
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[GA4 API Client] Error response:', errorData)
      throw new Error(errorData.error || errorData.message || 'Error obteniendo métricas de GA4')
    }

    const data = await response.json()
    console.log('[GA4 API Client] Respuesta recibida:', {
      pageViews: data.pageViews,
      uniqueVisitors: data.uniqueVisitors,
      hasError: !!data.error,
      hasMessage: !!data.message,
    })
    
    return data
  } catch (error: any) {
    console.error('[GA4 API Client] Error obteniendo métricas GA4:', error.message || error)
    return {
      pageViews: 0,
      uniqueVisitors: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
      error: error.message || 'Error desconocido',
    }
  }
}

/**
 * Obtiene páginas más visitadas
 */
export async function getGA4TopPages(dateRange: '7d' | '30d' | '90d' = '7d', limit: number = 10) {
  try {
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

    const response = await fetch('/api/analytics/ga4/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRange: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
        limit,
      }),
    })

    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error obteniendo páginas top:', error)
    return null
  }
}

/**
 * Obtiene fuentes de tráfico
 */
export async function getGA4Referrers(dateRange: '7d' | '30d' | '90d' = '7d', limit: number = 10) {
  try {
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

    const response = await fetch('/api/analytics/ga4/referrers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRange: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
        limit,
      }),
    })

    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error obteniendo referrers:', error)
    return null
  }
}

/**
 * Obtiene breakdown de dispositivos
 */
export async function getGA4Devices(dateRange: '7d' | '30d' | '90d' = '7d') {
  try {
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

    const response = await fetch('/api/analytics/ga4/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRange: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      }),
    })

    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error obteniendo dispositivos:', error)
    return null
  }
}
