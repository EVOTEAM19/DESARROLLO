import { NextResponse } from 'next/server'

/**
 * API Route para verificar el estado de configuración de Google Analytics
 * Solo verifica si las variables están configuradas, no prueba conexión real
 */

export async function GET() {
  const hasMeasurementId = !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const hasPropertyId = !!process.env.GA4_PROPERTY_ID
  const hasServiceAccountKey = !!(process.env.GA4_SERVICE_ACCOUNT_KEY || process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)

  const isConfigured = hasMeasurementId && hasPropertyId && hasServiceAccountKey

  return NextResponse.json({
    configured: isConfigured,
    measurementId: hasMeasurementId,
    propertyId: hasPropertyId,
    serviceAccountKey: hasServiceAccountKey,
    message: isConfigured 
      ? 'Google Analytics 4 está configurado correctamente'
      : `Configuración incompleta: ${!hasMeasurementId ? 'Falta NEXT_PUBLIC_GA_MEASUREMENT_ID. ' : ''}${!hasPropertyId ? 'Falta GA4_PROPERTY_ID. ' : ''}${!hasServiceAccountKey ? 'Falta GA4_SERVICE_ACCOUNT_KEY.' : ''}`,
  })
}
