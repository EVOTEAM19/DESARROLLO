-- ============================================
-- EJEMPLOS DE USO Y CONSULTAS ÚTILES
-- ============================================
-- Este archivo contiene ejemplos de cómo usar las tablas
-- y consultas comunes para el sitio ThinkIA
-- ============================================

-- ============================================
-- EJEMPLOS: Páginas (pages)
-- ============================================

-- Crear una nueva página
INSERT INTO pages (slug, title, content, meta_title, meta_description, published)
VALUES (
    'home',
    'Página de Inicio',
    '{"sections": ["hero", "products", "services"]}'::jsonb,
    'ThinkIA - Inteligencia Artificial',
    'Plataforma líder en soluciones de IA',
    true
);

-- Obtener todas las páginas publicadas
SELECT * FROM pages WHERE published = true ORDER BY created_at DESC;

-- Obtener una página por slug
SELECT * FROM pages WHERE slug = 'home' AND published = true;

-- ============================================
-- EJEMPLOS: Secciones (sections)
-- ============================================

-- Crear secciones para una página
INSERT INTO sections (page_id, type, title, subtitle, content, "order", visible)
VALUES 
    (
        (SELECT id FROM pages WHERE slug = 'home'),
        'hero',
        'Bienvenido a ThinkIA',
        'Transforma tu negocio con IA',
        '{"cta_text": "Comenzar", "cta_link": "/signup"}'::jsonb,
        1,
        true
    ),
    (
        (SELECT id FROM pages WHERE slug = 'home'),
        'products',
        'Nuestros Productos',
        'Soluciones de IA para tu empresa',
        '{}'::jsonb,
        2,
        true
    );

-- Obtener todas las secciones de una página ordenadas
SELECT * FROM sections 
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
AND visible = true
ORDER BY "order" ASC;

-- ============================================
-- EJEMPLOS: Productos (products)
-- ============================================

-- Crear productos
INSERT INTO products (name, slug, description, image_url, features, category, "order", published)
VALUES 
    (
        'IA Conversacional',
        'ia-conversacional',
        'Sistema de chat inteligente para atención al cliente',
        'https://example.com/images/chat-ia.jpg',
        '["Respuestas automáticas", "Multiidioma", "Análisis de sentimientos"]'::jsonb,
        'chatbots',
        1,
        true
    ),
    (
        'Análisis Predictivo',
        'analisis-predictivo',
        'Predice tendencias y comportamientos con IA',
        'https://example.com/images/analytics.jpg',
        '["Machine Learning", "Visualizaciones", "Reportes automáticos"]'::jsonb,
        'analytics',
        2,
        true
    );

-- Obtener productos publicados por categoría
SELECT * FROM products 
WHERE category = 'chatbots' 
AND published = true
ORDER BY "order" ASC;

-- Buscar productos por nombre (usando búsqueda de texto completo)
SELECT * FROM products 
WHERE name ILIKE '%IA%' 
AND published = true;

-- ============================================
-- EJEMPLOS: Servicios (services)
-- ============================================

-- Crear servicios
INSERT INTO services (name, slug, description, icon, category, "order", published)
VALUES 
    (
        'Consultoría en IA',
        'consultoria-ia',
        'Asesoramiento especializado en implementación de IA',
        'Brain',
        'consulting',
        1,
        true
    ),
    (
        'Desarrollo Personalizado',
        'desarrollo-personalizado',
        'Creamos soluciones de IA a medida para tu negocio',
        'Code',
        'development',
        2,
        true
    );

-- Obtener servicios publicados
SELECT * FROM services 
WHERE published = true 
ORDER BY "order" ASC;

-- ============================================
-- EJEMPLOS: Blog Posts (blog_posts)
-- ============================================

-- Crear un artículo de blog
INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    image_url, 
    author, 
    category, 
    tags, 
    published, 
    published_at
)
VALUES 
    (
        'El Futuro de la IA en 2024',
        'futuro-ia-2024',
        'Exploramos las tendencias más importantes de la inteligencia artificial',
        '<p>Contenido completo del artículo...</p>',
        'https://example.com/images/futuro-ia.jpg',
        'Juan Pérez',
        'Tendencias',
        ARRAY['IA', 'Tecnología', 'Futuro'],
        true,
        NOW()
    );

-- Obtener posts publicados ordenados por fecha
SELECT * FROM blog_posts 
WHERE published = true 
ORDER BY published_at DESC 
LIMIT 10;

-- Buscar posts por tag
SELECT * FROM blog_posts 
WHERE 'IA' = ANY(tags) 
AND published = true
ORDER BY published_at DESC;

-- Buscar posts por categoría
SELECT * FROM blog_posts 
WHERE category = 'Tendencias' 
AND published = true
ORDER BY published_at DESC;

-- ============================================
-- EJEMPLOS: Media (media)
-- ============================================

-- Insertar un archivo multimedia
INSERT INTO media (filename, url, type, size, alt_text)
VALUES 
    (
        'hero-image.jpg',
        'https://example.com/uploads/hero-image.jpg',
        'image',
        2048000,
        'Imagen principal del hero'
    );

-- Obtener todas las imágenes
SELECT * FROM media WHERE type = 'image' ORDER BY created_at DESC;

-- ============================================
-- EJEMPLOS: Site Settings (site_settings)
-- ============================================

-- Actualizar configuración del sitio
INSERT INTO site_settings (key, value)
VALUES ('site_name', '"ThinkIA"')
ON CONFLICT (key) 
DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Obtener una configuración específica
SELECT value FROM site_settings WHERE key = 'site_name';

-- Obtener todas las configuraciones
SELECT * FROM site_settings ORDER BY key;

-- ============================================
-- CONSULTAS COMPLEJAS ÚTILES
-- ============================================

-- Obtener página completa con sus secciones
SELECT 
    p.*,
    json_agg(
        json_build_object(
            'id', s.id,
            'type', s.type,
            'title', s.title,
            'subtitle', s.subtitle,
            'content', s.content,
            'order', s."order"
        ) ORDER BY s."order"
    ) FILTER (WHERE s.id IS NOT NULL) as sections
FROM pages p
LEFT JOIN sections s ON s.page_id = p.id AND s.visible = true
WHERE p.slug = 'home' AND p.published = true
GROUP BY p.id;

-- Obtener estadísticas del sitio
SELECT 
    (SELECT COUNT(*) FROM pages WHERE published = true) as total_pages,
    (SELECT COUNT(*) FROM products WHERE published = true) as total_products,
    (SELECT COUNT(*) FROM services WHERE published = true) as total_services,
    (SELECT COUNT(*) FROM blog_posts WHERE published = true) as total_posts,
    (SELECT COUNT(*) FROM media) as total_media;

-- Obtener posts recientes con información adicional
SELECT 
    bp.*,
    COUNT(*) OVER() as total_count
FROM blog_posts bp
WHERE bp.published = true
ORDER BY bp.published_at DESC
LIMIT 5;

-- Buscar en múltiples tablas (productos y servicios)
SELECT 
    'product' as type,
    name,
    slug,
    description,
    category
FROM products
WHERE published = true
    AND (name ILIKE '%IA%' OR description ILIKE '%IA%')

UNION ALL

SELECT 
    'service' as type,
    name,
    slug,
    description,
    category
FROM services
WHERE published = true
    AND (name ILIKE '%IA%' OR description ILIKE '%IA%')

ORDER BY name;
