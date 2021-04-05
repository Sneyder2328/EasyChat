import { Model, ModelObject } from 'objection';

export class MessageChat extends Model {
    id!: string;
    recipientId!: string;
    senderId!: string;
    content!: string;
    createdAt!: Date;

    static tableName = "MessageChat";
};

export type MessageChatObject = ModelObject<MessageChat>;
export type MessageChatType = {
    id: string;
    recipientId: string;
    senderId: string;
    content: string;
    createdAt?: Date;
}