const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const expiresIn = 60 * 15;
    try {
        const token = jwt.sign(
            {
                id: id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn,
            }
        );
        return {
            token,
            expiresIn,
        }
    } catch (error) {
        console.log(error)
    }
}

const tokenVerificationError = {
    "invalid signature": "La firma es invalida",
    "jwt expired": "JWT expirado",
    "invlid token": "Token no valido",
    "No Bearer": "Utiliza formato Bearer",
}

module.exports = { generateToken, tokenVerificationError, }