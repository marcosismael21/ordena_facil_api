const express = require('express')
const tipoPedidoController = require('../controllers/tipoPedidoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { variasValidationRules, validate } = require('../middleware/validaciones/validacionesVarias')

router.get('/', verifyToken, tipoPedidoController.getAllTipoPedido)
router.get('/:id', verifyToken, tipoPedidoController.getTipoPedidoById)
router.post('/', [verifyToken, variasValidationRules(), validate], tipoPedidoController.createTipoPedido)
router.put('/:id', [verifyToken, variasValidationRules(), validate], tipoPedidoController.updateTipoPedido)
router.delete('/:id', verifyToken, tipoPedidoController.deleteTipoPedido)

module.exports = router