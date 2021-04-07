import { Body, Controller, Get, Response, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { Authenticator } from 'src/middlewares/authenticate';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from "./user.validator";
import { Response as Res } from "express"
import { config } from 'src/config/config';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body(new ValidationPipe()) createUserDTO: CreateUserDTO,
        @Response() res: Res
    ) {
        const { username, email, password, fullname, id } = createUserDTO;
        const { profile, session } = await this.usersService.insertUsers({ username, email, password, fullname, id });
        res.set({ [config.headers.accessToken]: session }).json({ ...profile });
    }

    @Put()
    @UseGuards(Authenticator)
    async updateUser(
        @Body(new ValidationPipe()) { username, bio, fullname, profilePhoto: photoURL }: UpdateUserDTO,
        @Request() req
    ) {
        const { profile } = await this.usersService.updateUsers({ username, bio, fullname, id: req.userId, photoURL });
        return { ...profile }
    }

    @Get()
    @UseGuards(Authenticator)
    async getUsers(
        @Query('query') query: string,
        @Query('includeGroups') includeGroupsString: string,
        @Query('limit') limit: number,
        @Request() req
    ) {
        const includeGroups = includeGroupsString === "true";
        const { data } = await this.usersService.getUsers({ query, includeGroups, limit }, req.userId);
        return { ...data };
    }
}
