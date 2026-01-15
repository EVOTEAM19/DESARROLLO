-- ============================================
-- DATOS INICIALES DE EJEMPLO - FASTIA
-- ============================================
-- Ejecutar después de schema_fastia_completo.sql
-- ============================================

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (section, key, value) VALUES
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

-- ============================================
-- SERVICES (3 servicios de ejemplo)
-- ============================================
INSERT INTO services (slug, title, short_description, full_description, icon, category, technologies, image_url, order_index, is_featured, published, meta_title, meta_description) VALUES
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
