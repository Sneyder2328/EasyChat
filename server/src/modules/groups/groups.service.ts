import { Injectable } from '@nestjs/common';
import { raw } from 'objection';
import { errors } from 'src/utils/constants/errors';
import { ConflictError } from 'src/utils/errors/ConflictError';
import { Group } from "../../database/models/Group";
import { MessageGroup } from "../../database/models/MessageGroup";
import { UserGroup } from "../../database/models/UserGroup";

type createGroupsType = {
    id: string;
    name: string;
    members: Array<string>;
    photoURL: string;
    bio: string;
}

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

    async createGroups({ id, name, members, photoURL, bio }: createGroupsType, userId: string) {
        const groupExists = await Group.query().findOne('name', name);
        if (groupExists) throw new ConflictError({ error: errors.GROUP, msg: errors.message.NAME_TAKEN })

        const group = await Group.query().insert({ id, name, photoURL, bio });

        let groupMembers = members.map(member => ({ id: member, memberType: "normal" }));
        groupMembers.push({ id: userId, memberType: "admin" });

        const membersMap = groupMembers.map(async member =>
            await UserGroup.query().insert({ userId: member.id, groupId: id, memberType: member.memberType }))
        const membersAdded = await Promise.all(membersMap);

        return {
            data: {
                name: group.name,
                photoURL: group.photoURL,
                bio: group.bio,
                members: membersAdded.map(member => member.userId)
            }
        }
    }
}
