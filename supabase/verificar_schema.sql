-- ============================================
-- SCRIPT DE VERIFICACIÓN DEL SCHEMA FASTIA
-- ============================================
-- Ejecuta este script para verificar que todo esté correcto
-- ============================================

-- Verificar que todas las tablas existen
SELECT 
    'Tablas creadas:' as verificacion,
    COUNT(*) as total
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings');

-- Verificar estructura de cada tabla
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings')
ORDER BY table_name, ordinal_position;

-- Verificar índices
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings')
ORDER BY tablename, indexname;

-- Verificar triggers
SELECT 
    trigger_name,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings')
ORDER BY event_object_table, trigger_name;

-- Verificar políticas RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings')
ORDER BY tablename, policyname;

-- Contar registros en cada tabla
SELECT 
    'services' as tabla,
    COUNT(*) as registros
FROM public.services
UNION ALL
SELECT 
    'projects',
    COUNT(*)
FROM public.projects
UNION ALL
SELECT 
    'testimonials',
    COUNT(*)
FROM public.testimonials
UNION ALL
SELECT 
    'blog_posts',
    COUNT(*)
FROM public.blog_posts
UNION ALL
SELECT 
    'contact_messages',
    COUNT(*)
FROM public.contact_messages
UNION ALL
SELECT 
    'site_settings',
    COUNT(*)
FROM public.site_settings;

-- Verificar foreign keys
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
  AND tc.table_name IN ('services', 'projects', 'testimonials', 'blog_posts', 'contact_messages', 'site_settings');
