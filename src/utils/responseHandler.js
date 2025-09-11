class ResponseHandler {
    static success(data = null, message = '', statusCode = 200) {
        return {
            success: true,
            data,
            message,
            statusCode
        };
    }

    static error(message = 'Ha ocurrido un error', statusCode = 400, errors = null) {
        return {
            success: false,
            data: null,
            message,
            statusCode,
            errors
        };
    }
}

module.exports = ResponseHandler;