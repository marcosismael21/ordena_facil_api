const express = require('express')
const productoController = require('../controllers/productoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/productoValidation')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, productoController.getAllProducto)
router.get('/:id', verifyToken, productoController.getProductoById)
router.post('/', [verifyToken, ValidationRules(), validate], productoController.createProducto)
router.put('/:id', [verifyToken, ValidationRules(), validate], productoController.updateProducto)
router.delete('/:id', verifyToken, productoController.deleteProducto)

module.exports = router