const mesaService = require('../services/mesaService')

const getAllMesa = async (req, res, next) => {
    try {
        const mesa = await mesaService.getAllMesa()
        return res.status(200).json(mesa)
    } catch (error) {
        next(error)
    }
}

const getMesaById = async (req, res, next) => {
    const id = req.params.id
    try {
        const mesa = await mesaService.getMesaById(id)
        return res.status(200).json(mesa)
    } catch (error) {
        next(error)
    }
}

const createMesa = async (req, res, next) => {
    const {
        descripcion,
        cupos,
        estado,
    } = req.body

    const data = {
        descripcion,
        cupos,
        estado,
    }

    try {
        const mesa = await mesaService.createMesa(data)
        return res.status(200).json(mesa)
    } catch (error) {
        next(error)
    }
}

const updateMesa = async (req, res, next) => {
    const id = req.params.id

    const {
        descripcion,
        cupos,
        estado,
    } = req.body

    const data = {
        descripcion,
        cupos,
        estado,
    }

    try {
        const mesa = await mesaService.updateMesa(data, id)
        return res.status(200).json(mesa)
    } catch (error) {
        next(error)
    }
}

const deleteMesa = async (req, res, next) => {
    const id = req.params.id
    try {
        const mesa = await mesaService.deleteMesa(id)
        return res.status(200).json(mesa)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllMesa,
    getMesaById,
    createMesa,
    updateMesa,
    deleteMesa
}