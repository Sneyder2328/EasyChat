import { AppError } from './AppError';
import { httpCodes } from '../constants/httpResponseCodes';
import { errors } from '../constants/errors';

export class BadRequestError extends AppError {
    constructor(message?: string) {
        super(httpCodes.BAD_REQUEST, errors.BAD_REQUEST, message || errors.message.BAD_REQUEST);
    }
}
