const pedidoService = require('../services/pedidoService')

const getAllPedido = async (req, res, next) => {
    try {
        const pedido = await pedidoService.getAllPedido()
        return res.status(200).json(pedido)
    } catch (error) {
        next(error)
    }
}

const getPedidoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const pedido = await pedidoService.getPedidoById(id)
        return res.status(200).json(pedido)
    } catch (error) {
        next(error)
    }
}

const createPedido = async (req, res, next) => {
    const {
        numeroOrden,
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        subtotal,
        impuesto,
        descuento,
        total,
        estadoId,
    } = req.body

    const data = {
        numeroOrden,
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        fechaCompra: new Date(),
        subtotal,
        impuesto,
        descuento,
        total,
        estadoId,
    }

    try {
        const pedido = await pedidoService.createPedido(data)
        return res.status(200).json(pedido)
    } catch (error) {
        next(error)
    }
}

const updatePedido = async (req, res, next) => {
    const id = req.params.id

    const {
        numeroOrden,
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        subtotal,
        impuesto,
        descuento,
        total,
        estadoId,
    } = req.body

    const data = {
        numeroOrden,
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        subtotal,
        impuesto,
        descuento,
        total,
        estadoId,
    }

    try {
        const pedido = await pedidoService.updatePedido(data, id)
        return res.status(200).json(pedido)
    } catch (error) {
        next(error)
    }
}

const deletePedido = async (req, res, next) => {
    const id = req.params.id
    try {
        const pedido = await pedidoService.deletePedido(id)
        return res.status(200).json(pedido)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPedido,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
}