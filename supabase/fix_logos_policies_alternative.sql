-- ============================================
-- SOLUCIÓN ALTERNATIVA: Políticas más permisivas
-- ============================================
-- Si las políticas anteriores no funcionan, prueba este enfoque
-- ============================================

-- PASO 1: Eliminar TODAS las políticas de logos
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- PASO 2: Crear políticas más permisivas (sin restricciones adicionales)

-- SELECT: Público puede leer cualquier archivo en el bucket logos
CREATE POLICY "Public Access Logos"
ON storage.objects 
FOR SELECT
USING (bucket_id = 'logos');

-- INSERT: Cualquier usuario autenticado puede subir a logos
-- Sin restricciones de carpeta ni nombre
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects 
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- UPDATE: Cualquier usuario autenticado puede actualizar en logos
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects 
FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- DELETE: Cualquier usuario autenticado puede eliminar en logos
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects 
FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- PASO 3: Verificar
SELECT 
  policyname,
  cmd,
  roles,
  CASE 
    WHEN qual IS NOT NULL THEN 'YES' 
    ELSE 'NO' 
  END as has_using_clause,
  CASE 
    WHEN with_check IS NOT NULL THEN 'YES' 
    ELSE 'NO' 
  END as has_with_check_clause
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
