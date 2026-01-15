# 🔧 Solución al Error de Subida de Logo

## ❌ Error Actual
```
Error al subir el logo: new row violates row-level security policy
POST .../storage/v1/bucket 400 (Bad Request)
```

## ✅ Solución

### **Paso 1: Crear el Bucket de Logos**

Ejecuta este script SQL en Supabase:

```sql
-- Ejecutar en Supabase SQL Editor:
-- supabase/create_logos_bucket.sql
```

O manualmente desde la interfaz:
1. Ve a **Supabase Dashboard** > **Storage**
2. Haz clic en **"New bucket"**
3. Nombre: `logos`
4. Marca como **público**
5. Límite de tamaño: 5MB
6. Tipos permitidos: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`

### **Paso 2: Configurar Políticas RLS para el Bucket `logos`**

Desde la interfaz de Supabase:

1. Ve a **Storage** > **logos** > **Policies**
2. Haz clic en **"New Policy"**
3. Crea estas 4 políticas:

   **Política 1: Lectura Pública**
   - Nombre: `Public Access Logos`
   - Operación: `SELECT`
   - Target roles: `public`
   - Policy definition:
     ```sql
     (bucket_id = 'logos')
     ```

   **Política 2: Subida Autenticada**
   - Nombre: `Authenticated users can upload Logos`
   - Operación: `INSERT`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'logos')
     ```

   **Política 3: Actualización Autenticada**
   - Nombre: `Authenticated users can update Logos`
   - Operación: `UPDATE`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'logos')
     ```

   **Política 4: Eliminación Autenticada**
   - Nombre: `Authenticated users can delete Logos`
   - Operación: `DELETE`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'logos')
     ```

### **Paso 3: Verificar**

1. Recarga la página `/admin/settings`
2. Intenta subir un logo
3. Debería funcionar correctamente ✅

## 🔍 Cambios Realizados en el Código

- ✅ Cambiado el bucket de `media` a `logos` en `src/app/admin/settings/page.tsx`
- ✅ El código ahora usa el bucket correcto para los logos

## 📝 Notas

- El bucket `logos` es específico para logos del sitio
- Tiene un límite de 5MB (suficiente para logos)
- Solo acepta formatos de imagen
- Las políticas permiten lectura pública pero solo usuarios autenticados pueden subir/actualizar/eliminar

## 🐛 Si Aún Falla

1. **Verifica que el bucket existe:**
   ```sql
   SELECT id, name, public FROM storage.buckets WHERE id = 'logos';
   ```

2. **Verifica las políticas:**
   ```sql
   SELECT policyname, cmd, roles 
   FROM pg_policies 
   WHERE schemaname = 'storage' 
     AND tablename = 'objects'
     AND policyname LIKE '%Logos%';
   ```

3. **Verifica que estás autenticado:**
   - Abre la consola del navegador
   - Verifica que no hay errores de autenticación
   - Asegúrate de estar logueado en `/admin`
