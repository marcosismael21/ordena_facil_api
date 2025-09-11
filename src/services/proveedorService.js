const proveedorRepository = require('../repositories/proveedorRepository')

const getAllProveedor = async () => {
    try {
        const proveedor = await proveedorRepository.getAllProveedor()
        return (proveedor) ? proveedor : []
    } catch (error) {
        throw error
    }
}

const getProveedorById = async (id) => {
    try {
        const proveedor = await proveedorRepository.getProveedorById(id)
        return (proveedor) ? proveedor : []
    } catch (error) {
        throw error
    }
}

const createProveedor = async (data) => {
    try {
        const proveedor = await proveedorRepository.createProveedor(data)
        return (proveedor) ? proveedor : []
    } catch (error) {
        throw error
    }
}

const updateProveedor = async (data, id) => {
    try {
        const proveedor = await proveedorRepository.updateProveedor(data, id)
        return (proveedor) ? proveedor : []
    } catch (error) {
        throw error
    }
}

const deleteProveedor = async (id) => {
    try {
        const proveedor = await proveedorRepository.deleteProveedor(id)
        return (proveedor) ? proveedor : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor,
}