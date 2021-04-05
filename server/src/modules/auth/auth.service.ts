import { Injectable } from '@nestjs/common';
import { Session, SessionObject } from '../../database/models/Session';
import { AuthError } from 'src/utils/errors/AuthError';
import { UserNotFoundError } from 'src/utils/errors/UserNotFoundError';
import { genUUID, verifyPassword } from 'src/utils/utils';
import { User, UserObject } from "../../database/models/User";
import _ from 'lodash'
import { raw } from 'objection';
import { errors } from 'src/utils/constants/errors';

@Injectable()
export class AuthService {
    public ONE_MONTH_IN_MINUTES = 30 * 24 * 60;

    async login(username: string, password: string) {
        const user = await User.query().findOne("username", username);
        if (!user) throw new UserNotFoundError();
        const isPasswordCorrect = await verifyPassword(password, user.password);

        if (!isPasswordCorrect) throw new AuthError(errors.message.INCORRECT_CREDENTIALS);

        const session = genUUID();
        await Session.query().insert({ token: session, userId: user.id });
        return {
            profile: _.pick(user, ["username", "email", "fullname", "id"]),
            session
        }
    }

    async logout(token: string) {
        const deleted = await Session.query().deleteById(token);
        return { deleted };
    }

    //UTILS
    public async findUserById(userId: string): Promise<UserObject> {
        return await User.query().findById(userId).where(raw('deletedAt IS NULL'));
    }

    public async findSession(accessToken: string): Promise<SessionObject> {
        return await Session.query().findById(accessToken)
    }

    public isSessionExpired(session: SessionObject): boolean {
        const differenceInMins = new Date().getMinutes() - session.createdAt.getMinutes();
        return differenceInMins >= this.ONE_MONTH_IN_MINUTES
    }
}
