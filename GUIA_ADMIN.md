# Guía de Acceso al Panel de Administrador

## 🔐 Cómo Acceder al Panel Admin

### Opción 1: Crear Usuario desde Supabase Dashboard (Recomendado)

1. **Ve a tu proyecto en Supabase Dashboard**
   - Accede a [https://app.supabase.com](https://app.supabase.com)
   - Selecciona tu proyecto

2. **Navega a Authentication**
   - En el menú lateral, ve a **Authentication > Users**

3. **Crea un nuevo usuario**
   - Haz clic en **"Add user"** o **"Invite user"**
   - Ingresa el email y contraseña
   - **Importante**: Marca la casilla "Auto Confirm User" para que no necesite confirmar email
   - Haz clic en **"Create user"**

4. **Accede al panel**
   - Ve a `http://localhost:3000/login`
   - Ingresa el email y contraseña que acabas de crear
   - Serás redirigido automáticamente a `/admin`

### Opción 2: Crear Usuario con SQL (Avanzado)

Si prefieres crear el usuario directamente desde SQL:

```sql
-- Crear usuario admin (ejecutar en Supabase SQL Editor)
-- Reemplaza 'admin@thinkia.com' y 'TuContraseñaSegura123!' con tus valores

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@thinkia.com',
  crypt('TuContraseñaSegura123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Obtener el ID del usuario creado
SELECT id, email FROM auth.users WHERE email = 'admin@thinkia.com';
```

**Nota**: Este método es más complejo. Se recomienda usar el Dashboard.

### Opción 3: Usar Supabase Auth API (Desde código)

Puedes crear un script temporal para crear el primer usuario:

```typescript
// scripts/create-admin-user.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@thinkia.com',
    password: 'TuContraseñaSegura123!',
    email_confirm: true,
  })

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Usuario creado:', data.user)
  }
}

createAdminUser()
```

## 🚪 Acceso al Panel

Una vez creado el usuario:

1. **Ve a la página de login**
   ```
   http://localhost:3000/login
   ```

2. **Ingresa tus credenciales**
   - Email: El email que usaste al crear el usuario
   - Contraseña: La contraseña que configuraste

3. **Acceso automático**
   - Si las credenciales son correctas, serás redirigido a `/admin`
   - El middleware protege automáticamente todas las rutas `/admin/*`

## 🔒 Seguridad

- **Rutas protegidas**: Todas las rutas `/admin/*` requieren autenticación
- **Redirección automática**: Si intentas acceder a `/admin` sin estar autenticado, serás redirigido a `/login`
- **Sesión persistente**: Tu sesión se mantiene mientras el navegador esté abierto
- **Logout**: Puedes cerrar sesión desde el panel admin (botón en el sidebar)

## 🐛 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Asegúrate de que el usuario esté confirmado en Supabase

### Error: "Email not confirmed"
- Ve a Supabase Dashboard > Authentication > Users
- Encuentra tu usuario y marca "Auto Confirm" o confirma manualmente

### No puedo acceder a /admin
- Verifica que tengas una sesión activa
- Intenta cerrar sesión y volver a iniciar sesión
- Revisa la consola del navegador para errores

### El usuario no se crea
- Verifica que las variables de entorno estén configuradas
- Revisa los logs de Supabase Dashboard
- Asegúrate de tener permisos en el proyecto de Supabase

## 📝 Notas Importantes

- **Primer usuario**: El primer usuario que crees será el administrador principal
- **Múltiples usuarios**: Puedes crear tantos usuarios como necesites desde Supabase Dashboard
- **Permisos**: Todos los usuarios autenticados pueden acceder al panel admin
- **RLS**: Las políticas RLS permiten que usuarios autenticados gestionen el contenido
