#!/usr/bin/env node

/**
 * Script para actualizar el catálogo y hacer commit/push automático
 * Este script se ejecuta desde el panel de administración
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración
const CONFIG = {
    productsFile: 'products.json',
    commitMessage: 'Actualizar catálogo de productos',
    branch: 'main'
};

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
    log(`[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Validar que estamos en un repositorio Git
function validateGitRepo() {
    try {
        execSync('git rev-parse --git-dir', { stdio: 'pipe' });
        return true;
    } catch (error) {
        return false;
    }
}

// Validar archivo products.json
function validateProductsFile() {
    const filePath = path.join(process.cwd(), CONFIG.productsFile);
    
    if (!fs.existsSync(filePath)) {
        logError(`Archivo ${CONFIG.productsFile} no encontrado`);
        return false;
    }
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Validaciones básicas
        if (!data.products || !Array.isArray(data.products)) {
            logError('products.json debe contener un array "products"');
            return false;
        }
        
        if (data.products.length === 0) {
            logWarning('No hay productos en el catálogo');
        }
        
        // Validar cada producto
        for (let i = 0; i < data.products.length; i++) {
            const product = data.products[i];
            const requiredFields = ['id', 'name', 'category', 'description'];
            
            for (const field of requiredFields) {
                if (!product[field]) {
                    logError(`Producto ${i} falta campo obligatorio: ${field}`);
                    return false;
                }
            }
        }
        
        logSuccess(`Archivo ${CONFIG.productsFile} válido con ${data.products.length} productos`);
        return true;
        
    } catch (error) {
        logError(`Error validando ${CONFIG.productsFile}: ${error.message}`);
        return false;
    }
}

// Actualizar timestamp en products.json
function updateTimestamp() {
    const filePath = path.join(process.cwd(), CONFIG.productsFile);
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        data.lastUpdated = new Date().toISOString();
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        logSuccess('Timestamp actualizado en products.json');
        return true;
        
    } catch (error) {
        logError(`Error actualizando timestamp: ${error.message}`);
        return false;
    }
}

// Verificar estado de Git
function checkGitStatus() {
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return status.trim();
    } catch (error) {
        logError(`Error verificando estado de Git: ${error.message}`);
        return null;
    }
}

// Hacer commit y push
function commitAndPush() {
    try {
        logStep('GIT', 'Agregando archivos al staging...');
        execSync('git add .', { stdio: 'inherit' });
        
        logStep('GIT', 'Haciendo commit...');
        const commitMsg = `${CONFIG.commitMessage} - ${new Date().toLocaleString('es-ES')}`;
        execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
        
        logStep('GIT', 'Haciendo push...');
        execSync(`git push origin ${CONFIG.branch}`, { stdio: 'inherit' });
        
        logSuccess('Commit y push completados exitosamente');
        return true;
        
    } catch (error) {
        logError(`Error en commit/push: ${error.message}`);
        return false;
    }
}

// Función principal
async function main() {
    log('🚀 Iniciando actualización del catálogo...', 'bright');
    log('');
    
    // Paso 1: Validar repositorio Git
    logStep('1', 'Validando repositorio Git...');
    if (!validateGitRepo()) {
        logError('No se encontró un repositorio Git válido');
        process.exit(1);
    }
    logSuccess('Repositorio Git válido');
    
    // Paso 2: Validar archivo products.json
    logStep('2', 'Validando archivo products.json...');
    if (!validateProductsFile()) {
        logError('Validación de products.json falló');
        process.exit(1);
    }
    
    // Paso 3: Actualizar timestamp
    logStep('3', 'Actualizando timestamp...');
    if (!updateTimestamp()) {
        logError('Error actualizando timestamp');
        process.exit(1);
    }
    
    // Paso 4: Verificar cambios
    logStep('4', 'Verificando cambios...');
    const gitStatus = checkGitStatus();
    if (gitStatus === null) {
        logError('Error verificando estado de Git');
        process.exit(1);
    }
    
    if (!gitStatus) {
        logWarning('No hay cambios para commitear');
        process.exit(0);
    }
    
    log('Cambios detectados:', 'yellow');
    console.log(gitStatus);
    
    // Paso 5: Commit y push
    logStep('5', 'Realizando commit y push...');
    if (!commitAndPush()) {
        logError('Error en commit/push');
        process.exit(1);
    }
    
    log('');
    logSuccess('🎉 Catálogo actualizado exitosamente!');
    log('El sitio se desplegará automáticamente en GitHub Pages en unos minutos.', 'blue');
    log('');
    
    // Mostrar información adicional
    try {
        const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
        const repoName = remoteUrl.split('/').pop().replace('.git', '');
        const owner = remoteUrl.split('/')[3];
        
        log('📄 Información del despliegue:', 'bright');
        log(`   Repositorio: ${owner}/${repoName}`, 'cyan');
        log(`   URL del sitio: https://${owner}.github.io/${repoName}/`, 'cyan');
        log(`   Rama: ${CONFIG.branch}`, 'cyan');
        log(`   Timestamp: ${new Date().toISOString()}`, 'cyan');
        
    } catch (error) {
        logWarning('No se pudo obtener información del repositorio');
    }
}

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
    logError(`Error no capturado: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logError(`Promise rechazada: ${reason}`);
    process.exit(1);
});

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch((error) => {
        logError(`Error en función principal: ${error.message}`);
        process.exit(1);
    });
}

module.exports = {
    validateProductsFile,
    updateTimestamp,
    commitAndPush,
    main
};