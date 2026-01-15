-- ============================================
-- INICIALIZAR CONTENIDO DE PÁGINA DE INICIO
-- ============================================
-- Este script inicializa el contenido de la página principal
-- ============================================

INSERT INTO public.site_settings (section, key, value) VALUES
('home', 'content', '{
  "hero": {
    "badge": "FastIA",
    "title": "Transformamos ideas en soluciones inteligentes",
    "subtitle": "6 años desarrollando software con IA. +40 desarrolladores especializados en apps móviles, automatización y plataformas web.",
    "cta_primary_text": "Hablemos de tu proyecto",
    "cta_primary_link": "/contacto",
    "cta_secondary_text": "Ver servicios",
    "cta_secondary_link": "/the-modal"
  },
  "stats": [
    {
      "value": "11",
      "label": "Años de experiencia",
      "suffix": "",
      "icon": "Calendar"
    },
    {
      "value": "100",
      "label": "Proyectos entregados",
      "suffix": "+",
      "icon": "FolderKanban"
    },
    {
      "value": "40",
      "label": "Desarrolladores",
      "suffix": "+",
      "icon": "Users"
    },
    {
      "value": "98",
      "label": "Satisfacción clientes",
      "suffix": "%",
      "icon": "Heart"
    },
    {
      "value": "4.9",
      "label": "Rating promedio",
      "suffix": "/5",
      "icon": "Star"
    },
    {
      "value": "30",
      "label": "Tecnologías dominadas",
      "suffix": "+",
      "icon": "Code2"
    }
  ],
  "whyFastIA": [
    {
      "number": "01",
      "title": "Diseño que enamora",
      "text": "No hacemos interfaces genéricas. Cada pixel cuenta. Nuestro equipo de diseño crea experiencias visuales que tus usuarios recordarán.",
      "metric": "98% satisfacción en UX/UI",
      "icon": "Palette",
      "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
    },
    {
      "number": "02",
      "title": "Fluidez en cada interacción",
      "text": "Apps y webs que vuelan. Optimizamos cada línea de código para que la experiencia sea suave como la seda.",
      "metric": "< 2s tiempo de carga promedio",
      "icon": "Zap",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
    },
    {
      "number": "03",
      "title": "Adaptación total",
      "text": "Tu proyecto, tus reglas. Nos adaptamos a tu visión, no al revés. Metodologías ágiles que evolucionan contigo.",
      "metric": "100% proyectos entregados a tiempo",
      "icon": "Target",
      "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    },
    {
      "number": "04",
      "title": "Recursos de primer nivel",
      "text": "+40 desarrolladores senior especializados en las últimas tecnologías. Tu equipo de élite a un click.",
      "metric": "+40 desarrolladores especializados",
      "icon": "Users",
      "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    },
    {
      "number": "05",
      "title": "Sencillez sin complicaciones",
      "text": "Hablamos tu idioma. Sin tecnicismos innecesarios. Comunicación clara, directa y efectiva.",
      "metric": "4.9/5 comunicación cliente-equipo",
      "icon": "MessageSquare",
      "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      "number": "06",
      "title": "Rapidez que marca la diferencia",
      "text": "El tiempo es dinero. Nuestros sprints ágiles y procesos optimizados te ponen en el mercado antes que la competencia.",
      "metric": "40% más rápido que la media",
      "icon": "Rocket",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    }
  ]
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Verificar
SELECT section, key, updated_at
FROM public.site_settings
WHERE section = 'home' AND key = 'content';
