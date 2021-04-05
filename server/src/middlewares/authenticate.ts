import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthError } from "src/utils/errors/AuthError";
import { config } from "../config/config";
import { AuthService } from "../modules/auth/auth.service";
import { errors } from "src/utils/constants/errors";
@Injectable()
export class Authenticator implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers[config.headers.accessToken];
        if (!authorization) throw new AuthError();
        const accessToken = authorization.split(" ")[1];
        if (!config.regex.uuidv4.test(accessToken)) throw new AuthError();

        //this is temporal
        const auth = new AuthService();
        const session = await auth.findSession(accessToken);
        if (!session) throw new AuthError();

        if (auth.isSessionExpired(session)) throw new AuthError(errors.message.ACCESS_TOKEN_EXPIRED);
        request.userId = session.userId;
        return true;
    }
}