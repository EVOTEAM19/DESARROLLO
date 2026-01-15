# Schema FastIA - Guía de Instalación

Este directorio contiene el schema completo de la base de datos para FastIA.

## 📁 Archivos

- `schema_fastia.sql` - Script principal con todas las tablas, índices, triggers y RLS
- `seed_data_fastia.sql` - Datos de ejemplo para poblar las tablas

## 🚀 Instalación

### Paso 1: Ejecutar el Schema

1. Abre el **SQL Editor** en Supabase
2. Copia y pega el contenido completo de `schema_fastia.sql`
3. Ejecuta el script (puede tardar unos segundos)
4. Verifica que no haya errores

### Paso 2: Insertar Datos de Ejemplo (Opcional)

1. En el mismo SQL Editor, copia y pega el contenido de `seed_data_fastia.sql`
2. Ejecuta el script
3. Verifica que se hayan insertado los datos

## 📊 Estructura de Tablas

### 1. **services** - Servicios
- Información de servicios ofrecidos
- Campos: slug, title, descriptions, icon, category, technologies, etc.
- Índices: slug, published, order_index, category

### 2. **projects** - Proyectos
- Proyectos realizados por FastIA
- Campos: slug, title, client_name, descriptions, challenge, solution, results, etc.
- Relación: testimonials → projects (FK)

### 3. **testimonials** - Testimonios
- Testimonios de clientes
- Campos: client_name, role, company, content, rating, etc.
- FK: project_id → projects.id (ON DELETE CASCADE)

### 4. **blog_posts** - Artículos del Blog
- Artículos del blog
- Campos: slug, title, excerpt, content, author, category, tags, etc.
- Índices: slug, published, tags (GIN), title (trigram)

### 5. **contact_messages** - Mensajes de Contacto
- Mensajes recibidos del formulario de contacto
- Campos: name, email, phone, company, project_type, budget, message, status, etc.
- Status: new, contacted, qualified, proposal, closed, archived

### 6. **site_settings** - Configuración del Sitio
- Configuración organizada por secciones
- Campos: section, key, value (JSONB)
- Unique: (section, key)

## 🔒 Seguridad (RLS)

### Políticas de Lectura
- **Público**: Puede leer registros con `published = true`
- **Autenticados**: Pueden leer todos los registros

### Políticas de Escritura
- **Público**: Solo puede insertar en `contact_messages`
- **Autenticados**: Pueden insertar, actualizar y eliminar en todas las tablas

## 📝 Datos de Ejemplo Incluidos

### Services (3)
1. Desarrollo de Apps con IA
2. Plataformas Web con IA
3. Automatización con IA

### Projects (3)
1. Plataforma E-commerce con IA Personalizada
2. App Móvil de Logística con IA
3. Plataforma SaaS Empresarial con IA

### Testimonials (2)
1. Testimonio de TechRetail S.A.
2. Testimonio de LogiFlow Solutions

### Blog Posts (3)
1. Desarrollo de Apps con IA: Swift, Kotlin y React Native
2. Arquitecturas Escalables con TypeScript y Node.js
3. IA Generativa en Aplicaciones Empresariales

## ⚙️ Características Técnicas

- **Triggers**: Actualización automática de `updated_at`
- **Índices**: Optimizados para búsquedas frecuentes
- **Foreign Keys**: Con `ON DELETE CASCADE`
- **RLS**: Habilitado en todas las tablas
- **Extensiones**: uuid-ossp, pg_trgm (búsqueda de texto)

## 🔍 Verificación

Después de ejecutar los scripts, verifica:

```sql
-- Verificar tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar políticas RLS
SELECT tablename, policyname 
FROM pg_policies 
ORDER BY tablename, policyname;

-- Contar registros de ejemplo
SELECT 
  (SELECT COUNT(*) FROM services) as services,
  (SELECT COUNT(*) FROM projects) as projects,
  (SELECT COUNT(*) FROM testimonials) as testimonials,
  (SELECT COUNT(*) FROM blog_posts) as blog_posts;
```

## 📌 Notas Importantes

1. **Backup**: Haz un backup de tu base de datos antes de ejecutar el script
2. **Datos Existentes**: El script elimina tablas antiguas si existen
3. **Autenticación**: Asegúrate de tener usuarios autenticados configurados en Supabase
4. **Storage**: Los campos `image_url`, `company_logo`, etc. apuntan a URLs. Configura Supabase Storage si necesitas subir archivos.

## 🐛 Solución de Problemas

### Error: "relation already exists"
- El script usa `DROP TABLE IF EXISTS`, debería eliminar las tablas antiguas
- Si persiste, elimina manualmente las tablas antes de ejecutar

### Error: "permission denied"
- Verifica que tengas permisos de administrador en Supabase
- Asegúrate de estar ejecutando en el proyecto correcto

### RLS bloqueando consultas
- Verifica que las políticas RLS estén creadas correctamente
- Para desarrollo, puedes deshabilitar temporalmente RLS: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`
