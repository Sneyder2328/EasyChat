import { Model, ModelObject } from 'objection';

export class MessageGroup extends Model {
    id!: string;
    recipientId!: string;
    senderId!: string;
    content!: string;

    static tableName = "MessageChat";
}

export type MessageGroupObject = ModelObject<MessageGroup>;
export type MessageGroupType = {
    id: string;
    recipientId: string;
    senderId: string;
    content: string;
}