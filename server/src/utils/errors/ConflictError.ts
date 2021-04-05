import { errors } from "../constants/errors";
import { httpCodes } from "../constants/httpResponseCodes";
import { AppError } from "./AppError";

interface conflictErrorProps {
    error?: string,
    msg?: string
}

const defaultParam: conflictErrorProps = {
    error: errors.RECORD_DUPLICATED_ERROR,
    msg: errors.message.RECORD_DUPLICATED
}
export class ConflictError extends AppError {
    constructor({ error, msg } = defaultParam) {
        super(httpCodes.CONFLICT, error, msg);
    }
};