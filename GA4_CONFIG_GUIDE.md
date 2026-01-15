# Guía de Configuración GA4 para FastIA

Esta guía te ayudará a configurar Google Analytics 4 para que el dashboard de admin muestre métricas reales.

## 📋 Lo que ya tienes configurado

- ✅ **Measurement ID**: `G-7PKNBN52F3` (ya está en el código)
- ✅ Google tag (gtag.js) funcionando en el sitio

## 🎯 Lo que necesitas obtener

1. **Property ID** (diferente del Measurement ID)
2. **Service Account Key** (JSON con credenciales)

---

## Paso 1: Obtener el Property ID

El **Property ID** es diferente del **Measurement ID**. Aquí cómo encontrarlo:

### Opción A: Desde Google Analytics (Recomendado)

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad correcta (la que tiene Measurement ID `G-7PKNBN52F3`)
3. Haz clic en **Admin** (engranaje ⚙️ en la esquina inferior izquierda)
4. En la columna **Property**, haz clic en **Property Settings**
5. Busca **Property ID** - es un número como `123456789` o `456789012`
6. **Copia este número** (solo números, sin el prefijo `properties/`)

### Opción B: Desde la URL

1. En Google Analytics, ve a cualquier reporte de tu propiedad
2. Mira la URL del navegador
3. Busca algo como: `analytics.google.com/analytics/web/#/p123456789/`
4. El número después de `/p` es tu Property ID: `123456789`

### Opción C: Desde Data Streams

1. En Google Analytics, ve a **Admin** → **Data Streams**
2. Haz clic en tu stream (el que tiene `G-7PKNBN52F3`)
3. En "Stream Details", verás un **Stream ID** numérico - este suele ser el mismo que el Property ID

---

## Paso 2: Crear Service Account en Google Cloud

### 2.1. Acceder a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. **Selecciona o crea un proyecto**:
   - Si no tienes proyecto, haz clic en "Select a project" → "New Project"
   - Nombre: `fastia-analytics` (o el que prefieras)
   - Haz clic en "Create"

### 2.2. Crear Service Account

1. En el menú izquierdo, ve a **IAM & Admin** → **Service Accounts**
2. Haz clic en **+ CREATE SERVICE ACCOUNT** (arriba)
3. Completa:
   - **Service account name**: `fastia-analytics`
   - **Service account ID**: se genera automáticamente
   - **Description**: `Service account para acceso a Google Analytics Data API`
4. Haz clic en **CREATE AND CONTINUE**
5. En "Grant this service account access to project":
   - **Role**: Selecciona **Viewer** (mínimo necesario)
   - Haz clic en **CONTINUE**
6. Haz clic en **DONE**

### 2.3. Crear y Descargar JSON Key

1. En la lista de Service Accounts, haz clic en `fastia-analytics` (o el nombre que pusiste)
2. Ve a la pestaña **KEYS**
3. Haz clic en **ADD KEY** → **Create new key**
4. Selecciona **JSON**
5. Haz clic en **CREATE**
6. **Se descargará automáticamente un archivo JSON** - guárdalo en un lugar seguro
   - ⚠️ Este archivo contiene credenciales sensibles, no lo compartas públicamente

---

## Paso 3: Habilitar Google Analytics Data API

1. En Google Cloud Console, ve a **APIs & Services** → **Library**
2. Busca "**Google Analytics Data API**"
3. Haz clic en el resultado
4. Haz clic en **ENABLE**
5. Espera a que se habilite (puede tardar unos segundos)

---

## Paso 4: Conceder Acceso al Service Account en GA4

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad correcta (con `G-7PKNBN52F3`)
3. Ve a **Admin** → **Property Access Management**
4. Haz clic en **+** (botón azul, arriba)
5. En "Email addresses":
   - Pega el **email del Service Account** que creaste
   - Formato: `fastia-analytics@tu-proyecto-id.iam.gserviceaccount.com`
   - (Lo encuentras en el archivo JSON descargado, campo `client_email`)
6. En "Notify this user by email": desactivar (opcional)
7. En "Access role": Selecciona **Viewer**
8. Haz clic en **ADD**
9. **Espera 5-10 minutos** para que los permisos se propaguen

---

## Paso 5: Configurar Variables de Entorno

### Para desarrollo local (`.env.local`):

```env
# Google Analytics 4 Measurement ID (ya lo tienes)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3

# Google Analytics 4 Property ID (obtener en Paso 1)
# Formato: solo números (ej: 123456789)
GA4_PROPERTY_ID=123456789

# Google Analytics 4 Service Account Key
# OPCIÓN 1: Ruta al archivo JSON (desarrollo local - más fácil)
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json

# OPCIÓN 2: JSON completo como string (producción)
# Descomentar solo si no usas GA4_SERVICE_ACCOUNT_KEY_PATH
# GA4_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
```

### Para producción (Vercel):

1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. Ve a **Settings** → **Environment Variables**
3. Añade estas variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-7PKNBN52F3` | Production, Preview, Development |
| `GA4_PROPERTY_ID` | `123456789` (tu Property ID) | Production, Preview, Development |
| `GA4_SERVICE_ACCOUNT_KEY` | `{JSON completo}` (ver abajo) | Production, Preview, Development |

**Para obtener el JSON como string para Vercel:**

1. Abre el archivo JSON descargado
2. Copia TODO el contenido
3. En Vercel, pégalo tal cual en el campo `Value` de `GA4_SERVICE_ACCOUNT_KEY`
4. ⚠️ Asegúrate de que esté en una sola línea o que los saltos de línea estén como `\n`

---

## Paso 6: Instalar Dependencia (si no está instalada)

```bash
npm install @google-analytics/data
```

---

## Paso 7: Verificar Configuración

1. Inicia tu servidor: `npm run dev`
2. Ve a `/admin/analytics`
3. Deberías ver:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales (en lugar de datos de ejemplo)

---

## 🔧 Formato del JSON para Vercel

Si usas `GA4_SERVICE_ACCOUNT_KEY` en Vercel, el JSON debe estar como string. Ejemplo:

```json
{"type":"service_account","project_id":"tu-proyecto","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"fastia-analytics@tu-proyecto.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/fastia-analytics%40tu-proyecto.iam.gserviceaccount.com"}
```

**Importante:**
- Debe estar en una sola línea
- Los saltos de línea en `private_key` deben ser `\n` (no saltos de línea reales)
- Escapa las comillas correctamente

---

## 🐛 Troubleshooting

### Error: "GA4_PROPERTY_ID no configurado"
- Verifica que `GA4_PROPERTY_ID` esté en `.env.local`
- Formato: solo números, sin `properties/` ni `G-`

### Error: "GA4_SERVICE_ACCOUNT_KEY no configurado"
- Verifica que el JSON esté correctamente formateado
- Si usas `GA4_SERVICE_ACCOUNT_KEY_PATH`, verifica que la ruta sea correcta
- Si usas `GA4_SERVICE_ACCOUNT_KEY`, verifica que el JSON esté como string válido

### Error: "Permission denied" o "Insufficient permissions"
- Verifica que el Service Account tenga rol "Viewer" en GA4
- Espera 5-10 minutos después de conceder acceso
- Verifica que el email del Service Account sea correcto

### No aparecen datos
- Verifica que haya tráfico real en GA4 para el período seleccionado
- Verifica que la API esté habilitada en Google Cloud Console
- Revisa los logs del servidor para errores

---

## 📊 Checklist Final

- [ ] Property ID obtenido y añadido a `.env.local`
- [ ] Service Account creado en Google Cloud
- [ ] JSON Key descargado
- [ ] Google Analytics Data API habilitada
- [ ] Service Account tiene acceso "Viewer" en GA4
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Variables de entorno configuradas en Vercel (producción)
- [ ] `@google-analytics/data` instalado
- [ ] Dashboard muestra badge verde: "✅ Google Analytics configurado"
- [ ] Métricas reales aparecen en el dashboard

---

## 📚 Recursos

- [Google Analytics Admin](https://analytics.google.com/analytics/web/)
- [Google Cloud Console](https://console.cloud.google.com)
- [Google Analytics Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
