import { Model, ModelObject } from 'objection';

export class UserGroup extends Model {
    userId!: string;
    groupId!: string;
    memberType!: "admin" | "normal";
    createdAt!: Date;

    static tableName = "UserGroup";
}

export type UserGroupObject = ModelObject<UserGroup>;
export type UserGroupType = {
    id: string;
    name: string;
    bio: string;
    photoURL: string;
    createdAt?: Date;
}