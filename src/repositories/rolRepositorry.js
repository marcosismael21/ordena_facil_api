const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Rol = db.Rol

const getAllRol = async () => {
    try {
        const rol = await Rol.findAll()
        return ResponseHandler.success(rol)
    } catch (error) {
        throw error
    }
}

const getRolById = async (id) => {
    try {
        const rol = await Rol.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(rol)
    } catch (error) {
        throw error
    }
}

const createRol = async (data) => {
    try {
        const existeRol = await Rol.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        if (existeRol) {
            return ResponseHandler.error('El rol ya existe en el sistema', 404)
        }

        const rol = await Rol.create(data)
        return ResponseHandler.success(rol, 'Rol creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateRol = async (data, id) => {
    try {
        const rol = await Rol.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(rol, 'Rol actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteRol = async (id) => {
    try {
        const rol = await Rol.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(rol, 'Rol eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRol,
    getRolById,
    createRol,
    updateRol,
    deleteRol
}