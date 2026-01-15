-- ============================================
-- DATOS DE EJEMPLO PARA FASTIA
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- ============================================

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value) VALUES
('hero_section', '{
  "title": "Desarrollo de Plataformas Digitales con IA",
  "subtitle": "TypeScript, React, Node.js, Kotlin, iOS, Android, Flux.\nSoluciones empresariales que transforman negocios.",
  "cta_text": "Descubre nuestras soluciones",
  "cta_link": "/productos",
  "video_url": "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-36905-large.mp4"
}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ============================================
-- PRODUCTOS
-- ============================================
INSERT INTO products (name, slug, description, category, image_url, features, "order", published) VALUES
(
  'Synapse',
  'synapse',
  'Plataforma Agéntica para IA Empresarial desarrollada con TypeScript, React y Node.js. Solución integral que conecta sistemas, datos y procesos empresariales mediante agentes de IA inteligentes. Arquitectura escalable con microservicios, integración con APIs REST y GraphQL, y dashboards en tiempo real con React.',
  'Plataforma',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  '["Arquitectura con TypeScript y Node.js", "Frontend React moderno", "Microservicios escalables", "Integración con APIs REST/GraphQL", "Dashboards en tiempo real", "Kubernetes y Docker", "PostgreSQL y MongoDB"]'::jsonb,
  1,
  true
),
(
  'Digital Humans Platform',
  'digital-humans',
  'Plataforma de avatares digitales desarrollada con React, TypeScript y Node.js. Avatares hiperrealistas con IA conversacional, disponible en web, iOS (Swift) y Android (Kotlin). Integración con sistemas CRM, análisis de sentimientos en tiempo real y personalización avanzada mediante machine learning.',
  'Experiencia',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80',
  '["React y TypeScript", "Apps nativas iOS/Android", "IA conversacional avanzada", "Análisis de sentimientos", "Integración CRM", "Multi-idioma", "WebRTC para video"]'::jsonb,
  2,
  true
),
(
  'AI Contact Experience',
  'ai-contact-experience',
  'Sistema de atención al cliente con IA desarrollado con Node.js, React y TypeScript. IA conversacional avanzada que entiende contexto y emociones. Disponible en web, móvil (React Native) y integración omnichannel. Backend escalable con Node.js, base de datos PostgreSQL y análisis en tiempo real.',
  'Experiencia',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
  '["Node.js y TypeScript", "React Native para móvil", "IA conversacional avanzada", "Análisis de sentimientos", "Integración omnichannel", "WebSockets en tiempo real", "Analytics con PostgreSQL"]'::jsonb,
  3,
  true
),
(
  'Enterprise AI Platform',
  'enterprise-ai-platform',
  'Plataforma empresarial completa desarrollada con TypeScript, React, Node.js y microservicios. Solución integral para grandes empresas con arquitectura distribuida, escalabilidad horizontal, seguridad de nivel empresarial y integración con sistemas legacy. Despliegue en Kubernetes con auto-scaling.',
  'Plataforma',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  '["Arquitectura microservicios", "TypeScript end-to-end", "React para frontend", "Node.js para backend", "Kubernetes y Docker", "PostgreSQL y Redis", "Event Sourcing y CQRS"]'::jsonb,
  4,
  true
),
(
  'Mobile AI Suite',
  'mobile-ai-suite',
  'Suite completa de aplicaciones móviles con IA. Desarrollo nativo iOS con Swift, Android con Kotlin, y apps multiplataforma con React Native. Integración con backend Node.js, sincronización en tiempo real, y capacidades de IA on-device y cloud-based.',
  'Mobile',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  '["Swift para iOS", "Kotlin para Android", "React Native multiplataforma", "Backend Node.js", "IA on-device", "Sincronización en tiempo real", "Offline-first architecture"]'::jsonb,
  5,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SERVICIOS
-- ============================================
INSERT INTO services (name, slug, description, icon, category, "order", published) VALUES
(
  'IA Generativa e Innovación',
  'ia-generativa-innovacion',
  'Desarrollamos soluciones de IA generativa utilizando TypeScript, React y Node.js. Desde chatbots inteligentes hasta generación de contenido automatizado. Integración con modelos de lenguaje avanzados, APIs de IA y sistemas de procesamiento de lenguaje natural. Desarrollo full-stack con React para interfaces modernas y Node.js para procesamiento backend.',
  'sparkles',
  'IA Generativa',
  1,
  true
),
(
  'Análisis Avanzado de Datos e IA',
  'analisis-avanzado-datos-ia',
  'Plataformas de análisis de datos desarrolladas con TypeScript, React y Node.js. Dashboards interactivos con React, procesamiento de datos con Node.js, integración con bases de datos PostgreSQL y MongoDB, y visualizaciones en tiempo real. Machine Learning con TensorFlow y análisis predictivo.',
  'bar-chart',
  'Análisis',
  2,
  true
),
(
  'Producto y Experiencia Inteligente',
  'producto-experiencia-inteligente',
  'Desarrollo de productos digitales con IA personalizada. Frontend con React y TypeScript, backend con Node.js, apps móviles con React Native, Kotlin y Swift. Experiencias personalizadas mediante machine learning, recomendaciones inteligentes y adaptación en tiempo real.',
  'users',
  'Experiencia',
  3,
  true
),
(
  'Ingeniería e IA de Plataformas',
  'ingenieria-ia-plataformas',
  'Arquitecturas robustas y escalables con IA integrada. Desarrollo con TypeScript, React, Node.js, microservicios, Kubernetes, Docker. Desde startups hasta empresas globales. DevOps automatizado, CI/CD con GitHub Actions, monitoreo y observabilidad.',
  'code',
  'Ingeniería',
  4,
  true
),
(
  'Automatización Autónoma',
  'automatizacion-autonoma',
  'Sistemas autónomos desarrollados con Node.js, TypeScript y React. Automatización de procesos complejos, integración con APIs, webhooks y sistemas empresariales. Backend robusto con Node.js, frontend con React, y orquestación con Kubernetes.',
  'zap',
  'Automatización',
  5,
  true
),
(
  'Desarrollo Mobile Nativo',
  'desarrollo-mobile-nativo',
  'Aplicaciones móviles nativas iOS (Swift) y Android (Kotlin). Desarrollo de apps de alto rendimiento con integración de IA, sincronización en tiempo real, y arquitecturas offline-first. Backend con Node.js y TypeScript, APIs GraphQL y REST.',
  'smartphone',
  'Mobile',
  6,
  true
),
(
  'Desarrollo Full-Stack',
  'desarrollo-fullstack',
  'Soluciones completas frontend y backend. Frontend con React, Next.js y TypeScript. Backend con Node.js, Express, microservicios. Bases de datos PostgreSQL, MongoDB, Redis. DevOps, CI/CD y despliegue en cloud (AWS, Azure, GCP).',
  'layers',
  'Desarrollo',
  7,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- BLOG POSTS
-- ============================================
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, category, tags, published, published_at) VALUES
(
  'Desarrollo de Plataformas con TypeScript y React: Mejores Prácticas',
  'desarrollo-plataformas-typescript-react',
  'Exploramos las mejores prácticas para desarrollar plataformas digitales escalables con TypeScript, React y Node.js. Arquitecturas modernas, patrones de diseño y optimización de rendimiento.',
  '# Desarrollo de Plataformas con TypeScript y React: Mejores Prácticas

Las plataformas digitales modernas requieren arquitecturas sólidas y tecnologías de vanguardia. En FastIA, utilizamos TypeScript, React y Node.js para crear soluciones empresariales escalables.

## Stack Tecnológico

### Frontend
- **TypeScript**: Type-safety y mejor DX
- **React**: UI moderna y reactiva
- **Next.js**: SSR y optimización SEO
- **Flux**: State management eficiente

### Backend
- **Node.js**: Alto rendimiento y escalabilidad
- **TypeScript**: Código robusto y mantenible
- **PostgreSQL/MongoDB**: Bases de datos robustas
- **GraphQL/REST**: APIs flexibles

## Arquitectura Recomendada

1. **Microservicios**: Separación de responsabilidades
2. **API Gateway**: Punto único de entrada
3. **Event-Driven**: Comunicación asíncrona
4. **CQRS**: Separación de lectura y escritura

## Mejores Prácticas

- Type-safety en todo el stack
- Testing automatizado (Jest, Cypress)
- CI/CD con GitHub Actions
- Monitoreo y observabilidad
- Documentación exhaustiva',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  'Equipo FastIA',
  'Desarrollo',
  ARRAY['TypeScript', 'React', 'Node.js', 'Arquitectura', 'Mejores Prácticas'],
  true,
  NOW() - INTERVAL '5 days'
),
(
  'IA en Aplicaciones Móviles: iOS, Android y React Native',
  'ia-aplicaciones-moviles-ios-android',
  'Cómo integrar inteligencia artificial en aplicaciones móviles nativas y multiplataforma. Desarrollo con Swift, Kotlin y React Native, con backend Node.js.',
  '# IA en Aplicaciones Móviles: iOS, Android y React Native

La integración de IA en aplicaciones móviles abre nuevas posibilidades. En FastIA desarrollamos apps nativas y multiplataforma con capacidades de IA avanzadas.

## Desarrollo Nativo

### iOS con Swift
- Core ML para IA on-device
- Vision Framework para análisis de imágenes
- Natural Language para procesamiento de texto
- Integración con servicios cloud

### Android con Kotlin
- TensorFlow Lite para machine learning
- ML Kit para tareas comunes
- CameraX para procesamiento de imágenes
- Coroutines para operaciones asíncronas

## React Native

- React Native para desarrollo multiplataforma
- Integración con librerías nativas
- Backend Node.js para procesamiento pesado
- Sincronización en tiempo real

## Casos de Uso

- Reconocimiento de imágenes
- Procesamiento de lenguaje natural
- Recomendaciones personalizadas
- Análisis predictivo',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'María González',
  'Mobile',
  ARRAY['iOS', 'Android', 'React Native', 'IA', 'Kotlin', 'Swift'],
  true,
  NOW() - INTERVAL '3 days'
),
(
  'Arquitecturas Escalables con Node.js y Microservicios',
  'arquitecturas-escalables-nodejs-microservicios',
  'Diseño de arquitecturas distribuidas escalables con Node.js, TypeScript y microservicios. Patrones de diseño, orquestación con Kubernetes y mejores prácticas.',
  '# Arquitecturas Escalables con Node.js y Microservicios

Las arquitecturas modernas requieren escalabilidad horizontal y alta disponibilidad. Node.js es ideal para microservicios de alto rendimiento.

## Arquitectura de Microservicios

### Componentes Clave
- **API Gateway**: Enrutamiento y autenticación
- **Service Mesh**: Comunicación entre servicios
- **Message Queue**: Comunicación asíncrona
- **Service Discovery**: Localización de servicios

## Tecnologías

- **Node.js**: Runtime de alto rendimiento
- **TypeScript**: Type-safety
- **Express/Fastify**: Frameworks web
- **Kubernetes**: Orquestación
- **Docker**: Contenedores
- **PostgreSQL/MongoDB**: Bases de datos

## Patrones de Diseño

1. **Circuit Breaker**: Resiliencia
2. **Retry Pattern**: Reintentos inteligentes
3. **Bulkhead**: Aislamiento de recursos
4. **Saga Pattern**: Transacciones distribuidas

## Escalabilidad

- Auto-scaling con Kubernetes
- Load balancing
- Caching estratégico
- CDN para assets estáticos',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
  'Carlos Ruiz',
  'Arquitectura',
  ARRAY['Node.js', 'Microservicios', 'Kubernetes', 'Escalabilidad', 'TypeScript'],
  true,
  NOW() - INTERVAL '1 day'
),
(
  'Flux: State Management Moderno para React',
  'flux-state-management-react',
  'Exploramos Flux como solución de state management para aplicaciones React complejas. Comparación con Redux, Zustand y otras alternativas.',
  '# Flux: State Management Moderno para React

Flux es una arquitectura de state management diseñada para aplicaciones React complejas. En FastIA lo utilizamos para mantener el estado de manera predecible.

## ¿Qué es Flux?

Flux es un patrón arquitectónico que:
- Unidireccional: Flujo de datos predecible
- Descentralizado: Múltiples stores
- Sincrónico: Sin efectos secundarios

## Ventajas

- **Predecibilidad**: Flujo de datos claro
- **Debugging**: Fácil rastreo de cambios
- **Testing**: Estado testeable
- **Escalabilidad**: Maneja apps complejas

## Comparación con Redux

- Flux: Múltiples stores, más flexible
- Redux: Store único, más estricto
- Ambos: Unidireccionales y predecibles

## Implementación

```typescript
// Store
class AppStore {
  private state: State
  private listeners: Function[]
  
  dispatch(action: Action) {
    // Actualizar estado
    this.notify()
  }
}
```

## Mejores Prácticas

- Stores especializados
- Actions descriptivas
- Dispatchers centralizados
- Testing exhaustivo',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
  'Ana Martínez',
  'Frontend',
  ARRAY['Flux', 'React', 'State Management', 'TypeScript'],
  true,
  NOW() - INTERVAL '2 days'
)
ON CONFLICT (slug) DO NOTHING;
