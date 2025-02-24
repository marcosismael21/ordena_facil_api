const cocinaRepository = require('../repositories/cocinaRepository');

const obtenerPedidosPendientes = async () => {
    try {
        const pedidos = await cocinaRepository.obtenerPedidosPendientes();
        return pedidos ? pedidos : [];
    } catch (error) {
        throw error;
    }
};

const actualizarEstadoPedido = async (pedidoId, estado) => {
    try {
        const pedido = await cocinaRepository.actualizarEstadoPedido(pedidoId, estado);
        return pedido ? pedido : [];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obtenerPedidosPendientes,
    actualizarEstadoPedido
};