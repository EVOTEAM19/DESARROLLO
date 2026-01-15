# 🔧 Solución al Error de Storage RLS

## ❌ Error Original
```
ERROR: 42501: must be owner of table objects
```

Este error ocurre porque las tablas de `storage` en Supabase tienen permisos especiales y no todos los usuarios pueden crear políticas directamente.

## ✅ Soluciones

### **Opción 1: Script Final (Recomendado)**

Ejecuta el script `fix_storage_rls_final.sql`:

```sql
-- Ejecutar en Supabase SQL Editor:
-- supabase/fix_storage_rls_final.sql
```

Este script:
- ✅ Elimina políticas existentes primero (con `DROP POLICY IF EXISTS`)
- ✅ Crea los buckets si no existen
- ✅ Crea todas las políticas necesarias
- ✅ Incluye el bucket `logos` para el logo del sitio
- ✅ Compatible con PostgreSQL/Supabase

### **Opción 2: Script Simple (Solo Buckets)**

Si la opción 1 falla, ejecuta `fix_storage_rls_simple.sql`:

```sql
-- Ejecutar en Supabase SQL Editor:
-- supabase/fix_storage_rls_simple.sql
```

Este script solo crea los buckets. Las políticas deberás crearlas manualmente desde la interfaz.

### **Opción 3: Crear Manualmente desde la Interfaz (Más Seguro)**

Si ambos scripts fallan, sigue estos pasos:

#### **Paso 1: Crear Buckets**

1. Ve a **Supabase Dashboard** > **Storage**
2. Haz clic en **"New bucket"**
3. Crea los siguientes buckets (marca como **públicos**):
   - `products`
   - `blog`
   - `media`
   - `logos`

#### **Paso 2: Configurar Políticas para cada Bucket**

Para cada bucket (`products`, `blog`, `media`, `logos`):

1. Ve a **Storage** > **[Nombre del bucket]** > **Policies**
2. Haz clic en **"New Policy"**
3. Crea las siguientes políticas:

   **Política 1: Lectura Pública**
   - Nombre: `Public Access [Nombre]`
   - Operación: `SELECT`
   - Target roles: `public`
   - Policy definition:
     ```sql
     (bucket_id = '[nombre-del-bucket]')
     ```

   **Política 2: Subida Autenticada**
   - Nombre: `Authenticated users can upload [Nombre]`
   - Operación: `INSERT`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = '[nombre-del-bucket]')
     ```

   **Política 3: Actualización Autenticada**
   - Nombre: `Authenticated users can update [Nombre]`
   - Operación: `UPDATE`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = '[nombre-del-bucket]')
     ```

   **Política 4: Eliminación Autenticada**
   - Nombre: `Authenticated users can delete [Nombre]`
   - Operación: `DELETE`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = '[nombre-del-bucket]')
     ```

## 🧪 Verificar que Funciona

Después de aplicar cualquiera de las soluciones:

1. Ve a `/admin/settings` en tu aplicación
2. Intenta subir un logo
3. Si funciona, ¡listo! ✅
4. Si aún falla, verifica:
   - Que el bucket existe y es público
   - Que las políticas están creadas
   - Que estás autenticado en la aplicación

## 📝 Notas

- Los buckets deben ser **públicos** para que las imágenes se puedan ver sin autenticación
- Las políticas de `INSERT`, `UPDATE`, `DELETE` solo deben permitir `authenticated` para seguridad
- El bucket `logos` es nuevo y se usa para almacenar el logo del sitio desde `/admin/settings`

## 🔍 Debugging

Si sigues teniendo problemas:

1. **Verifica los buckets:**
   ```sql
   SELECT id, name, public FROM storage.buckets;
   ```

2. **Verifica las políticas:**
   ```sql
   SELECT policyname, cmd, roles 
   FROM pg_policies 
   WHERE schemaname = 'storage' AND tablename = 'objects';
   ```

3. **Verifica que estás autenticado:**
   - Abre la consola del navegador
   - Verifica que no hay errores de autenticación
   - Asegúrate de estar logueado en `/admin`
