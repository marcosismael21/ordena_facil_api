const express = require('express')
const platilloController = require('../controllers/platilloController')
const { verifyToken } = require('../middleware/index')
const { upload } = require('../middleware/uploadMiddleware')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/platilloValidation')
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, platilloController.getAllPlatillo)
router.get('/:id', verifyToken, platilloController.getPlatilloById)
router.post('/', verifyToken, upload.single('image'), platilloController.createPlatillo)
router.put('/:id', verifyToken, upload.single('image'), platilloController.updatePlatillo)
router.delete('/:id', verifyToken, platilloController.deletePlatillo)

module.exports = router