const express = require('express')
const pedidoController = require('../controllers/pedidoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()

router.get('/', verifyToken, pedidoController.getAllPedido)
router.get('/:id', verifyToken, pedidoController.getPedidoById)
router.post('/', verifyToken, pedidoController.createPedido)
router.put('/:id', verifyToken, pedidoController.updatePedido)
router.delete('/:id', verifyToken, pedidoController.deletePedido)

module.exports = router