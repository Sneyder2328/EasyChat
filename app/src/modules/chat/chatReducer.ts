import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { logOutSuccess } from "../auth/authReducer";

interface ChatState {
    myChats: Array<{ userId: string; lastMessageId: string }>;
}

const initialState: ChatState = {
    myChats: []
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(logOutSuccess, _ => initialState)
    }
})

const persistConfig = {
    key: chatSlice.name,
    storage: AsyncStorage
};

export const chatReducer = persistReducer(persistConfig, chatSlice.reducer)
// export const {setchat,setchats} = chatSlice.actions