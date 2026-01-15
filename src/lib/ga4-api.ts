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
    // Calcular fechas
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

    const dateRangeStr = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    }

    // Llamar a la API route interna
    const response = await fetch('/api/analytics/ga4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRange: dateRangeStr,
      }),
    })

    if (!response.ok) {
      throw new Error('Error obteniendo métricas de GA4')
    }

    return await response.json()
  } catch (error) {
    console.error('Error obteniendo métricas GA4:', error)
    return null
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
