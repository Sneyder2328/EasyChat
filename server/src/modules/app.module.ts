import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UsersModule, AuthModule, ChatsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
