const express = require('express')
const tipoMedidaController = require('../controllers/tipoMedidaController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, tipoMedidaController.getAllTipoMedida)
router.get('/:id', verifyToken, tipoMedidaController.getTipoMedidaById)
router.post('/', [verifyToken, variasValidationRules(), validate], tipoMedidaController.createTipoMedida)
router.put('/:id', [verifyToken, variasValidationRules(), validate], tipoMedidaController.updateTipoMedida)
router.delete('/:id', verifyToken, tipoMedidaController.deleteTipoMedida)

module.exports = router