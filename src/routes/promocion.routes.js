const express = require('express')
const promocionController = require('../controllers/promocionController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, promocionController.getAllPromocion)
router.get('/:id', verifyToken, promocionController.getPromocionById)
router.post('/', verifyToken, promocionController.createPromocion)
router.put('/:id', verifyToken, promocionController.updatePromocion)
router.delete('/:id', verifyToken, promocionController.deletePromocion)

module.exports = router