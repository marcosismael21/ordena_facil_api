const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.Usuario; 
const { tokenVerificationError } = require("../utils/tokenManager");

const verifyToken = async (req, res, next) => {
    try {
        let token = null;

        // Verificar si el token viene en la cabecera de autorización
        if (req.headers?.authorization) {
            token = req.headers.authorization.split(" ")[1]; // Bearer token
        }

        // Si no viene en la cabecera, verificar si viene en las cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token; // Token almacenado en las cookies
        }

        // Si no hay token en ninguno de los dos lugares, lanzar un error
        if (!token) {
            return res.status(403).send({ message: "¡Ya no existe un token!" });
        }

        // Verificar y decodificar el token
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = id;

        // Buscar el usuario
        const user = await User.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // Continuar si el token es válido
        next();
    } catch (error) {
        return res.status(401).send({
            error: tokenVerificationError[error.message] || "Unauthorized",
        });
    }
};

module.exports = verifyToken;