import { Injectable } from '@nestjs/common';
import { raw } from 'objection';
import { Chat } from 'src/database/models/Chat';
import { MessageChat } from 'src/database/models/MessageChat';
import { User } from 'src/database/models/User';
import { UserChat } from 'src/database/models/UserChat';
import { UserNotFoundError } from 'src/utils/errors/UserNotFoundError';
import { genUUID } from 'src/utils/utils';
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

    //UTILS
    async getChatId(userId: string, recipientId: string) {
        const chatId = await Chat.query().select("id")
            .join('UserChat ON UserChat.chatId = id')
            .where('userId = "' + userId + '"')
            .andWhere('id IN (SELECT chatId from UserChat where userId = "' + recipientId + '")')

        return chatId.length > 0 ? chatId[0].id : null;
    }

    async sendMessage({ id, chatId, userId, content }: { id: string, chatId: string, userId: string, content: string }) {
        const message = await MessageChat.query().insert({ recipientId: chatId, id, senderId: userId, content });
        return message;
    }

    async createChat({ userId, recipientId, chatId }) {
        if (userId === recipientId) return null;
        const chatExists = await Chat.query().findById(chatId);
        if (chatExists) return chatExists.id;
        const chat = await Chat.query().insert({ id: chatId, blocked: false });
        await Promise.all([userId, recipientId].map(async userId => await UserChat.query().insert({ userId, chatId })))
        return chat.id;
    }
}
