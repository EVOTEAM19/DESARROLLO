# Cómo Desactivar la Política Heredada

Veo que la política `iam.disableServiceAccountKeyCreation` está **"Activa"** y **"Heredada"** del nivel superior.

## 🔍 Situación Actual

- **Política**: `iam.disableServiceAccountKeyCreation`
- **Estado**: **Activa** (heredada)
- **Tipo**: Administrado (heredado)

Cuando una política está heredada, necesitas **sobrescribirla a nivel de proyecto**.

---

## 📋 Pasos para Desactivar la Política Heredada

### Paso 1: Acceder a la Política

1. En la tabla que ves, haz clic en la política **`iam.disableServiceAccountKeyCreation`** que está **"Activa"**
2. Se abrirá una página de detalle de la política

### Paso 2: Sobrescribir la Política

En la página de detalle verás:

1. **"Inherit from parent"** (Heredar del superior) - seleccionado actualmente
2. Una opción para cambiar esto

**Opciones que deberías ver:**

1. **"Enforce"** (Aplicar) - bloquea la creación de keys
2. **"Not Enforce"** (No aplicar) - permite la creación de keys ⬅️ **Esto es lo que necesitas**
3. **"Inherit from parent"** (Heredar) - usa la política del nivel superior

### Paso 3: Cambiar a "Not Enforce"

1. Selecciona la opción: **"Not Enforce"** (o "No aplicar")
2. Esto creará una **excepción a nivel de proyecto** que sobrescribirá la política heredada
3. Haz clic en **"Save"** (Guardar)

### Paso 4: Verificar

1. Regresa a la lista de políticas
2. Verifica que `iam.disableServiceAccountKeyCreation` ahora muestre:
   - **Estado**: "Not Enforce" (o "No aplicada")
   - Ya no debería decir "Heredada"

---

## 🎯 Alternativa: Si No Ves la Opción "Not Enforce"

Si no puedes cambiar la política directamente, intenta:

### Opción A: Crear una Política Personalizada

1. En Organization Policies, busca **"Create custom policy"** o **"Política personalizada"**
2. Crea una política que permita la creación de Service Account Keys para tu proyecto específico

### Opción B: Contactar al Administrador de la Organización

Si no tienes permisos suficientes:

1. Solicita al administrador de la organización que cree una excepción para tu proyecto
2. O que desactive temporalmente la política a nivel organizacional

---

## ✅ Después de Desactivar

Una vez que la política esté en "Not Enforce":

1. Espera 1-2 minutos para que se propague
2. Ve a **Service Accounts** → **fastia-analytics** → **KEYS**
3. Ahora deberías poder hacer clic en **"ADD KEY"** sin problemas
4. Crea el key en formato JSON
5. Descarga el archivo

---

## 🐛 Solución de Problemas

### No puedo cambiar la política

**Causa**: No tienes permisos suficientes a nivel de organización

**Solución**: 
- Necesitas rol: `roles/orgpolicy.policyAdmin` a nivel de organización
- O solicita al administrador que cree una excepción para tu proyecto

### La política sigue activa después de cambiarla

**Solución**:
- Espera 2-5 minutos para que se propague
- Refresca la página
- Verifica que hayas guardado correctamente

### Todavía no puedo crear keys después de desactivar

**Solución**:
- Verifica que hayas cambiado la política correcta (`iam.disableServiceAccountKeyCreation`)
- Asegúrate de estar en el proyecto correcto: "My First Project"
- Espera unos minutos y vuelve a intentar

---

## 📚 Recursos

- [Google Cloud Organization Policies](https://console.cloud.google.com/iam-admin/orgpolicies)
- [Documentación de Políticas de Organización](https://cloud.google.com/resource-manager/docs/organization-policy/overview)

---

**Una vez desactivada la política, podrás crear el Service Account Key sin problemas.**
