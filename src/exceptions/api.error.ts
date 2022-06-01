
export default class ApiError extends Error {
    status: number;
    errors = [];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors);
    }

    static NotFound(message: string, errors = []) {
        return new ApiError(404, message, errors);
    }

    static Conflict(message: string) {
        return new ApiError(409, message);
    }

    static BadGateway(message: string) {
        return new ApiError(502, message);
    }
}