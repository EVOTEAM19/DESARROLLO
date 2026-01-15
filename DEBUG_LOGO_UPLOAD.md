# 🔍 Debug: Error de Subida de Logo

## Pasos para Diagnosticar

### 1. Verificar Autenticación

Abre la consola del navegador y ejecuta:

```javascript
// Verificar sesión
const supabase = window.__SUPABASE_CLIENT__ || (await import('@/lib/supabase')).createBrowserClient()
const { data: { user }, error } = await supabase.auth.getUser()
console.log('Usuario:', user)
console.log('Error:', error)
```

Si `user` es `null`, el problema es de autenticación.

### 2. Verificar Bucket y Políticas

Ejecuta en Supabase SQL Editor:

```sql
-- Ver bucket
SELECT * FROM storage.buckets WHERE id = 'logos';

-- Ver políticas
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%';
```

### 3. Probar Upload Directo

En la consola del navegador:

```javascript
const supabase = window.__SUPABASE_CLIENT__ || (await import('@/lib/supabase')).createBrowserClient()

// Verificar usuario
const { data: { user } } = await supabase.auth.getUser()
console.log('Usuario autenticado:', user?.email)

// Intentar upload de prueba
const testFile = new Blob(['test'], { type: 'image/png' })
const { data, error } = await supabase.storage
  .from('logos')
  .upload('test-' + Date.now() + '.png', testFile)

console.log('Resultado:', { data, error })
```

### 4. Verificar Políticas desde la Interfaz

1. Ve a **Supabase Dashboard** > **Storage** > **logos** > **Policies**
2. Verifica que existen estas 4 políticas:
   - `Public Access Logos` (SELECT, public)
   - `Authenticated users can upload Logos` (INSERT, authenticated)
   - `Authenticated users can update Logos` (UPDATE, authenticated)
   - `Authenticated users can delete Logos` (DELETE, authenticated)
3. Si alguna falta, créala manualmente desde la interfaz

### 5. Solución Temporal (Solo para Testing)

Si necesitas probar rápidamente, puedes deshabilitar temporalmente RLS:

```sql
-- ⚠️ SOLO PARA TESTING - NO USAR EN PRODUCCIÓN
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

**IMPORTANTE**: Vuelve a habilitarlo después:

```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

## Soluciones Comunes

### Problema: Usuario no autenticado
**Solución**: Cierra sesión y vuelve a iniciar sesión en `/admin`

### Problema: Políticas no se aplican
**Solución**: 
1. Elimina todas las políticas del bucket `logos`
2. Créalas de nuevo desde la interfaz de Supabase
3. Asegúrate de que el rol sea `authenticated` (no `public`)

### Problema: Bucket no existe
**Solución**: Ejecuta `supabase/create_logos_bucket.sql`

### Problema: Permisos insuficientes
**Solución**: Verifica que tu usuario tenga el rol `authenticated` en Supabase Auth
