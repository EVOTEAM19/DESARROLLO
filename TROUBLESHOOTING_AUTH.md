# Solución de Problemas de Autenticación

## 🔍 Problema: No puedo acceder al panel admin

### Verificación Paso a Paso

#### 1. Verificar que el usuario esté confirmado en Supabase

**En Supabase Dashboard:**
1. Ve a **Authentication > Users**
2. Busca tu usuario (`alvaro@pospon.es`)
3. Verifica la columna **"Confirmed"** o **"Email Confirmed"**
4. Si dice **"No"** o está vacío:
   - Haz clic en el usuario
   - Busca la opción **"Confirm email"** o **"Auto Confirm"**
   - Marca la casilla o haz clic en confirmar

#### 2. Verificar que el email esté correcto

- Asegúrate de que el email sea exactamente: `alvaro@pospon.es`
- Verifica que no haya espacios antes o después
- El email se convierte a minúsculas automáticamente

#### 3. Verificar la contraseña

- La contraseña debe ser exactamente: `19Macarrones#`
- Verifica mayúsculas, minúsculas y caracteres especiales
- No debe haber espacios

#### 4. Verificar variables de entorno

Asegúrate de que `.env.local` tenga:
```env
NEXT_PUBLIC_SUPABASE_URL=https://lbhviwctsjufyryoauem.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 5. Verificar en la consola del navegador

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Console**
3. Intenta iniciar sesión
4. Revisa si hay errores en rojo
5. Copia los mensajes de error

#### 6. Verificar en Supabase Dashboard

1. Ve a **Authentication > Logs**
2. Busca intentos de login recientes
3. Revisa si hay errores registrados

### Soluciones Comunes

#### Error: "Invalid login credentials"

**Causas posibles:**
- Email o contraseña incorrectos
- Usuario no existe
- Usuario no confirmado

**Solución:**
1. Verifica que el usuario exista en Supabase Dashboard
2. Confirma el email del usuario
3. Intenta cambiar la contraseña desde Supabase Dashboard

#### Error: "Email not confirmed"

**Solución:**
1. Ve a Supabase Dashboard > Authentication > Users
2. Encuentra tu usuario
3. Haz clic en **"Confirm email"** o marca **"Auto Confirm"**

#### El usuario no aparece en la lista

**Solución:**
1. Verifica que el usuario se haya creado correctamente
2. Revisa la pestaña **"All users"** en Supabase
3. Si no existe, créalo nuevamente

### Crear Usuario con Email Confirmado

**Desde Supabase Dashboard:**
1. Ve a **Authentication > Users**
2. Haz clic en **"Add user"**
3. Completa:
   - Email: `alvaro@pospon.es`
   - Password: `19Macarrones#`
   - **IMPORTANTE**: Marca **"Auto Confirm User"** ✅
4. Haz clic en **"Create user"**

### Resetear Contraseña

Si necesitas cambiar la contraseña:

1. Ve a Supabase Dashboard > Authentication > Users
2. Encuentra tu usuario
3. Haz clic en el usuario
4. Busca **"Reset Password"** o **"Update Password"**
5. Establece una nueva contraseña

### Verificar Configuración de Auth en Supabase

1. Ve a **Authentication > Settings**
2. Verifica:
   - **Enable Email Signup**: Debe estar activado
   - **Enable Email Confirmations**: Puede estar desactivado para desarrollo
   - **Site URL**: Debe ser `http://localhost:3000` (o tu URL de producción)

### Probar con otro método

Si nada funciona, prueba crear un usuario nuevo:

1. Ve a Supabase Dashboard
2. Authentication > Users > Add user
3. Email: `test@thinkia.com`
4. Password: `Test123456!`
5. Marca **"Auto Confirm User"**
6. Intenta iniciar sesión con estas credenciales

### Debugging Avanzado

Si el problema persiste, activa el modo debug:

1. Abre las DevTools (F12)
2. Ve a **Network** tab
3. Filtra por "auth" o "login"
4. Intenta iniciar sesión
5. Revisa la petición y respuesta
6. Busca códigos de error (400, 401, 403, etc.)

### Contacto

Si el problema persiste después de seguir estos pasos, verifica:
- Los logs de Supabase Dashboard
- La consola del navegador
- Los logs del servidor de Next.js
