const platilloDetalleRepository = require('../repositories/platilloDetalleRepository')

const getAllPlatilloDetalle = async () => {
    try {
        const platilloDetalle = await platilloDetalleRepository.getAllPlatilloDetalle()
        return (platilloDetalle) ? platilloDetalle : []
    } catch (error) {
        throw error
    }
}

const getPlatilloDetalleById = async (id) => {
    try {
        const platilloDetalle = await platilloDetalleRepository.getPlatilloDetalleById(id)
        return (platilloDetalle) ? platilloDetalle : []
    } catch (error) {
        throw error
    }
}

const createPlatilloDetalle = async (data) => {
    try {
        const platilloDetalle = await platilloDetalleRepository.createPlatilloDetalle(data)
        return (platilloDetalle) ? platilloDetalle : []
    } catch (error) {
        throw error
    }
}

const updatePlatilloDetalle = async (data, id) => {
    try {
        const platilloDetalle = await platilloDetalleRepository.updatePlatilloDetalle(data, id)
        return (platilloDetalle) ? platilloDetalle : []
    } catch (error) {
        throw error
    }
}

const deletePlatilloDetalle = async (id) => {
    try {
        const platilloDetalle = await platilloDetalleRepository.deletePlatilloDetalle(id)
        return (platilloDetalle) ? platilloDetalle : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPlatilloDetalle,
    getPlatilloDetalleById,
    createPlatilloDetalle,
    updatePlatilloDetalle,
    deletePlatilloDetalle,
}