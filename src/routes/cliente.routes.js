const express = require('express');
const UserController = require('../controllers/clienteController');
const { verifyToken } = require("../middleware/index");
const { ValidationRules, validate } = require('../middleware/validaciones/clienteValidation')
const router = express.Router();
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, UserController.getAllCliente);
router.get('/:id', verifyToken, UserController.getClienteById);
router.get('/dni/:dni', verifyToken, UserController.getClienteByDni);
router.post('/', UserController.createCliente);
router.post('/caja', UserController.createClienteCaja);
router.put('/:id', verifyToken, UserController.updateCliente);
router.put('/infocliente/:id', verifyToken, UserController.updateClienteInfo);
router.delete('/:id', verifyToken, UserController.deleteCliente);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout)
router.post('/change-password', verifyToken, UserController.changePassword)

module.exports = router;