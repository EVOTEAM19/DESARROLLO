-- ============================================
-- VERIFICAR Y CORREGIR BUCKET LOGOS
-- ============================================
-- Script completo para verificar y corregir todo
-- ============================================

-- 1. Verificar bucket
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'logos';

-- 2. Verificar políticas actuales
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%'
ORDER BY policyname;

-- 3. Eliminar políticas existentes
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- 4. Crear políticas correctas

-- SELECT: Público puede leer
CREATE POLICY "Public Access Logos"
ON storage.objects 
FOR SELECT
TO public
USING (bucket_id = 'logos');

-- INSERT: Autenticados pueden subir
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects 
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- UPDATE: Autenticados pueden actualizar
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects 
FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- DELETE: Autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects 
FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- 5. Verificación final
SELECT 
  'Bucket' as tipo,
  id as nombre,
  public::text as estado
FROM storage.buckets 
WHERE id = 'logos'

UNION ALL

SELECT 
  'Política' as tipo,
  policyname as nombre,
  cmd || ' - ' || array_to_string(roles, ', ') as estado
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%'
ORDER BY tipo, nombre;
