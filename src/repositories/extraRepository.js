const ResponseHandler = require('../utils/responseHandler')
const db = require('../models')
const Extra = db.Extra

const getAllExtra = async () => {
    try {
        const extra = await Extra.findAll()
        return ResponseHandler.success(extra)
    } catch (error) {
        throw error
    }
}

const getExtraById = async (id) => {
    try {
        const extra = await Extra.findOne({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(extra)
    } catch (error) {
        throw error
    }
}

const createExtra = async (data) => {
    try {
        const extra = await Extra.create(data)
        return ResponseHandler.success(extra, 'Extra creado exitosamente')
    } catch (error) {
        throw error
    }
}

const updateExtra = async (data, id) => {
    try {
        const extra = await Extra.update(data, {
            where: {
                id: id
            }
        })
        return ResponseHandler.success(extra, 'Extra actualizado exitosamente');
    } catch (error) {
        throw error
    }
}

const deleteExtra = async (id) => {
    try {
        const extra = await Extra.destroy({
            where: {
                id: id
            }
        })
        return ResponseHandler.success(extra, 'Extra eliminado exitosamente');
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllExtra,
    getExtraById,
    createExtra,
    updateExtra,
    deleteExtra
}