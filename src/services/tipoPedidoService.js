const tipoPedidoRepository = require('../repositories/tipoPedidoRepository')

const getAllTipoPedido = async () => {
    try {
        const tipoPedido = await tipoPedidoRepository.getAllTipoPedido()
        return (tipoPedido) ? tipoPedido : []
    } catch (error) {
        throw error
    }
}

const getTipoPedidoById = async (id) => {
    try {
        const tipoPedido = await tipoPedidoRepository.getTipoPedidoById(id)
        return (tipoPedido) ? tipoPedido : []
    } catch (error) {
        throw error
    }
}

const createTipoPedido = async (data) => {
    try {
        const tipoPedido = await tipoPedidoRepository.createTipoPedido(data)
        return (tipoPedido) ? tipoPedido : []
    } catch (error) {
        throw error
    }
}

const updateTipoPedido = async (data, id) => {
    try {
        const tipoPedido = await tipoPedidoRepository.updateTipoPedido(data, id)
        return (tipoPedido) ? tipoPedido : []
    } catch (error) {
        throw error
    }
}

const deleteTipoPedido = async (id) => {
    try {
        const tipoPedido = await tipoPedidoRepository.deleteTipoPedido(id)
        return (tipoPedido) ? tipoPedido : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoPedido,
    getTipoPedidoById,
    createTipoPedido,
    updateTipoPedido,
    deleteTipoPedido,
}