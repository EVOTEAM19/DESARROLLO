# Guía: Resolver Bloqueo de Service Account Key

Esta guía te ayudará a desactivar la política que bloquea la creación de Service Account Keys y crear la clave necesaria para GA4.

## 🎯 Objetivo

Crear el Service Account Key para `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`

---

## Paso 1: Desactivar la Política de Organización

### 1.1. Acceder a Organization Policies

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Asegúrate de estar en el proyecto correcto: **"My First Project"** (o tu proyecto)
3. En el menú izquierdo, ve a **IAM & Admin** → **Organization Policies**
   - URL directa: `https://console.cloud.google.com/iam-admin/orgpolicies`

### 1.2. Buscar la Política

1. En la barra de búsqueda, busca: `disableServiceAccountKeyCreation`
2. O busca manualmente en la lista: **"Disable service account key creation"**
3. Haz clic en la política

### 1.3. Desactivar la Política

1. Verás las opciones:
   - **Enforced** (Aplicada) - bloquea la creación
   - **Not Enforced** (No aplicada) - permite la creación
2. Selecciona **"Not Enforced"**
3. Haz clic en **"Save"** (Guardar)
4. Espera unos segundos a que se actualice

**Nota**: Si no aparece la opción "Not Enforced", es posible que necesites cambiar el **scope** de la política (proyecto específico vs. organización completa).

---

## Paso 2: Crear el Service Account Key

### 2.1. Ir al Service Account

1. Ve a **IAM & Admin** → **Service Accounts**
   - URL directa: `https://console.cloud.google.com/iam-admin/serviceaccounts`
2. Busca y haz clic en: **`fastia-analytics`**
   - Email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`

### 2.2. Crear la Key

1. Ve a la pestaña **"KEYS"** (Claves)
2. Haz clic en **"ADD KEY"** → **"Create new key"**
3. Selecciona formato: **JSON**
4. Haz clic en **"CREATE"**
5. **Se descargará automáticamente un archivo JSON**
   - ⚠️ **Guárdalo en un lugar seguro** - contiene credenciales sensibles
   - ⚠️ **NO lo subas a Git** - asegúrate de que esté en `.gitignore`

### 2.3. Verificar la Descarga

El archivo JSON descargado debería verse así:
```json
{
  "type": "service_account",
  "project_id": "sustained-hold-483822-e2",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com",
  "client_id": "114748996236760042763",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

---

## Paso 3: Habilitar Google Analytics Data API

### 3.1. Ir a APIs & Services

1. Ve a **APIs & Services** → **Library**
   - URL directa: `https://console.cloud.google.com/apis/library`
2. Busca: **"Google Analytics Data API"**
3. Haz clic en el resultado
4. Haz clic en **"ENABLE"** (Habilitar)
5. Espera a que se habilite (puede tardar unos segundos)

---

## Paso 4: Dar Permisos en Google Analytics 4

### 4.1. Acceder a GA4 Admin

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad **"FASTIA"** (Property ID: `520060270`)
3. Ve a **Admin** (⚙️ en la esquina inferior izquierda)

### 4.2. Añadir Service Account

1. En la columna **Property**, haz clic en **"Property Access Management"**
2. Haz clic en el botón **"+"** (arriba a la derecha)
3. En **"Email addresses"**, pega:
   ```
   fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com
   ```
4. En **"Access role"**, selecciona: **"Viewer"**
5. (Opcional) Desactiva **"Notify this user by email"**
6. Haz clic en **"ADD"**
7. **Espera 5-10 minutos** para que los permisos se propaguen

---

## Paso 5: Configurar Variables de Entorno

### 5.1. Desarrollo Local (`.env.local`)

1. Mueve el archivo JSON descargado a tu proyecto:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```
2. Añade a `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
   GA4_PROPERTY_ID=520060270
   GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
   ```
3. Verifica que `service-account-key.json` esté en `.gitignore`:
   ```gitignore
   service-account-key.json
   *.json
   .env.local
   ```

### 5.2. Producción (Vercel)

#### Opción A: Usar JSON como String (Recomendado)

1. Abre el archivo `service-account-key.json`
2. Copia **TODO** el contenido (todo en una línea o con `\n` para saltos de línea)
3. Ve a [Vercel Dashboard](https://vercel.com)
4. Selecciona tu proyecto: **desarrollo**
5. Ve a **Settings** → **Environment Variables**
6. Añade estas variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-7PKNBN52F3` | Production, Preview, Development |
| `GA4_PROPERTY_ID` | `520060270` | Production, Preview, Development |
| `GA4_SERVICE_ACCOUNT_KEY` | `{JSON completo en una línea}` | Production, Preview, Development |

**Formato del JSON en Vercel:**
```json
{"type":"service_account","project_id":"sustained-hold-483822-e2","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com","client_id":"114748996236760042763","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

**Importante**: 
- Debe estar en una sola línea
- Los saltos de línea en `private_key` deben ser `\n` (no saltos de línea reales)
- Copia el JSON exactamente como está (sin espacios extras al inicio/fin)

#### Opción B: Usar Secretos de Vercel (Avanzado)

Si prefieres no pegar el JSON directamente, puedes usar Vercel Secrets, pero requiere configuración adicional.

---

## Paso 6: Verificar Configuración

### 6.1. Desarrollo Local

1. Inicia el servidor: `npm run dev`
2. Ve a: `http://localhost:3001/admin/analytics`
3. Deberías ver:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales (no datos de ejemplo)

### 6.2. Producción (Vercel)

1. Haz un nuevo deploy: `vercel --prod`
2. Espera a que termine el build
3. Ve a: `https://tu-dominio.com/admin/analytics`
4. Verifica que las métricas sean reales

---

## 🐛 Solución de Problemas

### Error: "Policy still enforced"

**Solución:**
- Verifica que hayas guardado los cambios en Organization Policies
- Espera 1-2 minutos para que se propague
- Intenta crear la key nuevamente

### Error: "Permission denied" en GA4

**Solución:**
- Verifica que el Service Account tenga rol "Viewer" en GA4
- Espera 10-15 minutos después de conceder acceso
- Verifica que el email del Service Account sea correcto

### Error: "API not enabled"

**Solución:**
- Verifica que "Google Analytics Data API" esté habilitada
- Ve a APIs & Services > Library y busca la API
- Haz clic en "ENABLE" si no está habilitada

### Error: "Invalid credentials"

**Solución:**
- Verifica que el JSON esté completo y correctamente formateado
- En Vercel, asegúrate de que el JSON esté en una sola línea
- Verifica que no haya espacios extras al inicio/fin

### No aparecen datos en el dashboard

**Solución:**
- Verifica que haya tráfico real en GA4 para el período seleccionado
- Espera algunos minutos después de la configuración
- Revisa los logs del servidor para errores

---

## ✅ Checklist Final

- [ ] Política `iam.disableServiceAccountKeyCreation` desactivada
- [ ] Service Account Key creado y descargado
- [ ] Google Analytics Data API habilitada
- [ ] Service Account tiene acceso "Viewer" en GA4
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Variables de entorno configuradas en Vercel
- [ ] `service-account-key.json` añadido a `.gitignore`
- [ ] Servidor iniciado y probado localmente
- [ ] Dashboard muestra badge verde
- [ ] Métricas reales aparecen en el dashboard

---

## 📚 Recursos

- [Google Cloud Organization Policies](https://console.cloud.google.com/iam-admin/orgpolicies)
- [Google Cloud Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
- [Google Analytics Admin](https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/settings)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🔒 Seguridad

⚠️ **Importante**:
- **NUNCA** commitees el archivo JSON a Git
- Añade `service-account-key.json` a `.gitignore`
- En producción, usa variables de entorno (no archivos)
- Si se compromete una key, elimínala inmediatamente en Google Cloud Console

---

**Una vez completados todos los pasos, el dashboard de admin debería mostrar métricas reales de Google Analytics 4.**
