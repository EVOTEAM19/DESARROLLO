# ✅ Solución Final: Error de Subida de Logo

## 🔍 Problema Identificado

El error "new row violates row-level security policy" ocurre porque:
1. El código intentaba **crear el bucket** desde el cliente (requiere permisos de admin)
2. Las políticas RLS pueden tener una estructura incorrecta

## ✅ Soluciones Aplicadas

### 1. Código Corregido ✅
- ✅ Eliminada la lógica de crear bucket desde el cliente
- ✅ Ahora solo verifica que el bucket existe
- ✅ Mejor logging para debugging
- ✅ Verificación de autenticación antes de subir

### 2. Script SQL Final

Ejecuta este script en Supabase SQL Editor:

```sql
-- supabase/fix_logos_policies_final.sql
```

Este script:
- ✅ Elimina las políticas existentes
- ✅ Crea las políticas con la estructura correcta
- ✅ Verifica que todo esté bien

## 📋 Pasos para Resolver

### Paso 1: Verificar que el bucket existe

Ve a **Supabase Dashboard** > **Storage** y verifica que el bucket `logos` existe y es público.

### Paso 2: Ejecutar el script SQL

Ejecuta `supabase/fix_logos_policies_final.sql` en Supabase SQL Editor.

### Paso 3: Verificar políticas desde la interfaz

1. Ve a **Storage** > **logos** > **Policies**
2. Debe haber exactamente 4 políticas:
   - `Public Access Logos` (SELECT, public)
   - `Authenticated users can upload Logos` (INSERT, authenticated)
   - `Authenticated users can update Logos` (UPDATE, authenticated)
   - `Authenticated users can delete Logos` (DELETE, authenticated)

### Paso 4: Probar de nuevo

1. Recarga la página `/admin/settings`
2. Intenta subir el logo
3. Revisa la consola para ver los logs de debugging

## 🐛 Si Aún Falla

### Verificar autenticación en consola:

```javascript
// En la consola del navegador
const supabase = window.__SUPABASE_CLIENT__ || (await import('@/lib/supabase')).createBrowserClient()
const { data: { user } } = await supabase.auth.getUser()
console.log('Usuario:', user?.email)
```

Si `user` es `null`, cierra sesión y vuelve a iniciar sesión.

### Verificar políticas en SQL:

```sql
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%Logos%';
```

Debe mostrar 4 políticas con la estructura correcta.

## 📝 Notas

- El bucket debe crearse desde Supabase Dashboard o con SQL (no desde el código)
- Las políticas deben tener la estructura correcta (USING para SELECT/DELETE, WITH CHECK para INSERT/UPDATE)
- El usuario debe estar autenticado para poder subir archivos
