// src/socket/socketEvents.js
const ResponseHandler = require('../utils/responseHandler');

class SocketEvents {
    constructor(io) {
        this.io = io;
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado (SocketEvents):', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado (SocketEvents):', socket.id);
            });
        });
    }

    emitNuevoPedido(pedido) {
        try {
            console.log('Emitiendo pedido:', pedido);
            this.io.emit('nuevoPedido', ResponseHandler.success(pedido));
        } catch (error) {
            console.error('Error al emitir nuevo pedido:', error);
        }
    }
}

module.exports = SocketEvents;