const extraRepository = require('../repositories/extraRepository')

const getAllExtra = async () => {
    try {
        const extra = await extraRepository.getAllExtra()
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const getExtraById = async (id) => {
    try {
        const extra = await extraRepository.getExtraById(id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const createExtra = async (data) => {
    try {
        const extra = await extraRepository.createExtra(data)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const updateExtra = async (data, id) => {
    try {
        const extra = await extraRepository.updateExtra(data, id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

const deleteExtra = async (id) => {
    try {
        const extra = await extraRepository.deleteExtra(id)
        return (extra) ? extra : []
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllExtra,
    getExtraById,
    createExtra,
    updateExtra,
    deleteExtra,
}