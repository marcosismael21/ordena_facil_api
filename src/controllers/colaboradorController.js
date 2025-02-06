const colaboradorService = require('../services/colaboradorService.js');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/tokenManager.js");
const bcryp = require("bcrypt");

const getAllColaborador = async (req, res, next) => {
    try {
        const colaborador = await colaboradorService.getAllColaborador();
        return res.status(200).json(colaborador);
    } catch (error) {
        next(error);
    }
}

const getColaboradorById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const colaborador = await colaboradorService.getColaboradorById(id);

        return res.status(200).json(colaborador);
    } catch (error) {
        next(error);
    }
}

const createColaborador = async (req, res, next) => {

    const {
        nombres,
        rolId,
        correo,
        telefono,
        dni,
        usuario,
        clave,
        fechaVerificacionC,
        estado
    } = req.body;

    const data = {
        nombres,
        rolId,
        correo,
        telefono,
        dni,
        usuario,
        clave: await bcryp.hash(clave, 10),
        fechaVerificacionC,
        estado
    }

    try {
        const colaborador = await colaboradorService.createColaborador(data);
        return res.status(200).json(colaborador);
    } catch (error) {
        next(error);
    }
}

const updateColaborador = async (req, res, next) => {
    const id = req.params.id;

    const {
        nombres,
        rolId,
        correo,
        telefono,
        dni,
        usuario,
        clave,
        fechaVerificacionC,
        estado
    } = req.body;

    const data = {
        nombres,
        rolId,
        correo,
        telefono,
        dni,
        usuario,
        clave: await bcryp.hash(clave, 10),
        fechaVerificacionC,
        estado
    }

    try {
        const colaborador = await colaboradorService.updateColaborador(data, id);
        return res.status(200).json(colaborador);
    } catch (error) {
        next(error);
    }
}

const deleteColaborador = async (req, res, next) => {
    const id = req.params.id;
    try {
        const colaborador = await colaboradorService.deleteColaborador(id);
        return res.status(200).json(colaborador);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {
            usuario,
            clave
        } = req.body;

        const data = {
            usuario,
            clave
        };

        const {
            authenticated,
            userData,
            token,
            expiresIn
        } = await colaboradorService.login(data, res);

        if (authenticated) {
            // Establecer la cookie con el token JWT
            res.cookie("token", token, {
                httpOnly: true, // Para prevenir acceso al token desde JavaScript del cliente
                sameSite: 'None' // Asegurar que la cookie se envíe en contextos de terceros
            });

            // Establecer la cookie con el rol del usuario
            res.cookie("role", userData.idrol, {
                sameSite: 'None' // Asegurar que la cookie se envíe en contextos de terceros
            });

            return res.status(200).json({
                ok: true,
                userData: userData,
                mensage: "Usuario correcto",
                authenticated,
                token,
                expiresIn
            });
        }

        return res.status(200).send({
            ok: false,
            data: null,
            authenticated,
            mensage: "Usuario o clave incorrectos"
        });

    } catch (error) {
        res.status(500).send('Error al intentar iniciar sesion:' + error);
        next(error);
    }
}


const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });

        res.clearCookie("role", {
            httpOnly: true,
        });

        return res.status(200).json({
            ok: true,
            mensage: "Logout exitoso"
        });

    } catch (error) {
        res.status(500).send('Error al intentar cerrar sesión: ' + error);
        next(error);
    }
}

module.exports = {
    getAllColaborador,
    getColaboradorById,
    createColaborador,
    updateColaborador,
    deleteColaborador,
    login,
    logout,
}