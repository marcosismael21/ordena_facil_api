const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const { where } = require('sequelize')
const Pedido = db.Pedido
const PedidoDetalle = db.PedidoDetalle
const Extra = db.Extra

const { sequelize } = require("../models")
const { QueryTypes, Transaction, } = require('sequelize')

const getAllPedido = async () => {
    try {
         const sql = 
                    `SELECT 
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
                        p.estado_id as estadoId
                    FROM pedidos AS p
                    LEFT JOIN clientes AS cl ON cl.id = p.cliente_id    
                    where p.estado_id in (1, 2);`
        const pedido =  await sequelize.query(sql, {           
            type: QueryTypes.SELECT
        })
        return ResponseHandler.success(pedido)
    } catch (error) {
        throw error
    }
}

const getPedidoById = async (id) => {
    try {
        const sql = ``
        const pedido = await sequelize.query(sql, {
            replacements: {
                xid: id
            },
            type: QueryTypes.SELECT
        })
        return ResponseHandler.success(pedido)
    } catch (error) {
        throw error
    }
}

const createPedido = async (data) => {
    const transaction = await db.sequelize.transaction()
    try {
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
            precioUnitarioExtras,
        } = data

        //validar que los arrays tengan la misma longitud
        const platillosLength = platilloIds.length;
        if (
            cantidadPedidoDetalles.length !== platillosLength ||
            precioUnitarioPedidoDetalles.length !== platillosLength ||
            contExtras.length !== platillosLength
        ) {
            throw new Error('Los arrays de detalles deben tener la misma longitud');
        }


        //validar arrays de extras si hay contExtras con valor 1
        const tieneExtras = contExtras.some(extra => extra === 1);
        if (tieneExtras) {
            if (!productoIds?.length || !cantidadExtras?.length || !precioUnitarioExtras?.length) {
                throw new Error('Faltan datos de extras');
            }
        }

        const numOrden = await generateOrderNumber(tipoPedidoId, Pedido)

        //crear cabecera de pedido
        const pedido = await Pedido.create({
            numeroOrden: numOrden,
            clienteId: clienteId,
            colaboradorId: colaboradorId,
            tipoPedidoId: tipoPedidoId,
            direccionId: direccionId,
            fechaCompra: Date.now(),
            subtotal: 0,
            impuesto: 0,
            descuento: descuentoPedido,
            total: 0,
            estadoId: 1,
        }, { transaction })

        let totalSubtotal = 0
        let extraIndex = 0

        //crear detalle de pedido
        const detallesCreados = await Promise.all(
            platilloIds.map(async (platilloId, index) => {
                const cantidad = cantidadPedidoDetalles[index]
                const precioUnitario = precioUnitarioPedidoDetalles[index]
                const subtotal = cantidad * precioUnitario
                totalSubtotal += subtotal

                const detalle = await PedidoDetalle.create({
                    pedidoId: pedido.id,
                    platilloId,
                    cantidad,
                    precioUnitario,
                    contExtra: contExtras[index],
                    subTotal: subtotal,
                    estado: 1
                }, { transaction })

                // Si este detalle tiene extra, crear el extra correspondiente
                if (contExtras[index] === 1) {
                    const extraSubtotal = cantidadExtras[extraIndex] * precioUnitarioExtras[extraIndex]
                    await Extra.create({
                        pedidoDetalleId: detalle.id,
                        productoId: productoIds[extraIndex],
                        cantidad: cantidadExtras[extraIndex],
                        precioUnitario: precioUnitarioExtras[extraIndex],
                        subtotal: extraSubtotal,
                        estado: 1
                    }, { transaction })

                    totalSubtotal += extraSubtotal
                    extraIndex++
                }

                return detalle
            })
        )

        //totales finales
        const impuesto = totalSubtotal * 0.15
        const total = totalSubtotal + impuesto - descuentoPedido

        await pedido.update({
            subtotal: totalSubtotal,
            impuesto: impuesto,
            total: total
        }, {
            where: {
                id: pedido.id
            },
            transaction
        });

        await transaction.commit()
        return ResponseHandler.success(pedido, 'Pedido creado exitosamente')
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

const generateOrderNumber = async (tipoPedidoId, Pedido) => {
    // Mapeo de prefijos según el tipo de pedido
    const prefixMap = {
        1: 'R',    // Restaurante
        2: 'PL',   // Para Llevar
        3: 'D',    // A Domicilio
        4: 'A'     // AutoServicio
    }

    const prefix = prefixMap[tipoPedidoId]
    if (!prefix) {
        throw new Error('Tipo de pedido inválido')
    }

    // Buscar el último pedido con el mismo prefijo
    const lastOrder = await Pedido.findOne({
        where: {
            numeroOrden: {
                [db.Sequelize.Op.like]: `${prefix}%`
            }
        },
        order: [['numeroOrden', 'DESC']]
    })

    let nextNumber = 1;
    if (lastOrder) {
        // Extraer el número del último pedido y sumar 1
        const currentNumber = parseInt(lastOrder.numeroOrden.replace(prefix, ''))
        nextNumber = currentNumber + 1;
    }

    // Formatear el número con ceros a la izquierda
    return `${prefix}${nextNumber.toString().padStart(7, '0')}`
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