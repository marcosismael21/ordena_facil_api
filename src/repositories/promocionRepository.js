const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Promocion = db.Promocion

const getAllPromocion = async () => {
    try {
        const promocion = await Promocion.findAll()
        return ResponseHandler.success(promocion)
    } catch (error) {
        throw error
    }
}

const getPromocionById = async (id) => {
    try {
        const promocion = await Promocion.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(promocion)
    } catch (error) {
        throw error
    }
}

const createPromocion = async (data) => {
    try {
        const promocion = await Promocion.create(data)
        return ResponseHandler.success(promocion, 'Promocion creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updatePromocion = async (data, id) => {
    try {
        const promocion = await Promocion.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(promocion, 'Promocion actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deletePromocion = async (id) => {
    try {
        const promocion = await Promocion.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(promocion, 'Promocion eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPromocion,
    getPromocionById,
    createPromocion,
    updatePromocion,
    deletePromocion
}