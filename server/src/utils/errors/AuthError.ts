import { AppError } from './AppError';
import { httpCodes } from '../constants/httpResponseCodes';
import { errors } from '../constants/errors';

export class AuthError extends AppError {
    constructor(message?: string) {
        super(httpCodes.UNAUTHORIZED, errors.UNAUTHORIZED, message || errors.message.PERMISSION_NOT_GRANTED);
    }
}