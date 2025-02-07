const tipoPlatilloService = require('../services/tipoPlatilloService')

const getAllTipoPlatillo = async (req, res, next) => {
    try {
        const tipoPlatillo = await tipoPlatilloService.getAllTipoPlatillo()
        return res.status(200).json(tipoPlatillo)
    } catch (error) {
        next(error)
    }
}

const getTipoPlatilloById = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoPlatillo = await tipoPlatilloService.getTipoPlatilloById(id)
        return res.status(200).json(tipoPlatillo)
    } catch (error) {
        next(error)
    }
}

const createTipoPlatillo = async (req, res, next) => {
    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoPlatillo = await tipoPlatilloService.createTipoPlatillo(data)
        return res.status(200).json(tipoPlatillo)
    } catch (error) {
        next(error)
    }
}

const updateTipoPlatillo = async (req, res, next) => {
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
        const tipoPlatillo = await tipoPlatilloService.updateTipoPlatillo(data, id)
        return res.status(200).json(tipoPlatillo)
    } catch (error) {
        next(error)
    }
}

const deleteTipoPlatillo = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoPlatillo = await tipoPlatilloService.deleteTipoPlatillo(id)
        return res.status(200).json(tipoPlatillo)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTipoPlatillo,
    getTipoPlatilloById,
    createTipoPlatillo,
    updateTipoPlatillo,
    deleteTipoPlatillo
}