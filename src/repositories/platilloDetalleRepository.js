const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const PlatilloDetalle = db.PlatilloDetalle

const getAllPlatilloDetalle = async () => {
    try {
        const platilloDetalle = await PlatilloDetalle.findAll()
        return ResponseHandler.success(platilloDetalle)
    } catch (error) {
        throw error
    }
}

const getPlatilloDetalleById = async (id) => {
    try {
        const platilloDetalle = await PlatilloDetalle.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platilloDetalle)
    } catch (error) {
        throw error
    }
}

const createPlatilloDetalle = async (data) => {
    try {
        const platilloDetalle = await PlatilloDetalle.create(data)
        return ResponseHandler.success(platilloDetalle, 'PlatilloDetalle creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updatePlatilloDetalle = async (data, id) => {
    try {
        const platilloDetalle = await PlatilloDetalle.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platilloDetalle, 'PlatilloDetalle actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deletePlatilloDetalle = async (id) => {
    try {
        const platilloDetalle = await PlatilloDetalle.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platilloDetalle, 'PlatilloDetalle eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPlatilloDetalle,
    getPlatilloDetalleById,
    createPlatilloDetalle,
    updatePlatilloDetalle,
    deletePlatilloDetalle
}