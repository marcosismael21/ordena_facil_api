const proveedorService = require('../services/proveedorService')

const getAllProveedor = async (req, res, next) => {
    try {
        const proveedor = await proveedorService.getAllProveedor()
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const getProveedorById = async (req, res, next) => {
    const id = req.params.id
    try {
        const proveedor = await proveedorService.getProveedorById(id)
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const createProveedor = async (req, res, next) => {
    const {
        nombre,
        rtn,
        correo,
        telefono,
        estado
    } = req.body

    const data = {
        nombre,
        rtn,
        correo,
        telefono,
        estado
    }

    try {
        const proveedor = await proveedorService.createProveedor(data)
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const updateProveedor = async (req, res, next) => {
    const id = req.params.id

    const {
        nombre,
        rtn,
        correo,
        telefono,
        estado
    } = req.body

    const data = {
        nombre,
        rtn,
        correo,
        telefono,
        estado
    }

    try {
        const proveedor = await proveedorService.updateProveedor(data, id)
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

const deleteProveedor = async (req, res, next) => {
    const id = req.params.id
    try {
        const proveedor = await proveedorService.deleteProveedor(id)
        return res.status(200).json(proveedor)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProveedor,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
}