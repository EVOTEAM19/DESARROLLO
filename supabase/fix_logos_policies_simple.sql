-- ============================================
-- POLÍTICAS SIMPLES PARA BUCKET: logos (SIN RESTRICCIONES DE CARPETA)
-- ============================================
-- Si el script anterior falla, usa este que es más simple
-- ============================================

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Public Access Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update Logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete Logos" ON storage.objects;

-- Crear políticas simples (sin restricciones de carpeta)

-- SELECT: Todos pueden leer
CREATE POLICY "Public Access Logos"
ON storage.objects 
FOR SELECT
TO public
USING (bucket_id = 'logos');

-- INSERT: Usuarios autenticados pueden subir
CREATE POLICY "Authenticated users can upload Logos"
ON storage.objects 
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- UPDATE: Usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update Logos"
ON storage.objects 
FOR UPDATE
TO authenticated
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');

-- DELETE: Usuarios autenticados pueden eliminar
CREATE POLICY "Authenticated users can delete Logos"
ON storage.objects 
FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- Verificar
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%'
ORDER BY policyname;
