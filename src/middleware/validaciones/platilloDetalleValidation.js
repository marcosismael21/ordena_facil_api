const { body, validationResult } = require('express-validator');

const ValidationRules = () => {
    return [
        body('platilloId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('productoId').notEmpty().withMessage("El campo es obligatorio").isInt().withMessage("Debe ser un numero entero"),
        body('cantidad').notEmpty().withMessage("El campo es obligatorio").isDecimal().withMessage("Debe ser un numero decimal"),
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