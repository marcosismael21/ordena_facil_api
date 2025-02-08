const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Proveedor = db.Proveedor

const getAllProveedor = async () => {
    try {
        const proveedor = await Proveedor.findAll()
        return ResponseHandler.success(proveedor)
    } catch (error) {
        throw error
    }
}

const getProveedorById = async (id) => {
    try {
        const proveedor = await Proveedor.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(proveedor)
    } catch (error) {
        throw error
    }
}

const createProveedor = async (data) => {
    try {
        const existeProveedor = await Proveedor.findOne({
            where: {
                nombre: data.nombre
            }
        })

        if (existeProveedor) {
            return ResponseHandler.error('El proveedor ya existe en el sistema')
        }

        const proveedor = await Proveedor.create(data)
        return ResponseHandler.success(proveedor, 'Proveedor creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateProveedor = async (data, id) => {
    try {
        const proveedor = await Proveedor.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(proveedor, 'Proveedor actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteProveedor = async (id) => {
    try {
        const proveedor = await Proveedor.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(proveedor, 'Proveedor eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
}