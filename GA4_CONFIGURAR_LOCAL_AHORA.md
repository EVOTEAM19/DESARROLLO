# 🚀 Configurar GA4 para Mostrar Datos Reales (PASOS INMEDIATOS)

## ⚠️ El Problema

El dashboard muestra datos de ejemplo porque **`GA4_SERVICE_ACCOUNT_KEY_PATH` no está configurado** en `.env.local`.

## ✅ Solución Paso a Paso (5 minutos)

### Paso 1: Verificar que existe `service-account-key.json`

1. Abre el explorador de archivos
2. Navega a: `c:\Users\USER\DESARROLLO\DESARROLLO\`
3. **Verifica** que existe el archivo `service-account-key.json`
4. Si **NO existe**, copia el contenido del JSON que creaste antes y guárdalo como `service-account-key.json`

### Paso 2: Configurar `.env.local`

1. **Abre** el archivo `.env.local` en la raíz del proyecto (`c:\Users\USER\DESARROLLO\DESARROLLO\.env.local`)
   - Si no existe, **crea** un nuevo archivo llamado `.env.local`

2. **Añade o verifica** estas líneas exactas:

```env
# Google Analytics 4 - Configuración para desarrollo local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

**⚠️ IMPORTANTE:**
- Debe ser `GA4_SERVICE_ACCOUNT_KEY_PATH` (NO `GA4_SERVICE_ACCOUNT_KEY` para desarrollo local)
- La ruta debe ser `./service-account-key.json` (relativa a la raíz del proyecto)
- **NO** dejes espacios alrededor del signo `=`
- **NO** pongas comillas alrededor de los valores

3. **Guarda** el archivo `.env.local`

### Paso 3: Reiniciar el Servidor (CRÍTICO)

⚠️ **ESTO ES OBLIGATORIO**: Después de cambiar `.env.local`, debes reiniciar el servidor.

1. **Ve a la terminal** donde está corriendo `npm run dev`
2. **Detén** el servidor: Presiona `Ctrl + C`
3. **Reinicia** el servidor:
   ```bash
   npm run dev
   ```
4. **Espera** a que el servidor inicie completamente (deberías ver "Ready" en la terminal)

### Paso 4: Verificar Permisos en Google Analytics

Antes de que funcione, el Service Account debe tener permisos:

1. **Abre** este enlace en tu navegador:
   ```
   https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/access-management
   ```

2. **Busca** en la lista de usuarios:
   ```
   fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com
   ```

3. **Si NO aparece**, añádelo:
   - Haz clic en **"+"** o **"Añadir usuarios"**
   - Email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
   - Rol: **"Viewer"** (solo lectura)
   - Haz clic en **"Añadir"**

4. **Si ya existe**, verifica que el rol sea **"Viewer"**

### Paso 5: Verificar el Dashboard

1. **Abre** en tu navegador:
   ```
   http://localhost:3001/admin/analytics
   ```

2. **Deberías ver**:
   - ✅ Badge verde: "✅ Google Analytics configurado" (en lugar del amarillo)
   - 📊 Métricas reales de GA4 (si hay datos)
   - ❌ **NO** deberías ver el mensaje rojo: "GA4_SERVICE_ACCOUNT_KEY no configurado"

3. **Si aún ves el badge amarillo**:
   - Revisa los logs del servidor en la terminal (busca errores)
   - Abre la consola del navegador (F12) y busca errores
   - Verifica que `.env.local` se guardó correctamente
   - Asegúrate de que el servidor fue reiniciado

---

## 🔍 Verificación Rápida

### Contenido Correcto de `.env.local`

Tu archivo `.env.local` debe contener estas líneas (puede tener otras líneas también):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

### Estructura de Archivos Correcta

```
c:\Users\USER\DESARROLLO\DESARROLLO\
├── .env.local                           ← Debe existir y tener las 3 líneas de arriba
├── service-account-key.json             ← Debe existir en la raíz
├── src/
├── package.json
└── ...
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module './service-account-key.json'"

**Causa**: La ruta del archivo es incorrecta.

**Solución**:
1. Verifica que `service-account-key.json` está en `c:\Users\USER\DESARROLLO\DESARROLLO\`
2. Verifica que `.env.local` tiene: `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
3. **Reinicia el servidor**

### Error: "GA4_SERVICE_ACCOUNT_KEY no configurado"

**Causa**: La variable de entorno no está siendo leída.

**Solución**:
1. Verifica que `.env.local` existe y tiene `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
2. Verifica que **NO** hay espacios: `GA4_SERVICE_ACCOUNT_KEY_PATH = ./service-account-key.json` ❌ (incorrecto)
3. Debe ser: `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json` ✅ (correcto)
4. **Reinicia el servidor**

### Error: "Permission denied" en los logs del servidor

**Causa**: El Service Account no tiene permisos en Google Analytics.

**Solución**:
1. Ve a: https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/access-management
2. Añade `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com` con rol "Viewer"
3. Espera 5-10 minutos para que se propaguen los permisos
4. Refresca el dashboard

### El Dashboard Muestra Ceros (0)

**Causa**: GA4 está configurado, pero no hay datos aún o el período seleccionado no tiene datos.

**Solución**:
1. Verifica que Google Analytics está recibiendo datos (ve a Google Analytics directamente)
2. Cambia el rango de fechas en el dashboard (prueba "Últimos 30 días")
3. Asegúrate de que tu sitio web está enviando eventos a GA4

---

## ✅ Checklist Final

Antes de probar el dashboard, verifica:

- [ ] `service-account-key.json` existe en la raíz del proyecto
- [ ] `.env.local` existe y contiene `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
- [ ] `.env.local` contiene `GA4_PROPERTY_ID=520060270`
- [ ] `.env.local` contiene `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3`
- [ ] El servidor de desarrollo fue **REINICIADO** después de cambiar `.env.local`
- [ ] El Service Account tiene permisos "Viewer" en Google Analytics
- [ ] El dashboard muestra badge verde (no amarillo)

---

## 📝 Comando para Verificar (Opcional)

Si quieres verificar rápidamente, puedes ejecutar este comando en PowerShell desde la raíz del proyecto:

```powershell
# Verificar que existe service-account-key.json
Test-Path .\service-account-key.json

# Verificar que .env.local tiene la línea correcta
Select-String -Path .env.local -Pattern "GA4_SERVICE_ACCOUNT_KEY_PATH"
```

---

**¿Aún no funciona después de seguir estos pasos?**

1. Abre la **consola del navegador** (F12) y mira los errores
2. Revisa los **logs del servidor** en la terminal
3. Asegúrate de que **reiniciaste el servidor** después de cambiar `.env.local`
4. Verifica que el archivo `service-account-key.json` tiene el formato JSON correcto
