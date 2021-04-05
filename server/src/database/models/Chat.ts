import { Model, ModelObject } from 'objection';

export class Chat extends Model {
    id!: string;
    blocked!: boolean;
    createdAt!: Date;

    static tableName = "Chat";
};

export type ChatObject = ModelObject<Chat>;
export type ChatType = {
    id: string;
    blocked?: string;
    createdAt?: Date;
}