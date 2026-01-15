# Migración del Schema de Supabase para FastIA

Este documento explica cómo migrar el schema actual de Supabase al nuevo schema optimizado para FastIA.

## 📋 Archivos

1. **`migration_fastia.sql`** - Script de migración que adapta las tablas existentes
2. **`seed_data_fastia.sql`** - Datos de ejemplo compatibles con ambos schemas
3. **`schema_fastia.sql`** - Schema completo desde cero (solo si quieres empezar limpio)

## 🚀 Instrucciones de Migración

### Opción 1: Migración Incremental (Recomendada)

Esta opción preserva todos los datos existentes y solo añade/modifica campos necesarios.

1. **Abre Supabase SQL Editor**
2. **Copia y ejecuta** `migration_fastia.sql` completo
3. **Verifica** que no haya errores
4. **(Opcional)** Ejecuta `seed_data_fastia.sql` para añadir datos de ejemplo

### Opción 2: Schema Limpio (Solo si no tienes datos importantes)

⚠️ **ADVERTENCIA**: Esto eliminará todas las tablas y datos existentes.

1. **Abre Supabase SQL Editor**
2. **Copia y ejecuta** `schema_fastia.sql` completo
3. **Ejecuta** `seed_data_fastia.sql` para datos iniciales

## 🔄 Cambios Principales

### Tablas Actualizadas

#### `services`
- ✅ Añade campo `title` (mantiene `name` por compatibilidad)
- ✅ Renombra `order` → `order_index`
- ✅ Añade `full_description`, `technologies`, `image_url`, `meta_title`, `meta_description`

#### `projects`
- ✅ Añade `challenge`, `solution`, `results` (JSONB)
- ✅ Añade `technologies`, `features` (JSONB)
- ✅ Renombra `image_url` → `image_main`
- ✅ Añade `image_gallery` (JSONB)
- ✅ Elimina `testimonial_id` (relación inversa: `testimonials.project_id`)

#### `testimonials`
- ✅ Añade `client_role`, `company_logo`
- ✅ Añade `rating` con CHECK constraint (1-5)
- ✅ Añade `project_id` FK a `projects`
- ✅ Añade `is_featured`, `order_index`, `published`

#### `blog_posts`
- ✅ Añade `author_name` (mantiene `author` por compatibilidad)
- ✅ Añade `author_avatar`
- ✅ Renombra `image_url` → `featured_image`
- ✅ Añade `reading_time`, `views`, `is_featured`
- ✅ Añade `meta_title`, `meta_description`

#### `contact_messages`
- ✅ Añade `phone`, `company`, `project_type`, `budget_range`
- ✅ Añade `start_timeframe`, `status`, `notes`
- ✅ Migra `read` y `responded` → `status` ('new', 'contacted', 'qualified', etc.)
- ✅ Añade `updated_at` con trigger

#### `site_settings`
- ✅ Añade campo `section` para organizar configuraciones
- ✅ Cambia constraint único de `key` → `(section, key)`

### Nuevos Índices

- Índices en `slug`, `published`, `order_index`, `created_at`
- Índice GIN para arrays (`tags` en blog_posts)
- Índice trigram para búsqueda de texto (`title` en services, projects, blog_posts)

### Triggers

- ✅ Trigger automático `update_updated_at_column()` en todas las tablas con `updated_at`

### Row Level Security (RLS)

- ✅ RLS habilitado en todas las tablas
- ✅ Políticas públicas: Solo lectura de registros con `published = true`
- ✅ Políticas autenticadas: Lectura completa y escritura total
- ✅ Excepción: `contact_messages` permite inserción pública

## 📊 Compatibilidad

El script de migración es **compatible con ambos schemas**:

- ✅ **Schema actual**: Usa `name`, `order`, `author`, `image_url`
- ✅ **Schema migrado**: Usa `title`, `order_index`, `author_name`, `featured_image`

Los datos se migran automáticamente:
- `name` → `title` (si existe)
- `order` → `order_index` (si existe)
- `author` → `author_name` (si existe)
- `image_url` → `featured_image` / `image_main` (si existe)

## ✅ Verificación Post-Migración

Después de ejecutar la migración, verifica:

```sql
-- Verificar que los campos nuevos existen
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services' 
ORDER BY ordinal_position;

-- Verificar índices
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'services';

-- Verificar triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE event_object_table = 'services';

-- Verificar políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'services';
```

## 🔧 Solución de Problemas

### Error: "column already exists"
- El campo ya existe, la migración es idempotente. Puedes ignorar este error.

### Error: "constraint already exists"
- El constraint ya existe. Puedes ignorar este error.

### Error: "relation does not exist"
- Verifica que las tablas existan antes de ejecutar la migración.

### Datos no migrados
- Ejecuta manualmente las migraciones de datos:
```sql
-- Migrar name → title en services
UPDATE services SET title = name WHERE title IS NULL AND name IS NOT NULL;

-- Migrar author → author_name en blog_posts
UPDATE blog_posts SET author_name = author WHERE author_name IS NULL AND author IS NOT NULL;
```

## 📝 Notas

- Las tablas `pages`, `sections`, `products`, `media` **no se modifican** (se mantienen como están)
- La migración es **no destructiva**: preserva todos los datos existentes
- Los campos antiguos (`name`, `author`, etc.) se mantienen por compatibilidad
- Puedes ejecutar la migración múltiples veces de forma segura (idempotente)

## 🎯 Próximos Pasos

1. ✅ Ejecutar `migration_fastia.sql`
2. ✅ Verificar que no hay errores
3. ✅ (Opcional) Ejecutar `seed_data_fastia.sql`
4. ✅ Actualizar el código de la aplicación para usar los nuevos campos
5. ✅ Probar las funcionalidades del CMS
