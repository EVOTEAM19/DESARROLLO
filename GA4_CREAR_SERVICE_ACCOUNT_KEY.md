# Crear Service Account Key - Ya Estás en el Lugar Correcto

¡Perfecto! Ya estás en la página de **Service Accounts** y puedes ver `fastia-analytics`.

---

## ✅ Siguientes Pasos para Crear la Key

### Paso 1: Hacer Clic en el Service Account

En la tabla que ves, busca la fila con:
- **Email**: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
- **Nombre**: `fastia-analytics`
- **ID de clave**: "No hay claves"

**Haz clic en el nombre del Service Account**: `fastia-analytics`
- O haz clic en el email: `fastia-analytics@sustained-hold-483822-e2.iam.gserviceaccount.com`
- O haz clic en cualquier parte de la fila

### Paso 2: Ir a la Pestaña "KEYS"

Una vez dentro del Service Account:

1. Verás varias pestañas en la parte superior:
   - **"DETAILS"** (Detalles)
   - **"PERMISSIONS"** (Permisos)
   - **"KEYS"** (Claves) ⬅️ **Esta es la que necesitas**

2. **Haz clic en la pestaña "KEYS"** (o "Claves")

### Paso 3: Crear la Key

En la pestaña "KEYS":

1. Verás un botón: **"ADD KEY"** (Añadir clave) o **"+ AGREGAR CLAVE"**

2. **Haz clic en "ADD KEY"**

3. Se abrirá un menú desplegable:
   - **"Create new key"** (Crear nueva clave) ⬅️ **Selecciona esta opción**

### Paso 4: Seleccionar Formato JSON

1. Se abrirá un diálogo modal

2. Selecciona el formato: **"JSON"** ⬅️ **Esta es la opción que necesitas**

3. Haz clic en **"CREATE"** (Crear)

4. **Se descargará automáticamente** un archivo JSON
   - Nombre del archivo: algo como `sustained-hold-483822-e2-xxxxx.json`
   - ⚠️ **Guarda este archivo en un lugar seguro**

### Paso 5: Guardar el Archivo

1. El archivo se descargará automáticamente
2. **Mueve el archivo** a tu proyecto:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```
3. O guárdalo en otro lugar seguro
4. ⚠️ **NO lo subas a Git** (ya está en `.gitignore`)

---

## 🔍 Si No Puedes Hacer Clic en "fastia-analytics"

### Problema A: La Fila No Es Clickeable

**Solución**:
1. Intenta hacer clic directamente en el **email** o **nombre**
2. O usa el botón de **acciones** (tres puntos verticales ⋮) a la derecha
3. O busca un icono de **lápiz** o **editar** en la fila

### Problema B: No Aparece la Pestaña "KEYS"

**Solución**:
1. Verifica que estés dentro del Service Account (no en la lista)
2. Las pestañas aparecen en la parte superior de la página de detalles
3. Si no las ves, refresca la página (F5)

### Problema C: El Botón "ADD KEY" Está Deshabilitado

**Solución**:
1. Verifica que la política esté desactivada (deberías poder crear keys ahora)
2. Espera 1-2 minutos si acabas de cambiar la política
3. Refresca la página
4. Verifica que tengas permisos: necesitas rol "Editor" o "Owner" en el proyecto

### Problema D: Error al Crear la Key

**Si aparece un error de política**:
- Verifica que la política `iam.disableServiceAccountKeyCreation` esté en "Not Enforce"
- Espera unos minutos si acabas de cambiarla

---

## 📋 Resumen de Pasos Visuales

```
1. En la tabla, haz clic en → "fastia-analytics"
   ↓
2. Ve a la pestaña → "KEYS" (Claves)
   ↓
3. Haz clic en → "ADD KEY" → "Create new key"
   ↓
4. Selecciona → "JSON"
   ↓
5. Haz clic en → "CREATE"
   ↓
6. Descarga el archivo JSON
```

---

## ✅ Verificación

Después de crear la key, deberías ver:

1. En la tabla de Service Accounts:
   - **ID de clave**: Ya no debería decir "No hay claves"
   - Debería mostrar un ID o fecha de creación

2. En la pestaña "KEYS":
   - Deberías ver una lista con la key creada
   - Con opciones para descargar, eliminar, etc.

3. Archivo descargado:
   - Archivo JSON en tu carpeta de descargas
   - Nombre similar a: `sustained-hold-483822-e2-xxxxx.json`

---

## 🎯 Siguiente Paso Después de Crear la Key

Una vez tengas el archivo JSON:

1. **Muévelo a tu proyecto**:
   ```
   c:\Users\USER\DESARROLLO\DESARROLLO\service-account-key.json
   ```

2. **Configura `.env.local`**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-7PKNBN52F3
   GA4_PROPERTY_ID=520060270
   GA4_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
   ```

3. **Verifica que esté en `.gitignore`**:
   - Ya está configurado ✅

4. **Prueba el dashboard**:
   ```bash
   npm run dev
   # Ve a: http://localhost:3001/admin/analytics
   ```

---

**¡Ya estás en el lugar correcto! Solo haz clic en `fastia-analytics` y sigue los pasos para crear la key. ¿Puedes hacer clic en el Service Account ahora?**
