# 🔄 CÓMO ACTUALIZAR LA WEB EN PRODUCCIÓN

## ✅ Cambios Realizados

He corregido la configuración para que la web se actualice inmediatamente:

1. ✅ **Desactivado caché de páginas**: `revalidate = 0` y `dynamic = 'force-dynamic'`
2. ✅ **Headers de no-caché**: Configurado en `vercel.json`
3. ✅ **Corregido error de hero_section**: Ya no falla si no existe
4. ✅ **Script para forzar deploy**: Creado `scripts/force-redeploy.js`

---

## 🚀 OPCIÓN 1: Forzar Deploy Automático (RECOMENDADO)

Ejecuta este comando en la terminal:

```bash
cd DESARROLLO
npm run force-deploy
```

Este script:
- Crea un commit vacío
- Hace push a GitHub
- Vercel detecta el cambio y despliega automáticamente

---

## 🚀 OPCIÓN 2: Forzar Deploy Manual

### Paso 1: Asegúrate de estar en el directorio correcto
```bash
cd DESARROLLO
```

### Paso 2: Verifica que los cambios estén guardados
```bash
git status
```

### Paso 3: Añade y haz commit de los cambios
```bash
git add .
git commit -m "Actualizar configuración de caché y forzar redeploy"
```

### Paso 4: Haz push a GitHub
```bash
git push origin main
```

Vercel detectará automáticamente el cambio y hará un nuevo deploy.

---

## 🚀 OPCIÓN 3: Desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto
3. Ve a la pestaña **"Deployments"**
4. Haz clic en los **3 puntos (⋯)** del último deployment
5. Selecciona **"Redeploy"**
6. Confirma el redeploy

---

## ⏳ DESPUÉS DEL DEPLOY

### 1. Espera 1-2 minutos
El deploy tarda aproximadamente 1-2 minutos en completarse.

### 2. Verifica el estado en Vercel
- Ve a Vercel Dashboard > Deployments
- Verifica que el último deployment esté en estado **"Ready" (✓)**

### 3. Limpia la caché del navegador

**Chrome/Edge:**
- Presiona `Ctrl + Shift + Delete`
- Selecciona "Imágenes y archivos en caché"
- Haz clic en "Borrar datos"

**O usa modo incógnito:**
- Presiona `Ctrl + Shift + N`
- Visita tu sitio web

### 4. Recarga forzando la actualización
- Presiona `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac)
- O abre DevTools (F12) → Click derecho en el botón de recargar → "Vaciar caché y volver a cargar de forma forzada"

---

## 🔍 VERIFICAR QUE FUNCIONA

1. **Abre tu sitio en modo incógnito**
2. **Verifica que los cambios se vean**
3. **Si no se ven, espera 2-3 minutos más** (propagación de CDN)

---

## ⚠️ SI AÚN NO SE ACTUALIZA

### 1. Verifica el deployment en Vercel
- Asegúrate de que el último deployment esté en estado "Ready"
- Revisa los logs por si hay errores

### 2. Limpia la caché de Vercel
- En Vercel Dashboard, ve a **Settings > General**
- Busca **"Build Cache"** o **"Cache"**
- Haz clic en **"Clear Build Cache"**
- Haz un nuevo deploy

### 3. Verifica que estés viendo producción
- Asegúrate de que la URL sea la de producción (no preview)
- Verifica que no estés usando una URL de preview deployment

### 4. Prueba desde otro dispositivo/navegador
- Abre tu sitio desde otro dispositivo
- O usa otro navegador completamente diferente

---

## 📝 NOTAS IMPORTANTES

- ✅ Los cambios ahora se actualizan **inmediatamente** (sin caché)
- ✅ El deploy automático se activa con cada push a `main`
- ✅ Los assets estáticos (JS, CSS) siguen cacheados (normal)
- ⚠️ Si cambias solo contenido, puede tardar 1-2 minutos en verse
- ⚠️ Si cambias código, el deploy tarda 1-3 minutos

---

## 🆘 TROUBLESHOOTING

### El deploy falla
1. Revisa los logs en Vercel Dashboard
2. Ejecuta `npm run build` localmente para ver errores
3. Corrige los errores y vuelve a hacer push

### Los cambios aparecen en preview pero no en producción
1. Verifica que estés haciendo deploy a producción (`--prod`)
2. Verifica que la rama `main` esté conectada a producción en Vercel

### El build se completa pero no veo cambios
1. Limpia la caché del navegador
2. Prueba en modo incógnito
3. Espera 2-3 minutos (propagación de CDN)
4. Verifica que el deployment esté en producción (no preview)

---

## ✅ RESUMEN RÁPIDO

```bash
# 1. Forzar deploy automático
npm run force-deploy

# 2. Esperar 1-2 minutos

# 3. Limpiar caché del navegador (Ctrl + Shift + Delete)

# 4. Recargar con Ctrl + F5
```

¡Listo! 🎉
