import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { GroupsModule } from './groups/groups.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, AuthModule, ChatsModule, GroupsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
