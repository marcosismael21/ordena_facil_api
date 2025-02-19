const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const { where } = require('sequelize')
const Pedido = db.Pedido
const PedidoDetalle = db.PedidoDetalle
const Extra = db.Extra

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
    const transaction = await db.sequelize.transaction()
    try {
        const {
            //valores de pedido
            clienteId,
            colaborarId,
            tipoPedidoId,
            direccionId,
            descuentoPedido,
            //valores de pedido detalle
            platilloIds,
            cantidadPedidoDetalles,
            precioUnitarioPedidoDetalles,
            contExtras,
            subTotalPedidoDetalle,
            //valores de extra
            productoIds,
            cantidadExtras,
            precioUnitarioExtras,
            subtotalExtras,
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

        const numOrden = await generateOrderNumber(tipoPedidoId, Pedido)

        //crear cabecera de pedido
        const pedido = await Pedido.create({
            numeroOrden: numOrden,
            clienteId: clienteId,
            colaborarId: colaborarId,
            tipoPedidoId: tipoPedidoId,
            direccionId: direccionId,
            fechaCompra: Date.now(),
            subtotal: 0,
            impuesto: 0,
            descuento: descuentoPedido,
            total: 0,
            estadoId: 1,
        }, { transaction })

        let totalSubtotal = 0;

        //crear detalle de pedido
        const detallesCreados = await Promise.all(
            platilloIds.map(async (platilloId, index) => {
                const cantidad = cantidadPedidoDetalles[index];
                const precioUnitario = precioUnitarioPedidoDetalles[index];
                const subtotal = cantidad * precioUnitario;
                totalSubtotal += subtotal;

                return await PedidoDetalle.create({
                    pedidoId: pedido.id,
                    platilloId,
                    cantidad,
                    precioUnitario,
                    contExtra: contExtras[index],
                    subTotal: subtotal,
                    estado: 1
                }, { transaction });
            })
        )

        //crear extra de pedido si existen
        if (productoIds && productoIds.length > 0) {
            const extrasPromises = detallesCreados.map(async (detalle, index) => {
                if (contExtras[index]) {
                    const extrasForDetalle = await Extra.create({
                        pedidoDetalleId: detalle.id,
                        productoId: productoIds[index],
                        cantidad: cantidadExtras[index],
                        precioUnitario: precioUnitarioExtras[index],
                        subtotal: cantidadExtras[index] * precioUnitarioExtras[index],
                        estado: 1
                    }, { transaction })

                    totalSubtotal += extrasForDetalle.subtotal
                    return extrasForDetalle
                }
            }).filter(Boolean)
            await Promise.all(extrasPromises)
        }

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