# Configurar Service Account Key Descargada

¡Perfecto! Ya descargaste el Service Account Key JSON. Ahora necesitas configurarlo.

---

## ✅ Paso 1: Guardar el Archivo

### Opción A: Renombrar el Archivo Descargado (Recomendado)

1. Ve a tu carpeta de **Descargas**
2. Busca el archivo: `sustained-hold-483822-e2-f67aefc08686.json`
3. **Cópialo** a tu proyecto:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```
4. **Renómbralo** a: `service-account-key.json` (para que sea más fácil de usar)

### Opción B: Usar el Nombre Original

Si prefieres mantener el nombre original:
- Cópialo a: `c:\Users\USER\DESARROLLO\DESARROLLO\sustained-hold-483822-e2-f67aefc08686.json`
- Actualiza `GA4_SERVICE_ACCOUNT_KEY_PATH` con este nombre

---

## ✅ Paso 2: Configurar Variables de Entorno Local

### Actualizar `.env.local`

Abre o crea el archivo `.env.local` en tu proyecto y añade/actualiza:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
GA4_PROPERTY_ID=520060270
GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

**Importante**: 
- Si renombraste el archivo a `service-account-key.json`, usa esa ruta
- Si mantienes el nombre original, ajusta la ruta

---

## ✅ Paso 3: Dar Permisos en Google Analytics 4

### Acceder a GA4 Admin

1. Ve a [Google Analytics](https://analytics.google.com)
2. Asegúrate de estar en la propiedad **"FASTIA"** (Property ID: `520060270`)
3. Ve a **Admin** (⚙️ en la esquina inferior izquierda)

### Añadir Service Account

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

## ✅ Paso 4: Configurar Variables de Entorno en Vercel (Producción)

### Convertir JSON a String para Vercel

1. **Abre el archivo JSON** que descargaste
2. **Copia TODO el contenido** (todo en una línea)
3. **Para Vercel**, usa este formato:

```
{"type":"service_account","project_id":"sustained-hold-483822-e2","private_key_id":"f67aefc086862e966e6ed47541d380317eec7f26","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYiH8xZKBt0DZ4\n4a1qg6qOAc8LsRGXF2VgsT9TRVboko4O0NDEjcOyZ2R60gPzKPsR67lo3ADZ1rcw\nMFHtKUQJTXJZFxNnNWhVRmd6QT9b99ZJKvxU1ZQaOXB93GCFRcHCzMJrNPijPLg4\n/tPPGawW51fPoPHSB3j1j+ihVXjdqGu8/OF+0RHqIioXKvpavD2gktF79bfHB1Ml\nei6DJ+1Nj9A+dsaIcHapuyxKLSnz79MbvuSBsrraODInM7d28k/HAsb/SiVYkJz8\noUDdlIJYOkJv1WG4eEUEBImunaGJNhQSVnirsO/mEZoUlai8HhI6H+Dm8vZmaJ/v\nlJBPCOezAgMBAAECggEAM8lhcjS40cqsXHjM+t6GmfQAyrEMnfAwhNGfbZD12iXC\n5/Q1Ge010qM7uswjubIhagXQkC2d3nul0FaeIXRvGzJ0mK4WK+bwDwUJlomoV5yM\nmW84bimuhB8csl1UkEtArhA+p1lB5fiNrsPzcGKZb9jgfX3ml+7FlSVX484HXCuN\nCinYQDkSFMM0b2JH7g0/xKs0LkbUDZGmfsDZWmey4w/eGXb3p3MxmqVJlliDPqbV\nGUUFYmD1LVIYt4phfHgboRnZMOL/GTau2ikniIb6lBRI8mqeHDSLeaVFuSfg1ZOQ\nkjqq0CL08E+PzSt61k335MMR/rSvORTQ7GFV9GX1IQKBgQDsY45hVWQLFTp4txU+\nfj/2yZKA+922ZVv+g9Bs/B1xbt/nugkaixdQybJqZBMzbdhKs4OXcuNA6crzLp/L\ng6akbBxIvBdTBTVbxOeNsJlXKlYgJRWRc7tv6FXxsy6wW9/zG4cAq1XJFsgUO8fp\nCOAM+pbSfrj0Cbs+zwYxVDPXWwKBgQDqfz5xXPu0c6vc1/Sv/4yMDzxGSNb+3BrI\n0Pk6wvcPNjfw/RPbHoXI2KMhjLGzgfmMyF1LkKaFXhjODVXOxCIVoQq27NxCEjE2\njg9ztjNmlKSVKlHJjwInbBeoC++cpcSRkM7t2Hmkx7NbgBiFKsCdOqcH6Qxoxbqk\nPECWvoh4iQKBgBqreMreeXUOphQsg8cTM2BCibbns7H6aZCjioZhQ2ki2zwnrxNB\nkhXZS7nZJJlu0TJMYpJZse4G8pDRN9IcPlbao65JGlCRi92Yr48613IQIrtps68/\nYWxUyC2Gy8O1+eRRvL+ElR8k5NnzjLBsAes08oM5LODLoEaL0OUL3PV1AoGBAOEq\nV3ohD6whWchQMSsCFiGyy2ytqovEK4/iYT5UUUjxBdxIFlXTxCCsLFAdudAlIMtW\n5YaWmd78EJNiaJ+G4zejkBc/7usebtT0qc+xB0AbwMFehnQk9quF9l0tQOJIpiwk\nQR5PO9bGzukwYdsUxyjyVcqZs4mzO1lSZa6Zu48JAoGAOl0GJzVk5NqZv135cagP\nb19mBLhfyJk40o73UEnQ9+BahIURYDs3fkTC1YJH3MSEOsnkmH9Pupfh0g6CQPxd\nT0sE4KPZU6Y3EfniWgCwTWbT9oDgfJ/tr9mD88VQeRovuE3isiIq1gLt1Rst0W1d\n+zHo5BSxljk5WYwQ1bJEAbk=\n-----END PRIVATE KEY-----\n","client_email":"fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com","client_id":"114748996236760042763","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/fastia-analytics%40sustained-hold-483822-e2.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

**⚠️ IMPORTANTE**: 
- Debe estar en **una sola línea**
- Los saltos de línea en `private_key` deben ser `\n` (no saltos de línea reales)
- Copia TODO el JSON sin espacios extras al inicio/fin

### Añadir en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com)
2. Selecciona tu proyecto: **desarrollo**
3. Ve a **Settings** → **Environment Variables**
4. Añade estas variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-7PKNBN52F3` | Production, Preview, Development |
| `GA4_PROPERTY_ID` | `520060270` | Production, Preview, Development |
| `GA4_SERVICE_ACCOUNT_KEY` | `{JSON completo en una línea}` | Production, Preview, Development |

---

## ✅ Paso 5: Verificar Configuración Local

1. **Guarda el archivo JSON** en:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```

2. **Verifica** que esté en `.gitignore`:
   - Ya está configurado ✅

3. **Inicia el servidor**:
   ```bash
   npm run dev
   ```

4. **Ve a**: `http://localhost:3001/admin/analytics`

5. **Verifica**:
   - ✅ Badge verde: "✅ Google Analytics configurado"
   - 📊 Métricas reales (no datos de ejemplo)

---

## 🎯 Próximos Pasos Inmediatos

1. **Guardar archivo** en el proyecto como `service-account-key.json`
2. **Configurar** `.env.local` con la ruta del archivo
3. **Dar permisos** en GA4 (Property Access Management)
4. **Configurar** variables en Vercel (producción)
5. **Probar** el dashboard de admin

---

## 📋 Checklist

- [ ] Archivo JSON guardado en el proyecto
- [ ] `.env.local` configurado con `GA4_SERVICE_ACCOUNT_KEY_PATH`
- [ ] Service Account tiene permisos "Viewer" en GA4
- [ ] Variables configuradas en Vercel (producción)
- [ ] Dashboard de admin muestra badge verde
- [ ] Métricas reales aparecen en el dashboard

---

**¡Perfecto! Ya tienes el Service Account Key. Ahora guarda el archivo en tu proyecto y configura las variables de entorno. ¿Necesitas ayuda con algún paso específico?**
