const clienteRepository = require('../repositories/clienteRepository');
const { generateToken } = require('../utils/tokenManager');
const bcryp = require("bcrypt");

const getAllCliente = async () => {
    try {
        const cliente = await clienteRepository.getAllCliente();
        return (cliente) ? cliente : [];
    } catch (error) {
        throw error;
    }
}

const getClienteById = async (id) => {
    try {
        const cliente = await clienteRepository.getClienteById(id,);
        return (cliente) ? cliente : [];
    } catch (error) {
        throw error;
    }

}

const createCliente = async (data) => {
    try {
        const cliente = await clienteRepository.createCliente(data);
        return (cliente) ? cliente : [];
    } catch (error) {
        throw error;
    }

}

const updateCliente = async (data, id) => {
    try {
        const cliente = await clienteRepository.updateCliente(data, id);
        return (cliente) ? cliente : [];
    } catch (error) {
        throw error;
    }

}

const deleteCliente = async (id) => {
    try {
        const cliente = await clienteRepository.deleteCliente(id);
        return (cliente) ? cliente : [];
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

        const cliente = await clienteRepository.login(usuario)
        if (cliente) {

            const isSame = await bcryp.compare(clave, cliente.clave)
            if (isSame) {

                const { token, expiresIn } = generateToken(cliente.id, 'mobile')

                let userData = {
                    id: cliente.id,
                    nombres: cliente.nombres,
                    correo: cliente.correo,
                    telefono: cliente.telefono
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
    getAllCliente,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    login,
}