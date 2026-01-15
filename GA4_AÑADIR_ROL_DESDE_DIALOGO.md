# Añadir Rol desde el Diálogo Abierto

¡Perfecto! Ya tienes el diálogo de edición abierto. Añade el rol faltante desde aquí.

---

## ✅ Pasos desde el Diálogo Actual

### Paso 1: Añadir el Rol

En el diálogo "Edita el acceso a 'My First Project'" que tienes abierto:

1. **Busca el botón**: **"+ Agregar otro rol"** (o "+ Add another role")
   - Está debajo de los roles que ya tienes asignados

2. **Haz clic en "+ Agregar otro rol"**

3. **Se abrirá un selector de roles**

### Paso 2: Buscar el Rol Específico

En el selector de roles:

1. **Busca**: `orgpolicy.policyAdmin`
   - O escribe: **"Organization Policy Administrator"**
   - O busca: **"Policy Administrator"**

2. **Selecciona**: **"Organization Policy Administrator"**
   - Rol: `roles/orgpolicy.policyAdmin`

3. El rol se añadirá a la lista de roles asignados

### Paso 3: Verificar el Scope

Importante: Aunque estás editando el acceso del proyecto, el rol debería funcionar. Sin embargo, si el diálogo te permite cambiar el **scope** o **ámbito**:

- **Si puedes elegir**: Selecciona **"Organization: evoteam.es"** (nivel de organización)
- **Si no puedes elegir**: Dejar en proyecto está bien, pero puede que no sea suficiente

### Paso 4: Guardar

1. **Haz clic en "Guardar"** (botón en la parte inferior del diálogo)

2. **Espera** unos segundos a que se guarden los cambios

3. Verás una confirmación

---

## 🎯 Después de Añadir el Rol

### Paso 5: Verificar que Funciona

1. **Cierra este diálogo** (si no se cierra automáticamente)

2. **Ve a**: IAM & Admin → Organization Policies

3. **Busca** la política: `iam.disableServiceAccountKeyCreation` (la activa)

4. **Haz clic** en la política

5. **Verifica** que el botón **"Administrar política"** ahora esté **habilitado** (ya no gris)

6. **Haz clic** en "Administrar política"

7. **Cambia** de "Heredar política del superior" a **"No aplicar"** (Not Enforce)

8. **Guarda**

---

## ⚠️ Si el Rol No Aparece en el Selector

Si no encuentras "Organization Policy Administrator" en el selector:

### Opción A: Buscar por ID

1. En el selector de roles, escribe directamente: `orgpolicy`
2. Debería aparecer: `Organization Policy Administrator`

### Opción B: Verificar Permisos para Asignar Roles

Aunque tienes "Owner", es posible que necesites:
- Asignar el rol a nivel de **organización**, no solo proyecto
- O que el rol `orgpolicy.policyAdmin` solo esté disponible a nivel de organización

### Opción C: Ir a IAM de la Organización

Si el rol no aparece en el proyecto:

1. **Cierra este diálogo**
2. Ve a **IAM & Admin** → **IAM**
3. **Cambia el contexto** al nivel de **organización** (evoteam.es)
   - En el selector superior, selecciona la organización
4. **Busca tu usuario** y añade el rol ahí

---

## 📋 Resumen de Acciones

1. ✅ Diálogo abierto (ya lo tienes)
2. ⬅️ **Haz clic en "+ Agregar otro rol"**
3. ⬅️ **Busca "Organization Policy Administrator"**
4. ⬅️ **Selecciónalo y guarda**
5. Refresca Organization Policies
6. Verifica que "Administrar política" esté habilitado

---

## 🔍 Si "Organization Policy Administrator" No Aparece

**Alternativa**: 

Aunque tienes "Owner" (que debería incluir todos los permisos), el sistema puede requerir explícitamente `orgpolicy.policyAdmin`.

**Si no aparece el rol en el selector**:

1. Cierra el diálogo
2. Ve a **IAM** de la **organización** (evoteam.es), no del proyecto
3. Añade el rol ahí
4. O contacta al administrador principal de la organización

---

**¡Desde el diálogo abierto, haz clic en "+ Agregar otro rol" y busca "Organization Policy Administrator"!**
