# Configuración de Resend para Envío de Correos

Este documento explica cómo configurar Resend para el envío automático de correos electrónicos cuando se recibe un mensaje de contacto.

## 📋 Requisitos Previos

1. **Resend ya está instalado** en el proyecto (verificado en `package.json`)
2. Necesitas una cuenta en Resend: https://resend.com

## 🚀 Pasos para Configurar

### 1. Crear Cuenta en Resend

1. Visita https://resend.com
2. Crea una cuenta gratuita (hasta 3,000 emails/mes en el plan gratuito)
3. Verifica tu email

### 2. Verificar Dominio

Para enviar correos desde `@fastia.es`, debes verificar el dominio:

1. Ve a **Domains** en el dashboard de Resend
2. Haz clic en **Add Domain**
3. Ingresa `fastia.es`
4. Resend te proporcionará registros DNS que debes añadir:
   - Registro SPF
   - Registro DKIM
   - Registro DMARC (opcional pero recomendado)

5. Añade estos registros en tu proveedor de DNS (ej: Cloudflare, Namecheap, etc.)
6. Espera a que Resend verifique el dominio (puede tomar unos minutos)

**⚠️ Importante:** `onboarding@resend.dev` **solo puede enviar al email de tu cuenta Resend**, no a `hola@fastia.es`. Para que los correos lleguen a `hola@fastia.es` **debes verificar fastia.es** y usar `noreply@fastia.es` (o otro @fastia.es) como remitente.

### 3. Obtener API Key

1. Ve a **API Keys** en el dashboard de Resend
2. Haz clic en **Create API Key**
3. Dale un nombre descriptivo (ej: "FastIA Production")
4. Selecciona los permisos necesarios (generalmente "Full Access" para producción)
5. **Copia la API Key** inmediatamente (solo se muestra una vez)

### 4. Configurar Variable de Entorno

Añade la API Key a tu archivo `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Para producción (Vercel, etc.):**

1. Ve a tu proyecto en Vercel
2. Ve a **Settings > Environment Variables**
3. Añade `RESEND_API_KEY` con el valor de tu API Key
4. Asegúrate de que esté disponible en todos los entornos (Production, Preview, Development)

### 5. Configurar "From" Address (RESEND_FROM_EMAIL)

En `.env.local` (y en producción) define:

```env
RESEND_FROM_EMAIL=FastIA <noreply@fastia.es>
```

**Requisito:** El dominio `fastia.es` debe estar verificado en Resend (paso 2).  
**No uses** `onboarding@resend.dev`: Resend devolverá 403 y los correos no llegarán a `hola@fastia.es`.

### 6. Probar el Envío

1. Inicia tu servidor de desarrollo: `npm run dev`
2. Envía un mensaje de prueba desde el formulario de contacto
3. Revisa:
   - Los logs en la consola del servidor
   - El dashboard de Resend > Emails (deberías ver el correo enviado)
   - El correo en `hola@fastia.es`

## 📧 Configuración del Correo

### Email de Destino

El correo se envía a: **hola@fastia.es**

Para cambiarlo, edita `src/app/api/contact/send-email/route.ts`:
```typescript
const CONTACT_EMAIL = 'hola@fastia.es'  // Cambiar aquí
```

### Formato del Correo

El correo incluye:
- **Header** con branding de FastIA
- **Información del contacto** (nombre, email, teléfono, empresa)
- **Detalles del proyecto** (tipo, presupuesto, tiempo de inicio)
- **Mensaje completo**
- **Footer** con información legal

El formato es HTML responsivo y profesional.

## 🔧 Solución de Problemas

### Error: "RESEND_API_KEY no configurada"

**Solución:** Añade `RESEND_API_KEY` a tu `.env.local` o variables de entorno.

### Error 403 / "Domain not verified" / correos que no llegan a hola@fastia.es

**Causa:** Con `onboarding@resend.dev`, Resend solo envía al email de tu cuenta Resend, no a otros destinatarios.

**Solución:** 1) Verifica el dominio `fastia.es` en Resend (Domains > Add domain > añade los registros SPF/DKIM en tu DNS). 2) Usa `RESEND_FROM_EMAIL=FastIA <noreply@fastia.es>`.

### Error: "Invalid API key"

**Solución:** Verifica que copiaste la API Key correctamente (no debe tener espacios extras).

### Los correos no llegan

**Verifica:**
1. Revisa el dashboard de Resend > Emails para ver si se enviaron
2. Revisa la carpeta de spam
3. Verifica que el dominio esté correctamente verificado
4. Revisa los logs del servidor para errores

### Correos van a spam

**Solución:**
1. Asegúrate de que los registros DNS (SPF, DKIM, DMARC) estén configurados correctamente
2. Usa un "From" address del dominio verificado (no `onboarding@resend.dev`)
3. Configura DMARC en tu DNS
4. Verifica que el remitente tenga buena reputación

## 📊 Monitoreo

Resend proporciona:
- Dashboard con estadísticas de envío
- Logs de cada correo enviado
- Tasa de entrega
- Tasa de apertura (si añades tracking)

## 🔒 Seguridad

- **NUNCA** commitees tu API Key a Git
- Usa variables de entorno para la API Key
- Añade `.env.local` a `.gitignore`
- En producción, usa las variables de entorno del proveedor de hosting

## 📝 Notas Adicionales

- El envío de correo **no bloquea** el guardado del mensaje en la base de datos
- Si falla el envío del correo, el mensaje se guarda igualmente
- Los mensajes siempre se guardan en la tabla `contact_messages` de Supabase
- Puedes revisar los mensajes en el admin panel incluso si no se enviaron correos

## ✅ Checklist de Configuración

- [ ] Cuenta creada en Resend
- [ ] Dominio `fastia.es` verificado en Resend
- [ ] API Key obtenida
- [ ] `RESEND_API_KEY` añadida a `.env.local`
- [ ] `RESEND_API_KEY` añadida a variables de entorno de producción
- [ ] Correo de prueba enviado exitosamente
- [ ] Correo recibido en `hola@fastia.es`

## 📚 Recursos

- Documentación de Resend: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference
- Guía de verificación de dominio: https://resend.com/docs/dashboard/domains/introduction
