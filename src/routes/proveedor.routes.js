const express = require('express')
const proveedorController = require('../controllers/proveedorController')
const { verifyToken } = require('../middleware/index')
const router = express.Router()
const { ValidationRules, validate } = require('../middleware/validaciones/proveedorValidation')

router.get('/', verifyToken, proveedorController.getAllProveedor)
router.get('/:id', verifyToken, proveedorController.getProveedorById)
router.post('/', [verifyToken, ValidationRules(), validate], proveedorController.createProveedor)
router.put('/:id', [verifyToken, ValidationRules(), validate], proveedorController.updateProveedor)
router.delete('/:id', verifyToken, proveedorController.deleteProveedor)

module.exports = router