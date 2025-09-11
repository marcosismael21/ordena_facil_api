const extraService = require('../services/extraService')

const getAllExtra = async (req, res, next) => {
    try {
        const extra = await extraService.getAllExtra()
        return res.status(200).json(extra)
    } catch (error) {
        next(error)
    }
}

const getExtraById = async (req, res, next) => {
    const id = req.params.id
    try {
        const extra = await extraService.getExtraById(id)
        return res.status(200).json(extra)
    } catch (error) {
        next(error)
    }
}

const createExtra = async (req, res, next) => {
    const {
        pedidoDetalleId,
        productoId,
        cantidad,
        precioUnitario,
        subTotal,
        estado,
    } = req.body

    const data = {
        pedidoDetalleId,
        productoId,
        cantidad,
        precioUnitario,
        subTotal,
        estado,
    }

    try {
        const extra = await extraService.createExtra(data)
        return res.status(200).json(extra)
    } catch (error) {
        next(error)
    }
}

const updateExtra = async (req, res, next) => {
    const id = req.params.id

    const {
        pedidoDetalleId,
        productoId,
        cantidad,
        precioUnitario,
        subTotal,
        estado,
    } = req.body

    const data = {
        pedidoDetalleId,
        productoId,
        cantidad,
        precioUnitario,
        subTotal,
        estado,
    }

    try {
        const extra = await extraService.updateExtra(data, id)
        return res.status(200).json(extra)
    } catch (error) {
        next(error)
    }
}

const deleteExtra = async (req, res, next) => {
    const id = req.params.id
    try {
        const extra = await extraService.deleteExtra(id)
        return res.status(200).json(extra)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllExtra,
    getExtraById,
    createExtra,
    updateExtra,
    deleteExtra
}