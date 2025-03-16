const cocinaService = require('../services/cocinaService');

const obtenerPedidosPendientes = async (req, res, next) => {
    try {
        const pedidos = await cocinaService.obtenerPedidosPendientes();
        return res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
};

const actualizarEstadoPedido = async (req, res, next) => {
    const { pedidoId } = req.params;
    const { estado } = req.body;
    
    try {
        const pedido = await cocinaService.actualizarEstadoPedido(pedidoId, estado);
        
        // Emitir actualización por socket
        const io = req.app.get('io');
        io.emit('actualizacionOrden', {
            id: pedidoId,
            estado: estado
        });

        return res.status(200).json(pedido);
    } catch (error) {
        next(error);
    }
};

const obtenerPedidosCocina = async (req, res, next) => {
    try {
        const pedidos = await cocinaService.obtenerPedidosCocina();
        return res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    obtenerPedidosPendientes,
    actualizarEstadoPedido,
    obtenerPedidosCocina,
};