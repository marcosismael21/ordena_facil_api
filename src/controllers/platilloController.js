const platilloService = require('../services/platilloService')

const getAllPlatillo = async (req, res, next) => {
    try {
        const platillo = await platilloService.getAllPlatillo()
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

const getPlatilloById = async (req, res, next) => {
    const id = req.params.id
    try {
        const platillo = await platilloService.getPlatilloById(id)
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

const createPlatillo = async (req, res, next) => {
    const {
        nombre,
        descripcion,
        tipoplatilloId,
        precio,
        imageUrl,
        estado
    } = req.body

    const data = {
        nombre,
        descripcion,
        tipoplatilloId,
        precio,
        imageUrl,
        estado
    }

    try {
        const platillo = await platilloService.createPlatillo(data)
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

const updatePlatillo = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        descripcion,
        tipoplatilloId,
        precio,
        imageUrl,
        estado
    } = req.body

    const data = {
        nombre,
        descripcion,
        tipoplatilloId,
        precio,
        imageUrl,
        estado
    }

    try {
        const platillo = await platilloService.updatePlatillo(data, id)
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

const deletePlatillo = async (req, res, next) => {
    const id = req.params.id
    try {
        const platillo = await platilloService.deletePlatillo(id)
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPlatillo,
    getPlatilloById,
    createPlatillo,
    updatePlatillo,
    deletePlatillo
}