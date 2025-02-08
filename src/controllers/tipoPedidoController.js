const tipoPedidoService = require('../services/tipoPedidoService')

const getAllTipoPedido = async (req, res, next) => {
    try {
        const tipoPedido = await tipoPedidoService.getAllTipoPedido()
        return res.status(200).json(tipoPedido)
    } catch (error) {
        next(error)
    }
}

const getTipoPedidoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoPedido = await tipoPedidoService.getTipoPedidoById(id)
        return res.status(200).json(tipoPedido)
    } catch (error) {
        next(error)
    }
}

const createTipoPedido = async (req, res, next) => {
    const {
        descripcion,
        estado
    } = req.body

    const data = {
        descripcion,
        estado
    }

    try {
        const tipoPedido = await tipoPedidoService.createTipoPedido(data)
        return res.status(200).json(tipoPedido)
    } catch (error) {
        next(error)
    }
}

const updateTipoPedido = async (req, res, next) => {
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
        const tipoPedido = await tipoPedidoService.updateTipoPedido(data, id)
        return res.status(200).json(tipoPedido)
    } catch (error) {
        next(error)
    }
}

const deleteTipoPedido = async (req, res, next) => {
    const id = req.params.id
    try {
        const tipoPedido = await tipoPedidoService.deleteTipoPedido(id)
        return res.status(200).json(tipoPedido)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTipoPedido,
    getTipoPedidoById,
    createTipoPedido,
    updateTipoPedido,
    deleteTipoPedido
}