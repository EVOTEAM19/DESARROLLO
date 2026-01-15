-- ============================================
-- CORREGIR POLÍTICAS DEL BUCKET: logos
-- ============================================
-- Este script corrige las políticas para que funcionen correctamente
-- Basado en la estructura que veo en tu dashboard
-- ============================================

-- PASO 1: Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- PASO 2: Crear políticas con estructura correcta

-- Política 1: SELECT - Lectura pública
CREATE POLICY "Public Access Logos"
ON storage.objects 
FOR SELECT
TO public
USING (bucket_id = 'logos');

-- Política 2: INSERT - Subida para usuarios autenticados
-- IMPORTANTE: Para INSERT, necesitamos WITH CHECK
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects 
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Política 3: UPDATE - Actualización para usuarios autenticados
-- IMPORTANTE: Para UPDATE, necesitamos tanto USING como WITH CHECK
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects 
FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- Política 4: DELETE - Eliminación para usuarios autenticados
-- IMPORTANTE: Para DELETE, solo necesitamos USING
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects 
FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar políticas creadas
SELECT 
  policyname,
  cmd,
  roles,
  CASE WHEN qual IS NOT NULL THEN 'YES' ELSE 'NO' END as has_using,
  CASE WHEN with_check IS NOT NULL THEN 'YES' ELSE 'NO' END as has_with_check
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

-- Verificar bucket
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'logos';
