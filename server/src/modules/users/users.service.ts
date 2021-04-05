import { Injectable } from '@nestjs/common';
import { errors } from 'src/utils/constants/errors';
import { UserType, User } from "../../database/models/User";
import { ConflictError } from "../../utils/errors/ConflictError";
import _ from 'lodash';
import { UserNotFoundError } from 'src/utils/errors/UserNotFoundError';

type updateUsersType = { id: string, username: string, fullname: string, photoURL: string, bio: string }
@Injectable()
export class UsersService {
    async insertUsers({ id, email, username, password, fullname }: UserType) {
        const userByUsername = await User.query().findOne('username', username);
        if (userByUsername) throw new ConflictError({ error: errors.USER, msg: errors.message.USERNAME_TAKEN });
        const userByEmail = await User.query().findOne('email', email);
        if (userByEmail) throw new ConflictError({ error: errors.USER, msg: errors.message.EMAIL_TAKEN });

        const user = await User.query().insert({ id, email, username, password, fullname });
        return { profile: _.pick(user, ['id', 'username', 'fullname', 'email']) }
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
        return { profile: _.pick(userUpdated, ["id", "username", "fullname", "email"]) }
    }
}
