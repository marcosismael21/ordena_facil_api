const direccionRepository = require('../repositories/direccionRepository')

const getAllDireccion = async () => {
    try {
        const direccion = await direccionRepository.getAllDireccion()
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

const getAllDireccionByClienteId = async (clienteId) => {
    try {
        const direccion = await direccionRepository.getAllDireccionByClienteId(clienteId)
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

const getDireccionById = async (id) => {
    try {
        const direccion = await direccionRepository.getDireccionById(id)
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

const createDireccion = async (data) => {
    try {
        const direccion = await direccionRepository.createDireccion(data)
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

const updateDireccion = async (data, id) => {
    try {
        const direccion = await direccionRepository.updateDireccion(data, id)
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

const deleteDireccion = async (id) => {
    try {
        const direccion = await direccionRepository.deleteDireccion(id)
        return (direccion) ? direccion : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllDireccion,
    getDireccionById,
    createDireccion,
    updateDireccion,
    deleteDireccion,
    getAllDireccionByClienteId,
}