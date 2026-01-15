# Clicar en la Política Activa

Veo que estás en la lista de políticas. Necesitas hacer clic en la **política ACTIVA** para desactivarla.

---

## 🎯 Paso Único: Hacer Clic en la Política Activa

### En la tabla que ves, hay DOS políticas:

1. **"Disable service account key creation"** - **Inactiva** (gris) ❌
   - ID: `iam.managed.disableServiceAccountKeyCreation`
   - Esta NO es la que bloquea

2. **"Disable service account key creation"** - **Activa** (verde) ✅ ⬅️ **ESTA ES**
   - ID: `iam.disableServiceAccountKeyCreation`
   - Estado: **"Activa"** (marca verde ✓)
   - Fuente: "Heredar política del superior"
   - **Esta es la que está bloqueando la creación de keys**

---

## ✅ Acción Requerida

**Haz clic en la política que está "Activa"** (la que tiene la marca verde ✓)

- Es la segunda fila en la tabla
- Nombre: "Disable service account key creation"
- ID: `iam.disableServiceAccountKeyCreation`
- Estado: **"Activa"** (con el círculo verde)

---

## 📋 Una Vez Dentro de la Política

Después de hacer clic en la política activa, verás la página de detalles. Entonces:

1. **Busca el botón**: **"Administrar política"** (Manage policy)
   - Está cerca del título de la política

2. **Haz clic en "Administrar política"**

3. **En el diálogo que aparece**:
   - Cambia de **"Heredar política del superior"** 
   - A **"No aplicar"** (Not Enforce)
   - O busca una opción para crear una excepción del proyecto

4. **Guarda los cambios**

5. **Espera 5-10 minutos** para que se propague

6. **Vuelve a Service Accounts** y prueba crear la key nuevamente

---

## 🔍 Cómo Identificar la Política Correcta

- ✅ **Estado**: "Activa" (con círculo verde)
- ✅ **ID**: `iam.disableServiceAccountKeyCreation` (sin `.managed`)
- ✅ **Fuente**: "Heredar política del superior"
- ❌ **NO es la que dice**: "Inactiva" o tiene `.managed` en el ID

---

## ⚠️ Si Aparece el Modal de Permisos

Si al hacer clic en "Administrar política" aparece un modal diciendo que necesitas permisos:

- Verifica que tengas el rol **"Administrador de políticas de la organización"**
- O solicita al administrador que cree una excepción para tu proyecto

---

**¡Haz clic en la fila de la política que está "Activa" (verde) para abrirla y poder modificarla!**
