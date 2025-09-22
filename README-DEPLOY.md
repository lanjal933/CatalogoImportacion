# 🚀 Sistema de Catálogo con GitHub Pages

Este proyecto implementa un sistema completo de catálogo de productos que se despliega automáticamente en GitHub Pages con administración web.

## 📋 Características

- ✅ **Catálogo dinámico**: Los productos se cargan desde `products.json`
- ✅ **Administración web**: Panel para editar productos sin código
- ✅ **Auto-deploy**: GitHub Actions despliega automáticamente los cambios
- ✅ **Responsive**: Diseño adaptativo para móviles y desktop
- ✅ **Búsqueda y filtros**: Sistema de búsqueda en tiempo real
- ✅ **Galería de imágenes**: Soporte para múltiples imágenes por producto
- ✅ **Acceso secreto**: Panel de admin oculto con autenticación

## 🏗️ Estructura del Proyecto

```
Catalogo/
├── index.html              # Página principal del catálogo
├── products.json           # Base de datos de productos
├── script.js              # Lógica del catálogo (carga con fetch)
├── styles.css             # Estilos del catálogo
├── admin-panel.html       # Panel de administración
├── admin-script.js        # Lógica del panel de admin
├── admin-styles.css       # Estilos del panel de admin
├── scripts/
│   └── update-catalog.js  # Script para commit/push automático
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions para auto-deploy
├── package.json           # Dependencias del proyecto
└── README-DEPLOY.md       # Este archivo
```

## 🚀 Configuración Inicial

### 1. Configurar GitHub Pages

1. Ve a **Settings** de tu repositorio
2. Busca la sección **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Guarda los cambios

### 2. Configurar GitHub Actions

El archivo `.github/workflows/deploy.yml` ya está configurado. Se ejecutará automáticamente cuando:
- Hagas push a la rama `main`
- Crees un Pull Request
- Lo ejecutes manualmente desde GitHub

### 3. Configurar el Panel de Administración

El panel de administración está en `admin-panel.html` y se accede:
- Escribiendo "admin" en la búsqueda del catálogo
- Usando la combinación de teclas `Ctrl + Shift + A`
- Contraseña por defecto: `1990`

## 📝 Uso del Sistema

### Administrar Productos

1. **Acceder al panel**: Usa cualquiera de los métodos de acceso
2. **Agregar producto**: Click en "Agregar Producto"
3. **Editar producto**: Click en "Editar" en cualquier producto
4. **Eliminar producto**: Click en "Eliminar" (con confirmación)
5. **Guardar cambios**: Click en "Guardar Cambios" para hacer commit/push

### Estructura de Productos

Cada producto en `products.json` debe tener:

```json
{
  "id": 1,
  "name": "Nombre del Producto",
  "category": "categoria",
  "description": "Descripción detallada",
  "price": 1000,
  "image": "fas fa-icon",
  "hasMultipleImages": true,
  "images": [
    {
      "base64": "URL_de_imagen",
      "name": "Nombre de la imagen"
    }
  ],
  "specifications": {
    "Especificación": "Valor",
    "Otra especificación": "Otro valor"
  },
  "stock": 10
}
```

## 🔧 Desarrollo Local

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor local

```bash
npm start
# o
npm run dev
```

El catálogo estará disponible en `http://localhost:8080`

### Validar JSON

```bash
npm run validate-json
```

### Actualizar catálogo manualmente

```bash
npm run update-catalog
```

## 🌐 Despliegue

### Automático (Recomendado)

1. Haz cambios en el panel de administración
2. Click en "Guardar Cambios"
3. El sistema hace commit/push automáticamente
4. GitHub Actions despliega en 2-3 minutos

### Manual

```bash
# Hacer cambios en products.json
npm run update-catalog
```

## 📊 Monitoreo

### GitHub Actions

- Ve a la pestaña **Actions** en tu repositorio
- Verifica que el workflow `Deploy to GitHub Pages` se ejecute correctamente
- Los logs te mostrarán cualquier error

### URLs importantes

- **Catálogo público**: `https://tu-usuario.github.io/tu-repositorio/`
- **Panel de admin**: `https://tu-usuario.github.io/tu-repositorio/admin-panel.html`
- **Actions**: `https://github.com/tu-usuario/tu-repositorio/actions`

## 🔒 Seguridad

### Panel de Administración

- **Acceso oculto**: No visible en la navegación normal
- **Autenticación**: Requiere contraseña
- **Combinación de teclas**: `Ctrl + Shift + A`
- **Búsqueda secreta**: Escribir "admin" en la búsqueda

### Cambiar contraseña

Edita la variable `ADMIN_PASSWORD` en `script.js`:

```javascript
const ADMIN_PASSWORD = "tu-nueva-contraseña";
```

## 🐛 Solución de Problemas

### El catálogo no carga productos

1. Verifica que `products.json` existe y es válido
2. Abre las herramientas de desarrollador (F12)
3. Revisa la consola para errores
4. Verifica la conexión a internet

### GitHub Actions falla

1. Ve a **Actions** en tu repositorio
2. Click en el workflow fallido
3. Revisa los logs para el error específico
4. Verifica que `products.json` es válido

### Panel de admin no funciona

1. Verifica que `admin-panel.html` existe
2. Revisa la consola del navegador
3. Asegúrate de usar la contraseña correcta
4. Verifica que `admin-script.js` se carga correctamente

### Cambios no se reflejan

1. Verifica que el commit se hizo correctamente
2. Revisa GitHub Actions para errores
3. Espera 2-3 minutos para el despliegue
4. Limpia la caché del navegador (Ctrl+F5)

## 📈 Mejoras Futuras

- [ ] Subida de imágenes reales (actualmente usa placeholders)
- [ ] Sistema de usuarios con diferentes permisos
- [ ] Backup automático de productos
- [ ] Analytics de productos más vistos
- [ ] Integración con WhatsApp para consultas
- [ ] Sistema de categorías dinámico
- [ ] Exportación a PDF del catálogo

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de solución de problemas
2. Abre un issue en GitHub
3. Verifica los logs de GitHub Actions
4. Revisa la consola del navegador para errores

---

**¡Tu catálogo está listo para funcionar! 🎉**

Una vez configurado, podrás administrar productos fácilmente y los cambios se desplegarán automáticamente en GitHub Pages.