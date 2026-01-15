# ✅ Verificar Configuración Local de GA4

## 📋 Checklist de Verificación

### 1. Verificar Archivo `service-account-key.json`

✅ El archivo debe estar en la **raíz del proyecto**: `c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json`

**Verificar que existe:**
- Abre el explorador de archivos
- Navega a `c:\Users\USER\DESARROLLO\DESARROLLO\`
- Verifica que existe `service-account-key.json`

### 2. Configurar `.env.local`

El archivo `.env.local` debe contener estas variables:

```env
# Google Analytics 4 Measurement ID (ya configurado)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3

# Google Analytics 4 Property ID (ya configurado)
GA4_PROPERTY_ID=520060270

# Google Analytics 4 Service Account Key Path (PARA DESARROLLO LOCAL)
# IMPORTANTE: Usa esta línea para desarrollo local
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json

# NO uses GA4_SERVICE_ACCOUNT_KEY en desarrollo local (eso es para Vercel)
# Si existe GA4_SERVICE_ACCOUNT_KEY en .env.local, cómmentalo o elimínalo:
# # GA4_SERVICE_ACCOUNT_KEY=
```

**Pasos para configurar:**

1. **Abre** `.env.local` en la raíz del proyecto
2. **Asegúrate** de tener estas líneas exactas:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
   GA4_PROPERTY_ID=520060270
   GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
   ```
3. **NO debe haber** `GA4_SERVICE_ACCOUNT_KEY=` (comentado o eliminado para desarrollo local)
4. **Guarda** el archivo

### 3. Reiniciar el Servidor de Desarrollo

⚠️ **IMPORTANTE**: Después de cambiar `.env.local`, debes **reiniciar** el servidor de desarrollo.

1. **Detén** el servidor actual (presiona `Ctrl+C` en la terminal)
2. **Reinicia** el servidor:
   ```bash
   npm run dev
   ```
3. **Espera** a que el servidor inicie completamente
4. **Abre** `http://localhost:3001/admin/analytics` en el navegador

### 4. Verificar Permisos en Google Analytics

✅ **VERIFICAR**: El Service Account debe tener permisos de "Viewer" en Google Analytics.

1. Ve a [Google Analytics Admin](https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/access-management)
2. Verifica que existe: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
3. Verifica que tiene el rol: **"Viewer"**
4. Si no aparece, añádelo (instrucciones en `GA4_CONFIG_GUIDE.md`)

### 5. Verificar el Dashboard

Después de reiniciar el servidor:

1. **Abre**: `http://localhost:3001/admin/analytics`
2. **Deberías ver**:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales de GA4 (no datos de ejemplo)
3. **Si aún ves** el badge amarillo:
   - Verifica que `.env.local` está guardado correctamente
   - Verifica que el servidor fue reiniciado
   - Revisa la consola del navegador para errores
   - Revisa los logs del servidor en la terminal

---

## 🔍 Troubleshooting

### Error: "Cannot find module './service-account-key.json'"

**Causa**: La ruta del archivo es incorrecta o el archivo no existe.

**Solución**:
1. Verifica que `service-account-key.json` está en la raíz del proyecto
2. Verifica que `.env.local` tiene: `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
3. Reinicia el servidor

### Error: "GA4_SERVICE_ACCOUNT_KEY no configurado"

**Causa**: La variable de entorno no está siendo leída correctamente.

**Solución**:
1. Verifica que `.env.local` tiene `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
2. Verifica que NO hay espacios extras alrededor del `=`
3. Reinicia el servidor (importante)

### Error: "Permission denied" o "Access denied"

**Causa**: El Service Account no tiene permisos en Google Analytics.

**Solución**:
1. Ve a [Google Analytics Admin](https://analytics.google.com/analytics/web/#/a380738541p520060270/admin/property/access-management)
2. Añade `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com` con rol "Viewer"
3. Espera 5-10 minutos para que se propaguen los permisos
4. Refresca el dashboard

### Badge Amarillo Persiste

**Si el badge amarillo persiste después de configurar todo**:

1. **Abre la consola del navegador** (F12)
2. **Abre la pestaña "Network"**
3. **Filtra por "ga4"** o "analytics"
4. **Haz clic en el botón de refrescar** del dashboard
5. **Inspecciona la respuesta** de `/api/analytics/ga4`
6. **Busca el mensaje de error** en la respuesta JSON

---

## 📝 Configuración Correcta - Resumen

### `.env.local` (Desarrollo Local)

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

### Vercel (Producción)

En Vercel, usa:
- `GA4_SERVICE_ACCOUNT_KEY` = JSON completo en una sola línea (ver `GA4_CONFIGURAR_KEY_DESCARGADA.md`)
- `GA4_SERVICE_ACCOUNT_KEY_PATH` = **NO** necesario en Vercel

---

## ✅ Checklist Final

- [ ] `service-account-key.json` existe en la raíz del proyecto
- [ ] `.env.local` tiene `GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json`
- [ ] `.env.local` tiene `GA4_PROPERTY_ID=520060270`
- [ ] `.env.local` tiene `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3`
- [ ] Servidor de desarrollo reiniciado después de cambiar `.env.local`
- [ ] Service Account tiene permisos "Viewer" en Google Analytics
- [ ] Dashboard muestra badge verde: "✅ Google Analytics configurado"

---

**¿Aún no funciona?** Revisa los logs del servidor en la terminal para ver errores específicos.
