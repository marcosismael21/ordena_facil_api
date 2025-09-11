const promocionRepository = require('../repositories/promocionRepository')

const getAllPromocion = async () => {
    try {
        const promocion = await promocionRepository.getAllPromocion()
        return (promocion) ? promocion : []
    } catch (error) {
        throw error
    }
}

const getPromocionById = async (id) => {
    try {
        const promocion = await promocionRepository.getPromocionById(id)
        return (promocion) ? promocion : []
    } catch (error) {
        throw error
    }
}

const createPromocion = async (data) => {
    try {
        const promocion = await promocionRepository.createPromocion(data)
        return (promocion) ? promocion : []
    } catch (error) {
        throw error
    }
}

const updatePromocion = async (data, id) => {
    try {
        const promocion = await prompromocionRepositoryocion.updatePromocion(data, id)
        return (promocion) ? promocion : []
    } catch (error) {
        throw error
    }
}

const deletePromocion = async (id) => {
    try {
        const promocion = await promocionRepository.deletePromocion(id)
        return (promocion) ? promocion : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPromocion,
    getPromocionById,
    createPromocion,
    updatePromocion,
    deletePromocion,
}