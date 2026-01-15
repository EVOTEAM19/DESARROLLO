-- ============================================
-- FIX: Políticas RLS para Storage (Versión Compatible)
-- ============================================
-- Este script corrige las políticas RLS para permitir
-- que usuarios autenticados suban imágenes
-- Versión compatible con permisos de Supabase
-- ============================================

-- NOTA: En Supabase, las políticas de storage se crean automáticamente
-- cuando se crea un bucket. Si ya existen, las eliminamos primero.

-- Eliminar políticas existentes si existen (para evitar conflictos)
DO $$
BEGIN
  -- Intentar eliminar políticas existentes
  DROP POLICY IF EXISTS "Public Access Products" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload Products" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update Products" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete Products" ON storage.objects;
  DROP POLICY IF EXISTS "Public Access Blog" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload Blog" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update Blog" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete Blog" ON storage.objects;
  DROP POLICY IF EXISTS "Public Access Media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload Media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update Media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete Media" ON storage.objects;
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE 'No se pueden eliminar políticas existentes. Continuando...';
END $$;

-- Crear buckets si no existen (con permisos públicos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('products', 'products', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('blog', 'blog', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('media', 'media', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- Crear bucket para logos si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('logos', 'logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- ============================================
-- POLÍTICAS PARA BUCKET: products
-- ============================================

-- Lectura pública
CREATE POLICY IF NOT EXISTS "Public Access Products"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Subida para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload Products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Actualización para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can update Products"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products')
WITH CHECK (bucket_id = 'products');

-- Eliminación para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can delete Products"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- ============================================
-- POLÍTICAS PARA BUCKET: blog
-- ============================================

-- Lectura pública
CREATE POLICY IF NOT EXISTS "Public Access Blog"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

-- Subida para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload Blog"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog');

-- Actualización para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can update Blog"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog')
WITH CHECK (bucket_id = 'blog');

-- Eliminación para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can delete Blog"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog');

-- ============================================
-- POLÍTICAS PARA BUCKET: media
-- ============================================

-- Lectura pública
CREATE POLICY IF NOT EXISTS "Public Access Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Subida para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Actualización para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can update Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- Eliminación para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can delete Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- ============================================
-- POLÍTICAS PARA BUCKET: logos
-- ============================================

-- Lectura pública
CREATE POLICY IF NOT EXISTS "Public Access Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

-- Subida para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload Logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Actualización para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can update Logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- Eliminación para usuarios autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can delete Logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que los buckets existen
SELECT id, name, public, file_size_limit
FROM storage.buckets 
WHERE id IN ('products', 'blog', 'media', 'logos')
ORDER BY id;

-- Verificar políticas creadas
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Products%' 
     OR policyname LIKE '%Blog%' 
     OR policyname LIKE '%Media%'
     OR policyname LIKE '%Logos%'
ORDER BY policyname;
