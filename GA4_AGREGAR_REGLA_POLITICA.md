# Agregar Regla para Desactivar la Política

¡Perfecto! Ya estás en la página de edición. Has seleccionado "Anular la política del superior", pero necesitas **agregar una regla** que establezca "No aplicar".

---

## ✅ Pasos para Agregar la Regla

### Paso 1: Agregar una Regla

1. **Busca el botón**: **"Agregar una regla"** (o "Add a rule")
   - Está debajo de la advertencia roja que dice "Se requiere una regla como mínimo..."

2. **Haz clic en "Agregar una regla"**

3. Se abrirá un diálogo o formulario para agregar la regla

### Paso 2: Configurar la Regla

En el formulario que aparece, deberías ver opciones como:

1. **"Enforce"** (Aplicar) - bloquea la creación de keys
2. **"Not Enforce"** (No aplicar) ⬅️ **Selecciona esta opción**
3. **"Allow"** (Permitir) - alternativa que también permitiría crear keys

**Selecciona**: **"Not Enforce"** o **"No aplicar"**

### Paso 3: Guardar la Regla

1. Haz clic en **"Guardar"** o **"Save"** en el formulario de la regla
2. O busca un botón **"Agregar"** o **"Add"**

### Paso 4: Guardar la Política Completa

Después de agregar la regla:

1. Verás la regla agregada en la sección "Reglas"
2. El estado debería mostrar: **"No aplicar"** o **"Not Enforce"**

3. **Haz clic en "Configurar política"** (botón azul en la parte inferior)
   - Este botón guarda todos los cambios de la política

4. Espera a que se guarde (verás una confirmación)

---

## 🎯 Pasos Detallados Visuales

```
Página actual: Editar política
   ↓
Has seleccionado: "Anular la política del superior" ✅
   ↓
Advertencia roja: "Se requiere una regla" ⚠️
   ↓
Haz clic en: "Agregar una regla" ⬅️ SIGUIENTE PASO
   ↓
Selecciona: "Not Enforce" o "No aplicar"
   ↓
Guarda la regla
   ↓
Haz clic en: "Configurar política" (botón azul)
   ↓
Espera confirmación
   ↓
Espera 5-10 minutos para propagación
   ↓
Ve a Service Accounts y crea la key
```

---

## 🔍 Si "Agregar una regla" Abre un Formulario

En el formulario de agregar regla, busca:

### Opción 1: Selector de Estado

1. Un dropdown o selector que dice:
   - **"Enforce"** / **"Aplicar"**
   - **"Not Enforce"** / **"No aplicar"** ⬅️ Selecciona esta
   - **"Allow"** / **"Permitir"**

### Opción 2: Radio Buttons

1. Botones de opción con:
   - ○ Aplicar (Enforce)
   - ● No aplicar (Not Enforce) ⬅️ Selecciona esta
   - ○ Permitir (Allow)

### Opción 3: Checkbox

1. Un checkbox o switch:
   - "Enforce policy" (Aplicar política) - **DESACTIVADO**
   - O "Not enforce" (No aplicar) - **ACTIVADO** ⬅️

---

## ⚠️ Importante

- **Después de agregar la regla**, DEBES hacer clic en **"Configurar política"** (botón azul) para guardar TODOS los cambios
- **Solo agregar la regla no es suficiente** - necesitas guardar la política completa

---

## ✅ Después de Guardar

1. Verás una confirmación o notificación de que la política se actualizó

2. **Espera 5-10 minutos** para que se propague

3. Ve a: **Service Accounts** → **fastia-analytics** → **KEYS**

4. Haz clic en **"ADD KEY"** → **"Create new key"** → **JSON**

5. La key debería crearse sin problemas ✅

---

## 🐛 Si No Puedes Agregar la Regla

### Problema: El formulario de regla está vacío o confuso

**Solución**:
- Busca específicamente un campo o selector que diga "Enforce" / "Not Enforce"
- O busca opciones relacionadas con el estado de la política

### Problema: No aparece la opción "Not Enforce"

**Solución**:
- Asegúrate de estar editando la política correcta (`iam.disableServiceAccountKeyCreation`)
- Intenta seleccionar "Allow" (Permitir) como alternativa
- O busca "Disable enforcement" (Desactivar aplicación)

---

**¡Haz clic en "Agregar una regla" y selecciona "Not Enforce" o "No aplicar"! Después, guarda la política con "Configurar política".**
