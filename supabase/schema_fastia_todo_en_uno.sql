-- ============================================
-- SCHEMA COMPLETO FASTIA - TODO EN UNO
-- ============================================
-- Script completo: Schema + Datos iniciales
-- Ejecutar TODO este script en Supabase SQL Editor
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ELIMINAR TABLAS EXISTENTES (si existen)
-- ============================================
-- Nota: Los DROP TRIGGER pueden fallar si las tablas no existen, por eso usamos IF EXISTS
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON public.contact_messages;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;

DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;

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
-- TABLA: services
-- ============================================
CREATE TABLE IF NOT EXISTS public.services (
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
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(published);
CREATE INDEX IF NOT EXISTS idx_services_order_index ON public.services(order_index);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON public.services(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_featured ON public.services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_title_trgm ON public.services USING gin(title gin_trgm_ops);

-- ============================================
-- TABLA: projects
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
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
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON public.projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON public.projects(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_title_trgm ON public.projects USING gin(title gin_trgm_ops);

-- ============================================
-- TABLA: testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    company TEXT,
    company_logo TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_project_id ON public.testimonials(project_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_order_index ON public.testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON public.testimonials(is_featured);

-- ============================================
-- TABLA: blog_posts
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
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
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON public.blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_title_trgm ON public.blog_posts USING gin(title gin_trgm_ops);

-- ============================================
-- TABLA: contact_messages
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_type TEXT,
    budget_range TEXT,
    message TEXT,
    start_timeframe TEXT,
    status TEXT DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para contact_messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- ============================================
-- TABLA: site_settings
-- ============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT,
    key TEXT NOT NULL,
    value JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, key)
);

-- Índices para site_settings
CREATE INDEX IF NOT EXISTS idx_site_settings_section ON public.site_settings(section);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_section_key ON public.site_settings(section, key);

-- ============================================
-- TRIGGERS: Actualización automática de updated_at
-- ============================================

DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS: services
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view all services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can manage services" ON public.services;

-- Lectura pública: Solo servicios publicados
CREATE POLICY "Public can view published services"
    ON public.services FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all services"
    ON public.services FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can manage services"
    ON public.services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- POLÍTICAS RLS: projects
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON public.projects;

-- Lectura pública: Solo proyectos publicados
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all projects"
    ON public.projects FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can manage projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- POLÍTICAS RLS: testimonials
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view published testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON public.testimonials;

-- Lectura pública: Solo testimonios publicados
CREATE POLICY "Public can view published testimonials"
    ON public.testimonials FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all testimonials"
    ON public.testimonials FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can manage testimonials"
    ON public.testimonials FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- POLÍTICAS RLS: blog_posts
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;

-- Lectura pública: Solo posts publicados
CREATE POLICY "Public can view published blog posts"
    ON public.blog_posts FOR SELECT
    USING (published = true);

-- Lectura completa para usuarios autenticados
CREATE POLICY "Authenticated users can view all blog posts"
    ON public.blog_posts FOR SELECT
    TO authenticated
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can manage blog posts"
    ON public.blog_posts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- POLÍTICAS RLS: contact_messages
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON public.contact_messages;

-- Lectura solo para usuarios autenticados
CREATE POLICY "Authenticated users can view contact messages"
    ON public.contact_messages FOR SELECT
    TO authenticated
    USING (true);

-- Escritura para todos (público puede enviar mensajes)
CREATE POLICY "Public can insert contact messages"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

-- Actualización/Eliminación solo para usuarios autenticados
CREATE POLICY "Authenticated users can update contact messages"
    ON public.contact_messages FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
    ON public.contact_messages FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- POLÍTICAS RLS: site_settings
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;

-- Lectura pública: Todos pueden leer configuración
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

-- Escritura solo para usuarios autenticados
CREATE POLICY "Authenticated users can manage site settings"
    ON public.site_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- COMENTARIOS EN TABLAS
-- ============================================

COMMENT ON TABLE public.services IS 'Servicios ofrecidos por FastIA';
COMMENT ON TABLE public.projects IS 'Proyectos realizados por FastIA';
COMMENT ON TABLE public.testimonials IS 'Testimonios de clientes';
COMMENT ON TABLE public.blog_posts IS 'Artículos del blog';
COMMENT ON TABLE public.contact_messages IS 'Mensajes de contacto recibidos';
COMMENT ON TABLE public.site_settings IS 'Configuración general del sitio organizada por secciones';

-- ============================================
-- DATOS INICIALES DE EJEMPLO
-- ============================================

-- SITE SETTINGS
INSERT INTO public.site_settings (section, key, value) VALUES
('hero', 'title', '"Nacidos para la era de la IA"'),
('hero', 'subtitle', '"Transformamos ideas en soluciones inteligentes mediante inteligencia artificial.\nSoluciones innovadoras que impulsan el futuro digital."'),
('hero', 'cta_text', '"Descubre nuestro enfoque"'),
('hero', 'cta_link', '"/enfoque"'),
('hero', 'video_url', '"https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4"'),
('general', 'site_name', '"FastIA"'),
('general', 'tagline', '"Transformamos ideas en soluciones inteligentes"'),
('general', 'location', '"Madrid, España"'),
('general', 'experience_years', '6'),
('general', 'developers_count', '40'),
('general', 'contact_email', '"contacto@fastia.com"'),
('social', 'linkedin', '"https://linkedin.com/company/fastia"'),
('social', 'twitter', '"https://twitter.com/fastia"'),
('social', 'github', '"https://github.com/fastia"')
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value;

-- SERVICES (3 servicios de ejemplo)
INSERT INTO public.services (slug, title, short_description, full_description, icon, category, technologies, image_url, order_index, is_featured, published, meta_title, meta_description) VALUES
(
  'desarrollo-apps-ia',
  'Desarrollo de Apps con IA',
  'Creamos aplicaciones móviles y web inteligentes con capacidades de IA integradas.',
  'Desarrollamos aplicaciones móviles nativas (iOS con Swift, Android con Kotlin) y multiplataforma (React Native) con integración de inteligencia artificial. Nuestras apps incluyen reconocimiento de imágenes, procesamiento de lenguaje natural, recomendaciones personalizadas y análisis predictivo. Backend robusto con Node.js y TypeScript, APIs GraphQL y REST, y sincronización en tiempo real.',
  'smartphone',
  'Desarrollo',
  '["Swift", "Kotlin", "React Native", "Node.js", "TypeScript", "TensorFlow Lite", "Core ML"]'::jsonb,
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  1,
  true,
  true,
  'Desarrollo de Apps con IA | FastIA',
  'Desarrollamos aplicaciones móviles y web inteligentes con capacidades de IA integradas. iOS, Android, React Native.'
),
(
  'plataformas-web-ia',
  'Plataformas Web con IA',
  'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por IA.',
  'Desarrollamos plataformas web empresariales con arquitectura moderna. Frontend con React, Next.js y TypeScript. Backend con Node.js, microservicios y bases de datos PostgreSQL y MongoDB. Integración de IA para personalización, análisis predictivo, chatbots inteligentes y automatización de procesos. Despliegue en cloud con Kubernetes, CI/CD automatizado y monitoreo en tiempo real.',
  'layers',
  'Plataformas',
  '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kubernetes", "Docker"]'::jsonb,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  2,
  true,
  true,
  'Plataformas Web con IA | FastIA',
  'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por inteligencia artificial.'
),
(
  'automatizacion-ia',
  'Automatización con IA',
  'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos.',
  'Desarrollamos sistemas de automatización empresarial con IA que optimizan procesos, reducen costos y mejoran la eficiencia. Integración con sistemas legacy, APIs empresariales, webhooks y orquestación de workflows complejos. Backend con Node.js y TypeScript, procesamiento asíncrono, colas de mensajes y monitoreo en tiempo real. Soluciones personalizadas para cada industria.',
  'zap',
  'Automatización',
  '["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"]'::jsonb,
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  3,
  true,
  true,
  'Automatización con IA | FastIA',
  'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos con Node.js y TypeScript.'
)
ON CONFLICT (slug) DO NOTHING;

-- PROJECTS (3 proyectos de ejemplo)
INSERT INTO public.projects (slug, title, client_name, category, short_description, full_description, challenge, solution, results, technologies, features, image_main, image_gallery, video_url, project_url, is_featured, order_index, published, published_at) VALUES
(
  'plataforma-ecommerce-ia',
  'Plataforma E-commerce con IA Personalizada',
  'TechRetail S.A.',
  'E-commerce',
  'Plataforma de comercio electrónico con recomendaciones personalizadas mediante IA y experiencia de usuario optimizada.',
  'Desarrollamos una plataforma completa de e-commerce con sistema de recomendaciones basado en IA, personalización de experiencia de usuario, análisis predictivo de demanda y chatbot de atención al cliente. La plataforma incluye gestión de inventario, procesamiento de pagos, logística y analytics avanzado.',
  'El cliente necesitaba aumentar las conversiones y mejorar la experiencia del usuario con recomendaciones personalizadas y atención al cliente 24/7.',
  'Implementamos un sistema de recomendaciones con machine learning que analiza el comportamiento del usuario en tiempo real. Desarrollamos un chatbot inteligente con procesamiento de lenguaje natural. Creamos dashboards de analytics con insights predictivos.',
  '{"conversion_rate": "+35%", "average_order_value": "+28%", "customer_satisfaction": "4.8/5", "response_time": "-60%", "revenue_increase": "+42%"}'::jsonb,
  '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Redis", "TensorFlow", "OpenAI API"]'::jsonb,
  '["Sistema de recomendaciones IA", "Chatbot inteligente", "Personalización en tiempo real", "Analytics predictivo", "Gestión de inventario", "Procesamiento de pagos"]'::jsonb,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  '["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80"]'::jsonb,
  NULL,
  'https://techretail-demo.fastia.com',
  true,
  1,
  true,
  NOW() - INTERVAL '30 days'
),
(
  'app-movil-logistica',
  'App Móvil de Logística con IA',
  'LogiFlow Solutions',
  'Mobile',
  'Aplicación móvil nativa para gestión logística con optimización de rutas mediante IA y tracking en tiempo real.',
  'Desarrollamos una aplicación móvil nativa para iOS y Android que optimiza rutas de entrega mediante algoritmos de IA, tracking en tiempo real, gestión de flotas y comunicación con conductores. La app incluye análisis predictivo de tráfico, estimación de tiempos de entrega y notificaciones inteligentes.',
  'El cliente necesitaba reducir costos de logística, optimizar rutas y mejorar la comunicación con conductores en tiempo real.',
  'Implementamos algoritmos de optimización de rutas con machine learning que consideran tráfico, clima y patrones históricos. Desarrollamos apps nativas con Swift y Kotlin para máximo rendimiento. Creamos un sistema de tracking en tiempo real con WebSockets.',
  '{"fuel_costs": "-25%", "delivery_time": "-30%", "driver_satisfaction": "4.7/5", "on_time_delivery": "+95%", "cost_savings": "€120K/año"}'::jsonb,
  '["Swift", "Kotlin", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Google Maps API", "ML Kit"]'::jsonb,
  '["Optimización de rutas IA", "Tracking en tiempo real", "Análisis predictivo de tráfico", "Notificaciones inteligentes", "Gestión de flotas", "Comunicación con conductores"]'::jsonb,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"]'::jsonb,
  NULL,
  'https://logiflow-demo.fastia.com',
  true,
  2,
  true,
  NOW() - INTERVAL '20 days'
),
(
  'plataforma-saas-ia',
  'Plataforma SaaS Empresarial con IA',
  'Enterprise Solutions Group',
  'SaaS',
  'Plataforma SaaS completa con capacidades de IA para automatización de procesos empresariales y analytics avanzado.',
  'Desarrollamos una plataforma SaaS empresarial con módulos de automatización de procesos, análisis de datos con IA, dashboards personalizables y integración con sistemas legacy. La plataforma incluye multi-tenancy, seguridad de nivel empresarial, APIs extensibles y marketplace de integraciones.',
  'El cliente necesitaba una plataforma escalable que automatizara procesos complejos y proporcionara insights accionables mediante IA.',
  'Implementamos arquitectura multi-tenant con aislamiento de datos. Desarrollamos módulos de automatización con workflows configurables. Creamos sistema de analytics con machine learning para insights predictivos. Integramos con sistemas legacy mediante APIs y webhooks.',
  '{"process_automation": "85%", "time_saved": "40 horas/semana", "user_adoption": "92%", "cost_reduction": "-35%", "roi": "320%"}'::jsonb,
  '["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Kubernetes", "Docker", "OpenAI API", "TensorFlow"]'::jsonb,
  '["Automatización de procesos", "Analytics con IA", "Multi-tenancy", "Integración con sistemas legacy", "Marketplace de integraciones", "Dashboards personalizables"]'::jsonb,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"]'::jsonb,
  NULL,
  'https://enterprise-demo.fastia.com',
  true,
  3,
  true,
  NOW() - INTERVAL '10 days'
)
ON CONFLICT (slug) DO NOTHING;

-- TESTIMONIALS (2 testimonios de ejemplo)
INSERT INTO public.testimonials (client_name, client_role, company, company_logo, content, rating, project_id, is_featured, order_index, published) VALUES
(
  'María González',
  'CTO',
  'TechRetail S.A.',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
  'FastIA transformó completamente nuestra plataforma de e-commerce. El sistema de recomendaciones con IA aumentó nuestras conversiones en un 35% y el chatbot inteligente mejoró significativamente la atención al cliente. El equipo es profesional, técnicamente excelente y siempre disponible.',
  5,
  (SELECT id FROM public.projects WHERE slug = 'plataforma-ecommerce-ia' LIMIT 1),
  true,
  1,
  true
),
(
  'Carlos Ruiz',
  'Director de Operaciones',
  'LogiFlow Solutions',
  'https://images.unsplash.com/photo-1599305445671-933298f4fcf3?w=200&q=80',
  'La aplicación móvil desarrollada por FastIA ha revolucionado nuestras operaciones logísticas. La optimización de rutas con IA nos ha permitido reducir costos de combustible en un 25% y mejorar los tiempos de entrega. La app es intuitiva, robusta y nuestros conductores la adoran.',
  5,
  (SELECT id FROM public.projects WHERE slug = 'app-movil-logistica' LIMIT 1),
  true,
  2,
  true
)
ON CONFLICT DO NOTHING;
