const mesaRepository = require('../repositories/mesaRepository')

const getAllMesa = async () => {
    try {
        const mesa = await mesaRepository.getAllMesa()
        return (mesa) ? mesa : []
    } catch (error) {
        throw error
    }
}

const getMesaById = async (id) => {
    try {
        const mesa = await mesaRepository.getMesaById(id)
        return (mesa) ? mesa : []
    } catch (error) {
        throw error
    }
}

const createMesa = async (data) => {
    try {
        const mesa = await mesaRepository.createMesa(data)
        return (mesa) ? mesa : []
    } catch (error) {
        throw error
    }
}

const updateMesa = async (data, id) => {
    try {
        const mesa = await mesaRepository.updateMesa(data, id)
        return (mesa) ? mesa : []
    } catch (error) {
        throw error
    }
}

const deleteMesa = async (id) => {
    try {
        const mesa = await mesaRepository.deleteMesa(id)
        return (mesa) ? mesa : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMesa,
    getMesaById,
    createMesa,
    updateMesa,
    deleteMesa,
}