import { Model, ModelObject } from 'objection';

export class Group extends Model {
    id!: string;
    name!: string;
    photoURL!: string;
    createdAt!: Date;

    static tableName = "Group";
};

export type GroupObject = ModelObject<Group>;
export type GroupType = {
    id: string;
    name: string;
    photoURL: string;
    createdAt?: Date;
}