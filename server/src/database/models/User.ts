import { Model, ModelObject } from 'objection';
import { hashPassword } from 'src/utils/utils';

export class User extends Model {
    id!: string;
    email!: string;
    username!: string;
    photoURL!: string;
    fullname!: string;
    bio!: string;
    password!: string;

    async $beforeInsert() {
        if (this.password) {
            this.password = await hashPassword(10, this.password);
        }
    }

    static tableName = "User";
};

export type UserObject = ModelObject<User>;
export type UserType = {
    id: string;
    email: string;
    username: string;
    photoURL?: string;
    fullname?: string;
    bio?: string;
    password: string;
}