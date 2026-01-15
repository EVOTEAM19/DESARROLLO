# Migraciones de Base de Datos

Este directorio contiene las migraciones SQL para la base de datos de Supabase.

## Estructura

- `schema.sql` - Esquema completo de la base de datos con todas las tablas, índices, triggers y políticas RLS

## Cómo aplicar el esquema

### Opción 1: Desde el Dashboard de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Copia y pega el contenido de `schema.sql`
4. Ejecuta el script

### Opción 2: Desde la línea de comandos (Supabase CLI)

```bash
# Si tienes Supabase CLI instalado
supabase db reset
supabase db push
```

### Opción 3: Ejecutar directamente en psql

```bash
psql -h [TU_HOST] -U postgres -d postgres -f schema.sql
```

## Verificación

Después de ejecutar el script, verifica que:

1. Todas las tablas se crearon correctamente
2. Los índices están presentes
3. Las políticas RLS están activas
4. Los triggers funcionan (puedes probar actualizando un registro)

## Notas importantes

- **RLS está habilitado**: Todas las tablas tienen Row Level Security activado
- **Políticas públicas**: El contenido publicado es visible para todos
- **Escritura restringida**: Solo usuarios autenticados pueden crear/editar/eliminar
- **Triggers automáticos**: El campo `updated_at` se actualiza automáticamente

## Próximos pasos

1. Configura los usuarios y roles en Supabase Auth
2. Crea usuarios de prueba si es necesario
3. Inserta datos iniciales usando las funciones de autenticación
