const express = require('express')
const mesaController = require('../controllers/mesaController')
const {verifyToken} = require('../middleware/index')
const router = express.Router()
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, mesaController.getAllMesa)
router.get('/:id', verifyToken, mesaController.getMesaById)
router.post('/', verifyToken, mesaController.createMesa)
router.put('/:id', verifyToken, mesaController.updateMesa)
router.delete('/:id', verifyToken, mesaController.deleteMesa)

module.exports = router