-- ============================================
-- DEBUG: Verificar estado del bucket logos
-- ============================================
-- Ejecuta este script para ver el estado actual
-- ============================================

-- 1. Verificar bucket
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types,
  created_at,
  updated_at
FROM storage.buckets 
WHERE id = 'logos';

-- 2. Verificar TODAS las políticas de storage.objects
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
ORDER BY policyname;

-- 3. Verificar políticas específicas de logos
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND (
    policyname LIKE '%Logos%' OR
    policyname LIKE '%logos%'
  )
ORDER BY policyname;

-- 4. Verificar si RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'storage' 
  AND tablename = 'objects';
