-- ============================================
-- INICIALIZACIÓN DE CONTENIDO PARA GESTIÓN
-- ============================================
-- Este script inicializa los datos de contenido
-- para que puedan ser gestionados desde el panel admin
-- ============================================

-- Asegurar que la tabla site_settings tiene la estructura correcta
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT,
    key TEXT NOT NULL,
    value JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, key)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_site_settings_section ON public.site_settings(section);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_section_key ON public.site_settings(section, key);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at 
    BEFORE UPDATE ON public.site_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" 
    ON public.site_settings FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can manage site settings" 
    ON public.site_settings FOR ALL 
    TO authenticated 
    USING (true);

-- ============================================
-- INICIALIZAR CONTENIDO DE THE MODAL
-- ============================================
INSERT INTO public.site_settings (section, key, value) VALUES
('the-modal', 'content', '{
  "hero": {
    "badge": "The Mesh",
    "title": "Servicios de desarrollo especializados",
    "subtitle": "Servicios interconectados de desarrollo de software con IA que se adaptan y escalan según las necesidades de tu organización. TypeScript, React, Node.js, Kotlin, iOS, Android y Flux.",
    "cta_primary_text": "Hablemos de tu proyecto",
    "cta_primary_link": "/contacto",
    "cta_secondary_text": "Conoce FastIA",
    "cta_secondary_link": "/nosotros"
  },
  "services": [
    {
      "id": "1",
      "title": "IA Conversacional",
      "description": "Chatbots inteligentes y asistentes virtuales que entienden contexto y aprenden de cada interacción.",
      "href": "/servicios/ia-conversacional",
      "color": "from-orange-500 to-orange-600",
      "icon": "ia-conversacional"
    },
    {
      "id": "2",
      "title": "Análisis Predictivo",
      "description": "Machine Learning para predecir tendencias, detectar patrones y tomar decisiones basadas en datos.",
      "href": "/servicios/analisis-predictivo",
      "color": "from-blue-500 to-blue-600",
      "icon": "analisis-predictivo"
    },
    {
      "id": "3",
      "title": "Procesamiento de Datos",
      "description": "Transformación y análisis de grandes volúmenes de datos para extraer insights accionables.",
      "href": "/servicios/procesamiento-datos",
      "color": "from-green-500 to-green-600",
      "icon": "procesamiento-datos"
    },
    {
      "id": "4",
      "title": "Automatización Inteligente",
      "description": "RPA con IA que automatiza procesos complejos y toma decisiones en tiempo real.",
      "href": "/servicios/automatizacion-inteligente",
      "color": "from-purple-500 to-purple-600",
      "icon": "automatizacion-inteligente"
    },
    {
      "id": "5",
      "title": "Seguridad con IA",
      "description": "Protección avanzada con detección de amenazas, análisis de vulnerabilidades y respuesta automática.",
      "href": "/servicios/seguridad-ia",
      "color": "from-red-500 to-red-600",
      "icon": "seguridad-ia"
    }
  ],
  "expertise": {
    "title": "Expertos en SEO y Posicionamiento en Buscadores IA",
    "subtitle": "No solo desarrollamos software, lo hacemos visible. Somos especialistas en posicionamiento SEO tradicional y en los nuevos buscadores impulsados por IA como ChatGPT, Perplexity y Claude.",
    "seo_title": "SEO Técnico Avanzado",
    "seo_description": "Core Web Vitals, Schema.org, structured data y indexación perfecta.",
    "apps_title": "Especialistas en Apps Nativas e Híbridas",
    "apps_description": "11 años desarrollando apps móviles. Sabemos cuándo elegir nativo (Swift/Kotlin) y cuándo híbrido (Flutter/React Native). No te vendemos tecnología, te recomendamos la mejor para tu caso."
  },
  "cta": {
    "title": "¿Listo para transformar tu idea?",
    "description": "Agenda una sesión de 60 minutos gratis. Sin coste, sin compromiso.",
    "button_text": "Hablemos de tu proyecto",
    "button_link": "/contacto"
  }
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================
-- INICIALIZAR CONTENIDO DE SYNAPSE
-- ============================================
INSERT INTO public.site_settings (section, key, value) VALUES
('synapse', 'content', '{
  "hero": {
    "badge": "Synapse · Plataforma Empresarial",
    "title": "Tu plataforma de IA empresarial",
    "subtitle": "De la IA en la sombra al control total. Synapse es la plataforma unificada para gobernanza, seguridad y escalabilidad de IA empresarial. Sin vendor lock-in, sin sorpresas.",
    "cta_primary_text": "Solicitar demo",
    "cta_primary_link": "/contacto",
    "cta_secondary_text": "Ver servicios",
    "cta_secondary_link": "/the-modal"
  },
  "problems": [
    {
      "title": "IA en la sombra",
      "description": "Empleados usando ChatGPT sin control",
      "impact": "Riesgo de seguridad y compliance"
    },
    {
      "title": "Costos ocultos",
      "description": "Gastos en APIs de terceros sin visibilidad",
      "impact": "Presupuestos descontrolados"
    },
    {
      "title": "Falta de gobernanza",
      "description": "Sin control sobre qué IA se usa y cómo",
      "impact": "Riesgo regulatorio"
    }
  ],
  "solution": {
    "title": "La Solución: FastIA Synapse",
    "subtitle": "Plataforma unificada para gobernanza, seguridad y escalabilidad",
    "features": [
      {
        "icon": "Shield",
        "title": "Gobernanza Total",
        "description": "Control completo de accesos, permisos y auditoría de uso de IA en tu organización."
      },
      {
        "icon": "Zap",
        "title": "Velocidad de Implementación",
        "description": "De la idea a producción en 8-12 semanas. Sin meses de consultorías."
      },
      {
        "icon": "Cloud",
        "title": "Multi-Cloud",
        "description": "AWS, Azure, GCP o on-premise. Tú eliges dónde vive tu IA."
      },
      {
        "icon": "Lock",
        "title": "Seguridad Empresarial",
        "description": "Tus datos nunca salen de tu infraestructura. Compliance GDPR garantizado."
      },
      {
        "icon": "TrendingUp",
        "title": "Escalabilidad",
        "description": "Desde 10 hasta 10.000 usuarios. La plataforma crece contigo."
      },
      {
        "icon": "Users",
        "title": "Equipos Unificados",
        "description": "Un solo dashboard para toda la empresa. Marketing, ventas, soporte, IT."
      }
    ]
  },
  "useCases": [
    {
      "industry": "Finanzas",
      "title": "Análisis de riesgo con IA",
      "description": "Detección de fraude, scoring crediticio y análisis predictivo de mercados.",
      "impact": "40% reducción en fraude detectado"
    },
    {
      "industry": "Salud",
      "title": "Diagnóstico asistido",
      "description": "IA que analiza imágenes médicas y sugiere diagnósticos con 95%+ precisión.",
      "impact": "60% reducción tickets"
    }
  ],
  "cta": {
    "title": "¿Listo para controlar tu IA?",
    "description": "Agenda una demo personalizada",
    "button_text": "Solicitar demo",
    "button_link": "/contacto"
  }
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================
-- INICIALIZAR CONTENIDO DE NOSOTROS
-- ============================================
INSERT INTO public.site_settings (section, key, value) VALUES
('nosotros', 'content', '{
  "hero": {
    "title": "11 años transformando ideas en productos que triunfan",
    "subtitle": "Somos FastIA. Un equipo de +40 desarrolladores especializados en IA, obsesionados con la calidad y la velocidad."
  },
  "stats": [
    {
      "value": "11",
      "label": "Años de experiencia",
      "suffix": ""
    },
    {
      "value": "200",
      "label": "Proyectos entregados",
      "suffix": "+"
    },
    {
      "value": "40",
      "label": "Desarrolladores",
      "suffix": "+"
    },
    {
      "value": "98",
      "label": "Satisfacción clientes",
      "suffix": "%"
    }
  ],
  "values": [
    {
      "icon": "Zap",
      "title": "Velocidad sin comprometer calidad",
      "description": "Entregamos MVPs en 8-12 semanas sin sacrificar código limpio ni arquitectura escalable."
    },
    {
      "icon": "Heart",
      "title": "Transparencia radical",
      "description": "Presupuestos claros, timelines realistas, comunicación honesta. Sin sorpresas."
    },
    {
      "icon": "Target",
      "title": "Obsesión por el detalle",
      "description": "Desde el pixel en el diseño hasta la query en la base de datos. Todo importa."
    },
    {
      "icon": "Users",
      "title": "Clientes convertidos en partners",
      "description": "El 70% de nuestros clientes repiten. No hacemos proyectos, construimos relaciones."
    },
    {
      "icon": "Award",
      "title": "Innovación con propósito",
      "description": "IA cuando aporta valor real, no porque esté de moda. Tecnología al servicio del negocio."
    },
    {
      "icon": "TrendingUp",
      "title": "Equipo antes que ego",
      "description": "Colaboración, feedback honesto, crecimiento colectivo. Todos remamos en la misma dirección."
    }
  ],
  "team": {
    "title": "Nuestro equipo",
    "description": "Desarrolladores, diseñadores y product managers que aman lo que hacen."
  },
  "cta": {
    "title": "¿Quieres formar parte del equipo?",
    "description": "Estamos siempre buscando talento. Envíanos tu CV.",
    "button_text": "Ver ofertas",
    "button_link": "/contacto"
  }
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================
-- INICIALIZAR CONTENIDO DE REFLEXIONES
-- ============================================
INSERT INTO public.site_settings (section, key, value) VALUES
('reflexiones', 'content', '{
  "hero": {
    "title": "Reflexiones sobre IA y Tecnología",
    "subtitle": "Artículos, casos de estudio y pensamientos sobre el futuro del desarrollo de software con IA."
  },
  "filters": {
    "all_text": "Todos",
    "category_text": "Categorías",
    "search_placeholder": "Buscar artículos..."
  },
  "empty_state": {
    "title": "No se encontraron artículos",
    "description": "Intenta con otros filtros o términos de búsqueda."
  }
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================
-- VERIFICACIÓN
-- ============================================
SELECT 
  section,
  key,
  updated_at
FROM public.site_settings
WHERE section IN ('the-modal', 'synapse', 'nosotros', 'reflexiones')
ORDER BY section, key;
