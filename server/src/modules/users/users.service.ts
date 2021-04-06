import { Injectable } from '@nestjs/common';
import { errors } from 'src/utils/constants/errors';
import { UserType, User } from "../../database/models/User";
import { ConflictError } from "../../utils/errors/ConflictError";
import _ from 'lodash';
import { UserNotFoundError } from 'src/utils/errors/UserNotFoundError';
import { Chat } from 'src/database/models/Chat';
import { raw } from 'objection';
import { Group } from 'src/database/models/Group';
import { genUUID } from 'src/utils/utils';
import { Session } from 'src/database/models/Session';

type updateUsersType = { id: string, username: string, fullname: string, photoURL: string, bio: string }
@Injectable()
export class UsersService {
    async insertUsers({ id, email, username, password, fullname }: UserType) {
        const userByUsername = await User.query().findOne('username', username);
        if (userByUsername) throw new ConflictError({ error: errors.USER, msg: errors.message.USERNAME_TAKEN });
        const userByEmail = await User.query().findOne('email', email);
        if (userByEmail) throw new ConflictError({ error: errors.USER, msg: errors.message.EMAIL_TAKEN });
        const session = genUUID();
        await Session.query().insert({ token: session, userId: id });

        const user = await User.query().insert({ id, email, username, password, fullname });
        return {
            profile: _.pick(user, ['id', 'username', 'fullname', 'email']),
            session
        }
    }

    async updateUsers(userData: updateUsersType) {
        const user = await User.query().findById(userData.id);
        if (!user) throw new UserNotFoundError();
        const keys = Object.keys(userData);
        let toUpdate = {};
        keys.forEach(key => {
            if (userData[key]) toUpdate[key] = userData[key];
        })
        const userUpdated = await User.query().patchAndFetchById(userData.id, toUpdate);
        return { profile: _.pick(userUpdated, ["id", "username", "fullname", "email", "bio", "photoURL"]) }
    }

    async getUsers({ query, includeGroups, limit }: { query: string, includeGroups: boolean, limit: number }, userId: string) {
        let limitCounter = limit;
        const subQuery = '(SELECT Chat.id from Chat '
            + 'JOIN UserChat ON UserChat.chatId = Chat.id '
            + 'WHERE UserChat.userId = "' + userId + '")';

        const knownUsers = await User.query().select("username", "photoURL", "User.id", "fullname")
            .join(raw('UserChat ON UserChat.userId = User.id'))
            .where(raw('UserChat.chatId IN ' + subQuery))
            .andWhere(raw('User.id != "' + userId + '"'))
            .andWhere(raw('User.username LIKE "%' + query + '%"'))
            .limit(limitCounter).distinct();
        limitCounter -= knownUsers.length;
        const knownUsersId = knownUsers.map(user => user.id);
        let knownGroupsId = [];
        let users = knownUsers.map(user => ({ ...user, isGlobal: false }));
        let groups = [];

        if (includeGroups && limitCounter > 0) {
            const knownGroups = await Group.query().select("name", "id", "photoURL")
                .join(raw('UserGroup ON UserGroup.groupId = id'))
                .where(raw('UserGroup.userId = "' + userId + '"'))
                .andWhere(raw('Group.name LIKE "%' + query + '%"'))
                .limit(limitCounter).distinct();
            limitCounter -= knownGroups.length;
            knownGroupsId = knownUsers.map(group => group.id);
            groups = knownGroups.map(group => ({ ...group, isGlobal: false }));
        }

        if (limitCounter > 0) { //GLOBAL SEARCHS
            const globalUsers = await User.query().select("username", "photoURL", "User.id", "fullname")
                .join(raw('UserChat ON UserChat.userId = User.id'))
                .whereNotIn("id", knownUsersId)
                .andWhere(raw('UserChat.chatId NOT IN ' + subQuery))
                .andWhere(raw('User.username LIKE "%' + query + '%"'))
                .limit(limitCounter).distinct();
            limitCounter -= globalUsers.length;
            users = users.concat(globalUsers.map(user => ({ ...user, isGlobal: true })));
        }

        if (includeGroups && limitCounter > 0) {
            const globalGroups = await Group.query().select("name", "id", "photoURL")
                .join(raw('UserGroup ON UserGroup.groupId = id'))
                .whereNotIn("id", knownGroupsId)
                .andWhere(raw('Group.name LIKE "%' + query + '%"'))
                .limit(limitCounter).distinct();
            limitCounter -= globalGroups.length;
            groups = groups.concat(globalGroups.map(group => ({ ...group, isGlobal: true })));
        }

        return {
            data: { users, groups }
        }

    }
}
