const express = require('express');

const UserController = require('../controllers/colaboradorController');
const { verifyToken } = require("../middleware/index");
const router = express.Router();
const validateApiKey = require('../middleware/apiKeyMiddleware')
const validatePlatform = require('../middleware/platformValidation')

router.use(validateApiKey)
router.use(validatePlatform)

router.get('/', verifyToken, UserController.getAllColaborador);
router.get('/:id', verifyToken, UserController.getColaboradorById);
router.get('/estado/:estado', verifyToken, UserController.getAllColaboradorBySetado);
router.post('/', UserController.createColaborador);
router.put('/:id', UserController.updateColaborador);
router.delete('/:id', verifyToken, UserController.deleteColaborador);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout)

module.exports = router;