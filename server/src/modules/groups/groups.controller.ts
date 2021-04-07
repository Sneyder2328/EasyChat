import { Controller, Get, ParseIntPipe, Query, UseGuards, Request, Post, Body, ValidationPipe } from '@nestjs/common';
import { Authenticator } from 'src/middlewares/authenticate';
import { BadRequestError } from 'src/utils/errors/BadRequestError';
import { GroupsService } from "./groups.service";
import { CreateGroupsDTO } from './groups.validator';

@UseGuards(Authenticator)
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Get()
    async getGroups(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('last') date: string,
        @Request() req
    ) {
        if (!limit) throw new BadRequestError();
        const { data } = await this.groupsService.getGroups({ limit, date }, req.userId);
        return data;
    }

    @Post()
    async createGroups(
        @Body(new ValidationPipe()) { id, name, members, photoURL, bio }: CreateGroupsDTO,
        @Request() req
    ) {
        const { data } = await this.groupsService.createGroups({ id, name, members, photoURL, bio }, req.userId);
        return { ...data };
    }
}
function POST() {
    throw new Error('Function not implemented.');
}

