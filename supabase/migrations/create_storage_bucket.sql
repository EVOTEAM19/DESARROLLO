-- ============================================
-- CREAR BUCKETS DE STORAGE
-- ============================================
-- Este script crea los buckets de almacenamiento para imágenes
-- Ejecutar en el SQL Editor de Supabase
-- ============================================

-- Crear bucket para productos (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Crear bucket para blog (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- Crear bucket para media (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Eliminar políticas existentes si existen (para evitar errores de duplicados)
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

-- Política: Permitir lectura pública para productos
CREATE POLICY "Public Access Products"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Política: Solo usuarios autenticados pueden subir productos
CREATE POLICY "Authenticated users can upload Products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Política: Solo usuarios autenticados pueden actualizar productos
CREATE POLICY "Authenticated users can update Products"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- Política: Solo usuarios autenticados pueden eliminar productos
CREATE POLICY "Authenticated users can delete Products"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- Políticas para bucket de blog
CREATE POLICY "Public Access Blog"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

CREATE POLICY "Authenticated users can upload Blog"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Authenticated users can update Blog"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog');

CREATE POLICY "Authenticated users can delete Blog"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog');

-- Políticas para bucket de media
CREATE POLICY "Public Access Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
