# Otorgar Acceso a Nivel de Organización

¡Perfecto! Ya estás en IAM de la organización `evoteam.es`. Ahora necesitas otorgarte el rol.

---

## ✅ Pasos para Otorgar Acceso

### Paso 1: Otorgar Acceso

En la página que ves (IAM de la organización):

1. **Busca el botón**: **"+ Otorgar acceso"** (o "+ GRANT ACCESS")
   - Está arriba, cerca de los filtros

2. **Haz clic en "+ Otorgar acceso"**

3. Se abrirá un diálogo modal

### Paso 2: Añadir tu Usuario

En el diálogo "Otorgar acceso a 'evoteam.es'":

1. **En "New principals"** (Nuevos principales) o "Principales":
   - Ingresa tu email: `info@evoteam.es`
   - O el email con el que estás logueado en Google Cloud

2. **Seleccionar el Rol**:
   - Haz clic en **"Select a role"** (Seleccionar un rol)
   - O busca el campo de roles

3. **Buscar el Rol**:
   - En el selector de roles, busca: **"Organization Policy Administrator"**
   - O escribe: `orgpolicy`
   - O busca: `orgpolicy.policyAdmin`

4. **Seleccionar el Rol**:
   - Selecciona: **"Organization Policy Administrator"**
   - Rol completo: `roles/orgpolicy.policyAdmin`
   - **Verifica que el scope sea "Organization: evoteam.es"**

5. **Guardar**:
   - Haz clic en **"SAVE"** o **"Guardar"**
   - Espera unos segundos a que se guarde

---

## ⏰ Paso 3: Esperar Propagación

**Importante**: Los cambios de permisos a nivel de organización pueden tardar:

1. **Espera 2-5 minutos** después de guardar
2. **Cierra todas las pestañas** de Google Cloud Console
3. **Abre una nueva pestaña** y vuelve a acceder
4. **Inicia sesión nuevamente** si es necesario

---

## ✅ Paso 4: Verificar y Modificar la Política

Después de esperar:

1. **Ve a**: IAM & Admin → Organization Policies
   - Puedes estar en el contexto del proyecto o de la organización

2. **Busca** la política: `iam.disableServiceAccountKeyCreation` (la activa)

3. **Haz clic** en la política

4. **Verifica** que el botón **"Administrar política"** ahora esté **habilitado** (ya no debería estar gris)

5. **Haz clic** en "Administrar política"

6. **Cambia** de:
   - **"Heredar política del superior"** 
   - A **"No aplicar"** (Not Enforce)

7. **Guarda** los cambios

8. **Espera 5-10 minutos** para que se propague

---

## 📋 Si No Aparece "Organization Policy Administrator" en el Selector

### Opción A: Buscar por ID

En el selector de roles:
1. Escribe directamente: `orgpolicy.policyAdmin`
2. O busca: `Organization Policy`

### Opción B: Verificar Permisos para Asignar Roles

Si no puedes asignar roles a nivel de organización:

1. Puede que necesites el rol **"Organization Administrator"** o **"Owner"** a nivel de organización
2. Verifica que tengas permisos suficientes
3. O contacta al propietario principal de la organización

### Opción C: Verificar la Vista

Aunque la tabla muestre "No hay filas para mostrar", el botón **"+ Otorgar acceso"** debería funcionar normalmente.

---

## 🎯 Resumen Visual

```
1. Estás en: IAM de la organización "evoteam.es" ✅
   ↓
2. Haz clic en: "+ Otorgar acceso" ⬅️ SIGUIENTE PASO
   ↓
3. Ingresa: info@evoteam.es
   ↓
4. Selecciona rol: "Organization Policy Administrator"
   ↓
5. Guarda
   ↓
6. Espera 2-5 minutos
   ↓
7. Refresca y vuelve a Organization Policies
   ↓
8. Verifica que "Administrar política" esté habilitado
   ↓
9. Cambia política a "No aplicar"
```

---

## ⚠️ Importante

- **Scope**: Asegúrate de que el rol se asigne a nivel de **organización** (`evoteam.es`), no de proyecto
- **Propagación**: Los cambios de permisos pueden tardar 2-5 minutos en propagarse
- **Refrescar**: Es recomendable cerrar y reabrir Google Cloud Console después de asignar el rol

---

**¡Desde la página de IAM de la organización, haz clic en "+ Otorgar acceso" y añade el rol "Organization Policy Administrator" a tu usuario!**
