const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const TipoPedido = db.TipoPedido

const getAllTipoPedido = async () => {
    try {
        const tipoPedido = await TipoPedido.findAll()
        return ResponseHandler.success(tipoPedido)
    } catch (error) {
        throw error
    }
}

const getTipoPedidoById = async (id) => {
    try {
        const tipoPedido = await TipoPedido.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPedido)
    } catch (error) {
        throw error
    }
}

const createTipoPedido = async (data) => {
    try {
        const existeTipoPedido = await TipoPedido.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        if (existeTipoPedido) {
            return ResponseHandler.error('El tipo de pedido ya existe en el sistema')
        }

        const tipoPedido = await TipoPedido.create(data)
        return ResponseHandler.success(tipoPedido, 'Tipo de pedido creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateTipoPedido = async (data, id) => {
    try {
        const tipoPedido = await TipoPedido.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPedido, 'Tipo de pedido actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteTipoPedido = async (id) => {
    try {
        const tipoPedido = await TipoPedido.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(tipoPedido, 'Tipo de pedido eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoPedido,
    getTipoPedidoById,
    createTipoPedido,
    updateTipoPedido,
    deleteTipoPedido
}