const express = require('express')
const extraController = require('../controllers/extraController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/extraValidation')

router.get('/', verifyToken, extraController.getAllExtra)
router.get('/:id', verifyToken, extraController.getExtraById)
router.post('/', [verifyToken, ValidationRules(), validate], extraController.createExtra)
router.put('/:id', [verifyToken, ValidationRules(), validate], extraController.updateExtra)
router.delete('/:id', verifyToken, extraController.deleteExtra)

module.exports = router