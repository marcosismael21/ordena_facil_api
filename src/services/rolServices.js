const rolRepository = require('../repositories/rolRepositorry')

const getAllRol = async () => {
    try {
        const rol = await rolRepository.getAllRol()
        return (rol) ? rol : []
    } catch (error) {
        throw error
    }
}

const getRolById = async (id) => {
    try {
        const rol = await rolRepository.getRolById(id)
        return (rol) ? rol : []
    } catch (error) {
        throw error
    }
}

const createRol = async (data) => {
    try {
        const rol = await rolRepository.createRol(data)
        return (rol) ? rol : []
    } catch (error) {
        throw error
    }
}

const updateRol = async (data, id) => {
    try {
        const rol = await rolRepository.updateRol(data, id)
        return (rol) ? rol : []
    } catch (error) {
        throw error
    }
}

const deleteRol = async (id) => {
    try {
        const rol = await rolRepository.deleteRol(id)
        return (rol) ? rol : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
}