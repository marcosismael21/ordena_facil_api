const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const { Op } = require('sequelize')
const bcryp = require("bcrypt")
const Cliente = db.Cliente

const getAllCliente = async () => {
    try {
        const cliente = await Cliente.findAll()
        return ResponseHandler.success(cliente)
    } catch (error) {
        throw error
    }
}

const getClienteById = async (id) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(cliente)
    } catch (error) {
        throw error
    }
}

const createCliente = async (data) => {
    try {
        const existe = await Cliente.findOne({
            where: {
                correo: data.correo
            }
        })

        if (existe) {
            return ResponseHandler.error('El correo ya existe en el sistema')
        }

        const existeUser = await Cliente.findOne({
            where: {
                usuario: data.usuario
            }
        })

        if (existeUser) {
            return ResponseHandler.error('El usuario ya existe en el sistema')
        }

        const cliente = await Cliente.create(data)
        return ResponseHandler.success(cliente, 'usuario creado exitosamente')
    } catch (error) {
        throw error
    }
}

const createClienteCaja = async (data) => {
    try {
        const existe = await Cliente.findOne({
            where: {
                correo: data.correo
            }
        })

        if (existe) {
            return ResponseHandler.error('El correo ya existe en el sistema')
        }

        const existeUser = await Cliente.findOne({
            where: {
                dni: data.dni
            }
        })

        if (existeUser) {
            return ResponseHandler.error('El númerod de identidad ya existe en el sistema')
        }

        const cliente = await Cliente.create(data)
        return ResponseHandler.success(cliente, 'usuario creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateCliente = async (data, id) => {
    try {
        const cliente = await Cliente.update(data, {
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(cliente, 'Usuario actualizado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateClienteInfo = async (data, id) => {
    try {
        const cliente = await Cliente.update(data, {
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(cliente, 'Usuario actualizado exitosamente')
    } catch (error) {
        throw error
    }
}

const deleteCliente = async (id) => {
    try {
        const cliente = await Cliente.destroy({
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(cliente, 'Usuario eliminado exitosamente');
    } catch (error) {
        throw error
    }

}

const login = async (usuario) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                usuario: usuario,
                estado: 1,
                fechaVerificacionC: { [Op.not]: null }
            }
        })
        return cliente
    } catch (error) {
        throw error
    }
}

const changePassword = async (clienteId, currentPassword, newPassword) => {
    try {

        const cliente = await Cliente.findOne({
            where: {
                id: clienteId
            }
        })

        if (!cliente) {
            return ResponseHandler.error('Cliente no encontrado');
        }

        const isPasswordCorrect = await bcryp.compare(currentPassword, cliente.clave);

        if (!isPasswordCorrect) {
            return ResponseHandler.error('La contraseña actual es incorrecta');
        }

        const hashedPassword = await bcryp.hash(newPassword, 10);

        await Cliente.update({
            clave: hashedPassword
        },
            {
                where: {
                    id: clienteId
                }
            }
        )

        return ResponseHandler.success(null, 'Contraseña actualizada exitosamente');
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    login,
    createClienteCaja,
    changePassword,
    updateClienteInfo,
}