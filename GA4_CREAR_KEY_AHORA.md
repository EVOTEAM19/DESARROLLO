# ✅ Política Desactivada - Crear Service Account Key Ahora

¡Perfecto! Veo que ambas políticas están ahora **"Inactivas"** (Inactive) y hay una notificación de "Política actualizada". La política ya está desactivada.

---

## 🎉 Estado Actual

✅ **Política `iam.disableServiceAccountKeyCreation`**: **"Inactiva"**
✅ **Notificación**: "Política actualizada para la restricción..."
✅ **Estado**: Listo para crear Service Account Keys

---

## ✅ Pasos para Crear el Service Account Key

### Paso 1: Ir a Service Accounts

1. En el menú izquierdo, haz clic en: **"Cuentas de servicio"** (Service Accounts)
   - O ve directamente: **IAM & Admin** → **Service Accounts**

2. **Asegúrate de estar en el proyecto**: "My First Project"
   - Verifica el selector superior

### Paso 2: Acceder a fastia-analytics

1. En la lista de Service Accounts, busca: **`fastia-analytics`**
   - Email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`

2. **Haz clic en el Service Account** (en el nombre o email)

### Paso 3: Ir a la Pestaña KEYS

1. En la página de detalles del Service Account, busca las pestañas en la parte superior
2. Haz clic en la pestaña: **"KEYS"** (Claves)

### Paso 4: Crear la Key

1. Haz clic en **"ADD KEY"** (o **"+ AGREGAR CLAVE"**)
2. Selecciona: **"Create new key"** (Crear nueva clave)
3. Selecciona formato: **"JSON"**
4. Haz clic en **"CREATE"** (Crear)

5. **Se descargará automáticamente** un archivo JSON
   - Nombre: algo como `sustained-hold-483822-e2-xxxxx.json`
   - ⚠️ **Guarda este archivo en un lugar seguro**

### Paso 5: Guardar el Archivo en tu Proyecto

1. **Mueve el archivo** descargado a tu proyecto:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```

2. **Renómbralo** a: `service-account-key.json` (opcional, pero recomendado)

3. ⚠️ **Verifica** que esté en `.gitignore`:
   - Ya está configurado ✅

---

## 🔧 Configurar Variables de Entorno

### Desarrollo Local (`.env.local`)

Añade o actualiza:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

### Producción (Vercel)

1. Ve a [Vercel Dashboard](https://vercel.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Añade:

| Name | Value | Environment |
|------|-------|-------------|
| `GA4_PROPERTY_ID` | `520060270` | Production, Preview, Development |
| `GA4_SERVICE_ACCOUNT_KEY` | `{JSON completo en una línea}` | Production, Preview, Development |

**Para obtener el JSON como string:**
1. Abre el archivo `service-account-key.json`
2. Copia TODO el contenido
3. Pégalo en Vercel (debe estar en una sola línea o con `\n` para saltos de línea)

---

## ✅ Verificar que Funciona

### Desarrollo Local

1. Inicia el servidor: `npm run dev`
2. Ve a: `http://localhost:3001/admin/analytics`
3. Deberías ver:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales (no datos de ejemplo)

### Producción (Vercel)

1. Haz un nuevo deploy: `vercel --prod`
2. Ve a: `https://tu-dominio.com/admin/analytics`
3. Verifica que las métricas sean reales

---

## 🎯 Siguiente Paso: Dar Permisos en GA4

Después de crear la key, necesitas dar permisos al Service Account en Google Analytics:

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad **"FASTIA"** (Property ID: `520060270`)
3. Ve a **Admin** → **Property Access Management**
4. Haz clic en **"+"**
5. Email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
6. Rol: **"Viewer"**
7. Haz clic en **"ADD"**
8. **Espera 5-10 minutos** para que se propaguen los permisos

---

## 📋 Checklist Final

- [ ] Política desactivada: Ambas políticas están "Inactivas" ✅
- [ ] Ir a Service Accounts
- [ ] Hacer clic en `fastia-analytics`
- [ ] Ir a pestaña "KEYS"
- [ ] Hacer clic en "ADD KEY" → "Create new key" → "JSON"
- [ ] Descargar el archivo JSON
- [ ] Mover a `./service-account-key.json` en el proyecto
- [ ] Configurar `.env.local` con `GA4_SERVICE_ACCOUNT_KEY_PATH`
- [ ] Dar permisos en GA4 (Property Access Management)
- [ ] Configurar variables en Vercel (producción)
- [ ] Probar el dashboard de admin

---

**¡La política ya está desactivada! Ahora puedes crear el Service Account Key sin problemas. Ve a Service Accounts → fastia-analytics → KEYS → ADD KEY → JSON y descarga el archivo.**
