const promocionService = require('../services/promocionService')

const getAllPromocion = async (req, res, next) => {
    try {
        const promocion = await promocionService.getAllPromocion()
        return res.status(200).json(promocion)
    } catch (error) {
        next(error)
    }
}

const getPromocionById = async (req, res, next) => {
    const id = req.params.id
    try {
        const promocion = await promocionService.getPromocionById(id)
        return res.status(200).json(promocion)
    } catch (error) {
        next(error)
    }
}

const createPromocion = async (req, res, next) => {
    const {
        urlImage,
        descripcion,
        fechaInicio,
        fechaFinal,
        platilloId,
        estado
    } = req.body

    const data = {
        urlImage,
        descripcion,
        fechaInicio,
        fechaFinal,
        platilloId,
        estado
    }

    try {
        const promocion = await promocionService.createPromocion(data)
        return res.status(200).json(promocion)
    } catch (error) {
        next(error)
    }
}

const updatePromocion = async (req, res, next) => {
    const id = req.params.id

    const {
        urlImage,
        descripcion,
        fechaInicio,
        fechaFinal,
        platilloId,
        estado
    } = req.body

    const data = {
        urlImage,
        descripcion,
        fechaInicio,
        fechaFinal,
        platilloId,
        estado,
    }

    try {
        const promocion = await promocionService.updatePromocion(data, id)
        return res.status(200).json(promocion)
    } catch (error) {
        next(error)
    }
}

const deletePromocion = async (req, res, next) => {
    const id = req.params.id
    try {
        const promocion = await promocionService.deletePromocion(id)
        return res.status(200).json(promocion)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPromocion,
    getPromocionById,
    createPromocion,
    updatePromocion,
    deletePromocion
}