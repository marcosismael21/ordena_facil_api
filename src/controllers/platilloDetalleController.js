const platilloDetalleService = require('../services/platilloDetalleService')

const getAllPlatilloDetalle = async (req, res, next) => {
    try {
        const platilloDetalle = await platilloDetalleService.getAllPlatilloDetalle()
        return res.status(200).json(platilloDetalle)
    } catch (error) {
        next(error)
    }
}

const getPlatilloDetalleById = async (req, res, next) => {
    const id = req.params.id
    try {
        const platilloDetalle = await platilloDetalleService.getPlatilloDetalleById(id)
        return res.status(200).json(platilloDetalle)
    } catch (error) {
        next(error)
    }
}

const createPlatilloDetalle = async (req, res, next) => {
    const {
        platilloId,
        productoId,
        cantidad,
    } = req.body

    const data = {
        platilloId,
        productoId,
        cantidad
    }

    try {
        const platilloDetalle = await platilloDetalleService.createPlatilloDetalle(data)
        return res.status(200).json(platilloDetalle)
    } catch (error) {
        next(error)
    }
}

const updatePlatilloDetalle = async (req, res, next) => {
    const id = req.params.id

    const {
        platilloId,
        productoId,
        cantidad
    } = req.body

    const data = {
        platilloId,
        productoId,
        cantidad
    }

    try {
        const platilloDetalle = await platilloDetalleService.updatePlatilloDetalle(data, id)
        return res.status(200).json(platilloDetalle)
    } catch (error) {
        next(error)
    }
}

const deletePlatilloDetalle = async (req, res, next) => {
    const id = req.params.id
    try {
        const platilloDetalle = await platilloDetalleService.deletePlatilloDetalle(id)
        return res.status(200).json(platilloDetalle)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPlatilloDetalle,
    getPlatilloDetalleById,
    createPlatilloDetalle,
    updatePlatilloDetalle,
    deletePlatilloDetalle
}