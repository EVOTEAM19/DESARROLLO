# Configuración SEO y Tracking - FastIA

Esta guía explica cómo configurar todas las herramientas de SEO y tracking implementadas en el sitio.

## 📋 Tabla de Contenidos

1. [Sitemap XML](#sitemap-xml)
2. [Schema.org (Structured Data)](#schemaorg-structured-data)
3. [robots.txt](#robotstxt)
4. [Google Analytics 4](#google-analytics-4)
5. [Meta Pixel (Facebook/Instagram)](#meta-pixel-facebookinstagram)
6. [LinkedIn Insight Tag](#linkedin-insight-tag)
7. [Microsoft Clarity](#microsoft-clarity)
8. [Google Search Console](#google-search-console)
9. [Bing Webmaster Tools](#bing-webmaster-tools)

---

## 🗺️ Sitemap XML

### Estado
✅ **Implementado y funcionando**

El sitemap se genera automáticamente en: `https://www.fastia.es/sitemap.xml`

### Incluye:
- ✅ Páginas estáticas principales
- ✅ Todos los servicios (dinámicos desde Supabase)
- ✅ Todos los artículos de reflexiones (40 artículos)
- ✅ Revalidación cada hora

### Archivo: `src/app/sitemap.ts`

---

## 📊 Schema.org (Structured Data)

### Estado
✅ **Implementado completamente**

### Schemas implementados:

1. **Organization Schema** (`organizationSchema`)
   - Información de la empresa
   - Contacto, ubicaciones, redes sociales
   - ✅ Implementado en `src/app/layout.tsx`

2. **LocalBusiness Schema** (Madrid, Barcelona, Sevilla)
   - `localBusinessSchemaMadrid` - Sede Central
   - `localBusinessSchemaBarcelona`
   - `localBusinessSchemaSevilla`
   - ✅ Implementado en `src/app/layout.tsx`

3. **Article Schema** (para los 40 posts de reflexiones)
   - Información del artículo
   - Autor, fecha, categoría, keywords
   - ✅ Implementado en `src/app/reflexiones/[slug]/page.tsx`

4. **Service Schema** (para cada servicio)
   - Información del servicio
   - Proveedor, área servida, ofertas
   - ✅ Implementado en `src/app/servicios/[slug]/page.tsx`

### Archivos relacionados:
- `src/components/StructuredData.tsx` - Componentes y schemas
- Funciones: `generateArticleSchema()`, `generateServiceSchema()`

---

## 🤖 robots.txt

### Estado
✅ **Implementado y optimizado**

### Configuración actual:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /_vercel/
Disallow: /.well-known/

Sitemap: https://www.fastia.es/sitemap.xml
```

### Optimizaciones:
- ✅ Configuración específica para Googlebot (sin delay)
- ✅ Configuración específica para Bingbot (sin delay)
- ✅ Referencia al sitemap incluida
- ✅ Host especificado

### Archivo: `src/app/robots.ts`

---

## 📈 Google Analytics 4

### Estado
✅ **Implementado y funcionando**

### Configuración:

1. **Obtener Measurement ID:**
   - Ir a [Google Analytics](https://analytics.google.com)
   - Crear propiedad de GA4 si no existe
   - Copiar el Measurement ID (formato: `G-XXXXXXXXXX`)

2. **Configurar variable de entorno:**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Verificar funcionamiento:**
   - Abrir DevTools → Network
   - Buscar peticiones a `google-analytics.com`
   - Verificar eventos en tiempo real en GA4

### Eventos trackeados:
- ✅ `page_view` - Visualizaciones de página
- ✅ `form_submit` - Envíos de formularios
- ✅ `conversion` - Conversiones
- ✅ `cta_click` - Clics en CTAs
- ✅ `service_view` - Visualizaciones de servicios
- ✅ Eventos personalizados

### Archivos:
- `src/components/analytics/Analytics.tsx` - Componente principal
- `src/lib/analytics.ts` - Funciones de tracking

---

## 📱 Meta Pixel (Facebook/Instagram)

### Estado
✅ **Implementado**

### Configuración:

1. **Obtener Pixel ID:**
   - Ir a [Facebook Events Manager](https://business.facebook.com/events_manager2)
   - Crear o seleccionar Pixel
   - Copiar el Pixel ID (formato: números, ej: `123456789012345`)

2. **Configurar variable de entorno:**
   ```env
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```

3. **Verificar funcionamiento:**
   - Instalar extensión [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
   - Visitar la web y verificar que el pixel se carga correctamente

### Eventos trackeados:
- ✅ `PageView` - Visualizaciones de página automáticas
- ✅ `Contact` - Clics en CTAs (trackeado vía `trackCTAClickAll`)
- ✅ Eventos personalizados

### Archivo: `src/components/analytics/MetaPixel.tsx`

---

## 💼 LinkedIn Insight Tag

### Estado
✅ **Implementado**

### Configuración:

1. **Obtener Partner ID:**
   - Ir a [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
   - Ir a Account Assets → Insight Tag
   - Copiar el Partner ID (formato: números, ej: `123456`)

2. **Configurar variable de entorno:**
   ```env
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=123456
   ```

3. **Verificar funcionamiento:**
   - Visitar la web
   - Abrir DevTools → Network
   - Buscar peticiones a `snap.licdn.com`
   - Verificar eventos en LinkedIn Campaign Manager

### Eventos trackeados:
- ✅ Visualizaciones de página automáticas
- ✅ Conversiones vía `trackLinkedInEvent()`

### Archivo: `src/components/analytics/LinkedInInsight.tsx`

---

## 🔍 Microsoft Clarity

### Estado
✅ **Implementado**

### Configuración:

1. **Obtener Project ID:**
   - Ir a [Microsoft Clarity](https://clarity.microsoft.com/)
   - Crear proyecto
   - Copiar el Project ID (formato: letras/números, ej: `abc123def456`)

2. **Configurar variable de entorno:**
   ```env
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def456
   ```

3. **Verificar funcionamiento:**
   - Visitar la web y navegar
   - Esperar 5-10 minutos
   - Ir a Clarity Dashboard y verificar que aparecen sesiones

### Funcionalidades:
- ✅ Grabaciones de sesiones
- ✅ Heatmaps de clicks
- ✅ Análisis de comportamiento

### Archivo: `src/components/analytics/MicrosoftClarity.tsx`

---

## 🔍 Google Search Console

### Estado
⏳ **Pendiente de configuración manual**

### Pasos para enviar sitemap:

1. **Verificar propiedad:**
   - Ir a [Google Search Console](https://search.google.com/search-console)
   - Añadir propiedad `https://www.fastia.es`
   - Verificar propiedad usando uno de estos métodos:
     - **HTML tag** (recomendado): Copiar el código de verificación y añadirlo en `src/app/layout.tsx` en el `<head>`
     - **DNS:** Añadir registro TXT en el DNS
     - **Google Analytics:** Si ya tienes GA4 configurado
     - **HTML file:** Subir archivo HTML a la raíz

2. **Enviar sitemap:**
   - Ir a Sitemaps en el menú lateral
   - En "Añadir un nuevo sitemap", escribir: `sitemap.xml`
   - Click en "Enviar"
   - Verificar que aparece como "Éxito"

3. **Monitorear indexación:**
   - Ir a "Cobertura" para ver páginas indexadas
   - Ir a "Rendimiento" para ver búsquedas y CTR
   - Configurar alertas por email

### Verificación HTML Tag:

Si usas HTML tag, añade esto en `src/app/layout.tsx`:

```tsx
<meta name="google-site-verification" content="TU_CODIGO_DE_VERIFICACION" />
```

---

## 🌐 Bing Webmaster Tools

### Estado
⏳ **Pendiente de configuración manual**

### Pasos para enviar sitemap:

1. **Verificar propiedad:**
   - Ir a [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Añadir sitio `https://www.fastia.es`
   - Verificar propiedad usando:
     - **Meta tag:** Copiar y añadir en `src/app/layout.tsx`
     - **XML file:** Subir archivo XML a la raíz
     - **CNAME:** Configurar en DNS

2. **Enviar sitemap:**
   - Ir a "Sitemaps" en el menú
   - Click en "Enviar sitemap"
   - Escribir: `sitemap.xml`
   - Click en "Enviar"

3. **Monitorear:**
   - Ver páginas indexadas en "Páginas indexadas"
   - Ver búsquedas en "Búsquedas"

### Verificación Meta Tag:

Si usas meta tag, añade esto en `src/app/layout.tsx`:

```tsx
<meta name="msvalidate.01" content="TU_CODIGO_DE_VERIFICACION" />
```

---

## 🎯 CTAs Optimizados

### Estado
✅ **Implementados**

### CTAs optimizados en la web:

1. **"Demo gratuita 30min"** (más específico que "Ver demo")
   - Ubicación: Hero de páginas de servicios
   - Tracking: ✅ Implementado

2. **"ROI en 6 meses o devolvemos dinero"** (garantía)
   - Ubicación: CTAs finales de servicios
   - Tracking: ✅ Implementado

3. **"Agendar sesión gratuita"** (específico)
   - Ubicación: ServiceCTA component
   - Tracking: ✅ Implementado

### Tracking de CTAs:

Todos los CTAs trackean en:
- ✅ Google Analytics 4 (`cta_click` event)
- ✅ Meta Pixel (`Contact` event)
- ✅ LinkedIn Insight Tag (`CTA_Click` conversion)

### Funciones de tracking:

```typescript
import { trackCTAClickAll } from '@/lib/analytics'

trackCTAClickAll('Demo gratuita 30min', 'Hero Section', '/contacto')
```

---

## 📝 Variables de Entorno Necesarias

Añade estas variables en `.env.local`:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel (Facebook/Instagram)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# LinkedIn Insight Tag
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=123456

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123def456

# Site URL (ya debería existir)
NEXT_PUBLIC_SITE_URL=https://www.fastia.es
```

---

## ✅ Checklist de Implementación

- [x] Sitemap XML automático generado
- [x] robots.txt optimizado con referencia a sitemap
- [x] Schema.org Organization implementado
- [x] Schema.org LocalBusiness (3 ubicaciones) implementado
- [x] Schema.org Article para posts implementado
- [x] Schema.org Service para servicios implementado
- [x] Google Analytics 4 implementado
- [x] Meta Pixel implementado
- [x] LinkedIn Insight Tag implementado
- [x] Microsoft Clarity implementado
- [x] CTAs optimizados con textos específicos
- [x] Tracking de CTAs en todos los sistemas
- [ ] Enviar sitemap a Google Search Console (manual)
- [ ] Enviar sitemap a Bing Webmaster Tools (manual)
- [ ] Verificar propiedad en Google Search Console (manual)
- [ ] Verificar propiedad en Bing Webmaster Tools (manual)

---

## 🔗 Herramientas Recomendadas

### Monitoreo:
- **Google Search Console** - Indexación y búsquedas
- **Bing Webmaster Tools** - Indexación en Bing

### Auditoría Técnica:
- **Screaming Frog** - Crawler SEO técnico
- **Google Lighthouse** - Performance, SEO, Accessibility

### Tracking Keywords:
- **Ahrefs** - Tracking de keywords, backlinks
- **SEMrush** - Tracking de keywords, competencia

---

## 📚 Recursos Adicionales

- [Google Search Console Docs](https://developers.google.com/search-console)
- [Bing Webmaster Tools Docs](https://www.bing.com/webmasters/help)
- [Schema.org Documentation](https://schema.org/)
- [Google Analytics 4 Docs](https://developers.google.com/analytics/devguides/collection/ga4)
- [Meta Pixel Docs](https://developers.facebook.com/docs/meta-pixel)
- [LinkedIn Insight Tag Docs](https://www.linkedin.com/help/lms/answer/a427660)

---

## 🆘 Soporte

Si tienes problemas configurando alguna herramienta:

1. Verifica que las variables de entorno están correctas
2. Revisa la consola del navegador por errores
3. Usa las herramientas de verificación (Facebook Pixel Helper, etc.)
4. Revisa los logs de tracking en cada plataforma
