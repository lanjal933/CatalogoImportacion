# 🚀 Instalación Rápida - Sistema de Catálogo

## ⚡ Configuración en 5 minutos

### 1. 📁 Subir archivos a GitHub

```bash
# Clonar tu repositorio (si no lo tienes)
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
cd TU-REPOSITORIO

# Copiar todos los archivos del proyecto
# (todos los archivos que se crearon)

# Hacer commit inicial
git add .
git commit -m "Sistema de catálogo inicial"
git push origin main
```

### 2. ⚙️ Configurar GitHub Pages

1. Ve a **Settings** de tu repositorio en GitHub
2. Busca **Pages** en el menú lateral
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### 3. 🔧 Personalizar configuración

Edita `config.js` y cambia:

```javascript
github: {
    repository: "TU-USUARIO/TU-REPOSITORIO", // Tu repositorio
    pagesUrl: "https://TU-USUARIO.github.io/TU-REPOSITORIO/" // Tu URL
}
```

### 4. 🔐 Cambiar contraseñas

En `script.js` y `admin-access.html`, cambia:

```javascript
const ADMIN_PASSWORD = "TU-CONTRASEÑA-SEGURA";
```

### 5. ✅ ¡Listo!

- **Catálogo público**: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
- **Panel de admin**: Escribe "admin" en la búsqueda o usa `Ctrl + Shift + A`

## 🎯 Acceso al Panel de Administración

### Método 1: Búsqueda secreta
1. Ve al catálogo
2. En la barra de búsqueda, escribe: `admin`
3. Se abrirá el panel de autenticación

### Método 2: Combinación de teclas
1. Ve al catálogo
2. Presiona: `Ctrl + Shift + A`
3. Se abrirá el panel de autenticación

### Método 3: Acceso directo
1. Ve a: `https://TU-USUARIO.github.io/TU-REPOSITORIO/admin-access.html`
2. Usa las credenciales configuradas

## 📝 Agregar Productos

1. **Accede al panel de administración**
2. **Click en "Agregar Producto"**
3. **Llena el formulario:**
   - Nombre del producto
   - Categoría
   - Descripción
   - Precio (opcional)
   - Stock
   - Icono (FontAwesome)
   - Especificaciones técnicas
4. **Click en "Agregar Producto"**
5. **Click en "Guardar Cambios"** para publicar

## 🔄 Flujo de Actualización

```
Panel Admin → Editar Productos → Guardar Cambios → 
Commit/Push Automático → GitHub Actions → 
Deploy en GitHub Pages → Catálogo Actualizado
```

## 🛠️ Comandos Útiles

```bash
# Validar JSON
npm run validate-json

# Servidor local
npm start

# Actualizar catálogo manualmente
npm run update-catalog
```

## 📞 Soporte

Si algo no funciona:

1. **Revisa GitHub Actions** en la pestaña Actions de tu repo
2. **Verifica la consola del navegador** (F12)
3. **Confirma que products.json es válido**
4. **Espera 2-3 minutos** para el despliegue automático

## 🎉 ¡Tu catálogo está listo!

Una vez configurado, podrás:
- ✅ Administrar productos desde la web
- ✅ Los cambios se publican automáticamente
- ✅ El catálogo se actualiza en tiempo real
- ✅ Todo funciona sin servidor propio

**¡Disfruta tu nuevo sistema de catálogo! 🚀**