# 🚨 HABILITAR Google Analytics Data API

## ⚠️ Error Detectado

El error indica que la **Google Analytics Data API** no está habilitada en el proyecto de Google Cloud:

```
Error: 7 PERMISSION_DENIED: Google Analytics Data API has not been used in project 218201261756 before or it is disabled.
```

## ✅ Solución: Habilitar la API

### Opción 1: Usar el Enlace Directo (MÁS RÁPIDO)

**Haz clic en este enlace** para habilitar la API directamente:

🔗 **https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=218201261756**

1. Se abrirá la página de Google Cloud Console
2. Verifica que el proyecto es: `218201261756` (o cambia al proyecto correcto si es necesario)
3. Haz clic en **"HABILITAR"** o **"ENABLE"** (botón azul)
4. Espera 2-3 minutos para que se propague

### Opción 2: Habilitar Manualmente

1. **Abre Google Cloud Console:**
   - Ve a: https://console.cloud.google.com

2. **Selecciona el Proyecto Correcto:**
   - Haz clic en el selector de proyecto en la parte superior
   - Busca el proyecto: `218201261756` (o `sustained-hold-483822-e2`)
   - Si no lo ves, verifica que estás usando la cuenta correcta

3. **Navega a APIs & Services:**
   - En el menú lateral, ve a **"APIs & Services"** → **"Library"** (Biblioteca)
   - O usa este enlace directo: https://console.cloud.google.com/apis/library

4. **Busca la API:**
   - En la barra de búsqueda, escribe: `Google Analytics Data API`
   - Haz clic en el resultado que dice **"Google Analytics Data API"**

5. **Habilita la API:**
   - Haz clic en el botón **"HABILITAR"** o **"ENABLE"**
   - Espera a que termine la habilitación (unos segundos)

6. **Verifica:**
   - Deberías ver un mensaje de confirmación
   - La página debería mostrar "API habilitada" o "API enabled"

---

## ⚠️ IMPORTANTE: Verificar el Project ID Correcto

El error menciona el proyecto `218201261756`, pero tu Service Account Key está en el proyecto `sustained-hold-483822-e2`.

**Esto puede significar:**
- La API necesita habilitarse en el proyecto donde está el Service Account (`sustained-hold-483822-e2`)
- O el project_id en el Service Account Key es diferente

**Para verificar el Project ID correcto:**

1. **Abre** el archivo `service-account-key.json`
2. **Busca** el campo `"project_id"`:
   ```json
   {
     "project_id": "sustained-hold-483822-e2",
     ...
   }
   ```

3. **Usa ese project_id** para habilitar la API

### Habilitar en el Proyecto Correcto

Si el `project_id` en tu Service Account Key es `sustained-hold-483822-e2`, habilita la API en ese proyecto:

🔗 **https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=sustained-hold-483822-e2**

O:

1. Ve a: https://console.cloud.google.com/apis/library?project=sustained-hold-483822-e2
2. Busca: `Google Analytics Data API`
3. Haz clic en **"HABILITAR"**

---

## 📋 Checklist de Verificación

Después de habilitar la API, verifica:

- [ ] La API está habilitada en el proyecto correcto
- [ ] Has esperado 2-3 minutos para que se propague
- [ ] Has reiniciado el servidor de desarrollo (`npm run dev`)
- [ ] El dashboard ahora muestra datos reales (sin error 500)

---

## 🔍 Verificar si la API está Habilitada

Para verificar que la API está habilitada:

1. Ve a: https://console.cloud.google.com/apis/dashboard
2. Selecciona el proyecto correcto
3. Busca "Google Analytics Data API" en la lista
4. Debería aparecer como **"Habilitada"** o **"Enabled"**

---

## 🐛 Si Aún No Funciona

### Problema 1: API Habilitada pero Sigue el Error

**Solución:**
- Espera 5-10 minutos para que los cambios se propaguen completamente
- Reinicia el servidor de desarrollo
- Limpia el caché del navegador y recarga el dashboard

### Problema 2: No Sabes Cuál Project ID Usar

**Solución:**
1. Abre `service-account-key.json`
2. Copia el valor de `"project_id"`
3. Usa ese project_id para habilitar la API

### Problema 3: No Tienes Permisos para Habilitar APIs

**Solución:**
- Necesitas el rol **"Editor"** o **"Owner"** en el proyecto de Google Cloud
- Contacta al administrador del proyecto para que habilite la API

---

## ✅ Después de Habilitar la API

1. **Espera 2-3 minutos** para que se propague
2. **Reinicia el servidor:**
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```
3. **Abre el dashboard:**
   - Ve a: `http://localhost:3001/admin/analytics`
   - Deberías ver datos reales (o al menos, sin el error 500)

---

## 📝 Nota sobre el Error `credentials is not defined`

Este error ya está corregido en el código. Si aún aparece después de reiniciar el servidor, el problema principal es que la API no está habilitada, lo cual causa que el código falle antes de llegar a esa línea.

**Prioridad**: Primero habilita la API, luego reinicia el servidor. Eso debería resolver ambos problemas.
