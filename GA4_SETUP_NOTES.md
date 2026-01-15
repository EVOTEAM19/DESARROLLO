# Configuración GA4 - Notas y Estado Actual

## ✅ Información Configurada

### Property ID
- **Property ID**: `520060270`
- **Nombre de la propiedad**: FASTIA
- **Measurement ID**: `G-7PKNBN52F3`

### Measurement Protocol API Secret
- **API Secret**: `EQoUZSICRxK3zm19FqOTfQ`
- **Apodo**: FASTIA
- **Fecha de creación**: 15 ene 2026, 22:16:59

**Nota**: Este API Secret es para **enviar eventos** al Measurement Protocol, no para leer datos de la API. Para el dashboard de admin necesitamos el Service Account Key.

### Service Account
- **Email**: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
- **Estado**: Habilitado
- **Clave**: ⚠️ **No creada** (ver problema abajo)

---

## ⚠️ Problema Detectado

### Bloqueo de Service Account Key

Google Cloud tiene una política de organización activa que **bloquea la creación de Service Account Keys**:

- **Política aplicada**: `iam.disableServiceAccountKeyCreation`
- **Motivo**: Seguridad - las claves de service account son un riesgo si no se administran correctamente
- **Estado**: La política está activada y bloquea la creación de claves

---

## 🔧 Soluciones Posibles

### Opción 1: Desactivar Política (Recomendado para desarrollo)

Si tienes acceso como **Organization Policy Administrator**:

1. Ve a Google Cloud Console > **IAM & Admin** > **Organization Policies**
2. Busca la política `iam.disableServiceAccountKeyCreation`
3. Configura el estado a **"Not Enforced"** o **"Disabled"** para tu proyecto
4. Luego podrás crear el Service Account Key

### Opción 2: Contactar al Administrador

Si no tienes permisos:

1. Contacta al administrador de la organización (rol: `roles/orgpolicy.policyAdmin`)
2. Solicita que desactive temporalmente la política para tu proyecto
3. O solicita que creen el key y te lo proporcionen de forma segura

### Opción 3: Workload Identity Federation (Avanzado)

Alternativa más segura pero más compleja:

- Usar **Workload Identity Federation** en lugar de Service Account Keys
- Requiere configuración adicional en Google Cloud
- No requiere claves estáticas (más seguro)

### Opción 4: Desarrollo Local Sin Keys

Para desarrollo local, puedes:

1. Usar datos de ejemplo (como está ahora)
2. O usar el API Secret del Measurement Protocol solo para enviar eventos
3. No podrás leer métricas de GA4 Data API hasta tener el Service Account Key

---

## 📝 Variables de Entorno Necesarias

### Ya Configuradas (o configurables):

```env
# Measurement ID (ya lo tienes)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3

# Property ID (ya lo tienes)
GA4_PROPERTY_ID=520060270

# Measurement Protocol API Secret (para enviar eventos)
# Este es diferente del Service Account Key
GA4_MEASUREMENT_PROTOCOL_SECRET=EQoUZSICRxK3zm19FqOTfQ
```

### Falta Configurar:

```env
# Service Account Key (JSON completo como string)
GA4_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

# O ruta al archivo JSON (desarrollo local)
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

---

## 🚀 Pasos Siguientes

### Para Activar el Dashboard de Admin con Datos Reales:

1. **Resolver el bloqueo de Service Account Key**:
   - Opción A: Desactivar política `iam.disableServiceAccountKeyCreation`
   - Opción B: Contactar al administrador

2. **Crear el Service Account Key**:
   - Ve a Google Cloud Console > IAM & Admin > Service Accounts
   - Selecciona `fastia-analytics`
   - Ve a la pestaña "Keys" > "Add Key" > "Create new key"
   - Selecciona formato JSON
   - Descarga el archivo

3. **Configurar Variables de Entorno**:
   - En `.env.local` (desarrollo):
     ```env
     GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
     ```
   - En Vercel (producción):
     - Ve a Settings > Environment Variables
     - Añade `GA4_SERVICE_ACCOUNT_KEY` con el contenido JSON como string

4. **Conceder Permisos en GA4**:
   - Ve a Google Analytics > Admin > Property Access Management
   - Añade el email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
   - Rol: **Viewer**

5. **Verificar**:
   - Inicia el servidor: `npm run dev`
   - Ve a `/admin/analytics`
   - Deberías ver el badge verde: "✅ Google Analytics configurado"
   - Las métricas deberían ser números reales

---

## 📚 Recursos

- [Google Analytics Admin](https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/settings)
- [Google Cloud Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
- [Organización Policies](https://console.cloud.google.com/iam-admin/orgpolicies)
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)

---

## ⚡ Estado Actual

- ✅ Property ID obtenido: `520060270`
- ✅ Service Account creado: `fastia-analytics`
- ⚠️ Service Account Key: **Bloqueado por política de organización**
- ⚠️ Dashboard de admin: Mostrará datos de ejemplo hasta resolver el bloqueo
