const { body, validationResult } = require('express-validator');

const ValidationRules = () => {
    return [
        body('pedidoDetalleId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('productoId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('cantidad').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('precioUnitario').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('subTotal').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
        body('estado').notEmpty().withMessage("El campo es obligatorio").isBoolean().withMessage('Debe ser un valor boleano'),
    ];
}

const validate = (req, res, next) => {

    const errors = validationResult(req)
    console.log('errors', errors);

    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        message: extractedErrors,
    })
}

module.exports = { ValidationRules, validate }