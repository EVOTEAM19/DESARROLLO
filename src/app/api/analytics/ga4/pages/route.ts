import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { dateRange, limit } = await request.json()
    const propertyId = process.env.GA4_PROPERTY_ID

    if (!propertyId) {
      return NextResponse.json({
        pages: [],
        message: 'GA4_PROPERTY_ID no configurado.',
      })
    }

    // TODO: Implementar llamada real a Google Analytics Data API
    // Por ahora retornamos estructura vacía
    return NextResponse.json({
      pages: [],
      message: 'Google Analytics Data API no implementada aún.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error obteniendo páginas' },
      { status: 500 }
    )
  }
}
