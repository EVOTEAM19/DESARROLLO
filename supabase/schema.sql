-- ============================================
-- ESQUEMA DE BASE DE DATOS - THINKIA
-- ============================================
-- Este archivo contiene todas las tablas, índices, triggers y políticas RLS
-- para el sitio web tipo ThinkIA
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- TABLA: pages (Páginas del sitio)
-- ============================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content JSONB DEFAULT '{}'::jsonb,
    meta_title TEXT,
    meta_description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para pages
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(published);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at DESC);

-- ============================================
-- TABLA: sections (Secciones de contenido)
-- ============================================
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('hero', 'products', 'services', 'blog', 'contact', 'testimonials', 'features', 'pricing', 'faq', 'cta')),
    title TEXT,
    subtitle TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    "order" INTEGER DEFAULT 0,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para sections
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_type ON sections(type);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(page_id, "order");
CREATE INDEX IF NOT EXISTS idx_sections_visible ON sections(visible);

-- ============================================
-- TABLA: products (Productos IA)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    category TEXT,
    "order" INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para products
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);
CREATE INDEX IF NOT EXISTS idx_products_order ON products("order");
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin(name gin_trgm_ops);

-- ============================================
-- TABLA: services (Servicios)
-- ============================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    category TEXT,
    "order" INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para services
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");

-- ============================================
-- TABLA: blog_posts (Artículos del blog)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    author TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_trgm ON blog_posts USING gin(title gin_trgm_ops);

-- ============================================
-- TABLA: media (Archivos multimedia)
-- ============================================
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video', 'document', 'audio')),
    size INTEGER,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para media
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_filename ON media(filename);

-- ============================================
-- TABLA: site_settings (Configuración general)
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para site_settings
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- ============================================
-- TRIGGERS: Actualización automática de updated_at
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at
    BEFORE UPDATE ON sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS: pages
-- ============================================

-- Lectura pública: Solo páginas publicadas
CREATE POLICY "Public can view published pages"
    ON pages FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all pages"
    ON pages FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert pages"
    ON pages FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages"
    ON pages FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages"
    ON pages FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: sections
-- ============================================

-- Lectura pública: Solo secciones visibles de páginas publicadas
CREATE POLICY "Public can view visible sections of published pages"
    ON sections FOR SELECT
    USING (
        visible = true AND
        EXISTS (
            SELECT 1 FROM pages
            WHERE pages.id = sections.page_id
            AND pages.published = true
        )
    );

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all sections"
    ON sections FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert sections"
    ON sections FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update sections"
    ON sections FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sections"
    ON sections FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: products
-- ============================================

-- Lectura pública: Solo productos publicados
CREATE POLICY "Public can view published products"
    ON products FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all products"
    ON products FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert products"
    ON products FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
    ON products FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
    ON products FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: services
-- ============================================

-- Lectura pública: Solo servicios publicados
CREATE POLICY "Public can view published services"
    ON services FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all services"
    ON services FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert services"
    ON services FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
    ON services FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
    ON services FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: blog_posts
-- ============================================

-- Lectura pública: Solo posts publicados
CREATE POLICY "Public can view published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all blog posts"
    ON blog_posts FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert blog posts"
    ON blog_posts FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
    ON blog_posts FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
    ON blog_posts FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: media
-- ============================================

-- Lectura pública: Todos pueden ver media
CREATE POLICY "Public can view media"
    ON media FOR SELECT
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert media"
    ON media FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
    ON media FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
    ON media FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: site_settings
-- ============================================

-- Lectura pública: Todos pueden leer configuración
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert site settings"
    ON site_settings FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
    ON site_settings FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site settings"
    ON site_settings FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- DATOS INICIALES (Opcional)
-- ============================================

-- Insertar configuración inicial del sitio
INSERT INTO site_settings (key, value) VALUES
    ('site_name', '"ThinkIA"'),
    ('site_description', '"Plataforma de inteligencia artificial"'),
    ('contact_email', '"contacto@thinkia.com"'),
    ('social_links', '{"twitter": "", "linkedin": "", "github": ""}'),
    ('theme', '{"primary_color": "#3b82f6", "secondary_color": "#9333ea"}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- COMENTARIOS EN TABLAS
-- ============================================

COMMENT ON TABLE pages IS 'Páginas del sitio web con contenido estructurado';
COMMENT ON TABLE sections IS 'Secciones de contenido asociadas a páginas';
COMMENT ON TABLE products IS 'Productos de IA disponibles';
COMMENT ON TABLE services IS 'Servicios ofrecidos';
COMMENT ON TABLE blog_posts IS 'Artículos del blog';
COMMENT ON TABLE media IS 'Archivos multimedia del sitio';
COMMENT ON TABLE site_settings IS 'Configuración general del sitio';
