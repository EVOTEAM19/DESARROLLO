# Solución: El Rol Debe Estar a Nivel de Organización

El problema es que la política es **heredada de la organización** (`evoteam.es`), por lo que el rol `orgpolicy.policyAdmin` debe estar asignado a nivel de **ORGANIZACIÓN**, no solo de proyecto.

---

## 🎯 Solución: Asignar el Rol a Nivel de Organización

### Paso 1: Cambiar Contexto a la Organización

1. **Cierra el diálogo** actual (si está abierto)

2. **En la parte superior** de Google Cloud Console, busca el **selector de proyecto/organización**
   - Actualmente debe mostrar: "My First Project"

3. **Haz clic en el selector**

4. **Busca y selecciona**: **"evoteam.es"** o la organización
   - O busca en la lista: organizaciones que tengas disponibles

5. **Espera** a que cambie el contexto

### Paso 2: Ir a IAM de la Organización

1. Una vez en el contexto de la **organización**, ve a:
   **IAM & Admin** → **IAM**

2. Ahora verás: **"Permisos de la organización 'evoteam.es'"**
   - (No del proyecto, sino de la organización)

### Paso 3: Buscar tu Usuario

1. En la lista de principales, busca tu email:
   - `info@evoteam.es`

2. **Haz clic** en tu usuario o en el icono de **editar** (✏️)

### Paso 4: Añadir el Rol a Nivel de Organización

En el diálogo de edición:

1. Haz clic en **"+ Agregar otro rol"** o **"+ Add another role"**

2. Busca: **"Organization Policy Administrator"**
   - O busca: `orgpolicy.policyAdmin`
   - O busca: `orgpolicy`

3. **Selecciona**: **"Organization Policy Administrator"**
   - Rol: `roles/orgpolicy.policyAdmin`
   - **Importante**: Ahora el scope debería ser **"Organization: evoteam.es"**

4. Haz clic en **"Guardar"** o **"SAVE"**

5. **Espera** unos segundos a que se guarde

---

## ⏰ Paso 5: Esperar Propagación

**Importante**: Los cambios de permisos pueden tardar:

1. **Espera 2-5 minutos** después de guardar el rol
2. **Cierra todas las pestañas** de Google Cloud Console
3. **Abre una nueva pestaña** y vuelve a acceder
4. Inicia sesión nuevamente si es necesario

---

## ✅ Paso 6: Verificar que Funciona

1. **Ve a**: IAM & Admin → Organization Policies
   - Asegúrate de estar en el contexto del proyecto "My First Project"

2. **Busca** la política: `iam.disableServiceAccountKeyCreation` (la activa)

3. **Haz clic** en la política

4. **Verifica** que el botón **"Administrar política"** ahora esté **habilitado** (ya no gris)

5. **Haz clic** en "Administrar política"

6. **Cambia** de "Heredar política del superior" a **"No aplicar"** (Not Enforce)

7. **Guarda**

---

## 🔄 Si Aún No Funciona Después de Esperar

### Opción A: Verificar el Rol Fue Asignado

1. Ve a **IAM** de la **organización** (evoteam.es)
2. Busca tu usuario: `info@evoteam.es`
3. Verifica que tengas el rol: **"Organization Policy Administrator"**
4. Si no está, añádelo nuevamente

### Opción B: Refrescar Sesión

1. **Cierra completamente** Google Cloud Console
2. **Cierra el navegador** (todas las pestañas)
3. **Abre nuevamente** el navegador
4. **Inicia sesión** en Google Cloud Console
5. **Vuelve a intentar** modificar la política

### Opción C: Contactar Administrador Principal

Si después de asignar el rol a nivel de organización y esperar aún no funciona:

1. Puede que haya restricciones adicionales
2. Contacta al **propietario principal** de la organización `evoteam.es`
3. Solicita que:
   - Verifique que el rol `orgpolicy.policyAdmin` esté correctamente asignado
   - O cree directamente una excepción de la política para "My First Project"

---

## 📋 Checklist Completo

- [ ] Cambiar contexto al nivel de **organización** (evoteam.es)
- [ ] Ir a IAM & Admin → IAM (de la organización)
- [ ] Buscar mi usuario (info@evoteam.es)
- [ ] Añadir rol "Organization Policy Administrator"
- [ ] Verificar que el scope sea "Organization: evoteam.es"
- [ ] Guardar cambios
- [ ] Esperar 2-5 minutos
- [ ] Cerrar y reabrir Google Cloud Console
- [ ] Volver a Organization Policies
- [ ] Verificar que "Administrar política" esté habilitado
- [ ] Cambiar política a "Not Enforce"
- [ ] Esperar 5-10 minutos para propagación
- [ ] Crear Service Account Key

---

## 🎯 Resumen

**El problema**: Añadiste el rol a nivel de **proyecto**, pero la política es heredada de la **organización**.

**La solución**: El rol `orgpolicy.policyAdmin` debe estar asignado a nivel de **organización** (`evoteam.es`), no solo de proyecto.

**Pasos**:
1. Cambiar contexto a la organización
2. IAM de la organización
3. Añadir rol a tu usuario
4. Esperar propagación
5. Intentar modificar la política nuevamente

---

**¡La clave es cambiar el contexto a la ORGANIZACIÓN (evoteam.es) antes de añadir el rol! ¿Puedes hacerlo?**
