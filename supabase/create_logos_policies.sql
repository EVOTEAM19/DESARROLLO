-- ============================================
-- CREAR POLÍTICAS RLS PARA BUCKET: logos
-- ============================================
-- Este script crea las políticas RLS necesarias
-- para que usuarios autenticados puedan subir logos
-- ============================================

-- Eliminar políticas existentes si existen (para evitar conflictos)
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- ============================================
-- POLÍTICAS PARA BUCKET: logos
-- ============================================

-- Lectura pública (todos pueden ver los logos)
CREATE POLICY "Public Access Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

-- Subida para usuarios autenticados (solo usuarios logueados pueden subir)
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Actualización para usuarios autenticados (solo usuarios logueados pueden actualizar)
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- Eliminación para usuarios autenticados (solo usuarios logueados pueden eliminar)
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que el bucket existe
SELECT id, name, public, file_size_limit
FROM storage.buckets 
WHERE id = 'logos';

-- Verificar políticas creadas
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%'
ORDER BY policyname;
