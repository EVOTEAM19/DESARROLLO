-- ============================================
-- DATOS DE EJEMPLO PARA FASTIA (VERSIÓN CORREGIDA)
-- ============================================
-- Ejecutar después de migration_fastia.sql
-- Compatible con schema actual y migrado
-- ============================================

-- ============================================
-- SITE SETTINGS
-- ============================================
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'site_settings' AND column_name = 'section') THEN
        INSERT INTO site_settings (section, key, value) VALUES
        ('hero', 'title', '"Nacidos para la era de la IA"'),
        ('hero', 'subtitle', '"Transformamos ideas en soluciones inteligentes mediante inteligencia artificial.\nSoluciones innovadoras que impulsan el futuro digital."'),
        ('hero', 'cta_text', '"Descubre nuestro enfoque"'),
        ('hero', 'cta_link', '"/productos"'),
        ('hero', 'video_url', '"https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4"'),
        ('general', 'site_name', '"FastIA"'),
        ('general', 'tagline', '"Transformamos ideas en soluciones inteligentes"'),
        ('general', 'location', '"Madrid, España"'),
        ('general', 'experience_years', '11'),
        ('general', 'developers_count', '40'),
        ('general', 'contact_email', '"contacto@fastia.com"'),
        ('social', 'linkedin', '"https://linkedin.com/company/fastia"'),
        ('social', 'twitter', '"https://twitter.com/fastia"'),
        ('social', 'github', '"https://github.com/fastia"')
        ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value;
    ELSE
        INSERT INTO site_settings (key, value) VALUES
        ('hero_title', '"Nacidos para la era de la IA"'),
        ('hero_subtitle', '"Transformamos ideas en soluciones inteligentes mediante inteligencia artificial.\nSoluciones innovadoras que impulsan el futuro digital."'),
        ('hero_cta_text', '"Descubre nuestro enfoque"'),
        ('hero_cta_link', '"/productos"'),
        ('hero_video_url', '"https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4"'),
        ('site_name', '"FastIA"'),
        ('tagline', '"Transformamos ideas en soluciones inteligentes"'),
        ('location', '"Madrid, España"'),
        ('experience_years', '11'),
        ('developers_count', '40'),
        ('contact_email', '"contacto@fastia.com"'),
        ('linkedin', '"https://linkedin.com/company/fastia"'),
        ('twitter', '"https://twitter.com/fastia"'),
        ('github', '"https://github.com/fastia"')
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
    END IF;
END $$;

-- ============================================
-- SERVICES (3 servicios de ejemplo)
-- ============================================
-- Versión simplificada: siempre inserta 'name' si existe (es NOT NULL)
DO $$ 
BEGIN
    -- Caso 1: Tiene 'name' y 'title' y 'order_index'
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'name')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'title')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order_index') THEN
        INSERT INTO services (slug, name, title, short_description, full_description, icon, category, technologies, image_url, order_index, is_featured, published, meta_title, meta_description) VALUES
        ('desarrollo-apps-ia', 'Desarrollo de Apps con IA', 'Desarrollo de Apps con IA', 'Creamos aplicaciones móviles y web inteligentes con capacidades de IA integradas.', 'Desarrollamos aplicaciones móviles nativas (iOS con Swift, Android con Kotlin) y multiplataforma (React Native) con integración de inteligencia artificial. Nuestras apps incluyen reconocimiento de imágenes, procesamiento de lenguaje natural, recomendaciones personalizadas y análisis predictivo. Backend robusto con Node.js y TypeScript, APIs GraphQL y REST, y sincronización en tiempo real.', 'smartphone', 'Desarrollo', '["Swift", "Kotlin", "React Native", "Node.js", "TypeScript", "TensorFlow Lite", "Core ML"]'::jsonb, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', 1, true, true, 'Desarrollo de Apps con IA | FastIA', 'Desarrollamos aplicaciones móviles y web inteligentes con capacidades de IA integradas. iOS, Android, React Native.'),
        ('plataformas-web-ia', 'Plataformas Web con IA', 'Plataformas Web con IA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por IA.', 'Desarrollamos plataformas web empresariales con arquitectura moderna. Frontend con React, Next.js y TypeScript. Backend con Node.js, microservicios y bases de datos PostgreSQL y MongoDB. Integración de IA para personalización, análisis predictivo, chatbots inteligentes y automatización de procesos. Despliegue en cloud con Kubernetes, CI/CD automatizado y monitoreo en tiempo real.', 'layers', 'Plataformas', '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kubernetes", "Docker"]'::jsonb, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', 2, true, true, 'Plataformas Web con IA | FastIA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por inteligencia artificial.'),
        ('automatizacion-ia', 'Automatización con IA', 'Automatización con IA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos.', 'Desarrollamos sistemas de automatización empresarial con IA que optimizan procesos, reducen costos y mejoran la eficiencia. Integración con sistemas legacy, APIs empresariales, webhooks y orquestación de workflows complejos. Backend con Node.js y TypeScript, procesamiento asíncrono, colas de mensajes y monitoreo en tiempo real. Soluciones personalizadas para cada industria.', 'zap', 'Automatización', '["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"]'::jsonb, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80', 3, true, true, 'Automatización con IA | FastIA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos con Node.js y TypeScript.')
        ON CONFLICT (slug) DO NOTHING;
    
    -- Caso 2: Tiene 'name' y 'title' pero 'order' (no 'order_index')
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'name')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'title')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order') THEN
        INSERT INTO services (slug, name, title, short_description, full_description, icon, category, technologies, image_url, "order", is_featured, published, meta_title, meta_description) VALUES
        ('desarrollo-apps-ia', 'Desarrollo de Apps con IA', 'Desarrollo de Apps con IA', 'Creamos aplicaciones móviles y web inteligentes con capacidades de IA integradas.', 'Desarrollamos aplicaciones móviles nativas (iOS con Swift, Android con Kotlin) y multiplataforma (React Native) con integración de inteligencia artificial. Nuestras apps incluyen reconocimiento de imágenes, procesamiento de lenguaje natural, recomendaciones personalizadas y análisis predictivo. Backend robusto con Node.js y TypeScript, APIs GraphQL y REST, y sincronización en tiempo real.', 'smartphone', 'Desarrollo', '["Swift", "Kotlin", "React Native", "Node.js", "TypeScript", "TensorFlow Lite", "Core ML"]'::jsonb, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', 1, true, true, 'Desarrollo de Apps con IA | FastIA', 'Desarrollamos aplicaciones móviles y web inteligentes con capacidades de IA integradas. iOS, Android, React Native.'),
        ('plataformas-web-ia', 'Plataformas Web con IA', 'Plataformas Web con IA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por IA.', 'Desarrollamos plataformas web empresariales con arquitectura moderna. Frontend con React, Next.js y TypeScript. Backend con Node.js, microservicios y bases de datos PostgreSQL y MongoDB. Integración de IA para personalización, análisis predictivo, chatbots inteligentes y automatización de procesos. Despliegue en cloud con Kubernetes, CI/CD automatizado y monitoreo en tiempo real.', 'layers', 'Plataformas', '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kubernetes", "Docker"]'::jsonb, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', 2, true, true, 'Plataformas Web con IA | FastIA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por inteligencia artificial.'),
        ('automatizacion-ia', 'Automatización con IA', 'Automatización con IA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos.', 'Desarrollamos sistemas de automatización empresarial con IA que optimizan procesos, reducen costos y mejoran la eficiencia. Integración con sistemas legacy, APIs empresariales, webhooks y orquestación de workflows complejos. Backend con Node.js y TypeScript, procesamiento asíncrono, colas de mensajes y monitoreo en tiempo real. Soluciones personalizadas para cada industria.', 'zap', 'Automatización', '["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"]'::jsonb, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80', 3, true, true, 'Automatización con IA | FastIA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos con Node.js y TypeScript.')
        ON CONFLICT (slug) DO NOTHING;
    
    -- Caso 3: Solo tiene 'name' y 'order' (schema actual sin migrar)
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'name')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order') THEN
        INSERT INTO services (slug, name, short_description, full_description, icon, category, technologies, image_url, "order", is_featured, published, meta_title, meta_description) VALUES
        ('desarrollo-apps-ia', 'Desarrollo de Apps con IA', 'Creamos aplicaciones móviles y web inteligentes con capacidades de IA integradas.', 'Desarrollamos aplicaciones móviles nativas (iOS con Swift, Android con Kotlin) y multiplataforma (React Native) con integración de inteligencia artificial. Nuestras apps incluyen reconocimiento de imágenes, procesamiento de lenguaje natural, recomendaciones personalizadas y análisis predictivo. Backend robusto con Node.js y TypeScript, APIs GraphQL y REST, y sincronización en tiempo real.', 'smartphone', 'Desarrollo', '["Swift", "Kotlin", "React Native", "Node.js", "TypeScript", "TensorFlow Lite", "Core ML"]'::jsonb, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', 1, true, true, 'Desarrollo de Apps con IA | FastIA', 'Desarrollamos aplicaciones móviles y web inteligentes con capacidades de IA integradas. iOS, Android, React Native.'),
        ('plataformas-web-ia', 'Plataformas Web con IA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por IA.', 'Desarrollamos plataformas web empresariales con arquitectura moderna. Frontend con React, Next.js y TypeScript. Backend con Node.js, microservicios y bases de datos PostgreSQL y MongoDB. Integración de IA para personalización, análisis predictivo, chatbots inteligentes y automatización de procesos. Despliegue en cloud con Kubernetes, CI/CD automatizado y monitoreo en tiempo real.', 'layers', 'Plataformas', '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kubernetes", "Docker"]'::jsonb, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', 2, true, true, 'Plataformas Web con IA | FastIA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por inteligencia artificial.'),
        ('automatizacion-ia', 'Automatización con IA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos.', 'Desarrollamos sistemas de automatización empresarial con IA que optimizan procesos, reducen costos y mejoran la eficiencia. Integración con sistemas legacy, APIs empresariales, webhooks y orquestación de workflows complejos. Backend con Node.js y TypeScript, procesamiento asíncrono, colas de mensajes y monitoreo en tiempo real. Soluciones personalizadas para cada industria.', 'zap', 'Automatización', '["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"]'::jsonb, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80', 3, true, true, 'Automatización con IA | FastIA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos con Node.js y TypeScript.')
        ON CONFLICT (slug) DO NOTHING;
    
    -- Caso 4: Solo tiene 'title' y 'order_index' (schema completamente migrado)
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'title')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'order_index') THEN
        INSERT INTO services (slug, title, short_description, full_description, icon, category, technologies, image_url, order_index, is_featured, published, meta_title, meta_description) VALUES
        ('desarrollo-apps-ia', 'Desarrollo de Apps con IA', 'Creamos aplicaciones móviles y web inteligentes con capacidades de IA integradas.', 'Desarrollamos aplicaciones móviles nativas (iOS con Swift, Android con Kotlin) y multiplataforma (React Native) con integración de inteligencia artificial. Nuestras apps incluyen reconocimiento de imágenes, procesamiento de lenguaje natural, recomendaciones personalizadas y análisis predictivo. Backend robusto con Node.js y TypeScript, APIs GraphQL y REST, y sincronización en tiempo real.', 'smartphone', 'Desarrollo', '["Swift", "Kotlin", "React Native", "Node.js", "TypeScript", "TensorFlow Lite", "Core ML"]'::jsonb, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', 1, true, true, 'Desarrollo de Apps con IA | FastIA', 'Desarrollamos aplicaciones móviles y web inteligentes con capacidades de IA integradas. iOS, Android, React Native.'),
        ('plataformas-web-ia', 'Plataformas Web con IA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por IA.', 'Desarrollamos plataformas web empresariales con arquitectura moderna. Frontend con React, Next.js y TypeScript. Backend con Node.js, microservicios y bases de datos PostgreSQL y MongoDB. Integración de IA para personalización, análisis predictivo, chatbots inteligentes y automatización de procesos. Despliegue en cloud con Kubernetes, CI/CD automatizado y monitoreo en tiempo real.', 'layers', 'Plataformas', '["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Kubernetes", "Docker"]'::jsonb, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', 2, true, true, 'Plataformas Web con IA | FastIA', 'Plataformas web escalables desarrolladas con TypeScript, React y Node.js, potenciadas por inteligencia artificial.'),
        ('automatizacion-ia', 'Automatización con IA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos.', 'Desarrollamos sistemas de automatización empresarial con IA que optimizan procesos, reducen costos y mejoran la eficiencia. Integración con sistemas legacy, APIs empresariales, webhooks y orquestación de workflows complejos. Backend con Node.js y TypeScript, procesamiento asíncrono, colas de mensajes y monitoreo en tiempo real. Soluciones personalizadas para cada industria.', 'zap', 'Automatización', '["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"]'::jsonb, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80', 3, true, true, 'Automatización con IA | FastIA', 'Automatizamos procesos empresariales complejos mediante sistemas inteligentes y autónomos con Node.js y TypeScript.')
        ON CONFLICT (slug) DO NOTHING;
    END IF;
END $$;

-- Continuar con projects, testimonials, blog_posts...
-- (El resto del archivo se mantiene igual)
