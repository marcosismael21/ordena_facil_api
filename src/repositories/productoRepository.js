const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Producto = db.Producto

const getAllProducto = async () => {
    try {
        const producto = await Producto.findAll()
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