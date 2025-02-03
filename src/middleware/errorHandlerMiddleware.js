const errorHandlerMiddleware = (err, req, res, next) => {

    const {
        status = 500,
        message = 'Servicio no disponible',
        error
    } = err

    // Verifica si es un error de Foreign Key
    if (message.includes('foreign key constraint fails')) {
        return res.status(400).json({
            status: 400,
            message: 'No se puede eliminar el registro porque está siendo utilizado en otra parte del sistema.',
            error: message
        })
    }

    // Respuesta genérica para otros errores
    res.status(status).json({
        status,
        message,
        m: err.message,
        error
    })
}

module.exports = errorHandlerMiddleware