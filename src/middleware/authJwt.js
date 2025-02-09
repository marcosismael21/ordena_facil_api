const jwt = require("jsonwebtoken");
const db = require("../models");
const Colaborador = db.Colaborador;
const Cliente = db.Cliente;
const { tokenVerificationError } = require("../utils/tokenManager");

const verifyToken = async (req, res, next) => {
    try {
        let token = null;
        // Verificar si el token viene en la cabecera de autorización
        if (req.headers?.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        // Si no viene en la cabecera, verificar si viene en las cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }
        // Si no hay token en ninguno de los dos lugares, lanzar un error
        if (!token) {
            return res.status(403).send({ message: "¡Ya no existe un token!" });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, platform } = decoded;
        req.userId = id;

        // Determinar el modelo a usar según la plataforma
        const UserModel = platform === 'mobile' ? Cliente : Colaborador;

        // Buscar el usuario
        const user = await UserModel.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // Almacenar el usuario y la plataforma en el request para uso posterior
        req.user = user;
        req.platform = platform;

        // Continuar si el token es válido
        next();
    } catch (error) {
        return res.status(401).send({
            error: tokenVerificationError[error.message] || "Unauthorized",
        });
    }
};

module.exports = verifyToken;