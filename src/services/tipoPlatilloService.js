const tipoPlatilloRepository = require('../repositories/tipoPlatilloRepository')

const getAllTipoPlatillo = async () => {
    try {
        const tipoPlatillo = await tipoPlatilloRepository.getAllTipoPlatillo()
        return (tipoPlatillo) ? tipoPlatillo : []
    } catch (error) {
        throw error
    }
}

const getTipoPlatilloById = async (id) => {
    try {
        const tipoPlatillo = await tipoPlatilloRepository.getTipoPlatilloById(id)
        return (tipoPlatillo) ? tipoPlatillo : []
    } catch (error) {
        throw error
    }
}

const createTipoPlatillo = async (data) => {
    try {
        const tipoPlatillo = await tipoPlatilloRepository.createTipoPlatillo(data)
        return (tipoPlatillo) ? tipoPlatillo : []
    } catch (error) {
        throw error
    }
}

const updateTipoPlatillo = async (data, id) => {
    try {
        const tipoPlatillo = await tipoPlatilloRepository.updateTipoPlatillo(data, id)
        return (tipoPlatillo) ? tipoPlatillo : []
    } catch (error) {
        throw error
    }
}

const deleteTipoPlatillo = async (id) => {
    try {
        const tipoPlatillo = await tipoPlatilloRepository.deleteTipoPlatillo(id)
        return (tipoPlatillo) ? tipoPlatillo : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoPlatillo,
    getTipoPlatilloById,
    createTipoPlatillo,
    updateTipoPlatillo,
    deleteTipoPlatillo,
}