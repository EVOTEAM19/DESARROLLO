-- ============================================
-- ESQUEMA DE BASE DE DATOS - FASTIA
-- ============================================
-- Script completo para crear el schema de FastIA
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ELIMINAR TABLAS ANTIGUAS (si existen)
-- ============================================
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Eliminar triggers si existen
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Eliminar función si existe
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================
-- FUNCIÓN: Actualización automática de updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLA: services (Servicios)
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    full_description TEXT,
    icon TEXT,
    category TEXT,
    technologies JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para services
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(published);
CREATE INDEX idx_services_order_index ON services(order_index);
CREATE INDEX idx_services_created_at ON services(created_at DESC);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_featured ON services(is_featured);
CREATE INDEX idx_services_title_trgm ON services USING gin(title gin_trgm_ops);

-- Trigger para updated_at
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: projects (Proyectos)
-- ============================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT,
    category TEXT,
    short_description TEXT,
    full_description TEXT,
    challenge TEXT,
    solution TEXT,
    results JSONB DEFAULT '{}'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    image_main TEXT,
    image_gallery JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    project_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para projects
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_order_index ON projects(order_index);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_published_at ON projects(published_at DESC);
CREATE INDEX idx_projects_title_trgm ON projects USING gin(title gin_trgm_ops);

-- Trigger para updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: testimonials (Testimonios)
-- ============================================
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    company TEXT,
    company_logo TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para testimonials
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_testimonials_order_index ON testimonials(order_index);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_project_id ON testimonials(project_id);

-- Trigger para updated_at
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: blog_posts (Artículos del blog)
-- ============================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author_name TEXT,
    author_avatar TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    reading_time INTEGER,
    views INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para blog_posts
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_is_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING gin(tags);
CREATE INDEX idx_blog_posts_title_trgm ON blog_posts USING gin(title gin_trgm_ops);

-- Trigger para updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: contact_messages (Mensajes de contacto)
-- ============================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_type TEXT,
    budget_range TEXT,
    message TEXT,
    start_timeframe TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'closed', 'archived')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para contact_messages
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Trigger para updated_at
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: site_settings (Configuración del sitio)
-- ============================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL,
    key TEXT NOT NULL,
    value JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, key)
);

-- Índices para site_settings
CREATE INDEX idx_site_settings_section ON site_settings(section);
CREATE INDEX idx_site_settings_key ON site_settings(key);
CREATE INDEX idx_site_settings_section_key ON site_settings(section, key);

-- Trigger para updated_at
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

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
-- POLÍTICAS RLS: projects
-- ============================================

-- Lectura pública: Solo proyectos publicados
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all projects"
    ON projects FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert projects"
    ON projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
    ON projects FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
    ON projects FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: testimonials
-- ============================================

-- Lectura pública: Solo testimonios publicados
CREATE POLICY "Public can view published testimonials"
    ON testimonials FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all testimonials"
    ON testimonials FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can insert testimonials"
    ON testimonials FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
    ON testimonials FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
    ON testimonials FOR DELETE
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
-- POLÍTICAS RLS: contact_messages
-- ============================================

-- Lectura: Solo usuarios autenticados
CREATE POLICY "Authenticated users can view contact messages"
    ON contact_messages FOR SELECT
    TO authenticated
    USING (true);

-- Inserción: Público puede crear mensajes
CREATE POLICY "Public can insert contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

-- Escritura: Solo usuarios autenticados
CREATE POLICY "Authenticated users can update contact messages"
    ON contact_messages FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
    ON contact_messages FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: site_settings
-- ============================================

-- Lectura pública: Todos pueden leer configuración
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

-- Escritura: Solo usuarios autenticados
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
-- COMENTARIOS EN TABLAS
-- ============================================

COMMENT ON TABLE services IS 'Servicios ofrecidos por FastIA';
COMMENT ON TABLE projects IS 'Proyectos realizados por FastIA';
COMMENT ON TABLE testimonials IS 'Testimonios de clientes';
COMMENT ON TABLE blog_posts IS 'Artículos del blog';
COMMENT ON TABLE contact_messages IS 'Mensajes de contacto recibidos';
COMMENT ON TABLE site_settings IS 'Configuración general del sitio organizada por secciones';
