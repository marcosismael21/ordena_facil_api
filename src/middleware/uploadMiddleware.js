const multer = require('multer')

const storage = multer.memoryStorage()

const formatFileName = (originalName) => {
    // Obtener la extensión del archivo
    const extension = originalName.split('.').pop().toLowerCase()
    
    // Limpiar el nombre: quitar espacios y caracteres especiales
    const baseName = originalName
        .split('.')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .trim()
    
    // Agregar timestamp y número aleatorio para hacer el nombre único
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1000)}`
    
    return `${baseName}-${uniqueSuffix}.${extension}`
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Solo se permiten imágenes'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB
    }
})

module.exports = {
    upload,
    formatFileName
}