import { Body, Controller, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { Authenticator } from 'src/middlewares/authenticate';
import { UsersService } from './users.service';
import { CreateUserDTO } from "./user.validator";
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
        @Body('username') username: string,
        @Body('fullname') fullname: string,
        @Body('bio') bio: string,
        @Body('profilePhoto') photoURL: string,
        @Request() req
    ) {
        const { profile } = await this.usersService.updateUsers({ username, bio, fullname, id: req.userId, photoURL });
        return { ...profile }
    }
}
