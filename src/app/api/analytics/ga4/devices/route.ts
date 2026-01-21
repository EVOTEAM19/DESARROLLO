/**
 * API Route para obtener breakdown de dispositivos
 */

import { NextRequest, NextResponse } from 'next/server'
import { createGAClient, getGAPropertyId, isGA4Configured, parseDateRange } from '@/lib/google-analytics'

export async function POST(request: NextRequest) {
  try {
    if (!isGA4Configured()) {
      return NextResponse.json(
        {
          devices: [],
          message: 'GA4 no configurado. Configura GA4_PROPERTY_ID y GA4_SERVICE_ACCOUNT_KEY.',
        },
        { status: 400 }
      )
    }

    const { dateRange } = await request.json()
    const propertyId = getGAPropertyId()
    const client = createGAClient()
    
    if (!client || !propertyId) {
      return NextResponse.json(
        { devices: [], error: 'Error creando cliente GA4' },
        { status: 500 }
      )
    }

    const { startDate, endDate } = parseDateRange(dateRange)

    // Obtener breakdown por dispositivo
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'activeUsers' }],
      dimensions: [{ name: 'deviceCategory' }],
    })

    const totalUsers = (response.rows || []).reduce(
      (sum, row) => sum + parseInt(row.metricValues?.[0]?.value || '0'),
      0
    )

    const devices = (response.rows || []).map((row) => {
      const device = row.dimensionValues?.[0]?.value || 'Unknown'
      const users = parseInt(row.metricValues?.[0]?.value || '0')
      return {
        device: device.charAt(0).toUpperCase() + device.slice(1).toLowerCase(),
        users,
        percentage: totalUsers > 0 ? (users / totalUsers) * 100 : 0,
      }
    })

    return NextResponse.json({ devices })
  } catch (error: any) {
    console.error('[Devices API] Error:', error)
    return NextResponse.json(
      {
        devices: [],
        error: error.message || 'Error obteniendo dispositivos',
      },
      { status: 500 }
    )
  }
}
