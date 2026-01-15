-- ============================================
-- SCRIPT PARA CORREGIR URLs DE EXAMPLE.COM
-- ============================================
-- Este script actualiza las URLs de example.com
-- a URLs válidas de Unsplash o Supabase Storage
-- ============================================

-- Actualizar productos con URLs de example.com
UPDATE products
SET image_url = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'
WHERE image_url LIKE '%example.com%'
AND image_url LIKE '%chat-ia%';

UPDATE products
SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80'
WHERE image_url LIKE '%example.com%'
AND image_url LIKE '%analytics%';

-- Actualizar blog posts con URLs de example.com
UPDATE blog_posts
SET image_url = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80'
WHERE image_url LIKE '%example.com%'
AND image_url LIKE '%futuro-ia%';

-- Actualizar media con URLs de example.com
UPDATE media
SET url = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80'
WHERE url LIKE '%example.com%'
AND filename LIKE '%hero-image%';

-- Verificar que no queden URLs de example.com
SELECT 
    'products' as tabla,
    COUNT(*) as registros_con_example
FROM products
WHERE image_url LIKE '%example.com%'

UNION ALL

SELECT 
    'blog_posts' as tabla,
    COUNT(*) as registros_con_example
FROM blog_posts
WHERE image_url LIKE '%example.com%'

UNION ALL

SELECT 
    'media' as tabla,
    COUNT(*) as registros_con_example
FROM media
WHERE url LIKE '%example.com%';
