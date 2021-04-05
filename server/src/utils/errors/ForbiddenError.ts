import { AppError } from './AppError';
import { httpCodes } from '../constants/httpResponseCodes';
import { errors } from '../constants/errors';

export class ForbiddenError extends AppError {
    constructor(error?: any, message?: string) {
        super(httpCodes.UNAUTHORIZED, error || errors.FORBIDDEN, message || errors.message.PERMISSION_NOT_GRANTED);
    }
}