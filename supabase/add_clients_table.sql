-- ============================================
-- TABLA: clients (Logos de clientes)
-- ============================================
-- Añadir a schema_fastia_todo_en_uno.sql o ejecutar por separado
-- ============================================

-- Crear tabla de clientes
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website text,
  industry text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_clients_published ON public.clients(published);
CREATE INDEX IF NOT EXISTS idx_clients_featured ON public.clients(featured);
CREATE INDEX IF NOT EXISTS idx_clients_order ON public.clients(order_index);

-- RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published clients" ON public.clients;
CREATE POLICY "Public can view published clients" 
  ON public.clients FOR SELECT 
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage clients" ON public.clients;
CREATE POLICY "Authenticated users can manage clients" 
  ON public.clients FOR ALL 
  TO authenticated 
  USING (true);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients;
CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON public.clients 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar clientes ejemplo
-- NOTA: Usando placeholders. Reemplaza con URLs reales de logos cuando los tengas
INSERT INTO public.clients (name, logo_url, website, industry, featured, order_index, published) VALUES
('Vodafone', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Vodafone', 'https://vodafone.es', 'Telecomunicaciones', true, 1, true),
('Banco Santander', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Santander', 'https://santander.com', 'Banca', true, 2, true),
('Telefónica', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Telefonica', 'https://telefonica.com', 'Telecomunicaciones', true, 3, true),
('BBVA', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=BBVA', 'https://bbva.com', 'Banca', true, 4, true),
('Iberdrola', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Iberdrola', 'https://iberdrola.com', 'Energía', true, 5, true),
('Inditex', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Inditex', 'https://inditex.com', 'Retail', true, 6, true),
('Repsol', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Repsol', 'https://repsol.com', 'Energía', true, 7, true),
('El Corte Inglés', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=El+Corte+Ingles', 'https://elcorteingles.es', 'Retail', true, 8, true),
('Mapfre', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Mapfre', 'https://mapfre.com', 'Seguros', true, 9, true),
('ACS', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=ACS', 'https://acs.com', 'Construcción', true, 10, true),
('NH Hotel Group', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=NH+Hotels', 'https://nh-hotels.com', 'Turismo', false, 11, true),
('Ferrovial', 'https://via.placeholder.com/200x80/FF6B35/FFFFFF?text=Ferrovial', 'https://ferrovial.com', 'Construcción', false, 12, true)
ON CONFLICT DO NOTHING;
