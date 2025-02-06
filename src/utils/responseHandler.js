class ResponseHandler {
    static success(data = null, message = '') {
        return {
            success: true,
            data,
            message
        };
    }

    static error(message = 'Ha ocurrido un error', status = 400) {
        const error = new Error(message);
        error.status = status;
        return error;
    }
}

module.exports = ResponseHandler;