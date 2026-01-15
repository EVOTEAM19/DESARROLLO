# 📝 Sistema de Gestión de Contenido - FastIA

## 🎯 Descripción

Sistema completo para gestionar todos los textos e imágenes de las 5 secciones principales de FastIA desde el panel de administración.

## 📋 Secciones Gestionables

### 1. **The Modal** (`/admin/content/the-modal`)
- Hero section (badge, título, subtítulo, CTAs)
- 5 servicios de IA (título, descripción, enlace, color, icono)
- Sección Expertise (SEO y Apps)
- CTA final

### 2. **Synapse** (`/admin/content/synapse`)
- Hero section
- Problemas (IA en la sombra)
- Solución (6 features)
- Casos de uso por industria
- CTA final

### 3. **Sectores** (`/admin/content/sectores`)
- Hero section
- 20 sectores industriales (icono, nombre, descripción, soluciones, color)

### 4. **Nosotros** (`/admin/content/nosotros`)
- Hero section
- Estadísticas (4 stats)
- Valores (6 valores)
- Equipo
- CTA final

### 5. **Reflexiones** (`/admin/content/reflexiones`)
- Hero section
- Filtros y búsqueda
- Estado vacío

## 🚀 Instalación

### 1. Ejecutar SQL de inicialización

```sql
-- Ejecutar en Supabase SQL Editor
-- Archivo: supabase/init_content_management.sql
```

Este script:
- Crea/verifica la tabla `site_settings`
- Inicializa el contenido por defecto para todas las secciones
- Configura RLS policies

### 2. Acceder al panel

1. Inicia sesión en `/login`
2. Ve a `/admin/content`
3. Selecciona la sección que quieres editar

## 📖 Uso

### Editar contenido

1. **Navega** a `/admin/content/[seccion]`
2. **Modifica** los campos de texto
3. **Añade/Elimina** elementos dinámicos (servicios, problemas, etc.)
4. **Guarda** con el botón "Guardar Contenido"
5. **Verifica** los cambios en la web pública

### Estructura de datos

El contenido se guarda en `site_settings` con esta estructura:

```json
{
  "section": "the-modal",
  "key": "content",
  "value": {
    "hero": { ... },
    "services": [ ... ],
    "expertise": { ... },
    "cta": { ... }
  }
}
```

## 🔧 Componentes Técnicos

### Helpers de contenido

- `src/lib/content.ts` - Funciones para leer contenido desde Supabase
  - `getSectionContent(section, key)`
  - `getTheModalContent()`
  - `getSynapseContent()`
  - `getSectoresContent()`
  - `getNosotrosContent()`
  - `getReflexionesContent()`

### Páginas de admin

- `src/app/admin/content/page.tsx` - Índice de gestión
- `src/app/admin/content/the-modal/page.tsx` - Gestión The Modal
- `src/app/admin/content/synapse/page.tsx` - Gestión Synapse
- `src/app/admin/content/sectores/page.tsx` - Gestión Sectores
- `src/app/admin/content/nosotros/page.tsx` - Gestión Nosotros
- `src/app/admin/content/reflexiones/page.tsx` - Gestión Reflexiones

### Páginas públicas (actualizadas)

- `src/app/the-modal/page.tsx` - Lee desde Supabase
- (Las demás páginas se actualizarán para leer desde Supabase)

## 📊 Dashboard de Métricas

### Acceso

- URL: `/admin/analytics`
- Muestra estadísticas de tráfico y comportamiento

### Métricas disponibles

- **Vistas de página** - Total de page views
- **Visitantes únicos** - Usuarios únicos
- **Tasa de rebote** - Porcentaje de rebote
- **Duración media** - Tiempo promedio por sesión
- **Páginas más visitadas** - Top 5 páginas
- **Fuentes de tráfico** - Google, Directo, Redes sociales
- **Dispositivos** - Desktop, Mobile, Tablet

### Conectar con Google Analytics

Para conectar con Google Analytics real:

1. Configura Google Analytics 4 API
2. Crea credenciales OAuth2
3. Añade variables de entorno:
   ```env
   GOOGLE_ANALYTICS_CLIENT_ID=...
   GOOGLE_ANALYTICS_CLIENT_SECRET=...
   GOOGLE_ANALYTICS_PROPERTY_ID=...
   ```
4. Actualiza `src/app/admin/analytics/page.tsx` para usar la API

## 🎨 Personalización

### Añadir nuevas secciones

1. Crea página en `src/app/admin/content/[nueva-seccion]/page.tsx`
2. Añade helper en `src/lib/content.ts`
3. Actualiza componente público para leer desde Supabase
4. Ejecuta SQL para inicializar datos

### Añadir campos personalizados

1. Actualiza el schema Zod en la página de admin
2. Añade campos en el formulario
3. Actualiza el componente público para mostrar los nuevos campos

## 🔒 Seguridad

- Solo usuarios autenticados pueden editar contenido
- RLS policies en Supabase protegen los datos
- Validación con Zod en formularios
- Sanitización automática de inputs

## 📝 Notas

- Los cambios se guardan inmediatamente en Supabase
- Los componentes públicos tienen fallback a datos por defecto
- Las imágenes deben subirse primero en `/admin/media`
- Los textos soportan formato Markdown básico

## 🐛 Troubleshooting

### El contenido no se actualiza

1. Verifica que el SQL de inicialización se ejecutó
2. Revisa la consola del navegador para errores
3. Verifica que estás autenticado como admin
4. Comprueba que `site_settings` tiene datos

### Error al guardar

1. Verifica conexión con Supabase
2. Revisa permisos RLS
3. Comprueba formato JSON válido
4. Revisa logs en Supabase

## ✅ Checklist de Implementación

- [x] SQL de inicialización creado
- [x] Páginas de admin creadas
- [x] Helpers de contenido creados
- [x] The Modal actualizado para leer desde Supabase
- [ ] Synapse actualizado para leer desde Supabase
- [ ] Sectores actualizado para leer desde Supabase
- [ ] Nosotros actualizado para leer desde Supabase
- [ ] Reflexiones actualizado para leer desde Supabase
- [x] Dashboard de métricas creado
- [ ] Conectar Analytics con API real
