const express = require('express');
const router = express.Router();
const cocinaController = require('../controllers/cocinaController');
const { verifyToken } = require("../middleware/index");

router.get('/pedidos-pendientes', verifyToken, cocinaController.obtenerPedidosPendientes);
router.get('/pedidos-cocina', verifyToken, cocinaController.obtenerPedidosCocina);
router.put('/pedido/:pedidoId/estado', verifyToken, cocinaController.actualizarEstadoPedido);

module.exports = router;