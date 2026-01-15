# Solución: Obtener Permisos para "Administrar Política"

El botón "Administrar política" está deshabilitado porque necesitas el rol específico **"Administrador de políticas de la organización"**.

---

## 🎯 Solución: Auto-asignarte el Rol

Como tienes "Administrador de la organización", deberías poder asignarte roles. Sigue estos pasos:

### Paso 1: Ir a IAM

1. Cierra el modal (haz clic fuera o en "Cerrar")
2. En el menú izquierdo, ve a: **IAM & Admin** → **IAM**
3. Asegúrate de estar en el contexto de la **organización** o del **proyecto**

### Paso 2: Buscar tu Usuario

1. En la lista de principales (principals), busca tu email:
   - `info@evoteam.es` o
   - El email con el que estás logueado en Google Cloud

2. Verifica qué roles tienes actualmente

### Paso 3: Añadir el Rol de Políticas

1. Haz clic en el icono de **editar** (✏️) junto a tu email
2. O haz clic en tu fila y luego en **"Edit principal"** o **"Editar"**

3. En el diálogo que aparece:
   - Busca **"Add another role"** o **"Añadir otro rol"**
   - O busca el botón **"+"** o **"GRANT ACCESS"**

4. Añade el rol: **"Organization Policy Administrator"**
   - En el selector de roles, busca: `orgpolicy.policyAdmin`
   - O busca: "Organization Policy Administrator"
   - Rol completo: `roles/orgpolicy.policyAdmin`

5. **Scope** (Ámbito):
   - Selecciona: **"Organization: evoteam.es"** (nivel de organización)
   - O **"Project: My First Project"** (puede que no sea suficiente si la política es heredada)

6. Haz clic en **"SAVE"** (Guardar)

### Paso 4: Verificar

1. Refresca la página de Organization Policies
2. Vuelve a la política `iam.disableServiceAccountKeyCreation`
3. Ahora el botón **"Administrar política"** debería estar habilitado
4. Haz clic en él y podrás cambiar la política

---

## 🔧 Alternativa: Desde la Página de IAM del Proyecto

### Paso 1: Ir a IAM del Proyecto

1. Asegúrate de estar en el proyecto: **"My First Project"**
2. Ve a **IAM & Admin** → **IAM**

### Paso 2: Otorgar Acceso

1. Haz clic en **"+ GRANT ACCESS"** o **"+ OTORGAR ACCESO"** (botón en la parte superior)

2. En **"New principals"** (Nuevos principales):
   - Ingresa tu email: `info@evoteam.es`

3. En **"Select a role"** (Seleccionar un rol):
   - Busca: **"Organization Policy Administrator"**
   - O busca: `orgpolicy.policyAdmin`

4. Haz clic en **"SAVE"** (Guardar)

---

## 🆘 Si No Puedes Asignarte el Rol

### Opción A: Contactar al Administrador de la Organización

Si no puedes auto-asignarte el rol:

1. Contacta al administrador de la organización `evoteam.es`
2. Solicita que te asignen el rol: **"Organization Policy Administrator"**
   - Rol: `roles/orgpolicy.policyAdmin`
   - Scope: A nivel de organización `evoteam.es`

3. Proporciona estos detalles:
   - **Tu email**: `info@evoteam.es`
   - **Rol necesario**: `roles/orgpolicy.policyAdmin`
   - **Motivo**: Modificar la política `iam.disableServiceAccountKeyCreation` para permitir Service Account Keys en "My First Project"

### Opción B: Solicitar Excepción Directa

Alternativamente, solicita que el administrador:

1. Vaya a **Organization Policies**
2. Busque `iam.disableServiceAccountKeyCreation`
3. Cree una **excepción** para el proyecto "My First Project"
4. Configure la excepción como **"Not Enforce"**

---

## 📋 Resumen de Permisos Necesarios

Para editar políticas de organización necesitas:

- **Rol**: `roles/orgpolicy.policyAdmin` (Organization Policy Administrator)
- **Permisos específicos**:
  - `orgpolicy.policy.get`
  - `orgpolicy.policies.create`
  - `orgpolicy.policies.delete`
  - `orgpolicy.policies.update`

**Scope**: Preferiblemente a nivel de **organización** (no solo proyecto), ya que la política es heredada.

---

## ✅ Checklist

- [ ] Ir a IAM & Admin → IAM
- [ ] Buscar tu usuario (info@evoteam.es)
- [ ] Añadir rol "Organization Policy Administrator"
- [ ] Scope: Organización evoteam.es (preferible)
- [ ] Guardar cambios
- [ ] Refrescar página de Organization Policies
- [ ] Verificar que "Administrar política" esté habilitado
- [ ] Cambiar política a "Not Enforce"

---

## 🎯 Una Vez Tengas los Permisos

Después de obtener el rol `orgpolicy.policyAdmin`:

1. Ve a **Organization Policies**
2. Haz clic en `iam.disableServiceAccountKeyCreation` (la activa)
3. Haz clic en **"Administrar política"** (ahora debería estar habilitado)
4. Cambia de **"Heredar política del superior"** a **"No aplicar"**
5. Guarda
6. Espera 5-10 minutos
7. Vuelve a Service Accounts y crea la key

---

**El problema es que falta el rol específico de políticas. Auto-asígnate el rol "Organization Policy Administrator" en IAM y deberías poder modificar la política. ¿Puedes ir a IAM y añadir ese rol a tu usuario?**
