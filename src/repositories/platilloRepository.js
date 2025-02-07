const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Platillo = db.Platillo

const getAllPlatillo = async () => {
    try {
        const platillo = await Platillo.findAll()
        return ResponseHandler.success(platillo)
    } catch (error) {
        throw error
    }
}

const getPlatilloById = async (id) => {
    try {
        const platillo = await Platillo.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platillo)
    } catch (error) {
        throw error
    }
}

const createPlatillo = async (data) => {
    try {
        const existePlatillo = await Platillo.findOne({
            where: {
                nombre: data.nombre
            }
        })

        if (existePlatillo) {
            return ResponseHandler.error('El platillo ya existe en el sistema', 404)
        }

        const platillo = await Platillo.create(data)
        return ResponseHandler.success(platillo, 'Platillo creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updatePlatillo = async (data, id) => {
    try {
        const platillo = await Platillo.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platillo, 'Platillo actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deletePlatillo = async (id) => {
    try {
        const platillo = await Platillo.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(platillo, 'Platillo eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPlatillo,
    getPlatilloById,
    createPlatillo,
    updatePlatillo,
    deletePlatillo
}