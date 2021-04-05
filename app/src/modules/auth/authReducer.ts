import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from "redux-persist/es/persistReducer";

export enum SessionState {
    LOGING_IN,
    SIGNING_UP,
    LOGING_OUT,
    REGULAR,
}
export interface AuthState {
    accessToken?: string;
    isAuthenticated: boolean;
    userId?: string;
    sesionState?: SessionState;
    signUpError?: string;
    logInError?: string;
    isUpdatingProfile? : boolean;
    updateProfileError?: string;
}

const initialState: AuthState = {
    isAuthenticated: false
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logInRequest: (state) => {
            state.logInError = undefined
            state.sesionState = SessionState.LOGING_IN
        },
        logInError: (state, action: PayloadAction<{error: string}>) => {
            state.sesionState = undefined
            state.logInError = action.payload.error
        },
        signInSuccess: (state, action: PayloadAction<{userId: string; accessToken: string}>)=>{
            state.accessToken = action.payload.accessToken
            state.userId = action.payload.userId
            state.sesionState = undefined
            state.isAuthenticated = true
        },
        signUpRequest: (state) => {
            state.sesionState = SessionState.SIGNING_UP
            state.signUpError = undefined
        },
        signUpError: (state, action: PayloadAction<{error: string}>) => {
            state.sesionState = undefined
            state.signUpError = action.payload.error
        },
    }
})
const persistConfig = {
    key: authSlice.name,
    storage: AsyncStorage,
    blacklist: ['sesionState', 'logInError', 'signUpError', 'updateProfileError', 'isUpdatingProfile']
};
export const authReducer = persistReducer(persistConfig, authSlice.reducer)
export const authActions = authSlice.actions