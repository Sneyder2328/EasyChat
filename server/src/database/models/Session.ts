import { Model, ModelObject } from 'objection';

export class Session extends Model {
    token!: string;
    userId!: string;
    createdAt!: Date;

    static tableName = "Session";
    static idColumn = "token";
}

export type SessionObject = ModelObject<Session>

export type SessionType = {
    token: string;
    userId: string;
    createdAt?: Date;
}