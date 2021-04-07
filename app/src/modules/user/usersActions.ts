import { setGroups } from "../group/groupReducer";
import { groupsAsHashTable, usersAsHashTable } from "../schema";
import { AppThunk } from "../store";
import { searchUsersError, searchUsersRequest, searchUsersSuccess, setUsers } from "./userReducer";
import { UserApi } from "./usersApi";

export const searchUsers = (query: string, includeGroups: boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(searchUsersRequest())
        const response = await UserApi.searchUsers({ query, includeGroups })
        const users = response.data.users
        const chats = response.data.users.filter(({ isGlobal }) => isGlobal === false)
        const usersGlobal = response.data.users.filter(({ isGlobal }) => isGlobal === true)
        const groups = response.data.groups

        const usersNormalized = usersAsHashTable(users)
        const groupsNorm = groupsAsHashTable(groups)

        dispatch(setUsers({ users: usersNormalized }))
        dispatch(setGroups({ groups: groupsNorm }))
        dispatch(searchUsersSuccess({
            query,
            chats: chats.map(({ id }) => (id)),
            global: usersGlobal.map(({ id }) => (id)),
            groups: groups.map(({ id }) => (id)),

        }))
    } catch (err) {
        console.log(err);
        dispatch(searchUsersError())
    }
}