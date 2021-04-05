import { Injectable } from '@nestjs/common';
import { raw } from 'objection';
import { MessageChat } from 'src/database/models/MessageChat';
import { User } from 'src/database/models/User';
import { } from "../../database/models/Group";
@Injectable()
export class ChatsService {
    async getChats({ limit, date }: { limit: number, date: string }, userId: string) {
        let dateQuery = '';
        if (date) dateQuery = 'MessageChat.createdAt < ' + new Date(date).getTime();
        const subQuery = '(SELECT Chat.id from Chat '
            + 'JOIN UserChat ON UserChat.chatId = Chat.id '
            + 'WHERE UserChat.userId = "' + userId + '")';

        const knownUsers = await User.query().select("username", "photoURL", "User.id", "fullname")
            .join(raw('UserChat ON UserChat.userId = User.id'))
            .join(raw('MessageChat ON MessageChat.recipientId = UserChat.chatId'))
            .where(raw('UserChat.chatId IN ' + subQuery))
            .andWhere(raw('User.id != "' + userId + '"'))
            .andWhere(raw(dateQuery))
            .limit(limit).distinct();

        const chatsMap = knownUsers.map(async user => {
            const messageChat = await MessageChat.query().select("MessageChat.content", "MessageChat.senderId")
                .join(raw("User ON MessageChat.senderId = User.id"))
                .where(raw('User.id = "' + user.id + '"'))
                .orderBy("createdAt", "DESC")
                .limit(1);
            return { ...user, lastMessage: { ...messageChat[0] } };
        })
        const chatsWithMessage = await Promise.all(chatsMap);
        return { data: chatsWithMessage };
    }
}
