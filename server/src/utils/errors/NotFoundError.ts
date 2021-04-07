import { AppError } from './AppError';
import { httpCodes } from '../constants/httpResponseCodes';
import { errors } from '../constants/errors';

export class NotFoundError extends AppError {
    constructor(error = errors.NOT_FOUND, message = errors.message.TOKEN_NOT_FOUND) {
        super(httpCodes.NOT_FOUND, error, message);
    }
}