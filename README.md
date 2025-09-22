# 🏭 Catálogo Industrial Web

Un catálogo web profesional y moderno para empresas industriales, con panel de administración completo y diseño responsive.

## ✨ Características Principales

### 🎨 Diseño y Estilo
- **Estilo Formal e Industrial**: Diseño profesional adaptado al sector industrial
- **Paleta de Colores**: 
  - 🟡 #FFDE11 (Amarillo - Color de marca, botones)
  - ⚫ Negro plano (Texto)
  - ⚪ Blanco (Fondo)
- **Responsive**: Adaptable a todos los dispositivos
- **Tipografía**: Fuente Inter para máxima legibilidad

### 🛍️ Catálogo de Productos
- **Categorías**: Maquinaria, Herramientas, Equipos, Repuestos
- **Filtros Avanzados**: Por categoría y búsqueda de texto
- **Vista Detallada**: Modal con especificaciones técnicas completas
- **Carrito de Compras**: Simulado con localStorage
- **Cotizaciones**: Formulario integrado para solicitudes
- **Banner de Imagen**: Imagen de fondo profesional al inicio
- **Redes Sociales**: WhatsApp e Instagram integrados con funcionalidad
- **Imágenes de Productos**: Soporte para imágenes personalizadas con vista previa

### 🎛️ Panel de Administración
- **Dashboard Completo**: Estadísticas y gráficos en tiempo real
- **Gestión de Productos**: Agregar, editar, eliminar productos
- **Búsqueda y Filtros**: Administración eficiente del inventario
- **Log de Actividad**: Seguimiento de todas las operaciones
- **Almacenamiento Local**: Persistencia de datos con localStorage

### 🚀 Funcionalidades Avanzadas
- **Navegación Suave**: Scroll automático entre secciones
- **Notificaciones**: Sistema de alertas visuales
- **Formularios Validados**: Validación completa de datos
- **Iconos FontAwesome**: Iconografía profesional
- **Animaciones CSS**: Transiciones y efectos visuales

## 📁 Estructura del Proyecto

```
Catalogo/
├── index.html              # Página principal del catálogo
├── admin.html              # Panel de administración
├── admin-access.html       # Página de autenticación
├── styles.css              # Estilos del catálogo principal
├── admin-styles.css        # Estilos del panel de administración
├── script.js               # Funcionalidad del catálogo
├── admin-script.js         # Funcionalidad del panel admin
├── README.md               # Documentación principal
├── README-SECRETO.md       # Instrucciones de acceso secreto
└── test-access.html        # Página de prueba del sistema
```

## 🚀 Cómo Usar

### 1. Abrir el Catálogo
- Abre `index.html` en tu navegador web
- El catálogo se cargará con productos de ejemplo
- Navega por las diferentes secciones usando el menú superior

### 2. Explorar Productos
- **Filtros**: Usa los botones de categoría para filtrar productos
- **Búsqueda**: Escribe en el campo de búsqueda para encontrar productos específicos
- **Vista Detallada**: Haz clic en "Ver Detalles" para ver especificaciones completas
- **Agregar al Carrito**: Simula agregar productos al carrito

### 3. Acceder al Panel de Administración

#### 🔐 **Acceso Público (Menos Seguro)**
- Navega directamente a `admin.html`

#### 🔒 **Acceso con Autenticación (Más Seguro)**
- Navega a `admin-access.html`
- Usuario: `Alan`
- Contraseña: `Zorzzut999`

#### 🕵️ **Acceso Secreto (Más Discreto)**
- En la página principal, presiona `Ctrl + Shift + A`
- Se abrirá un modal de autenticación
- Ingresa las credenciales para acceder

**⚠️ Recomendación**: Usar el acceso secreto para mayor discreción

### 4. Gestionar Productos
- **Dashboard**: Ve estadísticas generales del catálogo
- **Productos**: Lista completa con opciones de edición y eliminación
- **Agregar Producto**: Formulario completo para nuevos productos
- **Editar**: Modifica productos existentes
- **Eliminar**: Elimina productos con confirmación

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con variables CSS y Grid/Flexbox
- **JavaScript ES6+**: Funcionalidad completa y moderna
- **FontAwesome**: Iconografía profesional
- **Google Fonts**: Tipografía Inter
- **localStorage**: Almacenamiento local de datos

## 📱 Responsive Design

El catálogo está completamente optimizado para:
- 📱 **Móviles**: Diseño adaptativo para pantallas pequeñas
- 📱 **Tablets**: Layout optimizado para dispositivos medianos
- 💻 **Desktop**: Experiencia completa en pantallas grandes
- 🖥️ **Pantallas Grandes**: Aprovecha el espacio disponible

## 🎯 Características del Panel Admin

### Dashboard
- Total de productos
- Número de categorías
- Stock total
- Valor total del inventario
- Gráficos de productos por categoría
- Gráficos de stock por categoría
- Actividad reciente

### Gestión de Productos
- Tabla completa con paginación
- Búsqueda y filtros avanzados
- Formularios validados
- Confirmaciones de eliminación
- Log de todas las operaciones
- **Subida de Imágenes**: Campo para imágenes personalizadas con vista previa
- **Validación de Archivos**: Verificación de tipo y tamaño de imagen

### Formularios
- Validación en tiempo real
- Campos obligatorios marcados
- Especificaciones técnicas dinámicas
- Iconos FontAwesome personalizables
- Categorías predefinidas

## 🔧 Personalización

### Cambiar Colores
Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #FFDE11;    /* Color principal */
    --text-color: #000000;       /* Color del texto */
    --bg-color: #ffffff;         /* Color de fondo */
}
```

### Agregar Categorías
En `script.js` y `admin-script.js`, agrega nuevas categorías:
```javascript
// En los filtros
<button class="filter-btn" data-category="nueva-categoria">Nueva Categoría</button>

// En los formularios
<option value="nueva-categoria">Nueva Categoría</option>
```

### Modificar Productos de Ejemplo
Edita el array `products` en `script.js` para cambiar los productos iniciales.

## 📊 Almacenamiento de Datos

- **localStorage**: Todos los productos se guardan localmente
- **Persistencia**: Los datos se mantienen entre sesiones
- **Sincronización**: Cambios en admin se reflejan en el catálogo
- **Backup**: Los datos se pueden exportar/importar manualmente

## 🚀 Funcionalidades Futuras

- [ ] **Base de Datos**: Integración con MySQL/PostgreSQL
- [ ] **Autenticación**: Sistema de login para administradores
- [ ] **Imágenes**: Soporte para imágenes de productos
- [ ] **API REST**: Endpoints para integración externa
- [ ] **Exportación**: PDF, Excel, CSV
- [ ] **Múltiples Idiomas**: Soporte multiidioma
- [ ] **Temas**: Múltiples esquemas de colores

## 📞 Soporte y Contacto

Para soporte técnico o consultas:
- 📧 Email: info@industrialcatalog.com
- 📱 Teléfono: +1 (555) 123-4567
- 🌐 Web: www.industrialcatalog.com

## 📄 Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

**Desarrollado con ❤️ para el sector industrial** 