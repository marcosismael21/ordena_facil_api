const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const TipoPlatillo = db.TipoPlatillo

const getAllTipoPlatillo = async () => {
    try {
        const tipoPlatillo = await TipoPlatillo.findAll()
        return ResponseHandler.success(tipoPlatillo)
    } catch (error) {
        throw error
    }
}

const getTipoPlatilloById = async (id) => {
    try {
        const tipoPlatillo = await TipoPlatillo.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPlatillo)
    } catch (error) {
        throw error
    }
}

const createTipoPlatillo = async (data) => {
    try {
        const existeTipoPlatillo = await TipoPlatillo.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        if (existeTipoPlatillo) {
            return ResponseHandler.error('El tipo de platillo ya existe en el sistema')
        }

        const tipoPlatillo = await TipoPlatillo.create(data)
        return ResponseHandler.success(tipoPlatillo, 'Tipo de platillo creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateTipoPlatillo = async (data, id) => {
    try {
        const tipoPlatillo = await TipoPlatillo.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPlatillo, 'Tipo de platillo actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteTipoPlatillo = async (id) => {
    try {
        const tipoPlatillo = await TipoPlatillo.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPlatillo, 'Tipo de platillo eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoPlatillo,
    getTipoPlatilloById,
    createTipoPlatillo,
    updateTipoPlatillo,
    deleteTipoPlatillo
}