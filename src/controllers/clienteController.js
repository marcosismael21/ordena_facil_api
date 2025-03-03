const clienteService = require('../services/clienteService')
const bcryp = require("bcrypt")

const getAllCliente = async (req, res, next) => {
    try {
        const cliente = await clienteService.getAllCliente();
        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const getClienteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cliente = await clienteService.getClienteById(id);

        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const createCliente = async (req, res, next) => {

    const {
        nombres,
        correo,
        telefono,
        usuario,
        dni,
        clave,
        estado
    } = req.body;

    const data = {
        nombres,
        correo,
        dni,
        telefono,
        usuario,
        clave: await bcryp.hash(clave, 10),
        estado
    }

    try {
        const cliente = await clienteService.createCliente(data);
        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const createClienteCaja = async (req, res, next) => {

    const {
        nombres,
        correo,
        telefono,
        dni,
        estado
    } = req.body;

    const data = {
        nombres,
        correo,
        telefono,
        dni,
        estado
    }

    try {
        const cliente = await clienteService.createClienteCaja(data);
        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const updateCliente = async (req, res, next) => {
    const id = req.params.id;

    const {
        nombres,
        correo,
        telefono,
        usuario,
        clave,
        estado
    } = req.body;

    const data = {
        nombres,
        correo,
        telefono,
        usuario,
        clave: await bcryp.hash(clave, 10),
        estado
    }

    try {
        const cliente = await clienteService.updateCliente(data, id);
        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const updateClienteInfo = async (req, res, next) => {
    const id = req.params.id;

    const {
        nombres,
        correo,
        telefono,
    } = req.body;

    const data = {
        nombres,
        correo,
        telefono,       
    }

    try {
        const cliente = await clienteService.updateClienteInfo(data, id);
        return res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
}

const deleteCliente = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cliente = await clienteService.deleteCliente(id);
        return res.status(200).json(cliente);
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
        } = await clienteService.login(data, res);

        if (authenticated) {
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'None'
            });

            res.cookie("role", userData.idrol, {
                sameSite: 'None'
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
        })

        return res.status(200).json({
            ok: true,
            mensage: "Logout exitoso"
        })

    } catch (error) {
        res.status(500).send('Error al intentar cerrar sesión: ' + error);
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const clienteId = req.params.id || req.body.clienteId;
        const { currentPassword, newPassword } = req.body;
        
        // Validar que se recibieron todos los parámetros necesarios
        if (!clienteId || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Faltan parámetros requeridos'
            });
        }
        
        const result = await clienteService.changePassword(clienteId, currentPassword, newPassword);
        
        if (result.success) {
            return res.status(200).json({
                success: true,
                message: result.message
            })
        } else {
            return res.status(400).json({
                success: false,
                message: result.message
            })
        }
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
        next(error)
    }
}

module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    login,
    logout,
    createClienteCaja,
    changePassword,
    updateClienteInfo
}