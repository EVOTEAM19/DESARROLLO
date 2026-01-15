# Pasos para Desactivar la Política - Tienes Permisos de Administrador

Veo que tienes el rol **"Administrador de la organización"** en `evoteam.es`. Con este rol, deberías poder modificar las políticas de organización.

---

## 🎯 Pasos Rápidos (Ahora que Tienes Permisos)

### Paso 1: Volver a Organization Policies

1. En el menú izquierdo de Google Cloud Console, haz clic en:
   **"Políticas de la organización"** (Organization Policies)

### Paso 2: Buscar y Acceder a la Política

1. Busca la política: **`iam.disableServiceAccountKeyCreation`**
2. Haz clic en la política que está **"Activa"** (heredada)

### Paso 3: Administrar la Política

1. En la página de detalles de la política, busca el botón:
   **"Administrar política"** o **"Manage policy"**
   
2. Si no ves el botón directamente, busca:
   - Un botón **"Edit"** (Editar)
   - O una sección **"Policy enforcement"** o **"Aplicación de política"**

3. Haz clic en **"Administrar política"**

### Paso 4: Sobrescribir la Política Heredada

En el diálogo que aparece, deberías ver opciones como:

1. **"Inherit from parent"** (Heredar del superior) - actualmente seleccionado
2. **"Enforce"** (Aplicar) - bloquea la creación
3. **"Not Enforce"** (No aplicar) ⬅️ **Selecciona esta opción**

**Cambia la selección:**
- **Deselecciona**: "Heredar política del superior" o "Inherit from parent"
- **Selecciona**: **"Not Enforce"** o **"No aplicar"**

### Paso 5: Guardar

1. Haz clic en **"Guardar"** o **"Save"**
2. Espera unos segundos a que se guarde
3. Verás un mensaje de confirmación

### Paso 6: Verificar

1. Regresa a la lista de políticas
2. Busca nuevamente `iam.disableServiceAccountKeyCreation`
3. Verifica que el estado cambió a:
   - **"No aplicada"** o **"Not Enforce"**
   - Ya no debería decir "Heredada"

---

## 🎉 Una Vez Desactivada la Política

### Crear el Service Account Key

1. Ve a **Service Accounts**
   - Menú izquierdo: **IAM & Admin** → **Service Accounts**

2. Busca y haz clic en: **`fastia-analytics`**

3. Ve a la pestaña **"KEYS"** (Claves)

4. Haz clic en **"ADD KEY"** → **"Create new key"**

5. Selecciona formato: **JSON**

6. Haz clic en **"CREATE"**

7. **Se descargará automáticamente** un archivo JSON
   - ⚠️ **Guárdalo en un lugar seguro**
   - ⚠️ **NO lo subas a Git** (ya está en `.gitignore`)

---

## 🔧 Si Aún No Puedes Modificar la Política

Aunque tengas el rol "Administrador de la organización", es posible que necesites:

### Opción A: Asignar Rol Específico de Políticas

1. Ve a **IAM & Admin** → **IAM**
2. Busca tu usuario: `info@evoteam.es`
3. Haz clic en el icono de editar (✏️) junto a tu rol
4. Añade el rol: **"Organization Policy Administrator"**
   - Rol: `roles/orgpolicy.policyAdmin`
5. Guarda los cambios

### Opción B: Probar desde el Nivel de Proyecto

1. Asegúrate de estar en el proyecto: **"My First Project"**
2. Ve a **IAM & Admin** → **Organization Policies**
3. En el selector de proyecto, verifica que estás en **"My First Project"**
4. Intenta modificar la política desde el contexto del proyecto

### Opción C: Crear Excepción del Proyecto

1. En la página de detalles de la política
2. Busca una opción para **"Create exception"** (Crear excepción)
3. O busca una pestaña que diga **"Exceptions"** (Excepciones)
4. Crea una excepción para el proyecto "My First Project"

---

## ✅ Checklist de Verificación

- [ ] Acceso a "Políticas de la organización" confirmado
- [ ] Política `iam.disableServiceAccountKeyCreation` encontrada
- [ ] Botón "Administrar política" visible y accesible
- [ ] Cambiado a "Not Enforce" o "No aplicar"
- [ ] Cambios guardados correctamente
- [ ] Estado de la política verificado como "No aplicada"
- [ ] Service Account Key creado exitosamente
- [ ] Archivo JSON descargado y guardado de forma segura

---

## 🐛 Solución de Problemas

### "No puedo ver el botón 'Administrar política'"

**Solución**:
- Verifica que estás en el contexto correcto (proyecto u organización)
- Intenta refrescar la página
- Verifica que tengas el rol completo de "Administrador de la organización"

### "Sigo viendo 'Heredada' después de cambiar"

**Solución**:
- Espera 1-2 minutos para que se propague el cambio
- Refresca la página
- Verifica que hayas guardado correctamente
- Intenta crear el Service Account Key de todos modos (puede que funcione aunque diga heredada)

### "Todavía no puedo crear Service Account Keys"

**Solución**:
- Verifica que hayas cambiado la política correcta
- Espera 5-10 minutos después de cambiar la política
- Verifica que el Service Account tenga los permisos necesarios
- Revisa los logs de Google Cloud para errores específicos

---

## 📚 Recursos

- [Organization Policies](https://console.cloud.google.com/iam-admin/orgpolicies)
- [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
- [IAM Permissions](https://console.cloud.google.com/iam-admin/iam)

---

**Con tu rol de "Administrador de la organización", deberías poder modificar la política sin problemas. ¡Sigue los pasos y podrás crear el Service Account Key!**
