import { Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { Authenticator } from 'src/middlewares/authenticate';
import { UsersService } from './users.service';
import { CreateUserDTO, GetUsersDTO, UpdateUserDTO } from "./user.validator";
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body(new ValidationPipe()) createUserDTO: CreateUserDTO
    ) {
        const { username, email, password, fullname, userId: id } = createUserDTO;
        const { profile } = await this.usersService.insertUsers({ username, email, password, fullname, id });
        return { ...profile };
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
        @Query('includeGroups') includeGroups: string
    ) {
        const isGlobal = includeGroups === "true";
        console.log(query, isGlobal);
        return 'works';
    }
}
