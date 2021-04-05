import { Controller, Headers, Post, Response, Request, Delete, UseGuards } from '@nestjs/common';
import { ForbiddenError } from 'src/utils/errors/ForbiddenError';
import { Response as Res } from 'express'
import { config } from '../../config/config';
import { AuthService } from "./auth.service";
import { errors } from 'src/utils/constants/errors';
import { Authenticator } from 'src/middlewares/authenticate';
@Controller('sessions')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(
        @Headers(config.headers.accessToken) authorization: string,
        @Response() res: Res,
        @Request() req
    ) {
        if (!authorization) throw new ForbiddenError();
        authorization = authorization.split(" ")[1];
        const userData = Buffer.from(authorization, 'base64').toString('ascii').split(":");
        const username = userData[0];
        const password = userData[1];
        const { profile, session } = await this.authService.login(username, password);
        res.set({ [config.headers.accessToken]: session }).json({ ...profile });
    }

    @Delete()
    @UseGuards(Authenticator)
    async logout(
        @Headers(config.headers.accessToken) accessToken: string
    ) {
        const { deleted } = await this.authService.logout(accessToken.split(" ")[1]);
        return { deleted };
    }
}
