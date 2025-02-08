const tipoMedidaService = require('../services/tipoMedidaService')

const getAllTipoMedida = async (req, res, next) => {
    try {
        const tipoMedida = await tipoMedidaService.getAllTipoMedida()
        return res.status(200).json(tipoMedida)
    } catch (error) {
        next(error)
    }
}

const getTipoMedidaById = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoMedida = await tipoMedidaService.getTipoMedidaById(id)
        return res.status(200).json(tipoMedida)
    } catch (error) {
        next(error)
    }
}

const createTipoMedida = async (req, res, next) => {
    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoMedida = await tipoMedidaService.createTipoMedida(data)
        return res.status(200).json(tipoMedida)
    } catch (error) {
        next(error)
    }
}

const updateTipoMedida = async (req, res, next) => {
    const id = req.params.id

    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoMedida = await tipoMedidaService.updateTipoMedida(data, id)
        return res.status(200).json(tipoMedida)
    } catch (error) {
        next(error)
    }
}

const deleteTipoMedida = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoMedida = await tipoMedidaService.deleteTipoMedida(id)
        return res.status(200).json(tipoMedida)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTipoMedida,
    getTipoMedidaById,
    createTipoMedida,
    updateTipoMedida,
    deleteTipoMedida
}