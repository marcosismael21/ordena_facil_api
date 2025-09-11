const express = require('express')
const platilloDetalleController = require('../controllers/platilloDetalleController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/platilloDetalleValidation')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, platilloDetalleController.getAllPlatilloDetalle)
router.get('/:id', verifyToken, platilloDetalleController.getPlatilloDetalleById)
router.post('/', [verifyToken, ValidationRules(), validate], platilloDetalleController.createPlatilloDetalle)
router.put('/:id', [verifyToken, ValidationRules(), validate], platilloDetalleController.updatePlatilloDetalle)
router.delete('/:id', verifyToken, platilloDetalleController.deletePlatilloDetalle)

module.exports = router