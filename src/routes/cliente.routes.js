const express = require('express');
const UserController = require('../controllers/clienteController');
const { verifyTokenCliente } = require("../middleware/index");
const { ValidationRules, validate } = require('../middleware/validaciones/clienteValidation')
const router = express.Router();
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyTokenCliente, UserController.getAllCliente);
router.get('/:id', verifyTokenCliente, UserController.getClienteById);
router.post('/', UserController.createCliente);
router.put('/:id', [verifyTokenCliente, ValidationRules(), validate], UserController.updateCliente);
router.delete('/:id', verifyTokenCliente, UserController.deleteCliente);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout)

module.exports = router;