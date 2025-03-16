const ResponseHandler = require('../utils/responseHandler');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

const obtenerPedidosPendientes = async () => {
    try {
        const sql = `
            SELECT 
                p.id,
                p.numero_orden AS numeroOrden,
                p.cliente_id AS clienteId,
                cl.nombres AS nombreCliente,
                cl.dni,
                p.colaborador_id AS colaboradorId,
                p.tipo_pedido_id AS tipoPedidoId,
                p.direccion_id AS direccionId,
                p.subtotal,
                p.impuesto,
                p.descuento,
                p.total,
                p.estado_id as estadoId,
                pd.id as detalleId,
                pd.platillo_id as platilloId,
                pd.cantidad,
                pd.precio_unitario as precioUnitario,
                pd.sub_total as subtotalDetalle,
                pl.nombre as nombrePlatillo,
                pl.descripcion as descripcionPlatillo
            FROM pedidos AS p
            LEFT JOIN clientes AS cl ON cl.id = p.cliente_id
            LEFT JOIN pedidodetalles AS pd ON pd.pedido_id = p.id
            LEFT JOIN platillos AS pl ON pl.id = pd.platillo_id
            WHERE p.estado_id in (1,2,3)
            ORDER BY p.created_at DESC`;

        const pedidos = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        });

        // Reorganizar los resultados para agrupar los detalles
        const pedidosAgrupados = pedidos.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    numeroOrden: row.numeroOrden,
                    nombreCliente: row.nombreCliente,
                    dni: row.dni,
                    total: row.total,
                    subtotal: row.subtotal,
                    impuesto: row.impuesto,
                    descuento: row.descuento,
                    estadoId: row.estadoId,
                    detalles: []
                };
            }

            if (row.detalleId) {
                acc[row.id].detalles.push({
                    id: row.detalleId,
                    platilloId: row.platilloId,
                    cantidad: row.cantidad,
                    precioUnitario: row.precioUnitario,
                    subtotal: row.subtotalDetalle,
                    nombrePlatillo: row.nombrePlatillo,
                    descripcionPlatillo: row.descripcionPlatillo
                });
            }

            return acc;
        }, {});

        return ResponseHandler.success(Object.values(pedidosAgrupados));
    } catch (error) {
        throw error;
    }
};

const obtenerPedidosCocina = async () => {
    try {
        const sql = `
            SELECT 
                p.id,
                p.numero_orden AS numeroOrden,
                p.cliente_id AS clienteId,
                cl.nombres AS nombreCliente,
                cl.dni,
                p.colaborador_id AS colaboradorId,
                p.tipo_pedido_id AS tipoPedidoId,
                p.direccion_id AS direccionId,
                p.subtotal,
                p.impuesto,
                p.descuento,
                p.total,
                p.estado_id as estadoId,
                pd.id as detalleId,
                pd.platillo_id as platilloId,
                pd.cantidad,
                pd.precio_unitario as precioUnitario,
                pd.sub_total as subtotalDetalle,
                pl.nombre as nombrePlatillo,
                pl.descripcion as descripcionPlatillo
            FROM pedidos AS p
            LEFT JOIN clientes AS cl ON cl.id = p.cliente_id
            LEFT JOIN pedidodetalles AS pd ON pd.pedido_id = p.id
            LEFT JOIN platillos AS pl ON pl.id = pd.platillo_id
            WHERE p.estado_id = 2
            ORDER BY p.created_at DESC`;

        const pedidos = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        });

        // Reorganizar los resultados para agrupar los detalles
        const pedidosAgrupados = pedidos.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    numeroOrden: row.numeroOrden,
                    nombreCliente: row.nombreCliente,
                    dni: row.dni,
                    total: row.total,
                    subtotal: row.subtotal,
                    impuesto: row.impuesto,
                    descuento: row.descuento,
                    estadoId: row.estadoId,
                    detalles: []
                };
            }

            if (row.detalleId) {
                acc[row.id].detalles.push({
                    id: row.detalleId,
                    platilloId: row.platilloId,
                    cantidad: row.cantidad,
                    precioUnitario: row.precioUnitario,
                    subtotal: row.subtotalDetalle,
                    nombrePlatillo: row.nombrePlatillo,
                    descripcionPlatillo: row.descripcionPlatillo
                });
            }

            return acc;
        }, {});

        return ResponseHandler.success(Object.values(pedidosAgrupados));
    } catch (error) {
        throw error;
    }
};

const actualizarEstadoPedido = async (pedidoId, estado) => {
    try {
        const pedido = await db.Pedido.update(
            { estadoId: estado },
            { 
                where: { id: pedidoId },
                returning: true
            }
        );

        return ResponseHandler.success(pedido, 'Estado del pedido actualizado exitosamente');
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obtenerPedidosPendientes,
    actualizarEstadoPedido,
    obtenerPedidosCocina,
};