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
        const usersByChat = await Promise.all(["recipientId", "senderId"].map(async item =>
            await MessageChat.query().select(item)
                .where(raw(item + ' = "' + userId + '" AND ' + dateQuery))
                .limit(limit)
                .distinct()));
        const users = new Set([...usersByChat[0], ...usersByChat[1]]);
        const chatsContacts = Array.from(users).filter(user => user.id !== userId);
        const chatsContactsIds = chatsContacts.map(contact => contact.id);

        const usersInformation = await Promise.all(chatsContactsIds.map(async id =>
            await User.query().findById(id).select("id", "username", "fullname", "photoURL")
        ))

        const chatsMap = usersInformation.map(async user => {
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
