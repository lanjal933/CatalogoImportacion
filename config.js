// Configuración del sistema de catálogo
const CONFIG = {
    // Configuración del catálogo
    catalog: {
        name: "Catálogo de Obra Seco",
        description: "Soluciones de alta calidad para Obras de Construcción",
        version: "1.0.0",
        lastUpdated: new Date().toISOString()
    },
    
    // Configuración de autenticación
    auth: {
        adminPassword: "1990",
        firstLevelUsername: "Alan",
        firstLevelPassword: "Zorzzut999"
    },
    
    // Configuración de GitHub
    github: {
        repository: "usuario/catalogo-importaciones",
        branch: "main",
        pagesUrl: "https://usuario.github.io/catalogo-importaciones/"
    },
    
    // Configuración de productos
    products: {
        defaultCategory: "maquinaria",
        categories: [
            "maquinaria",
            "herramientas", 
            "equipos",
            "repuestos",
            "accesorios"
        ],
        maxImagesPerProduct: 10,
        maxSpecificationsPerProduct: 20
    },
    
    // Configuración de la interfaz
    ui: {
        itemsPerPage: 12,
        searchDebounceMs: 300,
        notificationDuration: 4000,
        animationDuration: 300
    },
    
    // Configuración de desarrollo
    development: {
        enableDebugLogs: true,
        enableLocalStorage: true,
        simulateCommitPush: true
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}