-- ============================================
-- FIX: Políticas RLS para Storage
-- ============================================
-- Este script corrige las políticas RLS para permitir
-- que usuarios autenticados suban imágenes
-- ============================================

-- Habilitar RLS en storage.objects si no está habilitado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Eliminar todas las políticas existentes para evitar conflictos
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

-- ============================================
-- POLÍTICAS PARA BUCKET: products
-- ============================================

-- Lectura pública
CREATE POLICY "Public Access Products"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Subida para usuarios autenticados
CREATE POLICY "Authenticated users can upload Products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Actualización para usuarios autenticados
CREATE POLICY "Authenticated users can update Products"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products')
WITH CHECK (bucket_id = 'products');

-- Eliminación para usuarios autenticados
CREATE POLICY "Authenticated users can delete Products"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- ============================================
-- POLÍTICAS PARA BUCKET: blog
-- ============================================

-- Lectura pública
CREATE POLICY "Public Access Blog"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

-- Subida para usuarios autenticados
CREATE POLICY "Authenticated users can upload Blog"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog');

-- Actualización para usuarios autenticados
CREATE POLICY "Authenticated users can update Blog"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog')
WITH CHECK (bucket_id = 'blog');

-- Eliminación para usuarios autenticados
CREATE POLICY "Authenticated users can delete Blog"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog');

-- ============================================
-- POLÍTICAS PARA BUCKET: media
-- ============================================

-- Lectura pública
CREATE POLICY "Public Access Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Subida para usuarios autenticados
CREATE POLICY "Authenticated users can upload Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Actualización para usuarios autenticados
CREATE POLICY "Authenticated users can update Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- Eliminación para usuarios autenticados
CREATE POLICY "Authenticated users can delete Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que los buckets existen
SELECT id, name, public 
FROM storage.buckets 
WHERE id IN ('products', 'blog', 'media');

-- Verificar políticas creadas
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;
