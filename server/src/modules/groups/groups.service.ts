import { Injectable } from '@nestjs/common';
import { raw } from 'objection';
import { Group } from "../../database/models/Group";
import { MessageGroup } from "../../database/models/MessageGroup";

@Injectable()
export class GroupsService {
    async getGroups({ limit, date }: { limit: number, date: string }, userId: string) {
        let dateQuery = '';
        if (date) dateQuery = 'Group.createdAt < ' + new Date(date).getTime();
        const groups = await Group.query().select("Group.id", "name", "photoURL", "Group.createdAt")
            .join(raw("UserGroup ON groupId = id"))
            .where(raw('userId = "' + userId + '" AND ' + dateQuery))
            .limit(limit);
        const groupsMap = groups.map(async group => {
            const messageGroup = await MessageGroup.query().select("MessageGroup.content", "MessageGroup.senderId")
                .join(raw("Group ON MessageGroup.recipientId = Group.id"))
                .where(raw('Group.id = "' + group.id + '"'))
                .orderBy("createdAt", "DESC")
                .limit(1);
            return { ...group, lastMessage: { sender: messageGroup[0].senderId, content: messageGroup[0].content } };
        })
        const groupsWithMessage = await Promise.all(groupsMap);
        return { data: groupsWithMessage };
    }
}
