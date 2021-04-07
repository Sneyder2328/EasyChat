import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { HashTable, HashTableArray } from "../../utils/utils";
import { logOutSuccess } from "../auth/authReducer";
import { GroupObject } from "../group/groupReducer";
import { SearchResponse } from "./usersApi";

export interface UserObject {
    id: string;
    photoURL?: string;
    bio?: string;
    fullname: string;
    username: string;
    email: string;
}
interface UserState {
    entities: HashTable<UserObject>;
    mesages: HashTable<{
        list: Array<{ messageId: string; createdAt: any }>;
        offset?: string;
        isLoading: boolean;
        allMessagesLoaded: boolean;
        lastMessageId: string;
    }>;
    isSearching: boolean;
    searchResults: {
        chats: HashTableArray<{ userId: string }>;
        global: HashTableArray<{ userId: string }>;
    }
}

const initialState: UserState = {
    entities: {},
    mesages: {},
    searchResults: {
        chats: {},
        global: {}
    },
    isSearching: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<{ users: HashTable<UserObject> }>) => {
            state.entities = {
                ...state.entities,
                ...action.payload.users
            }
        },
        setUser: (state, action: PayloadAction<{ user: UserObject }>) => {
            state.entities[action.payload.user.id] = action.payload.user
        },
        searchUsersRequest: (state) => {
            state.isSearching = true
        },
        searchUsersSuccess: (state, action: PayloadAction<{
            query: string;
            chats: Array<string>;
            global: Array<string>;
            groups: Array<string>;
        }>) => {
            const { query, chats, global } = action.payload
            state.isSearching = false
            state.searchResults[query] = {
                chats: chats.map((userId) => ({ userId })),
                global: global.map((userId) => ({ userId }))
            }
        },
        searchUsersError: (state) => {
            state.isSearching = false
        }
    },
    extraReducers: builder => {
        builder.addCase(logOutSuccess, _ => initialState)
    }
})

const persistConfig = {
    key: userSlice.name,
    storage: AsyncStorage
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer)
export const { setUser, setUsers, searchUsersError, searchUsersRequest, searchUsersSuccess } = userSlice.actions