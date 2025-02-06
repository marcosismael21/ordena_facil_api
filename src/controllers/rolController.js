const rolService = require('../services/rolServices')

const getAllRol = async (req, res, next) => {
    try {
        const rol = await rolService.getAllRol()
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const getRolById = async (req, res, next) => {
    const id = req.params.id
    try {
        const rol = await rolService.getRolById(id)
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const createRol = async (req, res, next) => {
    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const rol = await rolService.createRol(data)
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const updateRol = async (req, res, next) => {
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
        const rol = await rolService.updateRol(data, id)
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

const deleteRol = async (req, res, next) => {
    const id = req.params.id
    try {
        const rol = await rolService.deleteRol(id)
        return res.status(200).json(rol)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}