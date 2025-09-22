// Array de productos - se cargará desde el HTML
let products = [];

// Variables globales
let filteredProducts = [...products];
let currentCategory = 'todos';

// Elementos del DOM (se inicializarán cuando el DOM esté listo)
let productsGrid;
let searchInput;
let filterButtons;
let productModal;
let modalBody;
let closeModal;

// Inicialización
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== INICIALIZANDO CATÁLOGO ===');
    
    // Obtener elementos del DOM
    productsGrid = document.getElementById('productsGrid');
    searchInput = document.getElementById('searchInput');
    filterButtons = document.querySelectorAll('.filter-btn');
    productModal = document.getElementById('productModal');
    modalBody = document.querySelector('.modal-body');
    closeModal = document.querySelector('.close');
    
    console.log('Elementos del DOM:');
    console.log('- productsGrid:', productsGrid);
    console.log('- searchInput:', searchInput);
    console.log('- productModal:', productModal);
    
    // Configurar event listeners primero
    setupEventListeners();
    
    // Luego inicializar productos (ahora es async)
    await initializeProducts();
    
    console.log('=== INICIALIZACIÓN COMPLETADA ===');
});

// Configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners');
    
    // Búsqueda
    if (searchInput) {
        console.log('Configurando búsqueda en:', searchInput);
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
        
        // Agregar funcionalidad de autocompletado
        searchInput.addEventListener('focus', showSearchSuggestions);
        searchInput.addEventListener('blur', () => {
            setTimeout(() => hideSearchSuggestions(), 200);
        });
        
        console.log('Event listeners de búsqueda configurados');
    } else {
        console.error('searchInput no encontrado para configurar event listeners');
    }
    
    // Filtros de categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', handleCategoryFilter);
    });
    
    // Modal
    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }
    if (productModal) {
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }
    
    // Navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cargar productos desde el HTML
function loadProductsFromHTML() {
    try {
        console.log('Cargando productos desde el HTML...');
        
        // Productos WPC definidos directamente
        products = [
            {
                id: 1,
                name: "Wpc interior nogal con fondo negro",
                description: "WPC (Wood Plastic Composite) para uso interior con acabado nogal y fondo negro. Material resistente y duradero ideal para revestimientos interiores.",
                image: "productos/Wpcinteriornogalconfondonegro.jpg",
                specifications: {
                    "Tipo": "WPC Interior",
                    "Acabado": "Nogal con fondo negro",
                    "Uso": "Interior",
                    "Material": "Wood Plastic Composite"
                }
            },
            {
                id: 2,
                name: "Wpc interior negro",
                description: "WPC (Wood Plastic Composite) para uso interior en color negro. Perfecto para revestimientos interiores modernos y elegantes.",
                image: "productos/Wpcinteriornegro.jpg",
                specifications: {
                    "Tipo": "WPC Interior",
                    "Color": "Negro",
                    "Uso": "Interior",
                    "Material": "Wood Plastic Composite"
                }
            },
            {
                id: 3,
                name: "Wpc exterior negro",
                description: "WPC (Wood Plastic Composite) para uso exterior en color negro. Resistente a la intemperie y perfecto para fachadas y revestimientos exteriores.",
                image: "productos/Wpcexteriornegro.jpg",
                specifications: {
                    "Tipo": "WPC Exterior",
                    "Color": "Negro",
                    "Uso": "Exterior",
                    "Material": "Wood Plastic Composite"
                }
            },
            {
                id: 4,
                name: "Wpc exterior nogal oscuro",
                description: "WPC (Wood Plastic Composite) para uso exterior con acabado nogal oscuro. Ideal para fachadas y revestimientos exteriores con apariencia de madera natural.",
                image: "productos/Wpcexteriornogaloscuro.jpg",
                specifications: {
                    "Tipo": "WPC Exterior",
                    "Acabado": "Nogal oscuro",
                    "Uso": "Exterior",
                    "Material": "Wood Plastic Composite"
                }
            }
        ];
        
        filteredProducts = [...products];
        
        console.log(`Productos WPC cargados exitosamente: ${products.length} productos`);
        
        // Guardar en localStorage como backup
        localStorage.setItem('catalogProducts', JSON.stringify(products));
        localStorage.setItem('catalogLastUpdate', new Date().toISOString());
        
        return true;
    } catch (error) {
        console.error('Error cargando productos desde HTML:', error);
        showNotification('Error cargando productos WPC.', 'error');
        return false;
    }
}

// Inicializar productos
function initializeProducts() {
    console.log('Inicializando productos WPC...');
    console.log('Entorno:', window.location.hostname);
    console.log('URL actual:', window.location.href);
    
    const success = loadProductsFromHTML();
    if (success) {
        // Los productos ya están en el HTML, no necesitamos renderizar
        console.log('Productos WPC inicializados correctamente');
        
        // Verificar que los elementos del modal estén disponibles
        if (!productModal) {
            console.error('❌ productModal no está disponible');
            productModal = document.getElementById('productModal');
            console.log('productModal después de búsqueda:', productModal);
        }
        
        if (!modalBody) {
            console.error('❌ modalBody no está disponible');
            modalBody = document.querySelector('.modal-body');
            console.log('modalBody después de búsqueda:', modalBody);
        }
        
        // Renderizar productos
        renderProducts();
        
    } else {
        // Mostrar mensaje de error en la interfaz
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #dc3545; margin-bottom: 1rem;"></i>
                    <h3>Error cargando productos WPC</h3>
                    <p>No se pudieron cargar los productos WPC.</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-refresh"></i> Reintentar
                    </button>
                </div>
            `;
        }
    }
}

// Renderizar productos
function renderProducts() {
    console.log('Renderizando productos');
    console.log('productsGrid:', productsGrid);
    console.log('filteredProducts:', filteredProducts);
    
    if (!productsGrid) {
        console.error('productsGrid no encontrado');
        return;
    }
    
    if (filteredProducts.length === 0) {
        console.log('No hay productos para mostrar');
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o la búsqueda</p>
            </div>
        `;
        return;
    }
    
    console.log(`Mostrando ${filteredProducts.length} productos`);
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    console.log('Productos renderizados correctamente');
}

// Crear tarjeta de producto
function createProductCard(product) {
    console.log('Creando tarjeta para producto:', product);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img" onclick="openProductImageZoom('${product.image}', '${product.name}', '${product.image}')">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    ${Object.entries(product.specifications).map(([key, value]) => 
                        `<span class="spec-item"><strong>${key}:</strong> ${value}</span>`
                    ).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Manejar búsqueda
function handleSearch() {
    console.log('Búsqueda iniciada');
    
    if (!searchInput) {
        console.error('searchInput no encontrado');
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log('Término de búsqueda:', searchTerm);
    
    // Verificar si se escribió "abrir" para acceso administrativo
    if (searchTerm === 'abrir' || searchTerm === 'admin' || searchTerm === 'administrador') {
        showNotification('Acceso administrativo detectado. Abriendo panel...', 'info');
        setTimeout(() => {
            showAuthModal();
        }, 1000);
        return;
    }
    
    if (searchTerm === '') {
        console.log('Búsqueda vacía, mostrando todos los productos');
        filteredProducts = [...products];
    } else {
        console.log('Filtrando productos por término:', searchTerm);
        
        // Búsqueda mejorada con múltiples criterios
        filteredProducts = products.filter(product => {
            const searchLower = searchTerm.toLowerCase();
            
            // Búsqueda por nombre del producto
            if (product.name.toLowerCase().includes(searchLower)) {
                return true;
            }
            
            // Búsqueda por descripción
            if (product.description.toLowerCase().includes(searchLower)) {
                return true;
            }
            
            // Búsqueda por especificaciones
            if (product.specifications) {
                for (const [key, value] of Object.entries(product.specifications)) {
                    if (value.toLowerCase().includes(searchLower)) {
                        return true;
                    }
                }
            }
            
            return false;
        });
    }
    
    console.log('Productos filtrados:', filteredProducts.length);
    
    // Mostrar mensaje de resultados
    showSearchResults(filteredProducts.length, searchTerm);
    
    // Renderizar productos
    renderProducts();
}

// Función para mostrar resultados de búsqueda
function showSearchResults(resultCount, searchTerm) {
    if (!searchInput) return;
    
    // Crear o actualizar el mensaje de resultados
    let resultsMessage = searchInput.parentNode.querySelector('.search-results');
    
    if (!resultsMessage) {
        resultsMessage = document.createElement('div');
        resultsMessage.className = 'search-results';
        searchInput.parentNode.appendChild(resultsMessage);
    }
    
    if (searchTerm === '') {
        resultsMessage.style.display = 'none';
    } else {
        resultsMessage.style.display = 'block';
        
        if (resultCount === 0) {
            resultsMessage.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <span>No se encontraron productos para "${searchTerm}"</span>
                </div>
            `;
        } else {
            resultsMessage.innerHTML = `
                <div class="search-results-count">
                    <i class="fas fa-check-circle"></i>
                    <span>${resultCount} producto${resultCount !== 1 ? 's' : ''} encontrado${resultCount !== 1 ? 's' : ''} para "${searchTerm}"</span>
                </div>
            `;
        }
    }
}

// Función para mostrar sugerencias de búsqueda
function showSearchSuggestions() {
    if (!searchInput) return;
    
    // Crear o actualizar el contenedor de sugerencias
    let suggestionsContainer = searchInput.parentNode.querySelector('.search-suggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestionsContainer);
    }
    
    // Generar sugerencias basadas en los productos disponibles
    const suggestions = generateSearchSuggestions();
    
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = `
            <div class="suggestions-header">
                <i class="fas fa-lightbulb"></i>
                <span>Sugerencias de búsqueda:</span>
            </div>
            <div class="suggestions-list">
                ${suggestions.map(suggestion => `
                    <div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">
                        <i class="fas fa-search"></i>
                        <span>${suggestion}</span>
                    </div>
                `).join('')}
            </div>
        `;
        suggestionsContainer.style.display = 'block';
    }
}

// Función para ocultar sugerencias de búsqueda
function hideSearchSuggestions() {
    if (!searchInput) return;
    
    const suggestionsContainer = searchInput.parentNode.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Función para generar sugerencias de búsqueda
function generateSearchSuggestions() {
    const suggestions = [];
    
    // Agregar tipos de productos
    suggestions.push('WPC Interior', 'WPC Exterior');
    
    // Agregar colores/acabados
    suggestions.push('Negro', 'Nogal', 'Nogal oscuro');
    
    // Agregar usos
    suggestions.push('Interior', 'Exterior');
    
    // Agregar materiales
    suggestions.push('Wood Plastic Composite');
    
    return suggestions;
}

// Función para seleccionar una sugerencia
function selectSuggestion(suggestion) {
    if (!searchInput) return;
    
    searchInput.value = suggestion;
    handleSearch();
    hideSearchSuggestions();
}

// Ver producto en modal
function viewProduct(productId) {
    console.log('=== ABRIENDO MODAL ===');
    console.log('Producto ID solicitado:', productId);
    console.log('Productos disponibles:', products);
    console.log('productModal elemento:', productModal);
    console.log('modalBody elemento:', modalBody);
    
    // Verificar que el modal esté disponible
    if (!productModal) {
        productModal = document.getElementById('productModal');
        console.log('Modal encontrado:', productModal);
    }
    
    if (!modalBody) {
        modalBody = document.querySelector('.modal-body');
        console.log('Modal body encontrado:', modalBody);
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('❌ Producto no encontrado con ID:', productId);
        alert('Producto no encontrado');
        return;
    }
    
    console.log('✅ Producto encontrado:', product);
    console.log('Imagen del producto:', product.image);
    
    // Crear contenido de imagen
    const imageContent = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}" class="product-modal-image" style="max-width: 100%; max-height: 600px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); cursor: pointer;" onclick="openImageZoomFromProduct('${product.image}', '${product.name}')">
            <div class="image-zoom-hint" style="text-align: center; margin-top: 1rem; color: #666; font-size: 0.9rem;">
                <i class="fas fa-search-plus"></i> Hacer clic en la imagen para ampliarla
            </div>
        </div>
    `;
    
    console.log('Contenido de imagen generado:', imageContent);
    
    modalBody.innerHTML = `
        <div class="product-modal">
            <div class="product-modal-header">
                <h2>${product.name}</h2>
            </div>
            <div class="product-modal-content">
                ${imageContent}
                <div class="product-modal-details">
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-specifications">
                        <h4>Especificaciones Técnicas:</h4>
                        <ul>
                            ${Object.entries(product.specifications).map(([key, value]) => 
                                `<li><strong>${key}:</strong> ${value}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="closeProductModal()">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('Modal configurado, mostrando...');
    console.log('productModal:', productModal);
    console.log('modalBody.innerHTML length:', modalBody.innerHTML.length);
    
    if (productModal) {
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal mostrado correctamente');
        console.log('Modal display style:', productModal.style.display);
    } else {
        console.error('❌ productModal no está disponible');
        alert('Error: Modal no disponible. Verifique la consola para más detalles.');
    }
}

// Cerrar modal
function closeProductModal() {
    if (productModal) {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Función para abrir modal de imagen ampliada desde imagen de producto individual
function openImageZoomFromProduct(imageSrc, productName) {
    console.log('Abriendo modal de imagen ampliada para imagen:', imageSrc);
    
    const imageZoomModal = document.getElementById('imageZoomModal');
    const imageZoomImage = document.getElementById('imageZoomImage');
    const imageZoomInfo = document.getElementById('imageZoomInfo');
    const imageZoomNav = document.getElementById('imageZoomNav');
    
    // Configurar imagen ampliada
    imageZoomImage.src = imageSrc;
    imageZoomInfo.innerHTML = `
        <strong>${productName}</strong>
    `;
    
    // No mostrar navegación para imágenes individuales
    imageZoomNav.innerHTML = '';
    
    // Mostrar modal
    imageZoomModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para abrir modal de imagen ampliada desde clic en imagen de producto o banner
function openProductImageZoom(originalImageSrc, productName, installedImageSrc) {
    console.log('Abriendo modal de imagen ampliada para producto:', productName);
    
    const imageZoomModal = document.getElementById('imageZoomModal');
    const imageZoomImage = document.getElementById('imageZoomImage');
    const imageZoomInfo = document.getElementById('imageZoomInfo');
    const imageZoomNav = document.getElementById('imageZoomNav');
    
    // Configurar imagen ampliada con la imagen del producto instalado
    imageZoomImage.src = installedImageSrc;
    imageZoomInfo.innerHTML = `
        <strong>${productName}</strong><br>
        <small>Producto instalado</small>
    `;
    
    // No mostrar navegación para imágenes individuales
    imageZoomNav.innerHTML = '';
    
    // Mostrar modal
    imageZoomModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    const imageZoomModal = document.getElementById('imageZoomModal');
    imageZoomModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal de imagen ampliada al hacer clic fuera
document.addEventListener('click', function(event) {
    const imageZoomModal = document.getElementById('imageZoomModal');
    if (event.target === imageZoomModal) {
        closeImageZoom();
    }
});

// Cerrar modal de imagen ampliada con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageZoom();
    }
});

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        maxWidth: '300px',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== SISTEMA DE ACCESO SECRETO AL ADMIN =====

// Contraseña del admin (primera capa de seguridad - acceso secreto)
const ADMIN_PASSWORD = "1990";

// Variables para el modal de autenticación
let authModal, authForm, adminPasswordInput, authClose, authCancel;

// Inicializar sistema de acceso secreto
function initializeSecretAccess() {
    // Obtener elementos del modal de autenticación
    authModal = document.getElementById('authModal');
    authForm = document.getElementById('authForm');
    adminPasswordInput = document.getElementById('adminPassword');
    authClose = document.querySelector('.auth-close');
    authCancel = document.querySelector('.auth-cancel');
    
    // Configurar event listeners
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    if (authClose) {
        authClose.addEventListener('click', closeAuthModal);
    }
    
    if (authCancel) {
        authCancel.addEventListener('click', closeAuthModal);
    }
    
    // Cerrar modal al hacer clic fuera
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });
    }
    
    // Configurar combinación de teclas secreta (Ctrl + Shift + A)
    document.addEventListener('keydown', handleSecretKeyCombination);
    
    // Verificar si ya se accedió al admin y mostrar el botón
    checkAdminAccess();
}

// Manejar combinación de teclas secreta
function handleSecretKeyCombination(e) {
    // Ctrl + Shift + A
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        showAuthModal();
    }
}

// Mostrar modal de autenticación
function showAuthModal() {
    if (authModal) {
        authModal.style.display = 'block';
        adminPasswordInput.focus();
        
        // Limpiar campo de contraseña
        adminPasswordInput.value = '';
        
        // Agregar clase para animación
        setTimeout(() => {
            authModal.classList.add('show');
        }, 10);
    }
}

// Cerrar modal de autenticación
function closeAuthModal() {
    if (authModal) {
        authModal.classList.remove('show');
        setTimeout(() => {
            authModal.style.display = 'none';
        }, 300);
    }
}

// Verificar si ya se accedió al admin
function checkAdminAccess() {
    const hasAccessedAdmin = localStorage.getItem('adminAccessed');
    const adminLink = document.querySelector('.admin-link');
    
    if (hasAccessedAdmin === 'true' && adminLink) {
        // Mostrar el botón de admin
        adminLink.classList.add('visible');
        
        // Agregar event listener para el botón visible
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal();
        });
    } else if (adminLink) {
        // Ocultar enlace admin si no se ha accedido
        adminLink.classList.remove('visible');
    }
}

// Marcar que se accedió al admin
function markAdminAccessed() {
    const wasFirstTime = !localStorage.getItem('adminAccessed');
    localStorage.setItem('adminAccessed', 'true');
    
    if (wasFirstTime) {
        showNotification('Panel de administrador habilitado. El botón estará visible en futuras visitas.', 'success');
    }
    
    checkAdminAccess();
}

// Resetear acceso al admin
function resetAdminAccess() {
    if (confirm('¿Estás seguro de que quieres ocultar el botón de administrador? Podrás volver a acceder usando Ctrl + Shift + A.')) {
        localStorage.removeItem('adminAccessed');
        checkAdminAccess();
        closeAuthModal();
        showNotification('Botón de administrador ocultado. Usa Ctrl + Shift + A para volver a acceder.', 'info');
    }
}

// Manejar envío del formulario de autenticación
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const password = adminPasswordInput.value.trim();
    
    if (password === ADMIN_PASSWORD) {
        // Contraseña correcta - marcar acceso y redirigir
        markAdminAccessed();
        showNotification('Acceso autorizado. Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = 'admin-access.html';
        }, 1500);
    } else {
        // Contraseña incorrecta
        showNotification('Contraseña incorrecta. Intente nuevamente.', 'error');
        adminPasswordInput.value = '';
        adminPasswordInput.focus();
        
        // Agregar efecto de shake
        authForm.classList.add('shake');
        setTimeout(() => {
            authForm.classList.remove('shake');
        }, 500);
    }
}

// Inicializar sistema de acceso secreto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeSecretAccess();
});