const productoService = require('../services/productoService')

const getAllProducto = async (req, res, next) => {
    try {
        const producto = await productoService.getAllProducto()
        return res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

const getProductoById = async (req, res, next) => {
    const id = req.params.id
    try {
        const producto = await productoService.getProductoById(id)
        return res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

const createProducto = async (req, res, next) => {
    const {
        descripcion,
        proveedorId,
        tipoMedidaId,
        categoriaId,
        cantidad,
        codigo,
        estado,
    } = req.body

    const data = {
        descripcion,
        proveedorId,
        tipoMedidaId,
        categoriaId,
        cantidad,
        codigo,
        estado,
    }

    try {
        const producto = await productoService.createProducto(data)
        return res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

const updateProducto = async (req, res, next) => {
    const id = req.params.id

    const {
        descripcion,
        proveedorId,
        tipoMedidaId,
        categoriaId,
        cantidad,
        codigo,
        estado,
    } = req.body

    const data = {
        descripcion,
        proveedorId,
        tipoMedidaId,
        categoriaId,
        cantidad,
        codigo,
        estado,
    }

    try {
        const producto = await productoService.updateProducto(data, id)
        return res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

const deleteProducto = async (req, res, next) => {
    const id = req.params.id
    try {
        const producto = await productoService.deleteProducto(id)
        return res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}