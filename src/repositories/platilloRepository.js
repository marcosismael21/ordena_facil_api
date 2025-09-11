const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Platillo = db.Platillo
const PlatilloDetalle = db.PlatilloDetalle

const { sequelize } = require("../models")
const { QueryTypes, Transaction, } = require('sequelize')

const getAllPlatillo = async () => {
    try {
        const sql = `select 
                        pl.id, 
                        pl.nombre, 
                        pl.image_url as imageUrl, 
                        pl.precio, 
                        pl.descripcion,
                        pl.tipoplatillo_id as tipoPlatilloId,
                        tpl.descripcion as tipoPlatillo ,
                        pl.estado
                        from platillos as pl left 
                        join tipoplatillos as tpl on tpl.id = pl.tipoplatillo_id
                        where pl.estado = 1`

        const platillo = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        return ResponseHandler.success(platillo)
    } catch (error) {
        throw error
    }
}

const getPlatilloById = async (id) => {
    try {
        const sql = `SELECT 
                        pl.id,
                        pl.nombre,
                        pl.descripcion,
                        pl.image_url AS imageUrl,
                        pl.precio,
                        pl.estado,
                        pl.tipoplatillo_id as tipoplatilloId,
                        tpl.descripcion AS tipoplatillo,
                        CONCAT( GROUP_CONCAT(pd.id ORDER BY pd.id ASC SEPARATOR ',')) AS detalleId,
                        CONCAT(GROUP_CONCAT(pd.cantidad ORDER BY pd.id ASC SEPARATOR ',')) AS cantidad,
                        CONCAT(GROUP_CONCAT(pr.descripcion ORDER BY pd.id ASC SEPARATOR ', ')) AS productoDescripcion
                     FROM platillos AS pl
                     LEFT JOIN tipoplatillos AS tpl ON tpl.id = pl.tipoplatillo_id
                     LEFT JOIN platillodetalles AS pd ON pd.platillo_id = pl.id
                     LEFT JOIN productos AS pr ON pr.id = pd.producto_id
                     WHERE pl.id = :xid
                     GROUP BY pl.id;`

        const platillo = await sequelize.query(sql, {
            replacements: {
                xid: id
            },
            type: QueryTypes.SELECT
        })
        return ResponseHandler.success(platillo)
    } catch (error) {
        throw error
    }
}

const createPlatillo = async (data) => {
    const transaction = await db.sequelize.transaction()
    try {
        const existePlatillo = await Platillo.findOne({
            transaction,
            where: {
                nombre: data.nombre
            }
        })

        if (existePlatillo) {
            await transaction.rollback()
            return ResponseHandler.error('El platillo ya existe en el sistema')
        }

        const platillo = await Platillo.create(data, { transaction })

        const { productoIds, cantidad } = data

        if (productoIds.length !== cantidad.length) {
            await transaction.rollback()
            return ResponseHandler.error('La cantidad de productos y cantidades no coinciden')
        }

        for (let i = 0; i < productoIds.length; i++) {
            await PlatilloDetalle.create({
                platilloId: platillo.id,
                productoId: productoIds[i],
                cantidad: cantidad[i]
            }, { transaction })
        }

        await transaction.commit()
        return ResponseHandler.success(platillo, 'Platillo creado exitosamente')
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

const updatePlatillo = async (data, id) => {
    const transaction = await db.sequelize.transaction()
    try {
        const platillo = await Platillo.update(data, {
            transaction,
            where: {
                id: id
            }
        })

        await PlatilloDetalle.destroy({
            transaction,
            where: {
                platilloId: id
            }
        })

        const { productoIds, cantidad } = data

        if (productoIds.length !== cantidad.length) {
            await transaction.rollback()
            return ResponseHandler.error('La cantidad de productos y cantidades no coinciden')
        }

        for (let i = 0; i < productoIds.length; i++) {
            await PlatilloDetalle.create({
                platilloId: id,
                productoId: productoIds[i],
                cantidad: cantidad[i]
            }, { transaction })
        }

        await transaction.commit()
        return ResponseHandler.success(platillo, 'Platillo actualizado exitosamente');
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

const deletePlatillo = async (id) => {
    const transaction = await db.sequelize.transaction()
    try {

        await PlatilloDetalle.destroy({
            transaction,
            where: {
                platilloId: id
            }
        })

        const platillo = await Platillo.destroy({
            transaction,
            where: {
                id: id
            }
        })

        await transaction.commit()
        return ResponseHandler.success(platillo, 'Platillo eliminado exitosamente');
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

module.exports = {
    getAllPlatillo,
    getPlatilloById,
    createPlatillo,
    updatePlatillo,
    deletePlatillo
}