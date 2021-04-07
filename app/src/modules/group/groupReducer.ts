import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { HashTable, HashTableArray } from "../../utils/utils";
import { logOutSuccess } from "../auth/authReducer";
import { searchUsersSuccess } from "../user/userReducer";

export type GroupObject = {
    id: string;
    name: string;
    photoUrl: string;
    bio: string;
}
interface GroupState {
    entities: HashTable<GroupObject>;
    members: HashTable<Array<{ userId: string }>>;
    myGroups: Array<{ groupId: string; lastMessageId: string }>;
    searchResults: HashTableArray<{ groupId: string }>;
}

const initialState: GroupState = {
    entities: {},
    members: {},
    myGroups: [],
    searchResults: {}
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<{ groups: HashTable<GroupObject> }>) => {
            state.entities = {
                ...state.entities,
                ...action.payload.groups
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(logOutSuccess, _ => initialState)
            .addCase(searchUsersSuccess, (state, action) => {
                const { query, groups } = action.payload
                state.searchResults[query] = groups.map((groupId) => ({ groupId }))
            })
    }
})

const persistConfig = {
    key: groupSlice.name,
    storage: AsyncStorage
};

export const groupReducer = persistReducer(persistConfig, groupSlice.reducer)
export const {setGroups} = groupSlice.actions