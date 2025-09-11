const express = require('express')
const categoriaController = require('../controllers/categoriaController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, categoriaController.getAllCategoria)
router.get('/:id', verifyToken, categoriaController.getCategoriaById)
router.post('/', [verifyToken, variasValidationRules(), validate], categoriaController.createCategoria)
router.put('/:id', [verifyToken, variasValidationRules(), validate], categoriaController.updateCategoria)
router.delete('/:id', verifyToken, categoriaController.deleteCategoria)

module.exports = router