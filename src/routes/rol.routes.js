const express = require('express')
const rolController = require('../controllers/rolController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

router.get('/', rolController.getAllRol)
router.get('/:id', verifyToken, rolController.getRolById)
router.post('/', [variasValidationRules(), validate], rolController.createRol)
router.put('/:id', [verifyToken, variasValidationRules(), validate], rolController.updateRol)
router.delete('/:id', verifyToken, rolController.deleteRol)

module.exports = router