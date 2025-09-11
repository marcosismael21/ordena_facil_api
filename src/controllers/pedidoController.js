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
        mesaId,
        descuentoPedido,
        estadoId,
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
        mesaId,
        descuentoPedido,
        estadoId,
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
        /*const socketEvents = req.app.get('socketEvents');
        const pedido = await pedidoService.createPedido(data)

        if (socketEvents && pedido.success) {
            // Obtener el pedido completo
            const pedidoCompleto = await pedidoService.getPedidoById(pedido.data.id);
            if (pedidoCompleto.success) {
                socketEvents.emitNuevoPedido(pedidoCompleto.data);
            }
        }

        return res.status(200).json(pedido);*/

        const pedido = await pedidoService.createPedido(data)

        if (pedido.success) {
            const io = req.app.get('io');

            // Obtener el pedido completo
            const pedidoCompleto = await pedidoService.getPedidoById(pedido.data.id);

            if (io && pedidoCompleto.success) {
                const pedidoData = Array.isArray(pedidoCompleto.data) && pedidoCompleto.data.length > 0
                    ? pedidoCompleto.data[0]
                    : pedidoCompleto.data;

                console.log('Emitiendo nuevo pedido creado:', pedidoData);

                // Emitir nuevo pedido a TODOS los clientes
                io.emit('nuevoPedido', {
                    success: true,
                    data: pedidoData
                });

                // También emitir como actualización para cocina
                if (pedidoData.estadoId === 2) {
                    io.emit('actualizacionOrden', {
                        id: pedidoData.id,
                        estado: pedidoData.estadoId,
                        pedido: pedidoData
                    });
                }
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

const getPedidoDetalleByPedidoId = async (req, res, next) => {
    const pedidoId = req.params.pedidoId
    try {
        const pedidos = await pedidoService.getPedidoDetalleByPedidoId(pedidoId)
        return res.status(200).json(pedidos)
    } catch (error) {
        next(error)
    }
}

const changeStatus = async (req, res, next) => {
    const id = req.params.id
    const {estadoId} = req.body
    const data = {estadoId}
    try {
        const pedido = await pedidoService.changeStatus(data, id)

        // Obtener el pedido completo DESPUÉS de actualizar
        const pedidoCompleto = await pedidoService.getPedidoById(id);

        // Obtener el io
        const io = req.app.get('io');

        if (io && pedidoCompleto.success) {
            // Estructurar el pedido si viene como array
            const pedidoData = Array.isArray(pedidoCompleto.data) && pedidoCompleto.data.length > 0
                ? pedidoCompleto.data[0]
                : pedidoCompleto.data;

            console.log(`Emitiendo cambio de estado para pedido ${id} - Estado real: ${pedidoData.estadoId}`);

            // Emitir con el estado ACTUAL del pedido, no el del request
            io.emit('actualizacionOrden', {
                id: parseInt(id),
                estado: pedidoData.estadoId, // Usar el estado real del pedido
                pedido: pedidoData
            });
        }

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
    deletePedido,
    getAllPedidoByClient,
    getPedidoDetalleByPedidoId,
    changeStatus,
}