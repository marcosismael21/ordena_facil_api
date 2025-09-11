const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Direccion = db.Direccion

const getAllDireccion = async () => {
    try {
        const direccion = await Direccion.findAll()
        return ResponseHandler.success(direccion)
    } catch (error) {
        throw error
    }
}

const getAllDireccionByClienteId = async (clienteId) => {
    try {
        const direccion = await Direccion.findAll({
            where: {
                clienteId: clienteId
            }
        })
        return ResponseHandler.success(direccion)
    } catch (error) {
        throw error
    }
}

const getDireccionById = async (id) => {
    try {
        const direccion = await Direccion.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(direccion)
    } catch (error) {
        throw error
    }
}

const createDireccion = async (data) => {
    try {
        const direccion = await Direccion.create(data)
        return ResponseHandler.success(direccion, 'Direccion creada exitosamente')
    } catch (error) {
        throw error
    }
}

const updateDireccion = async (data, id) => {
    try {
        const direccion = await Direccion.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(direccion, 'Direccion actualizada exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteDireccion = async (id) => {
    try {
        const direccion = await Direccion.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(direccion, 'Direccion eliminada exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDireccion,
    getDireccionById,
    createDireccion,
    updateDireccion,
    deleteDireccion,
    getAllDireccionByClienteId,
}