import { Model, ModelObject } from 'objection';

export class UserChat extends Model {
    userId!: string;
    chatId!: string;
    createdAt!: Date;

    static tableName = "UserChat";
}

export type UserChatObject = ModelObject<UserChat>;
export type UserChatType = {
    userId: string;
    chatId: string;
    createdAt?: Date;
}