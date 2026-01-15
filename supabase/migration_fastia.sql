-- ============================================
-- MIGRACIÓN SCHEMA FASTIA
-- ============================================
-- Script de migración que adapta el schema actual
-- a los requisitos de FastIA
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

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
-- ACTUALIZAR TABLA: services
-- ============================================
-- Añadir campos faltantes y renombrar si es necesario
DO $$ 
BEGIN
    -- Añadir 'title' si no existe (mantener 'name' también por compatibilidad)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'services' AND column_name = 'title') THEN
        ALTER TABLE services ADD COLUMN title TEXT;
        -- Copiar datos de 'name' a 'title' si existe
        UPDATE services SET title = name WHERE title IS NULL AND name IS NOT NULL;
    END IF;

    -- Renombrar 'order' a 'order_index' si existe 'order'
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'services' AND column_name = 'order') THEN
        ALTER TABLE services RENAME COLUMN "order" TO order_index;
    END IF;

    -- Añadir campos faltantes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'services' AND column_name = 'full_description') THEN
        ALTER TABLE services ADD COLUMN full_description TEXT;
    END IF;
END $$;

-- Asegurar que todos los campos necesarios existan
ALTER TABLE services 
    ADD COLUMN IF NOT EXISTS short_description TEXT,
    ADD COLUMN IF NOT EXISTS full_description TEXT,
    ADD COLUMN IF NOT EXISTS technologies JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS image_url TEXT,
    ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS meta_title TEXT,
    ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Migrar datos: si 'name' existe y 'title' no, copiar
UPDATE services SET title = name WHERE title IS NULL AND name IS NOT NULL;

-- Migrar datos: si 'order' existe, copiar a order_index
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'services' AND column_name = 'order') THEN
        UPDATE services SET order_index = "order" WHERE order_index = 0;
        ALTER TABLE services DROP COLUMN IF EXISTS "order";
    END IF;
END $$;

-- ============================================
-- ACTUALIZAR TABLA: projects
-- ============================================
-- Añadir campos faltantes
ALTER TABLE projects 
    ADD COLUMN IF NOT EXISTS challenge TEXT,
    ADD COLUMN IF NOT EXISTS solution TEXT,
    ADD COLUMN IF NOT EXISTS results JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS technologies JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS image_main TEXT,
    ADD COLUMN IF NOT EXISTS image_gallery JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS video_url TEXT,
    ADD COLUMN IF NOT EXISTS project_url TEXT,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Migrar image_url a image_main si existe
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'projects' AND column_name = 'image_url') THEN
        UPDATE projects SET image_main = image_url WHERE image_main IS NULL AND image_url IS NOT NULL;
        ALTER TABLE projects DROP COLUMN IF EXISTS image_url;
    END IF;
END $$;

-- Eliminar testimonial_id si existe (la relación es inversa: testimonials.project_id)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'projects' AND column_name = 'testimonial_id') THEN
        ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_testimonial_id_fkey;
        ALTER TABLE projects DROP COLUMN testimonial_id;
    END IF;
END $$;

-- ============================================
-- ACTUALIZAR TABLA: testimonials
-- ============================================
-- Asegurar que todos los campos necesarios existan
ALTER TABLE testimonials 
    ADD COLUMN IF NOT EXISTS client_role TEXT,
    ADD COLUMN IF NOT EXISTS company_logo TEXT,
    ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    ADD COLUMN IF NOT EXISTS project_id UUID,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;

-- Añadir FK a projects si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'testimonials_project_id_fkey') THEN
        ALTER TABLE testimonials 
        ADD CONSTRAINT testimonials_project_id_fkey 
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- ACTUALIZAR TABLA: blog_posts
-- ============================================
-- Añadir campos faltantes
ALTER TABLE blog_posts 
    ADD COLUMN IF NOT EXISTS author_name TEXT,
    ADD COLUMN IF NOT EXISTS author_avatar TEXT,
    ADD COLUMN IF NOT EXISTS featured_image TEXT,
    ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 5,
    ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS meta_title TEXT,
    ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Migrar 'author' a 'author_name' si existe
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'blog_posts' AND column_name = 'author') THEN
        UPDATE blog_posts SET author_name = author WHERE author_name IS NULL AND author IS NOT NULL;
    END IF;
    
    -- Migrar image_url a featured_image si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'blog_posts' AND column_name = 'image_url') THEN
        UPDATE blog_posts SET featured_image = image_url WHERE featured_image IS NULL AND image_url IS NOT NULL;
    END IF;
END $$;

-- ============================================
-- ACTUALIZAR TABLA: contact_messages
-- ============================================
-- Añadir campos faltantes
ALTER TABLE contact_messages 
    ADD COLUMN IF NOT EXISTS phone TEXT,
    ADD COLUMN IF NOT EXISTS company TEXT,
    ADD COLUMN IF NOT EXISTS project_type TEXT,
    ADD COLUMN IF NOT EXISTS budget_range TEXT,
    ADD COLUMN IF NOT EXISTS message TEXT,
    ADD COLUMN IF NOT EXISTS start_timeframe TEXT,
    ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'closed', 'archived')),
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Migrar 'read' y 'responded' a 'status' si existen
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'contact_messages' AND column_name = 'read') THEN
        UPDATE contact_messages 
        SET status = CASE 
            WHEN read = true THEN 'contacted'
            ELSE 'new'
        END
        WHERE status = 'new';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'contact_messages' AND column_name = 'responded') THEN
        UPDATE contact_messages 
        SET status = CASE 
            WHEN responded = true AND status = 'contacted' THEN 'qualified'
            ELSE status
        END
        WHERE responded = true;
    END IF;
END $$;

-- ============================================
-- ACTUALIZAR TABLA: site_settings
-- ============================================
-- Añadir campo 'section' y cambiar unique constraint
DO $$ 
BEGIN
    -- Añadir 'section' si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'site_settings' AND column_name = 'section') THEN
        ALTER TABLE site_settings ADD COLUMN section TEXT DEFAULT 'general';
        
        -- Eliminar constraint único en 'key' si existe
        IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'site_settings' AND constraint_name = 'site_settings_key_key') THEN
            ALTER TABLE site_settings DROP CONSTRAINT site_settings_key_key;
        END IF;
        
        -- Crear nuevo constraint único en (section, key)
        ALTER TABLE site_settings ADD CONSTRAINT site_settings_section_key_unique UNIQUE (section, key);
    END IF;
END $$;

-- ============================================
-- CREAR ÍNDICES FALTANTES
-- ============================================

-- Services
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);
CREATE INDEX IF NOT EXISTS idx_services_order_index ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_title_trgm ON services USING gin(COALESCE(title, name) gin_trgm_ops);

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_title_trgm ON projects USING gin(title gin_trgm_ops);

-- Testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_order_index ON testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_project_id ON testimonials(project_id);

-- Blog Posts (verificar índices existentes)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_trgm ON blog_posts USING gin(title gin_trgm_ops);

-- Contact Messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Site Settings
CREATE INDEX IF NOT EXISTS idx_site_settings_section ON site_settings(section);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_section_key ON site_settings(section, key);

-- ============================================
-- CREAR/ACTUALIZAR TRIGGERS
-- ============================================

-- Services
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Testimonials
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Blog Posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Contact Messages
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Site Settings
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
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

-- Eliminar políticas existentes si existen (para recrearlas)
DROP POLICY IF EXISTS "Public can view published services" ON services;
DROP POLICY IF EXISTS "Authenticated users can view all services" ON services;
DROP POLICY IF EXISTS "Authenticated users can insert services" ON services;
DROP POLICY IF EXISTS "Authenticated users can update services" ON services;
DROP POLICY IF EXISTS "Authenticated users can delete services" ON services;

DROP POLICY IF EXISTS "Public can view published projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can view all projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON contact_messages;

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can delete site settings" ON site_settings;

-- ============================================
-- POLÍTICAS RLS: services
-- ============================================

CREATE POLICY "Public can view published services"
    ON services FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can view all services"
    ON services FOR SELECT
    TO authenticated
    USING (true);

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

CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can view all projects"
    ON projects FOR SELECT
    TO authenticated
    USING (true);

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

CREATE POLICY "Public can view published testimonials"
    ON testimonials FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can view all testimonials"
    ON testimonials FOR SELECT
    TO authenticated
    USING (true);

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

CREATE POLICY "Public can view published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts"
    ON blog_posts FOR SELECT
    TO authenticated
    USING (true);

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

CREATE POLICY "Public can insert contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
    ON contact_messages FOR SELECT
    TO authenticated
    USING (true);

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

CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (true);

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
