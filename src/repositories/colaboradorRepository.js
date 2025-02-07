const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const { Op } = require('sequelize');
const Colaborador = db.Colaborador

const getAllColaborador = async () => {
    try {
        const colaborador = await Colaborador.findAll()
        return ResponseHandler.success(colaborador)
    } catch (error) {
        throw error
    }
}

const getColaboradorById = async (id) => {
    try {
        const colaborador = await Colaborador.findOne({
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(colaborador)
    } catch (error) {
        throw error
    }
}

const createColaborador = async (data) => {
    try {
        const existe = await Colaborador.findOne({
            where: {
                dni: data.dni
            }
        })

        if (existe) {
            return ResponseHandler.error('El dni ya existe en el sistema')
        }

        const existeUser = await Colaborador.findOne({
            where: {
                usuario: data.usuario
            }
        })

        if (existeUser) {
            return ResponseHandler.error('El usuario ya existe en el sistema')
        }

        const colaborador = await Colaborador.create(data)
        return ResponseHandler.success(colaborador, 'Colaborador creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateColaborador = async (data, id) => {
    try {
        const colaborador = await Colaborador.update(data, {
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(colaborador, 'Colaborador actualizado exitosamente')
    } catch (error) {
        throw error
    }
}

const deleteColaborador = async (id) => {
    try {
        const colaborador = await Colaborador.destroy({
            where: {
                id: id,
            }
        })
        return ResponseHandler.success(colaborador, 'Rol eliminado exitosamente');
    } catch (error) {
        throw error
    }

}

const login = async (usuario) => {
    try {
        const colaborador = await Colaborador.findOne({
            where: {
                usuario: usuario,
                estado: 1,
                fechaVerificacionC: { [Op.not]: null }
            }
        })
        return colaborador
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllColaborador,
    getColaboradorById,
    createColaborador,
    updateColaborador,
    deleteColaborador,
    login,
}