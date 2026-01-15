-- ============================================
-- CREAR BUCKET DE LOGOS
-- ============================================
-- Script simple para crear el bucket de logos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Crear bucket de logos si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('logos', 'logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- Verificar que el bucket se creó
SELECT id, name, public, file_size_limit, created_at
FROM storage.buckets 
WHERE id = 'logos';

-- ============================================
-- NOTA: Las políticas RLS se deben crear desde
-- la interfaz de Supabase Dashboard > Storage > logos > Policies
-- O ejecutar el script fix_storage_rls_final.sql
-- ============================================
