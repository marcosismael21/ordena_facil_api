const colaboradorRepository = require('../repositories/colaboradorRepository');
const { generateToken } = require('../utils/tokenManager');
const bcryp = require("bcrypt");

const getAllColaborador = async () => {
    try {
        const colaborador = await colaboradorRepository.getAllColaborador();
        return (colaborador) ? colaborador : [];
    } catch (error) {
        throw error;
    }
}

const getColaboradorById = async (id) => {
    try {
        const colaborador = await colaboradorRepository.getColaboradorById(id,);
        return (colaborador) ? colaborador : [];
    } catch (error) {
        throw error;
    }

}

const createColaborador = async (data) => {
    try {
        const colaborador = await colaboradorRepository.createColaborador(data);
        return (colaborador) ? colaborador : [];
    } catch (error) {
        throw error;
    }

}

const updateColaborador = async (data, id) => {
    try {
        const colaborador = await colaboradorRepository.updateColaborador(data, id);
        return (colaborador) ? colaborador : [];
    } catch (error) {
        throw error;
    }

}

const deleteColaborador = async (id) => {
    try {
        const colaborador = await colaboradorRepository.deleteColaborador(id);
        return (colaborador) ? colaborador : [];
    } catch (error) {
        throw error;
    }

}

const login = async (data, res) => {
    try {

        const {
            usuario,
            clave,
        } = data

        const colaborador = await colaboradorRepository.login(usuario)
        if (colaborador) {

            const isSame = await bcryp.compare(clave, colaborador.clave)
            if (isSame) {

                const { token, expiresIn } = generateToken(colaborador.id)

                let userData = {
                    id: colaborador.id,
                    nombres: colaborador.nombres,
                    usuario: colaborador.usuario,
                    idrol: colaborador.rolId
                }

                const authenticated = true;

                return {
                    authenticated,
                    userData,
                    token,
                    expiresIn
                }
            }
            return "Authentication failed";
        } else {
            return "Authentication failed";
        }

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