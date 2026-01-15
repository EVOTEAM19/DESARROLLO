# Guía de Deploy en Vercel

Esta guía te ayudará a desplegar el proyecto ThinkIA en Vercel.

## 🚀 Deploy Rápido

### Opción 1: Desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente Next.js
5. Configura las variables de entorno (ver abajo)
6. Haz clic en **"Deploy"**

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔐 Variables de Entorno

### Configurar en Vercel Dashboard

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega las siguientes variables:

#### Requeridas

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

#### Opcionales

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Configurar por Entorno

Puedes configurar variables diferentes para:
- **Production**: Producción
- **Preview**: Preview deployments (PRs)
- **Development**: Desarrollo local

## 🌐 Configurar Dominio Personalizado

1. En Vercel Dashboard, ve a **Settings > Domains**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `thinkia.com`)
4. Configura los registros DNS:

### Para dominio raíz (thinkia.com)

```
Tipo: A
Nombre: @
Valor: 76.76.21.21
```

### Para subdominio (www.thinkia.com)

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

5. Espera a que se propague el DNS (puede tardar hasta 48 horas)
6. SSL se configura automáticamente

## 🔄 CI/CD Automático

El proyecto está configurado para:

### Deploy Automático
- Cada push a `main` → Deploy a producción
- Cada PR → Preview deployment

### Rollback Automático
- Si el build falla, no se despliega
- Puedes hacer rollback manual desde Vercel Dashboard

### Configurar GitHub Actions (Opcional)

1. Agrega estos secrets en GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

2. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente

## 📊 Monitoreo

### Vercel Analytics

1. Ve a **Analytics** en Vercel Dashboard
2. Habilita Vercel Analytics (opcional)
3. O usa Google Analytics configurando `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Logs

- **Build Logs**: Disponibles en cada deployment
- **Runtime Logs**: Disponibles en **Functions** tab
- **Error Tracking**: Configura Sentry o similar

## 🔧 Optimizaciones

### Edge Functions

Para funciones que necesitan baja latencia, considera usar Edge Functions:

```typescript
// src/app/api/example/route.ts
export const runtime = 'edge'
```

### Caching

El proyecto ya incluye:
- ISR (Incremental Static Regeneration)
- Headers de cache configurados
- Image optimization automática

## 🐛 Troubleshooting

### Build Falla

1. Revisa los logs en Vercel Dashboard
2. Verifica variables de entorno
3. Ejecuta `npm run build` localmente

### Variables de Entorno No Funcionan

- Asegúrate de que las variables empiecen con `NEXT_PUBLIC_` si se usan en el cliente
- Reinicia el deployment después de agregar variables

### Dominio No Funciona

- Verifica los registros DNS
- Espera hasta 48 horas para propagación
- Usa `dig` o `nslookup` para verificar

### Errores de Supabase

- Verifica que las URLs y keys sean correctas
- Asegúrate de que RLS esté configurado correctamente
- Revisa los logs de Supabase

## 📈 Performance

### Métricas Esperadas

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

### Mejoras Continuas

- Monitorea Core Web Vitals en Vercel Analytics
- Optimiza imágenes grandes
- Revisa bundle size regularmente

## 🔒 Seguridad

### Headers de Seguridad

Ya configurados en `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### Variables Sensibles

- Nunca commitees `.env.local`
- Usa Vercel Secrets para datos sensibles
- Rota keys regularmente

## 📝 Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] Build pasa localmente (`npm run build`)
- [ ] Tests pasan (si los hay)
- [ ] Base de datos configurada
- [ ] Storage buckets creados
- [ ] Dominio configurado (si aplica)
- [ ] Analytics configurado (opcional)
- [ ] SSL verificado

## 🎉 Post-Deploy

Después del deploy:

1. Verifica que el sitio funcione
2. Prueba las funcionalidades principales
3. Verifica SEO (sitemap, robots.txt)
4. Configura monitoreo
5. Documenta cualquier cambio

---

**¿Problemas?** Abre un issue o contacta al equipo de desarrollo.
