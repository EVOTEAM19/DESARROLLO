# Solución: No Carga Localhost

## 🔍 Diagnóstico

Si localhost no carga, sigue estos pasos:

### 1. Verificar que el servidor esté corriendo

```bash
# Ver procesos de Node
Get-Process -Name node

# Ver puerto 3001
netstat -ano | findstr :3001
```

### 2. Detener procesos anteriores

Si hay procesos antiguos corriendo:

```bash
# Detener todos los procesos de Node
taskkill /F /IM node.exe

# O detener un proceso específico por PID
taskkill /F /PID 17132
```

### 3. Limpiar caché de Next.js

```bash
# Eliminar carpeta .next
Remove-Item -Recurse -Force .next

# Eliminar node_modules (opcional, solo si hay problemas)
# Remove-Item -Recurse -Force node_modules
```

### 4. Reiniciar el servidor

```bash
# Instalar dependencias (si es necesario)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 5. Verificar errores en la consola

Revisa la terminal donde corre `npm run dev` para ver:
- Errores de compilación
- Errores de TypeScript
- Errores de importación

### 6. Verificar variables de entorno

Asegúrate de que `.env.local` existe y tiene las variables correctas:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lbhviwctsjufyryoauem.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NODE_ENV=development
```

### 7. Verificar el navegador

- Intenta en modo incógnito
- Limpia la caché del navegador (Ctrl+Shift+Delete)
- Verifica que estés usando `http://localhost:3001` (no https)

### 8. Verificar firewall/antivirus

A veces el firewall o antivirus bloquea localhost. Verifica:
- Windows Firewall
- Antivirus (puede bloquear Node.js)

### 9. Probar otro puerto

Si el puerto 3001 está ocupado, puedes cambiar el puerto:

```bash
# En package.json, cambiar:
"dev": "next dev -p 3000"
```

O usar una variable de entorno:

```bash
$env:PORT=3000; npm run dev
```

### 10. Verificar logs del servidor

Si el servidor está corriendo pero no responde, revisa:
- La terminal donde corre `npm run dev`
- Busca errores en rojo
- Busca mensajes de "Ready" o "Compiled successfully"

## 🐛 Errores Comunes

### Error: "Port 3001 is already in use"

**Solución:**
```bash
# Encontrar proceso
netstat -ano | findstr :3001

# Matar proceso (reemplaza PID con el número)
taskkill /F /PID [PID]
```

### Error: "Module not found"

**Solución:**
```bash
# Reinstalar dependencias
npm install
```

### Error: "Invalid API key"

**Solución:**
- Verifica `.env.local`
- Reinicia el servidor después de cambiar variables de entorno

### Error: "Cannot find module"

**Solución:**
```bash
# Limpiar y reinstalar
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

## 📞 Si Nada Funciona

1. **Cierra completamente el terminal**
2. **Abre un nuevo terminal**
3. **Navega al proyecto:**
   ```bash
   cd C:\Users\USER\DESARROLLO\DESARROLLO
   ```
4. **Limpia todo:**
   ```bash
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```
5. **Reinicia:**
   ```bash
   npm run dev
   ```

## ✅ Verificación Final

Cuando el servidor esté corriendo correctamente, deberías ver:

```
✓ Ready in X seconds
○ Compiling / ...
✓ Compiled / in X seconds
```

Y en el navegador deberías poder acceder a:
- `http://localhost:3001`
- `http://localhost:3001/login`
- `http://localhost:3001/admin` (requiere login)
