import { Controller, Get, ParseIntPipe, Query, UseGuards, Request, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Authenticator } from "../../middlewares/authenticate";
import { BadRequestError } from 'src/utils/errors/BadRequestError';

@UseGuards(Authenticator)
@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) { };

    @Get()
    async getChats(
        @Query('limit', ParseIntPipe) limit: number,
        @Query('last') date: string,
        @Request() req
    ) {
        if (!limit) throw new BadRequestError();
        const { data } = await this.chatsService.getChats({ limit, date }, req.userId);
        return data;
    }

    @Get(":chatId/messages")
    async getMessages(
        @Param('groupId') groupId: string
    ) {
        const { data } = await this.chatsService.getMessages(groupId);
        return data;
    }
}
