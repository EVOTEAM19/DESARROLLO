# Esquema de Base de Datos - ThinkIA

Este directorio contiene el esquema completo de la base de datos para el sitio web ThinkIA en Supabase.

## 📁 Estructura de Archivos

```
supabase/
├── schema.sql          # Esquema completo con tablas, índices, triggers y RLS
├── examples.sql        # Ejemplos de uso y consultas útiles
├── types.ts           # Tipos TypeScript (referencia)
└── migrations/
    └── README.md      # Guía de migraciones
```

## 🗄️ Tablas del Esquema

### 1. **pages** - Páginas del sitio
Almacena las páginas del sitio web con contenido estructurado.

**Campos principales:**
- `slug` - URL única de la página
- `content` - Contenido en formato JSONB
- `published` - Estado de publicación

### 2. **sections** - Secciones de contenido
Secciones modulares que componen las páginas.

**Tipos de sección:**
- `hero`, `products`, `services`, `blog`, `contact`
- `testimonials`, `features`, `pricing`, `faq`, `cta`

### 3. **products** - Productos IA
Catálogo de productos de inteligencia artificial.

**Características:**
- Búsqueda por texto completo (trigram)
- Categorización
- Orden personalizable

### 4. **services** - Servicios
Servicios ofrecidos por la empresa.

**Características:**
- Iconos asociados
- Categorización
- Orden personalizable

### 5. **blog_posts** - Artículos del blog
Sistema de blog completo con categorías y tags.

**Características:**
- Búsqueda por texto completo
- Sistema de tags (array)
- Fecha de publicación

### 6. **media** - Archivos multimedia
Gestión de archivos (imágenes, videos, documentos).

**Tipos soportados:**
- `image`, `video`, `document`, `audio`

### 7. **site_settings** - Configuración del sitio
Configuración general del sitio en formato clave-valor.

**Ejemplos:**
- Nombre del sitio
- Email de contacto
- Enlaces sociales
- Configuración de tema

## 🔒 Seguridad (RLS)

### Políticas de Lectura
- **Público**: Puede leer contenido publicado (`published = true`)
- **Autenticados**: Pueden leer todo el contenido

### Políticas de Escritura
- **Solo usuarios autenticados** pueden crear, editar y eliminar

### Tablas con acceso público completo
- `media` - Lectura pública
- `site_settings` - Lectura pública

## 🚀 Instalación

### Paso 1: Ejecutar el esquema

Ve al **SQL Editor** en tu dashboard de Supabase y ejecuta:

```sql
-- Copia y pega el contenido de schema.sql
```

O usa la CLI de Supabase:

```bash
supabase db push
```

### Paso 2: Verificar la instalación

Ejecuta esta consulta para verificar que todas las tablas se crearon:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### Paso 3: Probar las políticas RLS

```sql
-- Como usuario anónimo (debería ver solo contenido publicado)
SELECT * FROM products WHERE published = true;

-- Como usuario autenticado (debería ver todo)
SELECT * FROM products;
```

## 📊 Índices Creados

El esquema incluye índices optimizados para:

- **Búsquedas por slug** (único)
- **Filtros por estado** (published, visible)
- **Ordenamiento** (created_at, published_at, order)
- **Búsqueda de texto completo** (trigram en nombres y títulos)
- **Búsqueda en arrays** (tags en blog_posts)

## 🔄 Triggers Automáticos

Todos los campos `updated_at` se actualizan automáticamente cuando se modifica un registro.

## 📝 Ejemplos de Uso

Ver el archivo `examples.sql` para consultas y ejemplos de uso comunes.

## 🔧 Mantenimiento

### Actualizar tipos TypeScript

Si modificas el esquema, actualiza los tipos en:
- `supabase/types.ts`
- `src/types/supabase.ts`

### Agregar nuevas tablas

1. Crea la tabla en `schema.sql`
2. Agrega las políticas RLS
3. Crea los índices necesarios
4. Agrega el trigger de `updated_at` si aplica
5. Actualiza los tipos TypeScript

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)

## ⚠️ Notas Importantes

1. **RLS está habilitado**: Todas las tablas tienen seguridad a nivel de fila
2. **Backups**: Realiza backups regulares de tu base de datos
3. **Índices**: Los índices mejoran el rendimiento pero ocupan espacio
4. **JSONB**: Usa JSONB para contenido flexible, pero considera normalizar si crece mucho
