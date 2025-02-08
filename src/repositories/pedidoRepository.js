const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Pedido = db.Pedido

const getAllPedido = async () => {
    try {
        const pedido = await Pedido.findAll()
        return ResponseHandler.success(pedido)
    } catch (error) {
        throw error
    }
}

const getPedidoById = async (id) => {
    try {
        const pedido = await Pedido.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(pedido)
    } catch (error) {
        throw error
    }
}

const createPedido = async (data) => {
    try {
        const pedido = await Pedido.create(data)
        return ResponseHandler.success(pedido, 'Pedido creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updatePedido = async (data, id) => {
    try {
        const pedido = await Pedido.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(pedido, 'Pedido actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deletePedido = async (id) => {
    try {
        const pedido = await Pedido.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(pedido, 'Pedido eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPedido,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
}