import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { dateRange } = await request.json()
    const propertyId = process.env.GA4_PROPERTY_ID

    if (!propertyId) {
      return NextResponse.json({
        devices: [],
        message: 'GA4_PROPERTY_ID no configurado.',
      })
    }

    // TODO: Implementar llamada real a Google Analytics Data API
    return NextResponse.json({
      devices: [],
      message: 'Google Analytics Data API no implementada aún.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error obteniendo dispositivos' },
      { status: 500 }
    )
  }
}
