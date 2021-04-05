import { Controller, Get, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
import { Authenticator } from 'src/middlewares/authenticate';
import { BadRequestError } from 'src/utils/errors/BadRequestError';
import { GroupsService } from "./groups.service";

@UseGuards(Authenticator)
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { };

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
}
