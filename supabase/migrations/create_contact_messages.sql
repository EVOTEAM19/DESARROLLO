-- ============================================
-- TABLA: contact_messages
-- ============================================
-- Tabla para almacenar mensajes del formulario de contacto
-- ============================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read BOOLEAN DEFAULT false,
    responded BOOLEAN DEFAULT false
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);

-- Habilitar RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política: Solo usuarios autenticados pueden leer mensajes
CREATE POLICY "Authenticated users can view contact messages"
    ON contact_messages FOR SELECT
    TO authenticated
    USING (true);

-- Política: Cualquiera puede insertar mensajes (público)
CREATE POLICY "Public can insert contact messages"
    ON contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden actualizar (marcar como leído/respondido)
CREATE POLICY "Authenticated users can update contact messages"
    ON contact_messages FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Comentario
COMMENT ON TABLE contact_messages IS 'Mensajes recibidos a través del formulario de contacto';
