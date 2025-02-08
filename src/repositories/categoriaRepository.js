const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Categoria = db.Categoria

const getAllCategoria = async () => {
    try {
        const categoria = await Categoria.findAll()
        return ResponseHandler.success(categoria)
    } catch (error) {
        throw error
    }
}

const getCategoriaById = async (id) => {
    try {
        const categoria = await Categoria.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(categoria)
    } catch (error) {
        throw error
    }
}

const createCategoria = async (data) => {
    try {
        const existeCategoria = await Categoria.findOne({
            where: {
                descripcion: data.descripcion
            }
        })

        if (existeCategoria) {
            return ResponseHandler.error('La categoria ya existe en el sistema')
        }

        const categoria = await Categoria.create(data)
        return ResponseHandler.success(categoria, 'Categoria creada exitosamente')
    } catch (error) {
        throw error
    }
}

const updateCategoria = async (data, id) => {
    try {
        const categoria = await Categoria.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(categoria, 'Categoria actualizada exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteCategoria = async (id) => {
    try {
        const categoria = await Categoria.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(categoria, 'Categoria eliminada exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
}