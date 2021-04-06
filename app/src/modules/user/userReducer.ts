import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { HashTable, HashTableArray } from "../../utils/utils";
import { logOutSuccess } from "../auth/authReducer";

export interface UserObject {
    id: string;
    photoUrl?: string;
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
    searchResults: HashTableArray<{ userId: string; isGlobal: boolean }>;
}

const initialState: UserState = {
    entities: {},
    mesages: {},
    searchResults: {}
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
export const {setUser,setUsers} = userSlice.actions