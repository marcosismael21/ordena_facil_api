const express = require('express')
const direccionController = require('../controllers/direccionController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/direccionValidation')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, direccionController.getAllDireccion)
router.get('/cliente/:clienteId', verifyToken, direccionController.getAllDireccionByClienteId)
router.get('/:id', verifyToken, direccionController.getDireccionById)
router.post('/', [verifyToken, ValidationRules(), validate], direccionController.createDireccion)
router.put('/:id', [verifyToken, ValidationRules(), validate], direccionController.updateDireccion)
router.delete('/:id', verifyToken, direccionController.deleteDireccion)

module.exports = router