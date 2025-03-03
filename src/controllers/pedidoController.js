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
        //valores de pedido
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        descuentoPedido,
        //valores de pedido detalle
        platilloIds,
        cantidadPedidoDetalles,
        precioUnitarioPedidoDetalles,
        contExtras,
        //valores de extra
        productoIds,
        cantidadExtras,
        precioUnitarioExtras
    } = req.body

    const data = {
        //valores de pedido
        clienteId,
        colaboradorId,
        tipoPedidoId,
        direccionId,
        descuentoPedido,
        //valores de pedido detalle
        platilloIds,
        cantidadPedidoDetalles,
        precioUnitarioPedidoDetalles,
        contExtras,
        //valores de extra
        productoIds,
        cantidadExtras,
        precioUnitarioExtras,
    }

    try {
        const socketEvents = req.app.get('socketEvents');
        const pedido = await pedidoService.createPedido(data)

        if (socketEvents && pedido.success) {
            // Obtener el pedido completo
            const pedidoCompleto = await pedidoService.getPedidoById(pedido.data.id);
            if (pedidoCompleto.success) {
                socketEvents.emitNuevoPedido(pedidoCompleto.data);
            }
        }

        return res.status(200).json(pedido);
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

const getAllPedidoByClient = async (req, res, next) => {
    const clienteId = req.params.clienteId
    try {
        const pedidos = await pedidoService.getAllPedidoByClient(clienteId)
        return res.status(200).json(pedidos)
    } catch (error) {
        next(error)
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