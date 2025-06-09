const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const MesaRepository = db.Mesa

const getAllMesa = async () => {
    try {
        const mesa = await MesaRepository.findAll()
        return ResponseHandler.success(mesa)
    } catch (error) {
        throw error
    }
}

const getMesaById = async (id) => {
    try {
        const mesa = await MesaRepository.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(mesa)
    } catch (error) {
        throw error
    }
}

const createMesa = async (data) => {
    try {
        const mesa = await MesaRepository.create(data)
        return ResponseHandler.success(mesa, 'Mesa creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateMesa = async (data, id) => {
    try {
        const mesa = await MesaRepository.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(mesa, 'Mesa actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteMesa = async (id) => {
    try {
        const mesa = await MesaRepository.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(mesa, 'Mesa eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMesa,
    getMesaById,
    createMesa,
    updateMesa,
    deleteMesa
}