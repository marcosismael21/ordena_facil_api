const tipoMedidaRepository = require('../repositories/tipoMedidaRepository')

const getAllTipoMedida = async () => {
    try {
        const tipoMedida = await tipoMedidaRepository.getAllTipoMedida()
        return (tipoMedida) ? tipoMedida : []
    } catch (error) {
        throw error
    }
}

const getTipoMedidaById = async (id) => {
    try {
        const tipoMedida = await tipoMedidaRepository.getTipoMedidaById(id)
        return (tipoMedida) ? tipoMedida : []
    } catch (error) {
        throw error
    }
}

const createTipoMedida = async (data) => {
    try {
        const tipoMedida = await tipoMedidaRepository.createTipoMedida(data)
        return (tipoMedida) ? tipoMedida : []
    } catch (error) {
        throw error
    }
}

const updateTipoMedida = async (data, id) => {
    try {
        const tipoMedida = await tipoMedidaRepository.updateTipoMedida(data, id)
        return (tipoMedida) ? tipoMedida : []
    } catch (error) {
        throw error
    }
}

const deleteTipoMedida = async (id) => {
    try {
        const tipoMedida = await tipoMedidaRepository.deleteTipoMedida(id)
        return (tipoMedida) ? tipoMedida : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTipoMedida,
    getTipoMedidaById,
    createTipoMedida,
    updateTipoMedida,
    deleteTipoMedida,
}