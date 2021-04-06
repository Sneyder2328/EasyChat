import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { HashTable, HashTableArray } from "../../utils/utils";
import { logOutSuccess } from "../auth/authReducer";

interface GroupState {
    entities: HashTable<{
        id: string;
        name: string;
        photoUrl: string;
        bio: string;
    }>;
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
        
    },
    extraReducers: builder => {
        builder.addCase(logOutSuccess, _ => initialState)
    }
})

const persistConfig = {
    key: groupSlice.name,
    storage: AsyncStorage
};

export const groupReducer = persistReducer(persistConfig, groupSlice.reducer)
// export const {setgroup,setgroups} = groupSlice.actions