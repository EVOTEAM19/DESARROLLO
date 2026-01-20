# 🚀 Instrucciones para Actualizar la Web en Producción

Si los cambios funcionan en localhost pero no se ven en la web, sigue estos pasos:

## 1. Verificar que los cambios estén en Git

```bash
# Verificar cambios pendientes
git status

# Si hay cambios sin commitear, haz commit y push
git add .
git commit -m "Actualizar cambios"
git push origin main
```

## 2. Forzar un nuevo Deploy en Vercel

### Opción A: Desde Vercel Dashboard (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto
3. Ve a la pestaña **"Deployments"**
4. Haz clic en el menú de los 3 puntos (⋯) del último deployment
5. Selecciona **"Redeploy"**
6. Confirma el redeploy

### Opción B: Desde Vercel CLI

```bash
# Si no tienes Vercel CLI instalado
npm i -g vercel

# Login (si no estás logueado)
vercel login

# Forzar redeploy a producción
vercel --prod --force
```

### Opción C: Desde GitHub (si tienes CI/CD configurado)

1. Haz un commit vacío para forzar el deploy:
```bash
git commit --allow-empty -m "Forzar redeploy"
git push origin main
```

## 3. Limpiar Caché del Navegador

Después del deploy, limpia la caché:

### Chrome/Edge:
- Presiona `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
- Selecciona "Imágenes y archivos en caché"
- Haz clic en "Borrar datos"

### Firefox:
- Presiona `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
- Selecciona "Caché"
- Haz clic en "Limpiar ahora"

### O usa modo incógnito:
- Presiona `Ctrl + Shift + N` (Chrome) o `Ctrl + Shift + P` (Firefox)
- Visita tu sitio web

## 4. Verificar el Deploy

1. Ve a Vercel Dashboard > Deployments
2. Verifica que el último deployment esté en estado "Ready" (✓)
3. Si hay errores, revisa los logs del build

## 5. Si aún no se actualiza

### Verificar configuración de caché:

El archivo `vercel.json` está configurado para:
- **Páginas HTML**: Sin caché (`max-age=0, must-revalidate`)
- **Assets estáticos**: Caché largo (1 año)

### Verificar revalidate en páginas:

Las páginas tienen `revalidate = 0` para actualizarse inmediatamente.

### Forzar invalidación de caché de Vercel:

1. En Vercel Dashboard, ve a **Settings > General**
2. Busca **"Cache"** o **"Build Cache"**
3. Haz clic en **"Clear Build Cache"**
4. Haz un nuevo deploy

## 6. Verificar Variables de Entorno

Asegúrate de que las variables de entorno en Vercel estén actualizadas:

1. Ve a **Settings > Environment Variables**
2. Verifica que todas las variables necesarias estén configuradas
3. Si cambiaste alguna, haz un nuevo deploy

## 7. Comandos Útiles

```bash
# Ver el estado del último deploy
vercel ls

# Ver logs del último deploy
vercel logs

# Hacer build local para verificar errores
npm run build

# Iniciar servidor de producción local
npm start
```

## ⚠️ Notas Importantes

- Los cambios pueden tardar 1-2 minutos en aparecer después del deploy
- Si usas CDN, puede tardar hasta 5 minutos en propagarse
- Siempre verifica el estado del deployment en Vercel Dashboard
- Si el build falla, los cambios no se desplegarán

## 🔍 Troubleshooting

### El deploy se completa pero no veo cambios:
1. Limpia la caché del navegador
2. Prueba en modo incógnito
3. Verifica que el deployment esté en producción (no preview)
4. Espera 2-3 minutos y recarga

### El build falla:
1. Revisa los logs en Vercel Dashboard
2. Ejecuta `npm run build` localmente para ver errores
3. Corrige los errores y vuelve a hacer push

### Los cambios aparecen en preview pero no en producción:
1. Verifica que estés haciendo deploy a producción (`--prod`)
2. Verifica que la rama `main` esté conectada a producción en Vercel
