# Configuración de Google Analytics 4 en Admin Dashboard

Esta guía explica cómo configurar Google Analytics 4 para que el dashboard de admin muestre métricas reales.

## 📋 Requisitos Previos

1. Tener un proyecto en [Google Analytics](https://analytics.google.com)
2. Tener acceso a [Google Cloud Console](https://console.cloud.google.com)
3. Tener `NEXT_PUBLIC_GA_MEASUREMENT_ID` configurado (ya debería estar configurado)

## 🚀 Pasos de Configuración

### 1. Obtener Property ID de GA4

1. Ir a [Google Analytics](https://analytics.google.com)
2. Seleccionar tu propiedad (o crear una nueva)
3. Ir a **Admin** → **Property Settings**
4. Copiar el **Property ID** (formato: `123456789` o `properties/123456789`)
5. Si solo tienes el Measurement ID (`G-XXXXXXXXXX`), necesitarás el Property ID numérico:
   - Ve a **Admin** → **Data Streams**
   - Selecciona tu stream
   - En "Stream Details", verás el **Stream ID** que es el Property ID

### 2. Crear Service Account en Google Cloud

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Seleccionar o crear un proyecto
3. Ir a **IAM & Admin** → **Service Accounts**
4. Click en **Create Service Account**
5. Nombre: `fastia-analytics` (o el que prefieras)
6. Click en **Create and Continue**
7. Otorgar rol: **Viewer** (mínimo necesario)
8. Click en **Done**

### 3. Crear y Descargar JSON Key

1. En la lista de Service Accounts, click en el que acabas de crear
2. Ir a la pestaña **Keys**
3. Click en **Add Key** → **Create new key**
4. Seleccionar **JSON**
5. Click en **Create**
6. Se descargará un archivo JSON con las credenciales

### 4. Habilitar Google Analytics Data API

1. En Google Cloud Console, ir a **APIs & Services** → **Library**
2. Buscar "Google Analytics Data API"
3. Click en **Enable**

### 5. Conceder Acceso al Service Account en GA4

1. Ir a [Google Analytics](https://analytics.google.com)
2. Ir a **Admin** → **Property Access Management**
3. Click en **+** (Agregar usuarios)
4. Pegar el **email del Service Account** (formato: `fastia-analytics@project-id.iam.gserviceaccount.com`)
5. Rol: **Viewer**
6. Click en **Add**

### 6. Configurar Variables de Entorno

Añadir a `.env.local` (y configurar en Vercel):

```env
# Google Analytics 4 - Property ID (solo números, ej: 123456789)
GA4_PROPERTY_ID=123456789

# Google Analytics 4 - Service Account Key (JSON completo como string)
# Opción 1: Ruta al archivo JSON (desarrollo local)
GA4_SERVICE_ACCOUNT_KEY_PATH=./path/to/service-account-key.json

# Opción 2: JSON completo como string (recomendado para producción)
GA4_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
```

**⚠️ Importante**: 
- El JSON debe estar como una sola línea o con `\n` para saltos de línea
- En Vercel, usa las **Environment Variables** en el dashboard
- El JSON completo como string es más seguro para producción

### 7. Instalar Dependencias (Opcional - para implementación completa)

Si quieres implementar la API completa de Google Analytics:

```bash
npm install @google-analytics/data
```

## 🔧 Implementación de la API

Actualmente, las rutas API están creadas pero necesitan implementación completa. Para implementarla:

### Actualizar `src/app/api/analytics/ga4/route.ts`

```typescript
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { dateRange, propertyId } = await request.json()
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'GA4_PROPERTY_ID no configurado' },
        { status: 400 }
      )
    }

    // Cargar Service Account Key
    let credentials
    if (process.env.GA4_SERVICE_ACCOUNT_KEY_PATH) {
      // Desde archivo (desarrollo)
      credentials = require(process.env.GA4_SERVICE_ACCOUNT_KEY_PATH)
    } else if (process.env.GA4_SERVICE_ACCOUNT_KEY) {
      // Desde string JSON (producción)
      credentials = JSON.parse(process.env.GA4_SERVICE_ACCOUNT_KEY)
    } else {
      return NextResponse.json(
        { error: 'GA4_SERVICE_ACCOUNT_KEY no configurado' },
        { status: 400 }
      )
    }

    // Crear cliente de Analytics Data API
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    })

    // Obtener métricas
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    })

    // Procesar respuesta
    const rows = response.rows || []
    const totals = response.totals?.[0]?.metricValues || []

    return NextResponse.json({
      pageViews: parseInt(totals[0]?.value || '0'),
      uniqueVisitors: parseInt(totals[1]?.value || '0'),
      bounceRate: parseFloat(totals[2]?.value || '0') * 100,
      avgSessionDuration: Math.round(parseFloat(totals[3]?.value || '0')),
    })
  } catch (error: any) {
    console.error('Error en API GA4:', error)
    return NextResponse.json(
      { error: error.message || 'Error obteniendo métricas' },
      { status: 500 }
    )
  }
}
```

## 📊 Métricas Disponibles en el Dashboard

Una vez configurado, el dashboard mostrará:

- ✅ **Vistas de página** (screenPageViews)
- ✅ **Visitantes únicos** (activeUsers)
- ✅ **Tasa de rebote** (bounceRate)
- ✅ **Duración media de sesión** (averageSessionDuration)
- ✅ **Páginas más visitadas**
- ✅ **Fuentes de tráfico**
- ✅ **Breakdown de dispositivos**

## 🔍 Verificar Configuración

1. Ve a `/admin/analytics`
2. Si está configurado correctamente, verás un badge verde: "✅ Google Analytics configurado"
3. Las métricas deberían ser números reales en lugar de datos de ejemplo

## 🐛 Troubleshooting

### Error: "GA4_PROPERTY_ID no configurado"
- Verifica que `GA4_PROPERTY_ID` esté en las variables de entorno
- Formato: solo números (ej: `123456789`), no incluyas `properties/`

### Error: "GA4_SERVICE_ACCOUNT_KEY no configurado"
- Verifica que el JSON esté correctamente formateado
- Si usas string JSON, asegúrate de escapar comillas correctamente
- En Vercel, verifica que no haya caracteres especiales

### Error: "Permission denied"
- Verifica que el Service Account tenga acceso en GA4
- Verifica que el rol sea al menos "Viewer"
- Espera 5-10 minutos después de conceder acceso

### No aparecen datos
- Verifica que haya tráfico real en GA4 para el período seleccionado
- Verifica que la API esté habilitada en Google Cloud Console
- Revisa los logs de la API en `/api/analytics/ga4`

## 📚 Recursos

- [Google Analytics Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Account Authentication](https://cloud.google.com/iam/docs/service-accounts)
- [Google Analytics Admin](https://analytics.google.com/analytics/web/)

---

**Nota**: La implementación actual muestra datos de ejemplo. Una vez configuradas las credenciales y actualizado el código con `@google-analytics/data`, las métricas serán reales.
