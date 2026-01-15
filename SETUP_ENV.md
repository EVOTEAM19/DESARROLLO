# Configuración de Variables de Entorno

## Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lbhviwctsjufyryoauem.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaHZpd2N0c2p1ZnlyeW9hdWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTQ1ODEsImV4cCI6MjA4Mzc5MDU4MX0.QXwTQIOkmMAMr9KHgBT8vJLVbswzJvEXlR9Y0K75HS4
```

## Nota de Seguridad

El archivo `.env.local` ya está incluido en `.gitignore` y no se subirá al repositorio.
