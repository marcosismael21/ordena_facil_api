const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const TipoMedida = db.TipoMedida

const getAllTipoMedida = async () => {
    try {
        const tipoMedida = await TipoMedida.findAll()
        return ResponseHandler.success(tipoMedida)
    } catch (error) {
        throw error
    }
}

const getTipoMedidaById = async (id) => {
    try {
        const tipoMedida = await TipoMedida.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoMedida)
    } catch (error) {
        throw error
    }
}

const createTipoMedida = async (data) => {
    try {
        const existeTipoMedida = await TipoMedida.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        if (existeTipoMedida) {
            return ResponseHandler.error('El tipo de medida ya existe en el sistema')
        }

        const tipoMedida = await TipoMedida.create(data)
        return ResponseHandler.success(tipoMedida, 'Tipo de medida creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateTipoMedida = async (data, id) => {
    try {
        const tipoMedida = await TipoMedida.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoMedida, 'Tipo de medida actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteTipoMedida = async (id) => {
    try {
        const tipoMedida = await TipoMedida.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoMedida, 'Tipo de medida eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoMedida,
    getTipoMedidaById,
    createTipoMedida,
    updateTipoMedida,
    deleteTipoMedida
}