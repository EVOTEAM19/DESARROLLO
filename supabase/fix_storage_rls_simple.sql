-- ============================================
-- FIX SIMPLE: Crear Buckets y Políticas Básicas
-- ============================================
-- Si el script anterior falla, usa este método alternativo
-- que crea los buckets desde la interfaz de Supabase
-- ============================================

-- SOLO CREAR BUCKETS (las políticas se crean automáticamente)
-- Si los buckets ya existen, esto no hará nada

INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Verificar buckets creados
SELECT id, name, public, created_at
FROM storage.buckets 
WHERE id IN ('products', 'blog', 'media', 'logos')
ORDER BY id;

-- ============================================
-- INSTRUCCIONES ALTERNATIVAS:
-- ============================================
-- Si este script también falla, crea los buckets manualmente:
--
-- 1. Ve a Supabase Dashboard > Storage
-- 2. Crea los siguientes buckets (públicos):
--    - products
--    - blog
--    - media
--    - logos
--
-- 3. Para cada bucket, en "Policies", añade:
--    - SELECT: Public (todos pueden leer)
--    - INSERT: Authenticated (solo usuarios autenticados)
--    - UPDATE: Authenticated
--    - DELETE: Authenticated
--
-- ============================================
