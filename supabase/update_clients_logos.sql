-- ============================================
-- ACTUALIZAR LOGOS DE CLIENTES A PLACEHOLDERS
-- ============================================
-- Ejecuta este SQL para actualizar los logos a URLs de placeholder
-- Esto evitará los errores 404

UPDATE public.clients 
SET logo_url = CASE 
  WHEN name = 'Vodafone' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Vodafone'
  WHEN name = 'Banco Santander' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Santander'
  WHEN name = 'Telefónica' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Telefonica'
  WHEN name = 'BBVA' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=BBVA'
  WHEN name = 'Iberdrola' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Iberdrola'
  WHEN name = 'Inditex' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Inditex'
  WHEN name = 'Repsol' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Repsol'
  WHEN name = 'El Corte Inglés' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=El+Corte+Ingles'
  WHEN name = 'Mapfre' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Mapfre'
  WHEN name = 'ACS' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=ACS'
  WHEN name = 'NH Hotel Group' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=NH+Hotels'
  WHEN name = 'Ferrovial' THEN 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Ferrovial'
  ELSE logo_url
END
WHERE name IN ('Vodafone', 'Banco Santander', 'Telefónica', 'BBVA', 'Iberdrola', 'Inditex', 'Repsol', 'El Corte Inglés', 'Mapfre', 'ACS', 'NH Hotel Group', 'Ferrovial');

-- Verificar actualización
SELECT name, logo_url FROM public.clients WHERE published = true ORDER BY order_index;
