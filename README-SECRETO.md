# 🚨 ACCESO SECRETO AL PANEL DE ADMINISTRACIÓN 🚨

## ⚠️ INSTRUCCIONES CONFIDENCIALES ⚠️

Este archivo contiene información sensible para acceder al panel de administración del catálogo industrial.

### 🔑 CREDENCIALES DE ACCESO (SISTEMA DE DOS NIVELES)

#### **NIVEL 1 - Acceso Inicial:**
- **Usuario:** `Alan`
- **Contraseña:** `Zorzzut999`

#### **NIVEL 2 - Acceso Administrativo:**
- **Usuario:** `Admin` (se oculta automáticamente)
- **Contraseña:** `1990`

### 🕵️ MÉTODOS DE ACCESO SECRETO

#### 1. **Combinación de Teclas (MÁS SECRETA)**
- Presiona simultáneamente: `Ctrl + Shift + A`
- Se abrirá un modal de autenticación
- Ingresa la contraseña `1990` directamente
- Serás redirigido al panel de administración

#### 2. **Acceso de Dos Niveles (RECOMENDADO)**
- Navega a: `admin-access.html`
- **Primera vez:** Ingresa `Alan` / `Zorzzut999`
- **Segunda vez:** Solo ingresa la contraseña `1990`
- El sistema recuerda que ya pasaste el primer nivel

#### 3. **Panel Principal (PÚBLICO)**
- Navega a: `admin.html` (acceso directo sin autenticación)

### 🔄 FUNCIONAMIENTO DEL SISTEMA DE DOS NIVELES

1. **Primera visita:** Se solicitan usuario y contraseña del primer nivel
2. **Validación exitosa:** Se marca en localStorage que pasaste el primer nivel
3. **Visitas posteriores:** Solo se pide la contraseña del administrador (`1990`)
4. **Reset:** Se puede resetear el acceso del primer nivel si es necesario

### 🎯 RECOMENDACIONES DE SEGURIDAD

1. **NO compartir** este archivo con personal no autorizado
2. **Cambiar la contraseña** regularmente
3. **Usar el método de combinación de teclas** para mayor discreción
4. **Eliminar este archivo** en producción si es necesario
5. **El sistema recuerda** el acceso del primer nivel para mayor comodidad

### 🔧 PERSONALIZACIÓN

Para cambiar las contraseñas, edita los siguientes archivos:
- `admin-access.html` - Líneas donde están definidas `FIRST_LEVEL_PASSWORD` y `ADMIN_PASSWORD`
- `script.js` - Línea donde está definida `ADMIN_PASSWORD`

### 📱 ACCESO MÓVIL

En dispositivos móviles, la combinación de teclas no está disponible.
Usar el acceso directo a `admin-access.html` o `admin.html`.

### 🔄 RESETEAR ACCESO

Si necesitas resetear el acceso del primer nivel:
1. Abre la consola del navegador (F12)
2. Ejecuta: `localStorage.removeItem('firstLevelPassed')`
3. Recarga la página

---

**⚠️ IMPORTANTE: Mantener esta información en secreto para la seguridad del sistema. ⚠️** 