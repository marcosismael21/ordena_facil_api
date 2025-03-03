const pedidoRepository = require('../repositories/pedidoRepository')

const getAllPedido = async () => {
    try {
        const extra = await pedidoRepository.getAllPedido()
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const getPedidoById = async (id) => {
    try {
        const extra = await pedidoRepository.getPedidoById(id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const createPedido = async (data) => {
    try {
        const extra = await pedidoRepository.createPedido(data)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const updatePedido = async (data, id) => {
    try {
        const extra = await pedidoRepository.updatePedido(data, id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const deletePedido = async (id) => {
    try {
        const extra = await pedidoRepository.deletePedido(id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const getAllPedidoByClient = async (clienteId) => {
    try {
        const extra = await pedidoRepository.getAllPedidoByClient(clienteId)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
 
}

module.exports = {
    getAllPedido,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    getAllPedidoByClient,
}