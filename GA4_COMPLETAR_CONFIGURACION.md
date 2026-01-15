# ✅ Completar Configuración GA4 - Archivo Creado

¡Perfecto! He creado el archivo `service-account-key.json` en tu proyecto con el contenido del Service Account Key descargado.

---

## ✅ Lo que ya está configurado

- ✅ **Service Account Key** descargada y guardada en el proyecto
- ✅ Archivo creado: `service-account-key.json`
- ✅ `.gitignore` configurado (el archivo no se subirá a Git)
- ✅ `env.example` actualizado con las configuraciones

---

## 🎯 Próximos Pasos

### Paso 1: Configurar `.env.local` (Desarrollo Local)

Abre o crea el archivo `.env.local` en tu proyecto y añade/verifica:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

**Nota**: El archivo `service-account-key.json` ya está creado en tu proyecto.

### Paso 2: Dar Permisos en Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad **"FASTIA"** (Property ID: `520060270`)
3. Ve a **Admin** → **Property Access Management**
4. Haz clic en **"+"**
5. En **"Email addresses"**, pega:
   ```
   fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com
   ```
6. Rol: **"Viewer"**
7. Haz clic en **"ADD"**
8. **Espera 5-10 minutos** para que se propaguen los permisos

### Paso 3: Configurar Variables en Vercel (Producción)

#### 3.1. Preparar el JSON para Vercel

El JSON debe estar en **una sola línea** para Vercel. Aquí está listo para copiar:

```json
{"type":"service_account","project_id":"sustained-hold-483822-e2","private_key_id":"f67aefc086862e966e6ed47541d380317eec7f26","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYiH8xZKBt0DZ4\n4a1qg6qOAc8LsRGXF2VgsT9TRVboko4O0NDEjcOyZ2R60gPzKPsR67lo3ADZ1rcw\nMFHtKUQJTXJZFxNnNWhVRmd6QT9b99ZJKvxU1ZQaOXB93GCFRcHCzMJrNPijPLg4\n/tPPGawW51fPoPHSB3j1j+ihVXjdqGu8/OF+0RHqIioXKvpavD2gktF79bfHB1Ml\nei6DJ+1Nj9A+dsaIcHapuyxKLSnz79MbvuSBsrraODInM7d28k/HAsb/SiVYkJz8\noUDdlIJYOkJv1WG4eEUEBImunaGJNhQSVnirsO/mEZoUlai8HhI6H+Dm8vZmaJ/v\nlJBPCOezAgMBAAECggEAM8lhcjS40cqsXHjM+t6GmfQAyrEMnfAwhNGfbZD12iXC\n5/Q1Ge010qM7uswjubIhagXQkC2d3nul0FaeIXRvGzJ0mK4WK+bwDwUJlomoV5yM\nmW84bimuhB8csl1UkEtArhA+p1lB5fiNrsPzcGKZb9jgfX3ml+7FlSVX484HXCuN\nCinYQDkSFMM0b2JH7g0/xKs0LkbUDZGmfsDZWmey4w/eGXb3p3MxmqVJlliDPqbV\nGUUFYmD1LVIYt4phfHgboRnZMOL/GTau2ikniIb6lBRI8mqeHDSLeaVFuSfg1ZOQ\nkjqq0CL08E+PzSt61k335MMR/rSvORTQ7GFV9GX1IQKBgQDsY45hVWQLFTp4txU+\nfj/2yZKA+922ZVv+g9Bs/B1xbt/nugkaixdQybJqZBMzbdhKs4OXcuNA6crzLp/L\ng6akbBxIvBdTBTVbxOeNsJlXKlYgJRWRc7tv6FXxsy6wW9/zG4cAq1XJFsgUO8fp\nCOAM+pbSfrj0Cbs+zwYxVDPXWwKBgQDqfz5xXPu0c6vc1/Sv/4yMDzxGSNb+3BrI\n0Pk6wvcPNjfw/RPbHoXI2KMhjLGzgfmMyF1LkKaFXhjODVXOxCIVoQq27NxCEjE2\njg9ztjNmlKSVKlHJjwInbBeoC++cpcSRkM7t2Hmkx7NbgBiFKsCdOqcH6Qxoxbqk\nPECWvoh4iQKBgBqreMreeXUOphQsg8cTM2BCibbns7H6aZCjioZhQ2ki2zwnrxNB\nkhXZS7nZJJlu0TJMYpJZse4G8pDRN9IcPlbao65JGlCRi92Yr48613IQIrtps68/\nYWxUyC2Gy8O1+eRRvL+ElR8k5NnzjLBsAes08oM5LODLoEaL0OUL3PV1AoGBAOEq\nV3ohD6whWchQMSsCFiGyy2ytqovEK4/iYT5UUUjxBdxIFlXTxCCsLFAdudAlIMtW\n5YaWmd78EJNiaJ+G4zejkBc/7usebtT0qc+xB0AbwMFehnQk9quF9l0tQOJIpiwk\nQR5PO9bGzukwYdsUxyjyVcqZs4mzO1lSZa6Zu48JAoGAOl0GJzVk5NqZv135cagP\nb19mBLhfyJk40o73UEnQ9+BahIURYDs3fkTC1YJH3MSEOsnkmH9Pupfh0g6CQPxd\nT0sE4KPZU6Y3EfniWgCwTWbT9oDgfJ/tr9mD88VQeRovuE3isiIq1gLt1Rst0W1d\n+zHo5BSxljk5WYwQ1bJEAbk=\n-----END PRIVATE KEY-----\n","client_email":"fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com","client_id":"114748996236760042763","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/fastia-analytics%40sustained-hold-483822-e2.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

#### 3.2. Añadir en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Añade estas variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-7PKNBN52F3` | Production, Preview, Development |
| `GA4_PROPERTY_ID` | `520060270` | Production, Preview, Development |
| `GA4_SERVICE_ACCOUNT_KEY` | `{JSON de arriba en una línea}` | Production, Preview, Development |

**⚠️ Importante**: Copia el JSON completo de arriba en una sola línea (sin saltos de línea).

---

## ✅ Verificar Configuración Local

### Paso 1: Iniciar el Servidor

```bash
npm run dev
```

### Paso 2: Verificar el Dashboard

1. Ve a: `http://localhost:3001/admin/analytics`
2. Deberías ver:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales de GA4 (en lugar de datos de ejemplo)

### Paso 3: Si Aparece "No configurado"

Si aún ves el badge amarillo:

1. **Verifica** que el archivo `service-account-key.json` existe en la raíz del proyecto
2. **Verifica** que `.env.local` tenga:
   ```env
   GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
   ```
3. **Espera** 5-10 minutos después de dar permisos en GA4
4. **Refresca** la página del dashboard

---

## 🎯 Resumen de lo Completado

- ✅ Política de organización desactivada
- ✅ Service Account Key creada y descargada
- ✅ Archivo JSON guardado en el proyecto
- ✅ `.gitignore` configurado
- ✅ `env.example` actualizado
- ⬅️ **Falta**: Configurar `.env.local` localmente
- ⬅️ **Falta**: Dar permisos en GA4
- ⬅️ **Falta**: Configurar variables en Vercel
- ⬅️ **Falta**: Probar el dashboard

---

## 📋 Checklist Final

- [x] Service Account Key descargada
- [x] Archivo JSON creado en el proyecto
- [ ] `.env.local` configurado con `GA4_SERVICE_ACCOUNT_KEY_PATH`
- [ ] Service Account tiene permisos "Viewer" en GA4
- [ ] Variables configuradas en Vercel
- [ ] Dashboard de admin probado y funcionando

---

**¡El archivo JSON ya está creado en tu proyecto! Ahora solo necesitas configurar `.env.local` y dar permisos en GA4. ¿Tienes acceso para configurar `.env.local` y dar los permisos en Google Analytics?**
