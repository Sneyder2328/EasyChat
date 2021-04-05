import { HttpException } from '@nestjs/common';
import { errors } from '../constants/errors';
import { httpCodes } from '../constants/httpResponseCodes';

export class AppError extends HttpException {
    constructor(statusCode = httpCodes.INTERNAL_SERVER_ERROR, name = errors.DEFAULT_ERROR, message = errors.message.DEFAULT_ERROR) {
        super(message, statusCode);
        this.name = name;
    }
}