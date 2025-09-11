const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Producto = db.Producto

const { sequelize } = require("../models");
const { QueryTypes, Transaction, } = require('sequelize');

const getAllProducto = async () => {
    try {

        const sql = `SELECT 
                        pd.id,
                        pd.descripcion,
                        pd.proveedor_id,
                        pr.nombre as nombreProveedor,
                        pd.tipo_medida_id,
                        tm.descripcion as tipoMedida,
                        pd.categoria_id,
                        ct.descripcion as categoria,
                        pd.cantidad,
                        pd.codigo,
                        pd.estado
                    FROM productos AS pd    
                    left join proveedors as pr on pr.id = pd.proveedor_id
                    left join tipomedidas as tm on tm.id = pd.tipo_medida_id
                    left join categorias as ct on ct.id = pd.categoria_id`

        const producto = await sequelize.query(sql, {
            type: QueryTypes.SELECT
        })
        
        return ResponseHandler.success(producto)
    } catch (error) {
        throw error
    }
}

const getProductoById = async (id) => {
    try {
        const producto = await Producto.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(producto)
    } catch (error) {
        throw error
    }
}

const createProducto = async (data) => {
    try {
        const existeProducto = await Producto.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        const existeProductoCodigo = await Producto.findOne({
            where: {
                codigo: data.codigo
            }
        })

        if (existeProductoCodigo) {
            return ResponseHandler.error('El código del producto ya existe en el sistema')
        }

        if (existeProducto) {
            return ResponseHandler.error('El producto ya existe en el sistema')
        }

        const producto = await Producto.create(data)
        return ResponseHandler.success(producto, 'Producto creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateProducto = async (data, id) => {
    try {
        const producto = await Producto.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(producto, 'Producto actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteProducto = async (id) => {
    try {
        const producto = await Producto.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(producto, 'Producto eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}