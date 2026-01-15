-- ============================================
-- INICIALIZAR CONTENIDO DE PÁGINA DE CONTACTO
-- ============================================
-- Este script inicializa el contenido de la página de contacto
-- ============================================

INSERT INTO public.site_settings (section, key, value) VALUES
('contacto', 'content', '{
  "hero": {
    "title": "Hablemos de tu proyecto",
    "subtitle": "Respondemos en menos de 24h. Sin comerciales pesados, solo una conversación honesta."
  },
  "contact_info": {
    "email": "hola@fastia.com",
    "phone": "+34 910 123 456",
    "address_madrid": "Gran Vía 45, 3ª planta, 28013 Madrid",
    "address_barcelona": "Passeig de Gràcia 21, 08007 Barcelona",
    "address_sevilla": "Av. Constitución 18, 41001 Sevilla",
    "hours": "Lunes a Viernes, 9:00 - 18:00h"
  },
  "form": {
    "title": "¿Hablamos de tu proyecto?",
    "description": "Estamos aquí para ayudarte. Cuéntanos tu idea y te respondemos en menos de 24 horas.",
    "project_types": [
      "Desarrollo de app móvil",
      "Plataforma web",
      "Automatización con IA",
      "Consultoría tecnológica",
      "Migración cloud",
      "Mantenimiento",
      "Otro"
    ],
    "budget_ranges": [
      "< 10.000€",
      "10.000€ - 30.000€",
      "30.000€ - 50.000€",
      "50.000€ - 100.000€",
      "+100.000€",
      "No lo sé aún"
    ],
    "start_timeframes": [
      "Lo antes posible",
      "En 1 mes",
      "En 2-3 meses",
      "Más de 3 meses"
    ],
    "success_message": "¡Mensaje enviado! Te responderemos pronto.",
    "error_message": "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente."
  },
  "map": {
    "enabled": false,
    "iframe_url": ""
  }
}'::jsonb)
ON CONFLICT (section, key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Verificar
SELECT section, key, updated_at
FROM public.site_settings
WHERE section = 'contacto' AND key = 'content';
