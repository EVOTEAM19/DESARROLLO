-- ============================================
-- INSERTAR 40 ARTÍCULOS DE BLOG PARA FASTIA
-- ============================================
-- Basado en los títulos proporcionados
-- Estructura: image_url, author, published_at
-- ============================================

-- Limpiar artículos existentes (opcional)
-- DELETE FROM public.blog_posts;

-- Insertar 40 artículos de blog
INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, author_name, published, published_at, category, tags, reading_time, created_at, updated_at) VALUES

-- ============================================
-- INTELIGENCIA ARTIFICIAL (12 artículos)
-- ============================================
(
  'Guía completa: Cómo implementar IA en tu empresa en 2026',
  'guia-implementar-ia-empresa-2026',
  'De la experimentación al ROI real. Guía paso a paso con casos reales y presupuestos transparentes.',
  '<h2>El Problema</h2><p>87% de empresas dicen que "la IA es prioritaria". Solo 23% tienen proyectos en producción. La brecha entre intención y realidad es enorme.</p><h2>Paso 1: Identifica el Problema Real</h2><p>No "sería genial tener IA". Sino: "estamos perdiendo 50K€/mes porque nuestro proceso de atención al cliente tarda 48 horas". Identifica problemas concretos con costes medibles.</p><h2>Paso 2: Define Métricas ANTES</h2><p>Métricas buenas: Reducir tiempo de respuesta de 48h a 2h. Aumentar conversión de 2% a 3.5%. Reducir costes operativos en 30%. Métricas malas: "Mejorar experiencia", "Ser más innovadores". Define KPIs numéricos antes de empezar.</p><h2>Paso 3: Piloto Pequeño</h2><p>Fase 1: Piloto 4-8 semanas (10-30K€). Valida que funciona. Fase 2: Validación con usuarios reales (2-4 semanas). Fase 3: Escalado si funciona (8-12 semanas). No inviertas 100K€ sin validar primero.</p><h2>Ejemplo Real</h2><p>Chatbot para atención al cliente: Costes año 1: 45K€ (desarrollo + infraestructura). Beneficios: 85K€ (ahorro en salarios + aumento satisfacción). ROI: 87%. Payback: 6 meses. Este es el tipo de proyecto que funciona.</p><h2>Conclusión</h2><p>La IA no es magia. Es tecnología que requiere estrategia, ejecución y medición. Empieza pequeño, valida rápido, escala si funciona. El 80% del éxito está en elegir el caso de uso correcto.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '40 days',
  'IA y Machine Learning',
  ARRAY['IA', 'estrategia', 'implementación', 'empresa'],
  15,
  NOW() - INTERVAL '40 days',
  NOW() - INTERVAL '40 days'
),

(
  'IA vs ChatGPT: ¿Cuál es la diferencia?',
  'ia-vs-chatgpt-diferencia',
  'ChatGPT es IA, pero IA no es solo ChatGPT. Explicamos LLMs vs ML vs Computer Vision.',
  '<h2>La Confusión</h2><p>"Quiero IA" → "¿Como ChatGPT?" → No necesariamente. ChatGPT es solo una herramienta dentro del campo de la IA. Es como decir "quiero transporte" cuando te refieres a "quiero un coche".</p><h2>Tipos de IA</h2><h3>LLMs (ChatGPT, Claude, Gemini)</h3><p>Para: Generación de texto, chatbots, análisis de sentimiento, resúmenes, traducción. NO para: Predicciones numéricas, análisis de datos tabulares, detección de fraude en tiempo real.</p><h3>ML Clásico (Machine Learning)</h3><p>Para: Predicción de churn, credit scoring, forecasting de demanda, detección de anomalías. MEJOR que LLMs para datos tabulares y predicciones numéricas. Más rápido, más barato, más preciso para estos casos.</p><h3>Computer Vision</h3><p>Para: Análisis de imágenes, video, control de calidad visual, reconocimiento facial, OCR avanzado. ChatGPT no puede hacer esto.</p><h2>Caso Real E-commerce</h2><p>Cliente e-commerce implementó: LLM (GPT-4) → Chatbot de atención al cliente. ML (XGBoost) → Sistema de recomendaciones personalizadas. Computer Vision → Búsqueda visual de productos. Resultado: +35% conversión, -40% tickets de soporte, +25% tiempo en sitio. Cada tipo de IA para su caso de uso específico.</p><h2>Cuándo Usar Cada Tipo</h2><p>LLMs: Cuando necesitas entender o generar texto natural. ML: Cuando tienes datos tabulares y necesitas predecir. Computer Vision: Cuando trabajas con imágenes o video. La clave está en elegir la herramienta correcta para cada problema.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '38 days',
  'IA y Machine Learning',
  ARRAY['IA', 'ChatGPT', 'conceptos', 'educación'],
  12,
  NOW() - INTERVAL '38 days',
  NOW() - INTERVAL '38 days'
),

(
  '10 casos de uso de Machine Learning',
  '10-casos-uso-machine-learning',
  '10 implementaciones reales de ML con ROI medible en empresas españolas.',
  '<h2>Caso 1: Predicción Churn Telecom</h2><p>Problema: 15% churn anual = 5M€/año en pérdida de ingresos. Solución: Modelo ML que predice clientes con >70% probabilidad de irse. Acciones: Campañas de retención personalizadas. Resultado: Churn reducido a 9%. Ahorro: 3M€/año. ROI: 600%. Payback: 2 meses.</p><h2>Caso 2: Credit Scoring Fintech</h2><p>Problema: Scoring tradicional rechaza 40% de buenos clientes por falta de historial crediticio. Solución: Modelo ML con 200+ variables (transacciones, comportamiento app, datos alternativos). Resultado: +25% aprobaciones sin aumentar riesgo. Revenue adicional: +5M€/año. ROI: 800%.</p><h2>Caso 3: Detección Fraude E-commerce</h2><p>Problema: 2% transacciones fraudulentas = 500K€/año en pérdidas. Solución: Anomaly detection ML en tiempo real analizando 50+ features por transacción. Resultado: 85% fraudes detectados antes del envío. Ahorro: 425K€/año. ROI: 850%.</p><h2>Caso 4: Pricing Dinámico Hotel</h2><p>Problema: 40% ocupación en temporada baja, precios fijos. Solución: ML ajusta precios por hora según demanda, competencia, eventos, clima. Resultado: Ocupación → 65%. Revenue: +45%. ROI: 1200%.</p><h2>Caso 5: Forecasting Retail</h2><p>Problema: 30% stockouts, 40% sobrestock = 1.5M€ en pérdidas. Solución: ML predice demanda con 95% precisión usando historial, estacionalidad, promociones, tendencias. Resultado: Stockouts -70%, sobrestock -60%. Ahorro: 1.5M€. ROI: 500%.</p><h2>Caso 6: Mantenimiento Predictivo Industrial</h2><p>Problema: Fallos inesperados de maquinaria = 200K€/año en downtime. Solución: ML analiza sensores IoT para predecir fallos 2 semanas antes. Resultado: Downtime -50%, mantenimiento optimizado. Ahorro: 100K€/año.</p><h2>Caso 7: Lead Scoring B2B</h2><p>Problema: Equipo de ventas perdiendo tiempo en leads que no convierten. Solución: ML scorea leads con 85% precisión. Resultado: Conversión +40%, ciclo ventas -30%. Revenue: +2M€.</p><h2>Caso 8: Optimización Rutas Logística</h2><p>Problema: Rutas ineficientes = 300K€/año en costes extra. Solución: ML optimiza rutas en tiempo real según tráfico, carga, urgencia. Resultado: Costes -25%, entregas +15% más rápidas. Ahorro: 75K€/año.</p><h2>Caso 9: Análisis Sentimiento Redes Sociales</h2><p>Problema: No saber qué dicen los clientes en redes. Solución: ML analiza menciones, reviews, comentarios en tiempo real. Resultado: Detección temprana de crisis, mejora producto basada en feedback. ROI: 300%.</p><h2>Caso 10: Recomendaciones Personalizadas Streaming</h2><p>Problema: Usuarios no encuentran contenido, cancelan suscripción. Solución: Collaborative filtering + content-based ML. Resultado: Engagement +35%, churn -20%. Revenue: +1.5M€/año.</p><h2>Conclusión</h2><p>ML no es solo hype. Son herramientas que resuelven problemas reales con ROI medible. La clave: elegir el caso de uso correcto y medir resultados desde el día 1.</p>',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '36 days',
  'IA y Machine Learning',
  ARRAY['machine learning', 'casos de uso', 'empresas', 'aplicaciones'],
  18,
  NOW() - INTERVAL '36 days',
  NOW() - INTERVAL '36 days'
),

(
  'Computer Vision: De la teoría a la producción en 12 semanas',
  'computer-vision-teoria-produccion-12-semanas',
  'Guía práctica para implementar Computer Vision en producción. Desde el dataset hasta el modelo en producción.',
  '<h2>Semana 1-2: Definición del Problema</h2><p>¿Qué quieres detectar? ¿Qué precisión necesitas? ¿Qué datos tienes?</p><h2>Semana 3-4: Preparación de Datos</h2><p>Recolección, etiquetado, limpieza. El 80% del trabajo está aquí.</p><h2>Semana 5-8: Entrenamiento</h2><p>Elegir modelo base (YOLO, ResNet, etc.), fine-tuning, validación.</p><h2>Semana 9-10: Optimización</h2><p>Reducir tamaño, mejorar velocidad, optimizar para edge devices.</p><h2>Semana 11-12: Deploy</h2><p>API, integración, monitoreo, CI/CD.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '34 days',
  'IA y Machine Learning',
  ARRAY['computer vision', 'visión artificial', 'producción', 'tutorial'],
  14,
  NOW() - INTERVAL '34 days',
  NOW() - INTERVAL '34 days'
),

(
  'LLMs explicados: GPT, Claude, Llama y cuándo usar cada uno',
  'llms-explicados-gpt-claude-llama-cuando-usar',
  'Comparativa técnica de los principales modelos de lenguaje. Ventajas, desventajas y casos de uso.',
  '<h2>GPT-4 (OpenAI)</h2><p>El más popular. Excelente para casos generales, gran ecosistema. Coste: €€€. Mejor para: Aplicaciones generales, integraciones.</p><h2>Claude (Anthropic)</h2><p>Contexto largo (200K tokens), ética fuerte. Coste: €€€. Mejor para: Análisis de documentos largos, casos éticos sensibles.</p><h2>Llama (Meta)</h2><p>Open source, puedes self-host. Coste: €€ (infraestructura propia). Mejor para: Datos sensibles, control total.</p><h2>Gemini (Google)</h2><p>Multimodal nativo, integración con Google. Coste: €€. Mejor para: Aplicaciones que usan imágenes y texto.</p><h2>Cuándo Usar Cada Uno</h2><p>Guía práctica de decisión basada en tu caso específico.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '32 days',
  'IA y Machine Learning',
  ARRAY['LLMs', 'GPT', 'Claude', 'Llama', 'comparativa'],
  16,
  NOW() - INTERVAL '32 days',
  NOW() - INTERVAL '32 days'
),

(
  'Ética en IA: Cómo implementar IA responsable en tu organización',
  'etica-ia-implementar-ia-responsable-organizacion',
  'Guía práctica para desarrollar y desplegar IA de forma ética. Sesgos, privacidad, transparencia.',
  '<h2>Principios de IA Ética</h2><p>Transparencia, justicia, privacidad, responsabilidad, beneficio humano.</p><h2>Identificar Sesgos</h2><p>Cómo detectar sesgos en datos y modelos. Herramientas y técnicas.</p><h2>Privacidad de Datos</h2><p>GDPR, anonimización, federated learning. Cómo proteger datos personales.</p><h2>Transparencia y Explicabilidad</h2><p>Por qué el modelo tomó una decisión. SHAP, LIME, interpretabilidad.</p><h2>Implementación Práctica</h2><p>Checklist para implementar IA ética en tu organización.</p>',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '30 days',
  'IA y Machine Learning',
  ARRAY['ética IA', 'IA responsable', 'sesgos', 'privacidad'],
  13,
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '30 days'
),

(
  'ROI de IA: Cómo medir el retorno real de tus proyectos',
  'roi-ia-medir-retorno-real-proyectos',
  'Métricas concretas para medir el ROI de proyectos de IA. No solo costes, también valor generado.',
  '<h2>Métricas de ROI</h2><p>Reducción de costes, aumento de ingresos, mejora de eficiencia, satisfacción del cliente.</p><h2>Cálculo de Costes</h2><p>Desarrollo, infraestructura, mantenimiento, formación. Costes ocultos que no debes olvidar.</p><h2>Cálculo de Beneficios</h2><p>Ahorro de tiempo, reducción de errores, aumento de conversión, nuevos ingresos.</p><h2>Ejemplos Reales</h2><p>Casos de estudio con números concretos. ROI típico: 200-500% en 12-18 meses.</p><h2>Mejores Prácticas</h2><p>Cómo establecer métricas desde el día 1 y medir continuamente.</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '28 days',
  'IA y Machine Learning',
  ARRAY['ROI', 'métricas', 'negocio', 'medición'],
  11,
  NOW() - INTERVAL '28 days',
  NOW() - INTERVAL '28 days'
),

(
  'Chatbots con IA: Guía completa 2026',
  'chatbots-ia-guia-completa-2026',
  'Todo lo que necesitas saber sobre chatbots inteligentes. Desde el diseño hasta la implementación.',
  '<h2>Tipos de Chatbots</h2><p>Basados en reglas, NLP, LLMs. Cuándo usar cada uno.</p><h2>Diseño de Conversaciones</h2><p>User journey, flujos, handoff a humanos. Cómo diseñar experiencias naturales.</p><h2>Implementación Técnica</h2><p>Stack tecnológico, integraciones, APIs. De la idea a producción.</p><h2>Métricas de Éxito</h2><p>Resolución automática, satisfacción, tiempo de respuesta. Cómo medir el éxito.</p><h2>Mejores Prácticas</h2><p>Tips de 6 años implementando chatbots. Errores comunes y cómo evitarlos.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '26 days',
  'IA y Machine Learning',
  ARRAY['chatbots', 'IA conversacional', 'guía', '2026'],
  17,
  NOW() - INTERVAL '26 days',
  NOW() - INTERVAL '26 days'
),

(
  'IA en Retail: Personalización que realmente vende',
  'ia-retail-personalizacion-realmente-vende',
  'Cómo usar IA para personalizar experiencias de compra. Recomendaciones, pricing, inventario.',
  '<h2>Recomendaciones Personalizadas</h2><p>Collaborative filtering, content-based, híbridos. Qué funciona en retail.</p><h2>Pricing Dinámico</h2><p>Ajustar precios en tiempo real según demanda, competencia, inventario.</p><h2>Gestión de Inventario</h2><p>Predicción de demanda, optimización de stock, reducción de roturas.</p><h2>Análisis de Comportamiento</h2><p>Segmentación de clientes, análisis de carrito abandonado, predicción de compra.</p><h2>Casos de Éxito</h2><p>Amazon, Netflix, Spotify. Qué hacen y cómo replicarlo.</p>',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '24 days',
  'IA y Machine Learning',
  ARRAY['IA retail', 'personalización', 'e-commerce', 'recomendaciones'],
  12,
  NOW() - INTERVAL '24 days',
  NOW() - INTERVAL '24 days'
),

(
  'Comparativa: OpenAI vs Anthropic vs Meta vs Google',
  'comparativa-openai-anthropic-meta-google',
  'Análisis detallado de los 4 grandes proveedores de IA. Precios, capacidades, casos de uso.',
  '<h2>OpenAI</h2><p>GPT-4, DALL-E, Whisper. Ecosistema maduro, gran comunidad. Precios: €€€. Mejor para: Casos generales.</p><h2>Anthropic</h2><p>Claude, contexto largo, ética. Precios: €€€. Mejor para: Análisis de documentos, casos éticos.</p><h2>Meta</h2><p>Llama open source, self-hosting. Precios: €€ (infraestructura). Mejor para: Datos sensibles, control.</p><h2>Google</h2><p>Gemini, multimodal, integración. Precios: €€. Mejor para: Aplicaciones Google, multimodal.</p><h2>Recomendación</h2><p>Cuándo elegir cada proveedor según tu caso específico.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '22 days',
  'IA y Machine Learning',
  ARRAY['OpenAI', 'Anthropic', 'Meta', 'Google', 'comparativa'],
  15,
  NOW() - INTERVAL '22 days',
  NOW() - INTERVAL '22 days'
),

(
  'El futuro de la IA: Tendencias para 2026-2027',
  'futuro-ia-tendencias-2026-2027',
  'Predicciones sobre el futuro de la IA. Qué esperar en los próximos 2 años.',
  '<h2>Modelos Más Grandes y Baratos</h2><p>Modelos cada vez más potentes a costes decrecientes. Accesibilidad aumentando.</p><h2>IA Multimodal</h2><p>Texto, imagen, audio, video en un solo modelo. Aplicaciones más ricas.</p><h2>Edge AI</h2><p>IA corriendo en dispositivos locales. Menor latencia, mayor privacidad.</p><h2>IA Especializada</h2><p>Modelos fine-tuned para dominios específicos. Mejor que modelos generales.</p><h2>Automatización Completa</h2><p>De la idea al código en producción. IA generando y desplegando software.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '20 days',
  'IA y Machine Learning',
  ARRAY['futuro IA', 'tendencias', '2026', 'predicciones'],
  14,
  NOW() - INTERVAL '20 days',
  NOW() - INTERVAL '20 days'
),

(
  'IA Generativa más allá de ChatGPT: Aplicaciones empresariales',
  'ia-generativa-mas-alla-chatgpt-aplicaciones-empresariales',
  'DALL-E, Midjourney, Stable Diffusion, Code Generation. Cómo usar IA generativa en empresas.',
  '<h2>Generación de Imágenes</h2><p>DALL-E, Midjourney, Stable Diffusion. Casos de uso: marketing, diseño, prototipado.</p><h2>Generación de Código</h2><p>GitHub Copilot, Codeium, Cursor. Aumentar productividad de desarrolladores.</p><h2>Generación de Contenido</h2><p>Textos, emails, posts sociales. Automatizar creación de contenido.</p><h2>Generación de Audio</h2><p>Voz sintética, música, podcasts. Nuevas formas de crear contenido.</p><h2>Implementación Empresarial</h2><p>Cómo integrar IA generativa en procesos empresariales. Casos reales.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '18 days',
  'IA y Machine Learning',
  ARRAY['IA generativa', 'DALL-E', 'generación', 'empresas'],
  13,
  NOW() - INTERVAL '18 days',
  NOW() - INTERVAL '18 days'
),

-- ============================================
-- AUTOMATIZACIÓN (10 artículos)
-- ============================================
(
  '20 procesos que puedes automatizar hoy (con IA y sin IA)',
  '20-procesos-automatizar-hoy-ia-sin-ia',
  'Lista práctica de procesos automatizables. Desde RPA básico hasta IA avanzada.',
  '<h2>Procesos Sin IA</h2><p>1. Envío de emails automáticos, 2. Backup de archivos, 3. Reportes programados, 4. Sincronización de datos, 5. Notificaciones, 6. Actualizaciones de estado, 7. Limpieza de bases de datos, 8. Generación de facturas, 9. Envío de recordatorios, 10. Cálculos automáticos.</p><h2>Procesos Con IA</h2><p>11. Clasificación de emails, 12. Extracción de datos de documentos, 13. Análisis de sentimiento, 14. Respuestas automáticas inteligentes, 15. Detección de anomalías, 16. Traducción automática, 17. Resumen de textos, 18. Generación de contenido, 19. Moderación de contenido, 20. Recomendaciones personalizadas.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '16 days',
  'Negocio y Estrategia',
  ARRAY['automatización', 'RPA', 'procesos', 'productividad'],
  16,
  NOW() - INTERVAL '16 days',
  NOW() - INTERVAL '16 days'
),

(
  'RPA vs IA: Cuándo usar cada tecnología',
  'rpa-vs-ia-cuando-usar-cada-tecnologia',
  'RPA para tareas repetitivas, IA para decisiones. Guía de decisión práctica.',
  '<h2>¿Qué es RPA?</h2><p>Robotic Process Automation: bots que automatizan tareas repetitivas siguiendo reglas predefinidas.</p><h2>¿Qué es IA?</h2><p>Inteligencia Artificial: sistemas que aprenden y toman decisiones basadas en datos.</p><h2>Cuándo Usar RPA</h2><p>Tareas repetitivas, reglas claras, sin variabilidad. Ejemplos: copiar datos, rellenar formularios, mover archivos.</p><h2>Cuándo Usar IA</h2><p>Decisiones complejas, variabilidad, aprendizaje necesario. Ejemplos: clasificación, predicción, análisis.</p><h2>Híbrido: RPA + IA</h2><p>Lo mejor de ambos mundos. RPA para estructura, IA para decisiones.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '14 days',
  'Negocio y Estrategia',
  ARRAY['RPA', 'IA', 'automatización', 'comparativa'],
  12,
  NOW() - INTERVAL '14 days',
  NOW() - INTERVAL '14 days'
),

(
  'Automatización de atención al cliente: De 48h a 2 minutos',
  'automatizacion-atencion-cliente-48h-2-minutos',
  'Cómo automatizar el 70% de consultas de atención al cliente. Chatbots, email automation, self-service.',
  '<h2>El Problema</h2><p>48 horas de respuesta promedio. Clientes frustrados. Equipo sobrecargado.</p><h2>La Solución</h2><p>Chatbots que resuelven el 70% de consultas. Email automation para respuestas comunes. Self-service portal.</p><h2>Implementación</h2><p>Fase 1: Chatbot básico (2 semanas). Fase 2: Integración con sistemas (4 semanas). Fase 3: Optimización continua.</p><h2>Resultados</h2><p>Tiempo de respuesta: 48h → 2 min. Satisfacción: +40%. Coste por ticket: -60%.</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '12 days',
  'Negocio y Estrategia',
  ARRAY['atención cliente', 'chatbots', 'automatización', 'customer service'],
  14,
  NOW() - INTERVAL '12 days',
  NOW() - INTERVAL '12 days'
),

(
  'Workflows inteligentes: Zapier, Make, n8n comparados',
  'workflows-inteligentes-zapier-make-n8n-comparados',
  'Comparativa de las principales plataformas de automatización. Precios, capacidades, casos de uso.',
  '<h2>Zapier</h2><p>El más popular. Fácil de usar, miles de integraciones. Precio: €€€. Mejor para: Usuarios no técnicos, integraciones simples.</p><h2>Make (Integromat)</h2><p>Visual, potente, buen precio. Precio: €€. Mejor para: Workflows complejos, mejor relación precio/valor.</p><h2>n8n</h2><p>Open source, self-hosted. Precio: € (infraestructura). Mejor para: Control total, datos sensibles.</p><h2>Comparativa</h2><p>Tabla comparativa: precios, límites, integraciones, casos de uso.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '10 days',
  'Negocio y Estrategia',
  ARRAY['Zapier', 'Make', 'n8n', 'workflows', 'automatización'],
  11,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days'
),

(
  'Automatización de marketing: Email, ads y content en piloto automático',
  'automatizacion-marketing-email-ads-content-piloto-automatico',
  'Cómo automatizar tu marketing end-to-end. Desde email campaigns hasta content generation.',
  '<h2>Email Marketing</h2><p>Segmentación automática, triggers, A/B testing, personalización. Herramientas: Mailchimp, SendGrid, Customer.io.</p><h2>Ads Automation</h2><p>Bidding automático, optimización de campañas, reporting. Google Ads, Facebook Ads, programmatic.</p><h2>Content Generation</h2><p>IA generando posts, emails, descripciones. GPT-4, Claude, herramientas especializadas.</p><h2>Analytics y Reporting</h2><p>Dashboards automáticos, alertas, insights. Google Analytics, Mixpanel, herramientas custom.</p><h2>ROI</h2><p>Ahorro de 20+ horas semanales. Aumento del 30% en conversión. Reducción del 40% en costes.</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '8 days',
  'Negocio y Estrategia',
  ARRAY['marketing', 'automatización', 'email', 'ads'],
  15,
  NOW() - INTERVAL '8 days',
  NOW() - INTERVAL '8 days'
),

(
  'Cómo automatizar tu facturación y contabilidad',
  'automatizar-facturacion-contabilidad',
  'Guía práctica para automatizar procesos financieros. Desde facturas hasta reportes contables.',
  '<h2>Facturación Automática</h2><p>Generación automática de facturas, envío por email, recordatorios de pago. Integración con ERP/CRM.</p><h2>Contabilidad Automática</h2><p>Reconocimiento de gastos, categorización automática, conciliación bancaria. OCR + IA.</p><h2>Reportes Automáticos</h2><p>P&L, cash flow, impuestos. Generación y envío automático.</p><h2>Herramientas</h2><p>Stripe, QuickBooks, Xero, herramientas custom. Comparativa y recomendaciones.</p><h2>ROI</h2><p>Ahorro de 15+ horas mensuales. Reducción del 90% en errores. Cumplimiento automático.</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '6 days',
  'Negocio y Estrategia',
  ARRAY['facturación', 'contabilidad', 'automatización', 'finanzas'],
  13,
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '6 days'
),

(
  'Web Scraping ético: Guía legal y técnica',
  'web-scraping-etico-guia-legal-tecnica',
  'Cómo hacer web scraping de forma legal y ética. Herramientas, técnicas y mejores prácticas.',
  '<h2>¿Qué es Web Scraping?</h2><p>Extracción automática de datos de sitios web. Casos de uso: precios, reviews, datos públicos.</p><h2>Aspectos Legales</h2><p>robots.txt, términos de servicio, GDPR, rate limiting. Qué es legal y qué no.</p><h2>Herramientas</h2><p>BeautifulSoup, Scrapy, Selenium, Puppeteer. Cuándo usar cada una.</p><h2>Mejores Prácticas</h2><p>Respetar rate limits, identificar tu bot, no sobrecargar servidores, respetar copyright.</p><h2>Alternativas Éticas</h2><p>APIs oficiales, datos públicos, partnerships. Cuando scraping no es la mejor opción.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '4 days',
  'Desarrollo Web',
  ARRAY['web scraping', 'legal', 'ética', 'datos'],
  14,
  NOW() - INTERVAL '4 days',
  NOW() - INTERVAL '4 days'
),

(
  'Testing automatizado: De QA manual a 100% coverage',
  'testing-automatizado-qa-manual-100-coverage',
  'Roadmap para automatizar testing. Unit tests, integration tests, E2E, CI/CD.',
  '<h2>Tipos de Testing</h2><p>Unit, integration, E2E, performance, security. Cuándo usar cada uno.</p><h2>Herramientas</h2><p>Jest, Cypress, Playwright, Selenium. Comparativa y recomendaciones.</p><h2>Estrategia de Automatización</h2><p>Qué automatizar primero, pirámide de testing, coverage goals.</p><h2>CI/CD Integration</h2><p>Tests en cada commit, reporting automático, gates de calidad.</p><h2>ROI</h2><p>Reducción del 80% en bugs en producción. Ahorro de 30+ horas semanales. Confianza en deploys.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '2 days',
  'Desarrollo Web',
  ARRAY['testing', 'QA', 'automatización', 'calidad'],
  16,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),

(
  'Automatización de RRHH: Onboarding, evaluaciones y más',
  'automatizacion-rrhh-onboarding-evaluaciones',
  'Cómo automatizar procesos de recursos humanos. Desde onboarding hasta evaluaciones de desempeño.',
  '<h2>Onboarding Automático</h2><p>Bienvenida, documentación, acceso a sistemas, formación. Todo automatizado.</p><h2>Evaluaciones Automáticas</h2><p>Feedback 360, análisis de desempeño, recomendaciones. IA analizando datos.</p><h2>Reclutamiento</h2><p>Screening de CVs, matching de candidatos, scheduling de entrevistas. IA + automatización.</p><h2>Gestión de Ausencias</h2><p>Solicitudes, aprobaciones, cálculos. Todo automatizado.</p><h2>ROI</h2><p>Reducción del 50% en tiempo de onboarding. Mejora del 30% en satisfacción empleados.</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '1 day',
  'Negocio y Estrategia',
  ARRAY['RRHH', 'automatización', 'onboarding', 'recursos humanos'],
  12,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),

(
  'Document processing con IA: OCR, extraction, classification',
  'document-processing-ia-ocr-extraction-classification',
  'Cómo automatizar el procesamiento de documentos. OCR, extracción de datos, clasificación automática.',
  '<h2>OCR (Optical Character Recognition)</h2><p>Convertir imágenes a texto. Tesseract, Google Vision, AWS Textract.</p><h2>Extracción de Datos</h2><p>IA extrayendo información estructurada de documentos no estructurados. NER, key-value extraction.</p><h2>Clasificación Automática</h2><p>Clasificar documentos por tipo, categoría, urgencia. ML models.</p><h2>Workflow Completo</h2><p>Recepción → OCR → Extracción → Clasificación → Almacenamiento. Pipeline automatizado.</p><h2>Casos de Uso</h2><p>Facturas, contratos, formularios, emails. Aplicaciones reales.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW(),
  'IA y Machine Learning',
  ARRAY['document processing', 'OCR', 'extracción', 'IA'],
  15,
  NOW(),
  NOW()
),

-- ============================================
-- DESARROLLO WEB (10 artículos)
-- ============================================
(
  'Next.js 15: Guía completa para apps de producción',
  'nextjs-15-guia-completa-apps-produccion',
  'Todo lo que necesitas saber sobre Next.js 15. Nuevas features, mejoras, migración.',
  '<h2>Nuevas Características</h2><p>Turbopack estable, mejor RSC, optimizaciones. Qué cambió y cómo aprovecharlo.</p><h2>Mejores Prácticas</h2><p>Arquitectura, routing, data fetching, caching. Cómo construir apps escalables.</p><h2>Performance</h2><p>Optimizaciones, Core Web Vitals, bundle size. Cómo lograr 100 en Lighthouse.</p><h2>Deploy</h2><p>Vercel, self-hosting, CI/CD. Guía completa de despliegue.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '35 days',
  'Desarrollo Web',
  ARRAY['Next.js', 'React', 'frontend', 'guía'],
  18,
  NOW() - INTERVAL '35 days',
  NOW() - INTERVAL '35 days'
),

(
  'React vs Vue vs Svelte: Comparativa técnica 2026',
  'react-vs-vue-vs-svelte-comparativa-tecnica-2026',
  'Comparativa detallada de los 3 frameworks más populares. Performance, ecosistema, casos de uso.',
  '<h2>React</h2><p>El más popular, gran ecosistema, flexibilidad. Desventajas: curva de aprendizaje, verbosidad.</p><h2>Vue</h2><p>Fácil de aprender, buen balance, progresivo. Desventajas: ecosistema más pequeño.</p><h2>Svelte</h2><p>Mejor performance, menos código, compilado. Desventajas: ecosistema más pequeño, menos maduro.</p><h2>Comparativa Técnica</h2><p>Performance, bundle size, developer experience, ecosistema.</p><h2>Cuándo Usar Cada Uno</h2><p>Guía de decisión basada en tu caso específico.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '33 days',
  'Desarrollo Web',
  ARRAY['React', 'Vue', 'Svelte', 'comparativa', 'frontend'],
  14,
  NOW() - INTERVAL '33 days',
  NOW() - INTERVAL '33 days'
),

(
  'Arquitectura de SaaS: De 0 a 100K usuarios',
  'arquitectura-saas-0-100k-usuarios',
  'Cómo diseñar una arquitectura SaaS escalable. Desde MVP hasta scale.',
  '<h2>MVP (0-1K usuarios)</h2><p>Monolito simple, base de datos única, deploy simple. Velocidad sobre escalabilidad.</p><h2>Crecimiento (1K-10K usuarios)</h2><p>Separar frontend/backend, caching, CDN. Optimizaciones básicas.</p><h2>Scale (10K-100K usuarios)</h2><p>Microservicios, bases de datos distribuidas, load balancing, monitoring.</p><h2>Patrones Clave</h2><p>Multi-tenancy, rate limiting, queue systems, event-driven architecture.</p>',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '31 days',
  'Desarrollo Web',
  ARRAY['SaaS', 'arquitectura', 'escalabilidad', 'backend'],
  17,
  NOW() - INTERVAL '31 days',
  NOW() - INTERVAL '31 days'
),

(
  'Performance web: De 3s a 300ms de carga',
  'performance-web-3s-300ms-carga',
  'Técnicas avanzadas para optimizar el rendimiento web. Core Web Vitals, optimizaciones, herramientas.',
  '<h2>Métricas Clave</h2><p>LCP, FID, CLS. Qué son y cómo optimizarlos.</p><h2>Optimizaciones Frontend</h2><p>Code splitting, lazy loading, tree shaking, minificación, compresión.</p><h2>Optimizaciones Backend</h2><p>Caching, CDN, database optimization, API optimization.</p><h2>Herramientas</h2><p>Lighthouse, WebPageTest, Chrome DevTools. Cómo medir y mejorar.</p><h2>Resultados</h2><p>Casos reales: de 3s a 300ms. Impacto en conversión y SEO.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '29 days',
  'Desarrollo Web',
  ARRAY['performance', 'optimización', 'Core Web Vitals', 'rendimiento'],
  13,
  NOW() - INTERVAL '29 days',
  NOW() - INTERVAL '29 days'
),

(
  'SEO técnico avanzado: Guía para developers',
  'seo-tecnico-avanzado-guia-developers',
  'SEO desde la perspectiva técnica. Structured data, Core Web Vitals, indexación, crawling.',
  '<h2>Structured Data</h2><p>Schema.org, JSON-LD, rich snippets. Cómo implementar correctamente.</p><h2>Core Web Vitals</h2><p>LCP, FID, CLS. Cómo optimizar cada métrica.</p><h2>Indexación</h2><p>robots.txt, sitemap.xml, canonical URLs. Controlar qué indexa Google.</p><h2>Crawling</h2><p>Rendering, JavaScript, pre-rendering. Asegurar que Google ve tu contenido.</p><h2>Herramientas</h2><p>Google Search Console, Lighthouse, herramientas de auditoría.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '27 days',
  'Desarrollo Web',
  ARRAY['SEO', 'técnico', 'desarrollo', 'optimización'],
  16,
  NOW() - INTERVAL '27 days',
  NOW() - INTERVAL '27 days'
),

(
  'Headless CMS: Contentful vs Sanity vs Strapi',
  'headless-cms-contentful-sanity-strapi',
  'Comparativa de los principales headless CMS. Precios, features, casos de uso.',
  '<h2>Contentful</h2><p>El más popular, fácil de usar, buen ecosistema. Precio: €€€. Mejor para: Equipos no técnicos.</p><h2>Sanity</h2><p>Muy flexible, real-time, buen DX. Precio: €€. Mejor para: Developers, contenido estructurado.</p><h2>Strapi</h2><p>Open source, self-hosted, muy flexible. Precio: € (infraestructura). Mejor para: Control total, presupuesto limitado.</p><h2>Comparativa</h2><p>Tabla comparativa: precios, features, casos de uso.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '25 days',
  'Desarrollo Web',
  ARRAY['CMS', 'headless', 'Contentful', 'Sanity', 'Strapi'],
  12,
  NOW() - INTERVAL '25 days',
  NOW() - INTERVAL '25 days'
),

(
  'CI/CD para equipos pequeños: GitHub Actions tutorial',
  'cicd-equipos-pequenos-github-actions-tutorial',
  'Cómo implementar CI/CD con GitHub Actions sin complejidad. Tutorial paso a paso.',
  '<h2>¿Qué es CI/CD?</h2><p>Integración Continua y Despliegue Continuo. Automatizar tests y deploys.</p><h2>GitHub Actions Básico</h2><p>Workflows, jobs, steps. Conceptos fundamentales.</p><h2>Tutorial Paso a Paso</h2><p>1. Setup básico, 2. Tests automáticos, 3. Build, 4. Deploy. Ejemplo completo.</p><h2>Mejores Prácticas</h2><p>Secrets, caching, matrix builds, conditional deploys.</p>',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '23 days',
  'DevOps y Cloud',
  ARRAY['CI/CD', 'GitHub Actions', 'DevOps', 'tutorial'],
  15,
  NOW() - INTERVAL '23 days',
  NOW() - INTERVAL '23 days'
),

(
  'Web3 para developers tradicionales: Blockchain sin hype',
  'web3-developers-tradicionales-blockchain-sin-hype',
  'Guía práctica de Web3 para developers web tradicionales. Smart contracts, wallets, dApps.',
  '<h2>Conceptos Básicos</h2><p>Blockchain, smart contracts, wallets, dApps. Explicado sin hype.</p><h2>Desarrollo de Smart Contracts</h2><p>Solidity, Remix, Hardhat. Cómo desarrollar contratos.</p><h2>Integración Frontend</h2><p>Web3.js, Ethers.js, MetaMask. Conectar frontend con blockchain.</p><h2>Casos de Uso Reales</h2><p>NFTs, DeFi, DAOs. Qué tiene sentido y qué no.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '21 days',
  'Desarrollo Web',
  ARRAY['Web3', 'blockchain', 'smart contracts', 'desarrollo'],
  14,
  NOW() - INTERVAL '21 days',
  NOW() - INTERVAL '21 days'
),

(
  'PWAs en 2026: Cuándo elegir PWA vs app nativa',
  'pwas-2026-cuando-elegir-pwa-vs-app-nativa',
  'Guía de decisión: PWA vs app nativa. Ventajas, desventajas, casos de uso.',
  '<h2>¿Qué es una PWA?</h2><p>Progressive Web App: app web que se comporta como nativa. Instalable, offline, notificaciones.</p><h2>Ventajas PWA</h2><p>Un solo código, fácil mantenimiento, instalación sin stores, actualizaciones automáticas.</p><h2>Desventajas PWA</h2><p>Limitaciones de hardware, menos features nativas, dependencia del browser.</p><h2>Cuándo Elegir PWA</h2><p>Contenido > funcionalidad, presupuesto limitado, validación rápida.</p><h2>Cuándo Elegir Nativa</h2><p>Performance crítica, acceso completo hardware, UX premium.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '19 days',
  'Desarrollo Móvil',
  ARRAY['PWA', 'apps móviles', 'web apps', 'comparativa'],
  11,
  NOW() - INTERVAL '19 days',
  NOW() - INTERVAL '19 days'
),

(
  'Microfrontends: Cuándo tiene sentido (y cuándo no)',
  'microfrontends-cuando-sentido-cuando-no',
  'Guía práctica de microfrontends. Cuándo usar esta arquitectura y cuándo evitarla.',
  '<h2>¿Qué son Microfrontends?</h2><p>Arquitectura que divide una app frontend en apps más pequeñas e independientes.</p><h2>Ventajas</h2><p>Equipos independientes, tecnologías diferentes, deploys independientes, escalabilidad.</p><h2>Desventajas</h2><p>Complejidad, overhead, debugging difícil, bundle size.</p><h2>Cuándo Tiene Sentido</h2><p>Equipos grandes, apps muy grandes, necesidad de tecnologías diferentes.</p><h2>Cuándo NO Tiene Sentido</h2><p>Equipos pequeños, apps pequeñas, sobre-ingeniería.</p>',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '17 days',
  'Desarrollo Web',
  ARRAY['microfrontends', 'arquitectura', 'frontend', 'escalabilidad'],
  16,
  NOW() - INTERVAL '17 days',
  NOW() - INTERVAL '17 days'
),

-- ============================================
-- APPS MÓVILES (8 artículos)
-- ============================================
(
  'Flutter vs React Native: Decisión definitiva 2026',
  'flutter-vs-react-native-decision-definitiva-2026',
  'Comparativa actualizada de Flutter y React Native. Performance, desarrollo, ecosistema, cuándo elegir cada uno.',
  '<h2>Flutter</h2><p>Framework de Google, Dart, widgets nativos, excelente performance. Desventajas: ecosistema más pequeño.</p><h2>React Native</h2><p>Framework de Meta, JavaScript, gran ecosistema, hot reload. Desventajas: performance ligeramente inferior.</p><h2>Comparativa 2026</h2><p>Performance, desarrollo, ecosistema, comunidad, casos de uso.</p><h2>Cuándo Elegir Flutter</h2><p>Performance crítica, UI compleja, apps nuevas, equipo pequeño.</p><h2>Cuándo Elegir React Native</h2><p>Equipo con experiencia React, ecosistema grande necesario, web + móvil.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '15 days',
  'Desarrollo Móvil',
  ARRAY['Flutter', 'React Native', 'mobile', 'comparativa', '2026'],
  15,
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '15 days'
),

(
  'Apps nativas vs híbridas: Guía de decisión con costes reales',
  'apps-nativas-vs-hibridas-guia-decision-costes-reales',
  'Comparativa detallada con números reales. Costes, tiempos, performance, cuándo elegir cada opción.',
  '<h2>Apps Nativas</h2><p>Swift/Kotlin, performance máxima, acceso completo hardware. Coste: €€€€€. Tiempo: 12-20 semanas.</p><h2>Apps Híbridas</h2><p>Flutter/React Native, 1 codebase, buen performance. Coste: €€€. Tiempo: 8-12 semanas.</p><h2>PWAs</h2><p>Web tech, instalable, limitaciones. Coste: €€. Tiempo: 4-8 semanas.</p><h2>Comparativa de Costes</h2><p>Tabla con costes reales: desarrollo, mantenimiento, escalabilidad.</p><h2>Guía de Decisión</h2><p>Cuándo elegir cada opción según tu caso específico.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '13 days',
  'Desarrollo Móvil',
  ARRAY['apps nativas', 'apps híbridas', 'costes', 'decisión'],
  14,
  NOW() - INTERVAL '13 days',
  NOW() - INTERVAL '13 days'
),

(
  'Push notifications que funcionan: Estrategia y stack técnico',
  'push-notifications-funcionan-estrategia-stack-tecnico',
  'Cómo implementar push notifications efectivas. Estrategia, herramientas, mejores prácticas.',
  '<h2>Estrategia de Notificaciones</h2><p>Cuándo enviar, qué contenido, personalización, timing. Estrategia que funciona.</p><h2>Stack Técnico</h2><p>Firebase Cloud Messaging, OneSignal, Pusher. Comparativa y recomendaciones.</p><h2>Implementación</h2><p>iOS (APNs), Android (FCM), Web (Service Workers). Guía paso a paso.</p><h2>Mejores Prácticas</h2><p>Segmentación, A/B testing, analytics, respeto por el usuario.</p><h2>Métricas</h2><p>Open rate, click rate, conversion. Cómo medir el éxito.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '11 days',
  'Desarrollo Móvil',
  ARRAY['push notifications', 'mobile', 'estrategia', 'notificaciones'],
  12,
  NOW() - INTERVAL '11 days',
  NOW() - INTERVAL '11 days'
),

(
  'ASO (App Store Optimization): De 0 a 10K descargas orgánicas',
  'aso-app-store-optimization-0-10k-descargas-organicas',
  'Guía completa de ASO. Keywords, screenshots, descripciones, ratings. Cómo aumentar descargas orgánicas.',
  '<h2>Keywords Research</h2><p>Cómo encontrar keywords relevantes, volumen de búsqueda, competencia.</p><h2>Optimización de Título y Descripción</h2><p>Qué incluir, cómo estructurar, A/B testing.</p><h2>Screenshots y Video</h2><p>Cómo crear screenshots que convierten, video preview efectivo.</p><h2>Ratings y Reviews</h2><p>Cómo conseguir más ratings, gestionar reviews negativas.</p><h2>Resultados</h2><p>Casos reales: de 0 a 10K descargas orgánicas en 3 meses.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '9 days',
  'Desarrollo Móvil',
  ARRAY['ASO', 'App Store', 'optimización', 'descargas'],
  13,
  NOW() - INTERVAL '9 days',
  NOW() - INTERVAL '9 days'
),

(
  'Monetización de apps: Freemium, subscriptions, ads',
  'monetizacion-apps-freemium-subscriptions-ads',
  'Modelos de monetización de apps. Ventajas, desventajas, cuándo usar cada uno.',
  '<h2>Freemium</h2><p>App gratis con features premium. Ventajas: bajo barrera entrada. Desventajas: conversión baja.</p><h2>Subscriptions</h2><p>Suscripción mensual/anual. Ventajas: ingresos recurrentes. Desventajas: churn.</p><h2>Ads</h2><p>Publicidad en la app. Ventajas: fácil implementar. Desventajas: UX degradada.</p><h2>In-App Purchases</h2><p>Compras dentro de la app. Ventajas: flexibilidad. Desventajas: complejidad.</p><h2>Híbrido</h2><p>Combinar modelos. Mejor balance entre ingresos y UX.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '7 days',
  'Desarrollo Móvil',
  ARRAY['monetización', 'apps', 'freemium', 'subscriptions'],
  11,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days'
),

(
  'Backend para apps: Firebase vs Supabase vs custom',
  'backend-apps-firebase-supabase-custom',
  'Comparativa de soluciones backend para apps móviles. BaaS vs custom, cuándo elegir cada uno.',
  '<h2>Firebase</h2><p>Google, muy completo, fácil de usar. Precio: €€€. Mejor para: MVPs, apps pequeñas.</p><h2>Supabase</h2><p>Open source, PostgreSQL, muy flexible. Precio: €€. Mejor para: Apps medianas, control necesario.</p><h2>Custom Backend</h2><p>Node.js, Python, etc. Precio: €€€€ (desarrollo). Mejor para: Apps grandes, necesidades específicas.</p><h2>Comparativa</h2><p>Precios, features, escalabilidad, casos de uso.</p>',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '5 days',
  'Desarrollo Móvil',
  ARRAY['backend', 'Firebase', 'Supabase', 'BaaS'],
  14,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),

(
  'Testing de apps móviles: Frameworks y estrategias',
  'testing-apps-moviles-frameworks-estrategias',
  'Guía completa de testing para apps móviles. Unit, integration, E2E, herramientas.',
  '<h2>Tipos de Testing</h2><p>Unit, integration, UI, E2E, performance. Cuándo usar cada uno.</p><h2>Frameworks iOS</h2><p>XCTest, Quick/Nimble, Appium. Comparativa y recomendaciones.</p><h2>Frameworks Android</h2><p>JUnit, Espresso, Detox. Comparativa y recomendaciones.</p><h2>Estrategia</h2><p>Pirámide de testing, coverage goals, CI/CD integration.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '3 days',
  'Desarrollo Móvil',
  ARRAY['testing móvil', 'QA', 'frameworks', 'estrategia'],
  15,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),

(
  'IA en apps móviles: Casos de uso y implementación',
  'ia-apps-moviles-casos-uso-implementacion',
  'Cómo integrar IA en apps móviles. Casos de uso, herramientas, implementación práctica.',
  '<h2>Casos de Uso</h2><p>Recomendaciones, chatbots, análisis de imágenes, reconocimiento de voz, traducción.</p><h2>Herramientas</h2><p>TensorFlow Lite, Core ML, ML Kit. Comparativa y recomendaciones.</p><h2>Implementación</h2><p>Edge AI vs Cloud AI. Cuándo usar cada uno.</p><h2>Optimización</h2><p>Reducir tamaño de modelos, mejorar performance, optimizar para móvil.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  'Equipo FastIA',
  true,
  NOW() - INTERVAL '1 day',
  'Desarrollo Móvil',
  ARRAY['IA móvil', 'apps', 'machine learning', 'implementación'],
  16,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
);

-- Verificar inserción
SELECT COUNT(*) as total_articulos, category, COUNT(*) as por_categoria 
FROM public.blog_posts 
WHERE published = true 
GROUP BY category 
ORDER BY por_categoria DESC;
