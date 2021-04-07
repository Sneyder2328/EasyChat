import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { httpCodes } from '../constants/httpResponseCodes';

type exceptionType = {
    statusCode: string,
    message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const res = context.getResponse();
        let error = exception.name;
        let response = exception.getResponse();
        const status = exception.getStatus();
        let jsonResponse: {} = {
            statusCode: status,
            error,
            message: response
        };
        if (status == 400) {
            response = response['message'].map(msg => {
                const key = msg.split(" ")[0];
                return { [key]: msg };
            })
            jsonResponse = {
                statusCode: httpCodes.UNPROCESSABLE_ENTITY,
                errors: response
            }
        }
        res
            .status(status)
            .json(jsonResponse)
    }
}