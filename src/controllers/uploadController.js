const uploadService = require('../services/uploadService')

const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, seleccione una imagen para subir'
            })
        }

        const result = await uploadService.uploadFile(req.file)
        return res.status(200).json(result)
    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'El archivo excede el tamaño máximo permitido de 20MB'
            })
        }
        next(error)
    }
}

module.exports = {
    uploadFile
}