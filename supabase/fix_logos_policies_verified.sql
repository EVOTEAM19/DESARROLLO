-- ============================================
-- VERIFICAR Y CORREGIR POLÍTICAS DEL BUCKET: logos
-- ============================================
-- Este script verifica y recrea las políticas correctamente
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- PASO 1: Verificar que el bucket existe
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  created_at
FROM storage.buckets 
WHERE id = 'logos';

-- PASO 2: Verificar políticas actuales
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

-- PASO 3: Eliminar TODAS las políticas existentes del bucket logos
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- PASO 4: Crear políticas con sintaxis explícita y correcta

-- Política 1: SELECT - Lectura pública
CREATE POLICY "Public Access Logos"
ON storage.objects 
FOR SELECT
TO public
USING (bucket_id = 'logos');

-- Política 2: INSERT - Subida para usuarios autenticados
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects 
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'logos' 
  AND (storage.foldername(name))[1] = 'logo'
);

-- Política 3: UPDATE - Actualización para usuarios autenticados
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects 
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'logos' 
  AND (storage.foldername(name))[1] = 'logo'
)
WITH CHECK (
  bucket_id = 'logos' 
  AND (storage.foldername(name))[1] = 'logo'
);

-- Política 4: DELETE - Eliminación para usuarios autenticados
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects 
FOR DELETE
TO authenticated
USING (
  bucket_id = 'logos' 
  AND (storage.foldername(name))[1] = 'logo'
);

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

-- Verificar políticas creadas
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
ORDER BY 
  CASE cmd
    WHEN 'SELECT' THEN 1
    WHEN 'INSERT' THEN 2
    WHEN 'UPDATE' THEN 3
    WHEN 'DELETE' THEN 4
  END;
