const platilloRepository = require('../repositories/platilloRepository')

const getAllPlatillo = async () => {
    try {
        const platillo = await platilloRepository.getAllPlatillo()
        return (platillo) ? platillo : []
    } catch (error) {
        throw error
    }
}

const getPlatilloById = async (id) => {
    try {
        const platillo = await platilloRepository.getPlatilloById(id)
        return (platillo) ? platillo : []
    } catch (error) {
        throw error
    }
}

const createPlatillo = async (data) => {
    try {
        const platillo = await platilloRepository.createPlatillo(data)
        return (platillo) ? platillo : []
    } catch (error) {
        throw error
    }
}

const updatePlatillo = async (data, id) => {
    try {
        const platillo = await platilloRepository.updatePlatillo(data, id)
        return (platillo) ? platillo : []
    } catch (error) {
        throw error
    }
}

const deletePlatillo = async (id) => {
    try {
        const platillo = await platilloRepository.deletePlatillo(id)
        return (platillo) ? platillo : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPlatillo,
    getPlatilloById,
    createPlatillo,
    updatePlatillo,
    deletePlatillo,
}