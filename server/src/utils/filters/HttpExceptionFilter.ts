import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { errors } from '../constants/errors';

type exceptionType = {
    statusCode: string,
    message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const req = context.getRequest();
        const res = context.getResponse();
        let error = exception.name;
        let response = exception.getResponse();
        const status = exception.getStatus();
        if (status == 400) {
            response["message"] = response['message'].map()
        }
        res
            .status(status)
            .json({
                statusCode: status,
                error,
                message: response
            })
    }
}