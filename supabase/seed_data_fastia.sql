-- ============================================
-- DATOS DE EJEMPLO PARA FASTIA
-- ============================================
-- Ejecutar después de migration_fastia.sql
-- Compatible con schema actual y migrado
-- ============================================

-- ============================================
-- SITE SETTINGS
-- ============================================
-- Verificar si existe la columna 'section' para usar el formato correcto
DO $$ 
BEGIN
    -- Si existe 'section', usar formato (section, key)
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
        -- Si no existe 'section', usar formato antiguo (key)
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

-- ============================================
-- PROJECTS (3 proyectos de ejemplo)
-- ============================================
INSERT INTO projects (slug, title, client_name, category, short_description, full_description, challenge, solution, results, technologies, features, image_main, image_gallery, video_url, project_url, is_featured, order_index, published, published_at) VALUES
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

-- ============================================
-- TESTIMONIALS (2 testimonios de ejemplo)
-- ============================================
INSERT INTO testimonials (client_name, client_role, company, company_logo, content, rating, project_id, is_featured, order_index, published) VALUES
(
  'María González',
  'CTO',
  'TechRetail S.A.',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
  'FastIA transformó completamente nuestra plataforma de e-commerce. El sistema de recomendaciones con IA aumentó nuestras conversiones en un 35% y el chatbot inteligente mejoró significativamente la atención al cliente. El equipo es profesional, técnicamente excelente y siempre disponible.',
  5,
  (SELECT id FROM projects WHERE slug = 'plataforma-ecommerce-ia' LIMIT 1),
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
  (SELECT id FROM projects WHERE slug = 'app-movil-logistica' LIMIT 1),
  true,
  2,
  true
)
ON CONFLICT DO NOTHING;

-- ============================================
-- BLOG POSTS (3 artículos de ejemplo)
-- ============================================
-- Compatible con schema actual (author, image_url) y migrado (author_name, featured_image)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'blog_posts' AND column_name = 'author_name') THEN
        -- Schema migrado: usar 'author_name' y 'featured_image'
        INSERT INTO blog_posts (slug, title, excerpt, content, author_name, author_avatar, category, tags, featured_image, reading_time, views, is_featured, published, published_at) VALUES
(
  'desarrollo-apps-ia-swift-kotlin',
  'Desarrollo de Apps con IA: Swift, Kotlin y React Native',
  'Exploramos cómo desarrollar aplicaciones móviles inteligentes con capacidades de IA usando Swift para iOS, Kotlin para Android y React Native para multiplataforma.',
  '# Desarrollo de Apps con IA: Swift, Kotlin y React Native

La integración de inteligencia artificial en aplicaciones móviles está transformando la forma en que interactuamos con nuestros dispositivos. En FastIA, desarrollamos apps nativas y multiplataforma con capacidades avanzadas de IA.

## Desarrollo Nativo iOS con Swift

Swift ofrece excelentes herramientas para integrar IA en aplicaciones iOS:

- **Core ML**: Framework de Apple para machine learning on-device
- **Vision Framework**: Análisis de imágenes y reconocimiento de objetos
- **Natural Language**: Procesamiento de lenguaje natural
- **Create ML**: Entrenamiento de modelos personalizados

## Desarrollo Nativo Android con Kotlin

Kotlin es el lenguaje moderno para desarrollo Android con IA:

- **TensorFlow Lite**: Machine learning optimizado para móviles
- **ML Kit**: APIs de Google para tareas comunes de IA
- **CameraX**: Procesamiento de imágenes en tiempo real
- **Coroutines**: Manejo asíncrono eficiente

## React Native Multiplataforma

Para desarrollo multiplataforma, React Native ofrece:

- Integración con librerías nativas de IA
- Backend Node.js para procesamiento pesado
- Sincronización en tiempo real
- Código compartido entre iOS y Android

## Casos de Uso Reales

- Reconocimiento de imágenes y objetos
- Procesamiento de lenguaje natural
- Recomendaciones personalizadas
- Análisis predictivo
- Chatbots inteligentes

En FastIA, combinamos lo mejor de ambos mundos: apps nativas para máximo rendimiento y React Native para desarrollo rápido multiplataforma.',
  'Ana Martínez',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'Mobile',
  ARRAY['iOS', 'Android', 'React Native', 'IA', 'Swift', 'Kotlin', 'Mobile Development'],
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  8,
  1250,
  true,
  true,
  NOW() - INTERVAL '5 days'
),
(
  'arquitecturas-escalables-typescript-nodejs',
  'Arquitecturas Escalables con TypeScript y Node.js',
  'Diseñamos arquitecturas distribuidas escalables con TypeScript, Node.js y microservicios. Patrones de diseño, orquestación con Kubernetes y mejores prácticas.',
  '# Arquitecturas Escalables con TypeScript y Node.js

Las arquitecturas modernas requieren escalabilidad horizontal, alta disponibilidad y mantenibilidad. TypeScript y Node.js son ideales para construir sistemas escalables.

## Arquitectura de Microservicios

### Componentes Clave

- **API Gateway**: Punto único de entrada y enrutamiento
- **Service Mesh**: Comunicación segura entre servicios
- **Message Queue**: Comunicación asíncrona (RabbitMQ, Kafka)
- **Service Discovery**: Localización automática de servicios
- **Load Balancer**: Distribución de carga

## Stack Tecnológico

- **TypeScript**: Type-safety en todo el stack
- **Node.js**: Runtime de alto rendimiento
- **Express/Fastify**: Frameworks web ligeros
- **PostgreSQL/MongoDB**: Bases de datos robustas
- **Redis**: Caché y sesiones
- **Kubernetes**: Orquestación de contenedores
- **Docker**: Contenedores ligeros

## Patrones de Diseño

1. **Circuit Breaker**: Resiliencia ante fallos
2. **Retry Pattern**: Reintentos inteligentes
3. **Bulkhead**: Aislamiento de recursos
4. **Saga Pattern**: Transacciones distribuidas
5. **CQRS**: Separación de lectura y escritura

## Escalabilidad Horizontal

- Auto-scaling con Kubernetes HPA
- Load balancing inteligente
- Caching estratégico (Redis, CDN)
- Database sharding y replicación
- CDN para assets estáticos

## Monitoreo y Observabilidad

- Logging centralizado (ELK Stack)
- Métricas en tiempo real (Prometheus)
- Tracing distribuido (Jaeger)
- Alertas automatizadas
- Dashboards de monitoreo

En FastIA, diseñamos arquitecturas que escalan desde startups hasta empresas globales.',
  'Carlos Ruiz',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'Arquitectura',
  ARRAY['TypeScript', 'Node.js', 'Microservicios', 'Kubernetes', 'Escalabilidad', 'Arquitectura'],
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
  12,
  2100,
  true,
  true,
  NOW() - INTERVAL '3 days'
),
(
  'ia-generativa-aplicaciones-empresariales',
  'IA Generativa en Aplicaciones Empresariales',
  'Cómo integrar IA generativa (GPT, Claude) en aplicaciones empresariales para automatizar tareas, generar contenido y mejorar la productividad.',
  '# IA Generativa en Aplicaciones Empresariales

La IA generativa está revolucionando las aplicaciones empresariales, permitiendo automatizar tareas complejas y generar contenido de alta calidad.

## ¿Qué es la IA Generativa?

La IA generativa puede crear contenido nuevo basado en patrones aprendidos:

- **Texto**: Generación de documentos, emails, código
- **Imágenes**: Creación de gráficos, ilustraciones
- **Código**: Generación y optimización de código
- **Audio**: Síntesis de voz, música

## Integración en Aplicaciones

### APIs Disponibles

- **OpenAI GPT**: Modelos de lenguaje avanzados
- **Anthropic Claude**: IA conversacional segura
- **Google Gemini**: Multimodal (texto, imagen, audio)
- **Stable Diffusion**: Generación de imágenes

### Casos de Uso Empresariales

1. **Automatización de Documentación**
   - Generación automática de reportes
   - Resúmenes ejecutivos
   - Documentación técnica

2. **Atención al Cliente**
   - Chatbots inteligentes
   - Respuestas automáticas personalizadas
   - Análisis de sentimientos

3. **Desarrollo de Software**
   - Generación de código
   - Revisión y optimización
   - Documentación automática

4. **Marketing y Contenido**
   - Generación de copy
   - Personalización de mensajes
   - Creación de contenido

## Implementación Técnica

```typescript
// Ejemplo: Integración con OpenAI
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateContent(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return completion.choices[0].message.content;
}
```

## Mejores Prácticas

- Validación y sanitización de inputs
- Rate limiting y costos
- Caché de respuestas comunes
- Fallbacks para errores
- Monitoreo de uso y costos

En FastIA, integramos IA generativa de forma segura y eficiente en aplicaciones empresariales.',
  'María González',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'IA Generativa',
  ARRAY['IA Generativa', 'OpenAI', 'GPT', 'Claude', 'Automatización', 'Empresarial'],
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  10,
  1850,
  true,
  true,
  NOW() - INTERVAL '1 day'
)
ON CONFLICT (slug) DO NOTHING;
    ELSE
        -- Schema actual: usar 'author' y 'image_url'
        INSERT INTO blog_posts (slug, title, excerpt, content, author, author_avatar, category, tags, image_url, reading_time, views, is_featured, published, published_at) VALUES
        (
          'desarrollo-apps-ia-swift-kotlin',
          'Desarrollo de Apps con IA: Swift, Kotlin y React Native',
          'Exploramos cómo desarrollar aplicaciones móviles inteligentes con capacidades de IA usando Swift para iOS, Kotlin para Android y React Native para multiplataforma.',
          '# Desarrollo de Apps con IA: Swift, Kotlin y React Native

La integración de inteligencia artificial en aplicaciones móviles está transformando la forma en que interactuamos con nuestros dispositivos. En FastIA, desarrollamos apps nativas y multiplataforma con capacidades avanzadas de IA.

## Desarrollo Nativo iOS con Swift

Swift ofrece excelentes herramientas para integrar IA en aplicaciones iOS:

- **Core ML**: Framework de Apple para machine learning on-device
- **Vision Framework**: Análisis de imágenes y reconocimiento de objetos
- **Natural Language**: Procesamiento de lenguaje natural
- **Create ML**: Entrenamiento de modelos personalizados

## Desarrollo Nativo Android con Kotlin

Kotlin es el lenguaje moderno para desarrollo Android con IA:

- **TensorFlow Lite**: Machine learning optimizado para móviles
- **ML Kit**: APIs de Google para tareas comunes de IA
- **CameraX**: Procesamiento de imágenes en tiempo real
- **Coroutines**: Manejo asíncrono eficiente

## React Native Multiplataforma

Para desarrollo multiplataforma, React Native ofrece:

- Integración con librerías nativas de IA
- Backend Node.js para procesamiento pesado
- Sincronización en tiempo real
- Código compartido entre iOS y Android

## Casos de Uso Reales

- Reconocimiento de imágenes y objetos
- Procesamiento de lenguaje natural
- Recomendaciones personalizadas
- Análisis predictivo
- Chatbots inteligentes

En FastIA, combinamos lo mejor de ambos mundos: apps nativas para máximo rendimiento y React Native para desarrollo rápido multiplataforma.',
          'Ana Martínez',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
          'Mobile',
          ARRAY['iOS', 'Android', 'React Native', 'IA', 'Swift', 'Kotlin', 'Mobile Development'],
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
          8,
          1250,
          true,
          true,
          NOW() - INTERVAL '5 days'
        ),
        (
          'arquitecturas-escalables-typescript-nodejs',
          'Arquitecturas Escalables con TypeScript y Node.js',
          'Diseñamos arquitecturas distribuidas escalables con TypeScript, Node.js y microservicios. Patrones de diseño, orquestación con Kubernetes y mejores prácticas.',
          '# Arquitecturas Escalables con TypeScript y Node.js

Las arquitecturas modernas requieren escalabilidad horizontal, alta disponibilidad y mantenibilidad. TypeScript y Node.js son ideales para construir sistemas escalables.

## Arquitectura de Microservicios

### Componentes Clave

- **API Gateway**: Punto único de entrada y enrutamiento
- **Service Mesh**: Comunicación segura entre servicios
- **Message Queue**: Comunicación asíncrona (RabbitMQ, Kafka)
- **Service Discovery**: Localización automática de servicios
- **Load Balancer**: Distribución de carga

## Stack Tecnológico

- **TypeScript**: Type-safety en todo el stack
- **Node.js**: Runtime de alto rendimiento
- **Express/Fastify**: Frameworks web ligeros
- **PostgreSQL/MongoDB**: Bases de datos robustas
- **Redis**: Caché y sesiones
- **Kubernetes**: Orquestación de contenedores
- **Docker**: Contenedores ligeros

## Patrones de Diseño

1. **Circuit Breaker**: Resiliencia ante fallos
2. **Retry Pattern**: Reintentos inteligentes
3. **Bulkhead**: Aislamiento de recursos
4. **Saga Pattern**: Transacciones distribuidas
5. **CQRS**: Separación de lectura y escritura

## Escalabilidad Horizontal

- Auto-scaling con Kubernetes HPA
- Load balancing inteligente
- Caching estratégico (Redis, CDN)
- Database sharding y replicación
- CDN para assets estáticos

## Monitoreo y Observabilidad

- Logging centralizado (ELK Stack)
- Métricas en tiempo real (Prometheus)
- Tracing distribuido (Jaeger)
- Alertas automatizadas
- Dashboards de monitoreo

En FastIA, diseñamos arquitecturas que escalan desde startups hasta empresas globales.',
          'Carlos Ruiz',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
          'Arquitectura',
          ARRAY['TypeScript', 'Node.js', 'Microservicios', 'Kubernetes', 'Escalabilidad', 'Arquitectura'],
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
          12,
          2100,
          true,
          true,
          NOW() - INTERVAL '3 days'
        ),
        (
          'ia-generativa-aplicaciones-empresariales',
          'IA Generativa en Aplicaciones Empresariales',
          'Cómo integrar IA generativa (GPT, Claude) en aplicaciones empresariales para automatizar tareas, generar contenido y mejorar la productividad.',
          '# IA Generativa en Aplicaciones Empresariales

La IA generativa está revolucionando las aplicaciones empresariales, permitiendo automatizar tareas complejas y generar contenido de alta calidad.

## ¿Qué es la IA Generativa?

La IA generativa puede crear contenido nuevo basado en patrones aprendidos:

- **Texto**: Generación de documentos, emails, código
- **Imágenes**: Creación de gráficos, ilustraciones
- **Código**: Generación y optimización de código
- **Audio**: Síntesis de voz, música

## Integración en Aplicaciones

### APIs Disponibles

- **OpenAI GPT**: Modelos de lenguaje avanzados
- **Anthropic Claude**: IA conversacional segura
- **Google Gemini**: Multimodal (texto, imagen, audio)
- **Stable Diffusion**: Generación de imágenes

### Casos de Uso Empresariales

1. **Automatización de Documentación**
   - Generación automática de reportes
   - Resúmenes ejecutivos
   - Documentación técnica

2. **Atención al Cliente**
   - Chatbots inteligentes
   - Respuestas automáticas personalizadas
   - Análisis de sentimientos

3. **Desarrollo de Software**
   - Generación de código
   - Revisión y optimización
   - Documentación automática

4. **Marketing y Contenido**
   - Generación de copy
   - Personalización de mensajes
   - Creación de contenido

## Implementación Técnica

```typescript
// Ejemplo: Integración con OpenAI
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateContent(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return completion.choices[0].message.content;
}
```

## Mejores Prácticas

- Validación y sanitización de inputs
- Rate limiting y costos
- Caché de respuestas comunes
- Fallbacks para errores
- Monitoreo de uso y costos

En FastIA, integramos IA generativa de forma segura y eficiente en aplicaciones empresariales.',
          'María González',
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
          'IA Generativa',
          ARRAY['IA Generativa', 'OpenAI', 'GPT', 'Claude', 'Automatización', 'Empresarial'],
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
          10,
          1850,
          true,
          true,
          NOW() - INTERVAL '1 day'
        )
        ON CONFLICT (slug) DO NOTHING;
    END IF;
END $$;
