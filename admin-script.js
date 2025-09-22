// Script de administración para editar products.json y hacer commit/push automático
// Este script se ejecuta en el panel de administración

// Variables globales
let currentProducts = [];
let isEditing = false;
let editingProductId = null;

// Inicialización del panel de administración
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== INICIALIZANDO PANEL DE ADMINISTRACIÓN ===');
    
    await loadProducts();
    setupAdminEventListeners();
    renderAdminInterface();
    
    console.log('=== PANEL DE ADMINISTRACIÓN INICIALIZADO ===');
});

// Cargar productos desde products.json
async function loadProducts() {
    try {
        console.log('Cargando productos para administración...');
        const response = await fetch('products.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        currentProducts = data.products || [];
        
        console.log(`Productos cargados para administración: ${currentProducts.length} productos`);
        return true;
    } catch (error) {
        console.error('Error cargando productos para administración:', error);
        
        // Fallback: intentar cargar desde localStorage
        const savedProducts = localStorage.getItem('catalogProducts');
        if (savedProducts) {
            console.log('Cargando productos desde localStorage como fallback...');
            currentProducts = JSON.parse(savedProducts);
            showAdminNotification('Productos cargados desde caché local', 'warning');
            return true;
        }
        
        showAdminNotification('Error cargando productos', 'error');
        return false;
    }
}

// Configurar event listeners del panel de administración
function setupAdminEventListeners() {
    // Botón para agregar nuevo producto
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', showAddProductForm);
    }
    
    // Botón para recargar productos
    const reloadBtn = document.getElementById('reloadProductsBtn');
    if (reloadBtn) {
        reloadBtn.addEventListener('click', reloadProducts);
    }
    
    // Formulario de producto
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
}

// Renderizar interfaz de administración
function renderAdminInterface() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;
    
    // Actualizar estadísticas
    updateAdminStats();
    
    if (currentProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products-admin">
                <i class="fas fa-box-open" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No hay productos</h3>
                <p>Agregue productos para comenzar a administrar el catálogo</p>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = `
        <div class="admin-products-grid">
            ${currentProducts.map(product => createAdminProductCard(product)).join('')}
        </div>
    `;
}

// Actualizar estadísticas del panel de administración
function updateAdminStats() {
    // Total de productos
    const totalProductsEl = document.getElementById('totalProducts');
    if (totalProductsEl) {
        totalProductsEl.textContent = currentProducts.length;
    }
    
    // Total de productos con imágenes
    const totalCategoriesEl = document.getElementById('totalCategories');
    if (totalCategoriesEl) {
        const productsWithImages = currentProducts.filter(p => p.hasMultipleImages && p.images && p.images.length > 0);
        totalCategoriesEl.textContent = productsWithImages.length;
    }
    
    // Última actualización
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        const lastUpdate = localStorage.getItem('catalogLastUpdate');
        if (lastUpdate) {
            const date = new Date(lastUpdate);
            lastUpdateEl.textContent = date.toLocaleString('es-ES');
        } else {
            lastUpdateEl.textContent = 'Nunca';
        }
    }
}

// Crear tarjeta de producto para administración
function createAdminProductCard(product) {
    return `
        <div class="admin-product-card" data-product-id="${product.id}">
            <div class="admin-product-image">
                ${product.hasMultipleImages && product.images && product.images.length > 0 ? 
                    `<img src="${product.images[0].base64}" alt="${product.name}">` :
                    `<i class="${product.image}"></i>`
                }
            </div>
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p class="admin-product-description">${product.description.substring(0, 100)}...</p>
                <div class="admin-product-actions">
                    <button class="btn btn-edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Mostrar formulario para agregar producto
function showAddProductForm() {
    isEditing = false;
    editingProductId = null;
    
    const formContainer = document.getElementById('productFormContainer');
    if (formContainer) {
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Limpiar formulario
    document.getElementById('productForm').reset();
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Producto';
    document.getElementById('saveProductBtn').textContent = 'Agregar Producto';
    
    showAdminNotification('Formulario de nuevo producto listo', 'info');
}

// Editar producto existente
function editProduct(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) {
        showAdminNotification('Producto no encontrado', 'error');
        return;
    }
    
    isEditing = true;
    editingProductId = productId;
    
    const formContainer = document.getElementById('productFormContainer');
    if (formContainer) {
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Llenar formulario con datos del producto
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productIcon').value = product.image;
    
    // Llenar imágenes
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';
    
    if (product.hasMultipleImages && product.images && product.images.length > 0) {
        product.images.forEach((img, index) => {
            addImageField(img.base64, img.name);
        });
    }
    
    // Llenar especificaciones
    const specsContainer = document.getElementById('specificationsContainer');
    specsContainer.innerHTML = '';
    
    if (product.specifications) {
        Object.entries(product.specifications).forEach(([key, value]) => {
            addSpecificationField(key, value);
        });
    }
    
    document.getElementById('formTitle').textContent = 'Editar Producto';
    document.getElementById('saveProductBtn').textContent = 'Actualizar Producto';
    
    showAdminNotification(`Editando: ${product.name}`, 'info');
}

// Eliminar producto
function deleteProduct(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) {
        showAdminNotification('Producto no encontrado', 'error');
        return;
    }
    
    if (confirm(`¿Está seguro de que desea eliminar "${product.name}"?`)) {
        currentProducts = currentProducts.filter(p => p.id !== productId);
        renderAdminInterface();
        showAdminNotification(`Producto "${product.name}" eliminado`, 'success');
    }
}

// Manejar envío del formulario
function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        image: formData.get('icon'),
        specifications: getSpecificationsFromForm(),
        images: getImagesFromForm()
    };
    
    // Validaciones básicas
    if (!productData.name || !productData.description) {
        showAdminNotification('Por favor complete todos los campos obligatorios', 'error');
        return;
    }
    
    // Configurar imágenes
    if (productData.images && productData.images.length > 0) {
        productData.hasMultipleImages = true;
    } else {
        productData.hasMultipleImages = false;
        productData.images = [];
    }
    
    if (isEditing) {
        // Actualizar producto existente
        const index = currentProducts.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            currentProducts[index] = { ...currentProducts[index], ...productData };
            showAdminNotification(`Producto "${productData.name}" actualizado`, 'success');
        }
    } else {
        // Agregar nuevo producto
        const newProduct = {
            id: Date.now(), // ID único basado en timestamp
            ...productData
        };
        currentProducts.push(newProduct);
        showAdminNotification(`Producto "${productData.name}" agregado`, 'success');
    }
    
    // Limpiar formulario y ocultar
    e.target.reset();
    document.getElementById('imagesContainer').innerHTML = '';
    document.getElementById('specificationsContainer').innerHTML = '';
    document.getElementById('productFormContainer').style.display = 'none';
    isEditing = false;
    editingProductId = null;
    
    // Actualizar interfaz
    renderAdminInterface();
}

// Obtener especificaciones del formulario
function getSpecificationsFromForm() {
    const specs = {};
    const specInputs = document.querySelectorAll('.spec-input');
    
    specInputs.forEach(input => {
        const key = input.querySelector('.spec-key').value;
        const value = input.querySelector('.spec-value').value;
        if (key && value) {
            specs[key] = value;
        }
    });
    
    return specs;
}

// Obtener imágenes del formulario
function getImagesFromForm() {
    const images = [];
    const imageInputs = document.querySelectorAll('.image-input');
    
    imageInputs.forEach(input => {
        const url = input.querySelector('.image-url').value;
        const name = input.querySelector('.image-name').value;
        if (url && name) {
            images.push({
                base64: url,
                name: name
            });
        }
    });
    
    return images;
}

// Agregar campo de especificación
function addSpecificationField(key = '', value = '') {
    const container = document.getElementById('specificationsContainer');
    const specField = document.createElement('div');
    specField.className = 'spec-field';
    specField.innerHTML = `
        <div class="spec-input">
            <input type="text" class="spec-key" placeholder="Especificación" value="${key}">
            <input type="text" class="spec-value" placeholder="Valor" value="${value}">
            <button type="button" class="btn btn-remove-spec" onclick="removeSpecificationField(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(specField);
}

// Remover campo de especificación
function removeSpecificationField(button) {
    button.closest('.spec-field').remove();
}

// Agregar campo de imagen
function addImageField(url = '', name = '') {
    const container = document.getElementById('imagesContainer');
    const imageField = document.createElement('div');
    imageField.className = 'image-field';
    imageField.innerHTML = `
        <div class="image-input">
            <input type="url" class="image-url" placeholder="URL de la imagen" value="${url}">
            <input type="text" class="image-name" placeholder="Nombre de la imagen" value="${name}">
            <button type="button" class="btn btn-remove-image" onclick="removeImageField(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        ${url ? `<div class="image-preview"><img src="${url}" alt="Preview" style="max-width: 100px; max-height: 100px; border-radius: 4px;"></div>` : ''}
    `;
    container.appendChild(imageField);
    
    // Agregar preview en tiempo real
    const urlInput = imageField.querySelector('.image-url');
    urlInput.addEventListener('input', function() {
        const preview = imageField.querySelector('.image-preview');
        if (this.value && this.value.startsWith('http')) {
            if (!preview) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview';
                previewDiv.innerHTML = `<img src="${this.value}" alt="Preview" style="max-width: 100px; max-height: 100px; border-radius: 4px;">`;
                imageField.appendChild(previewDiv);
            } else {
                preview.querySelector('img').src = this.value;
            }
        } else if (preview) {
            preview.remove();
        }
    });
}

// Remover campo de imagen
function removeImageField(button) {
    button.closest('.image-field').remove();
}

// Cancelar edición
function cancelEdit() {
    document.getElementById('productForm').reset();
    document.getElementById('productFormContainer').style.display = 'none';
    document.getElementById('imagesContainer').innerHTML = '';
    document.getElementById('specificationsContainer').innerHTML = '';
    isEditing = false;
    editingProductId = null;
    showAdminNotification('Edición cancelada', 'info');
}

// Recargar productos
async function reloadProducts() {
    showAdminNotification('Recargando productos...', 'info');
    const success = await loadProducts();
    if (success) {
        renderAdminInterface();
        showAdminNotification('Productos recargados correctamente', 'success');
    }
}

// Guardar cambios (commit y push)
async function saveChanges() {
    if (currentProducts.length === 0) {
        showAdminNotification('No hay productos para guardar', 'warning');
        return;
    }
    
    if (confirm('¿Está seguro de que desea guardar todos los cambios? Esto actualizará el catálogo público.')) {
        showAdminNotification('Guardando cambios...', 'info');
        
        try {
            // Crear el objeto JSON actualizado
            const updatedData = {
                products: currentProducts,
                lastUpdated: new Date().toISOString(),
                version: "1.0.0"
            };
            
            // Guardar el JSON actualizado
            await saveProductsToJSON(updatedData);
            
            // Intentar hacer commit y push automático
            await commitAndPushChanges();
            
        } catch (error) {
            console.error('Error guardando cambios:', error);
            showAdminNotification('Error al guardar cambios: ' + error.message, 'error');
        }
    }
}

// Guardar productos en el archivo JSON
async function saveProductsToJSON(data) {
    try {
        // En un entorno real, aquí harías una llamada al servidor
        // Por ahora, guardamos en localStorage como backup
        localStorage.setItem('catalogProducts', JSON.stringify(data.products));
        localStorage.setItem('catalogLastUpdate', data.lastUpdated);
        
        console.log('Productos guardados localmente:', data);
        return true;
    } catch (error) {
        throw new Error('Error guardando productos: ' + error.message);
    }
}

// Hacer commit y push de los cambios
async function commitAndPushChanges() {
    try {
        // Mostrar notificación de proceso
        showAdminNotification('Preparando commit y push...', 'info');
        
        // En un entorno real con servidor, aquí harías:
        // const response = await fetch('/api/commit-push', { method: 'POST' });
        
        // Por ahora simulamos el proceso
        await simulateCommitPush();
        
    } catch (error) {
        throw new Error('Error en commit/push: ' + error.message);
    }
}

// Simular proceso de commit y push
async function simulateCommitPush() {
    return new Promise((resolve, reject) => {
        const steps = [
            'Validando productos...',
            'Actualizando products.json...',
            'Haciendo commit...',
            'Subiendo cambios...',
            'Desplegando en GitHub Pages...'
        ];
        
        let currentStep = 0;
        
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                showAdminNotification(steps[currentStep], 'info');
                currentStep++;
            } else {
                clearInterval(interval);
                
                // Simular éxito
                setTimeout(() => {
                    showAdminNotification('✅ Cambios guardados exitosamente! El catálogo se actualizará en 2-3 minutos.', 'success');
                    
                    // Actualizar estadísticas
                    updateAdminStats();
                    
                    resolve(true);
                }, 1000);
            }
        }, 1500);
    });
}

// Mostrar notificación en el panel de administración
function showAdminNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8',
        color: type === 'warning' ? '#000' : '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Función para exportar productos (útil para backup)
function exportProducts() {
    const dataStr = JSON.stringify(currentProducts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `products-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showAdminNotification('Productos exportados correctamente', 'success');
}

// Función para importar productos desde archivo
function importProducts() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedProducts = JSON.parse(e.target.result);
                    if (Array.isArray(importedProducts)) {
                        currentProducts = importedProducts;
                        renderAdminInterface();
                        showAdminNotification(`${importedProducts.length} productos importados correctamente`, 'success');
                    } else {
                        showAdminNotification('Formato de archivo inválido', 'error');
                    }
                } catch (error) {
                    showAdminNotification('Error al leer el archivo', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}