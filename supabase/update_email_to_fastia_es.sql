-- ============================================
-- ACTUALIZAR TODOS LOS CORREOS A hola@fastia.es
-- ============================================
-- Este script actualiza todos los correos en la base de datos
-- para que apunten a hola@fastia.es
-- ============================================

-- Actualizar email en contenido de contacto
UPDATE public.site_settings
SET value = jsonb_set(
  value::jsonb,
  '{contact_info,email}',
  '"hola@fastia.es"'
)
WHERE section = 'contacto' 
  AND key = 'content'
  AND value::jsonb->'contact_info'->>'email' IS NOT NULL;

-- Actualizar email de contacto general si existe
UPDATE public.site_settings
SET value = '"hola@fastia.es"'
WHERE section = 'general'
  AND key = 'contact_email';

-- Verificar cambios
SELECT 
  section,
  key,
  CASE 
    WHEN key = 'content' THEN value::jsonb->'contact_info'->>'email'
    ELSE value::text
  END as email_value
FROM public.site_settings
WHERE (section = 'contacto' AND key = 'content')
   OR (section = 'general' AND key = 'contact_email');
