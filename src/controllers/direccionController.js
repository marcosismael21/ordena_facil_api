const direccionService = require('../services/direccionService')

const getAllDireccion = async (req, res, next) => {
    try {
        const direccion = await direccionService.getAllDireccion()
        return res.status(200).json(direccion)
    } catch (error) {
        next(error)
    }
}

const getDireccionById = async (req, res, next) => {
    const id = req.params.id
    try {
        const direccion = await direccionService.getDireccionById(id)
        return res.status(200).json(direccion)
    } catch (error) {
        next(error)
    }
}

const createDireccion = async (req, res, next) => {
    const {
        clienteId,
        alias,
        descripcion,
        estado,
    } = req.body

    const data = {
        clienteId,
        alias,
        descripcion,
        estado,
    }

    try {
        const direccion = await direccionService.createDireccion(data)
        return res.status(200).json(direccion)
    } catch (error) {
        next(error)
    }
}

const updateDireccion = async (req, res, next) => {
    const id = req.params.id

    const {
        clienteId,
        alias,
        descripcion,
        estado,
    } = req.body

    const data = {
        clienteId,
        alias,
        descripcion,
        estado,
    }

    try {
        const direccion = await direccionService.updateDireccion(data, id)
        return res.status(200).json(direccion)
    } catch (error) {
        next(error)
    }
}

const deleteDireccion = async (req, res, next) => {
    const id = req.params.id
    try {
        const direccion = await direccionService.deleteDireccion(id)
        return res.status(200).json(direccion)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllDireccion,
    getDireccionById,
    createDireccion,
    updateDireccion,
    deleteDireccion
}