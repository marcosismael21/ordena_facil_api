const platilloService = require('../services/platilloService')
const uploadService = require('../services/uploadService')
const { upload } = require('../middleware/uploadMiddleware')

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
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar una imagen para el platillo'
            })
        }

        const uploadResult = await uploadService.uploadFile(req.file)
        if (!uploadResult.success) {
            return res.status(400).json(uploadResult)
        }

        let productoIds = []
        let cantidad = []

        try {
            productoIds = JSON.parse(req.body.productoIds)
            cantidad = JSON.parse(req.body.cantidad)
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'El formato de productoIds o cantidad es inválido. Debe ser un array en formato JSON'
            })
        }

        const {
            nombre,
            descripcion,
            tipoplatilloId,
            precio,
            estado
        } = req.body

        const data = {
            nombre,
            descripcion,
            tipoplatilloId,
            precio,
            imageUrl: uploadResult.data.url,
            productoIds,
            cantidad,
            estado
        }

        const platillo = await platilloService.createPlatillo(data)
        return res.status(200).json(platillo)
    } catch (error) {
        next(error)
    }
}

const updatePlatillo = async (req, res, next) => {
    const id = req.params.id
    try {
        let imageUrl = req.body.imageUrl

        if (req.file) {
            const uploadResult = await uploadService.uploadFile(req.file);
            if (!uploadResult.success) {
                return res.status(400).json(uploadResult);
            }
            imageUrl = uploadResult.data.url;
        }

        let productoIds = []
        let cantidad = []

        try {
            productoIds = JSON.parse(req.body.productoIds)
            cantidad = JSON.parse(req.body.cantidad)
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'El formato de productoIds o cantidad es inválido. Debe ser un array en formato JSON'
            })
        }

        const {
            nombre,
            descripcion,
            tipoplatilloId,
            precio,
            estado
        } = req.body

        const data = {
            nombre,
            descripcion,
            tipoplatilloId,
            precio,
            imageUrl,
            productoIds,
            cantidad,
            estado
        }

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