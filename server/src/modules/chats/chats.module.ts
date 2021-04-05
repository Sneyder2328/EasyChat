import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthService } from "../auth/auth.service";
import { ChatsController } from './chats.controller';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController]
})
export class ChatsModule { }
