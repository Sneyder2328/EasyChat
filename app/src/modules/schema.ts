import { normalize, schema } from "normalizr";
import { HashTable } from "../utils/utils";
import { GroupObject } from "./group/groupReducer";
import { UserObject } from "./user/userReducer";

const user = new schema.Entity('users', {}, {
    idAttribute: "id"
});

const group = new schema.Entity('groups', {}, {
    idAttribute: "id"
});

export const usersAsHashTable = (users: Array<UserObject>): HashTable<UserObject> | null => {
    return normalize(users, [user])?.entities?.users
}

export const groupsAsHashTable = (groups: Array<GroupObject>): HashTable<GroupObject> | null => {
    return normalize(groups, [group])?.entities?.groups
}