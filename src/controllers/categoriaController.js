const categoriaService = require('../services/categoriaService')

const getAllCategoria = async (req, res, next) => {
    try {
        const categoria = await categoriaService.getAllCategoria()
        return res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
}

const getCategoriaById = async (req, res, next) => {
    const id = req.params.id
    try {
        const categoria = await categoriaService.getCategoriaById(id)
        return res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
}

const createCategoria = async (req, res, next) => {
    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const categoria = await categoriaService.createCategoria(data)
        return res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
}

const updateCategoria = async (req, res, next) => {
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
        const categoria = await categoriaService.updateCategoria(data, id)
        return res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
}

const deleteCategoria = async (req, res, next) => {
    const id = req.params.id
    try {
        const categoria = await categoriaService.deleteCategoria(id)
        return res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
}