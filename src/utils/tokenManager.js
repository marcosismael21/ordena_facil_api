const jwt = require("jsonwebtoken");

const generateToken = (id, platform) => {
    const expiresIn = 60000000 * 15;
    try {
        const token = jwt.sign(
            {
                id: id,
                platform: platform
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