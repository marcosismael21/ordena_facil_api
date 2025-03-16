const express = require('express')
const pedidoController = require('../controllers/pedidoController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.put('/:id/enviar-cocina', verifyToken, pedidoController.changeStatus)
router.get('/', verifyToken, pedidoController.getAllPedido)
router.get('/:id', verifyToken, pedidoController.getPedidoById)
router.get('/cliente/:clienteId', verifyToken, pedidoController.getAllPedidoByClient)
router.get('/detalle/:pedidoId', verifyToken, pedidoController.getPedidoDetalleByPedidoId)
router.post('/', verifyToken, pedidoController.createPedido)
router.put('/:id', verifyToken, pedidoController.updatePedido)
router.delete('/:id', verifyToken, pedidoController.deletePedido)

module.exports = router