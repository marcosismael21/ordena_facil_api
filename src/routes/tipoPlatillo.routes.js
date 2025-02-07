const express = require('express')
const tipoPlatillo = require('../controllers/tipoPlatilloController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

router.get('/', verifyToken, tipoPlatillo.getAllTipoPlatillo)
router.get('/:id', verifyToken, tipoPlatillo.getTipoPlatilloById)
router.post('/', [verifyToken, variasValidationRules(), validate], tipoPlatillo.createTipoPlatillo)
router.put('/:id', [verifyToken, variasValidationRules(), validate], tipoPlatillo.updateTipoPlatillo)
router.delete('/:id', verifyToken, tipoPlatillo.deleteTipoPlatillo)

module.exports = router