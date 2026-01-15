-- ============================================
-- SETUP COMPLETO: Bucket + Políticas para Logos
-- ============================================
-- Este script crea el bucket y todas las políticas necesarias
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- PASO 1: Crear el bucket de logos si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('logos', 'logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

-- PASO 2: Eliminar políticas existentes si existen (para evitar conflictos)
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- PASO 3: Crear políticas RLS

-- Política 1: Lectura pública (todos pueden ver los logos)
CREATE POLICY "Public Access Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');

-- Política 2: Subida para usuarios autenticados
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Política 3: Actualización para usuarios autenticados
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- Política 4: Eliminación para usuarios autenticados
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que el bucket existe y está configurado correctamente
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE id = 'logos';

-- Verificar que las políticas se crearon correctamente
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

-- ============================================
-- RESULTADO ESPERADO
-- ============================================
-- Deberías ver:
-- 1. Un bucket 'logos' con public=true
-- 2. 4 políticas creadas (SELECT, INSERT, UPDATE, DELETE)
-- ============================================
