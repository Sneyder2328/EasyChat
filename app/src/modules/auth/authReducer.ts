import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from "redux-persist/es/persistReducer";

export enum AuthStatus {
    LOGING_IN,
    SIGNING_UP,
    LOGING_OUT,
    REGULAR,
}
export type FormError = { fieldName: string; message: string };
export interface AuthState {
    accessToken?: string;
    isAuthenticated: boolean;
    userId?: string;
    status?: AuthStatus;
    error?: FormError | string;
    isUpdatingProfile?: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logInRequest: (state) => {
            state.error = undefined
            state.status = AuthStatus.LOGING_IN
        },
        logInError: (state, action: PayloadAction<{ error: FormError }>) => {
            state.status = undefined
            state.error = action.payload.error
        },
        signInSuccess: (state, action: PayloadAction<{ userId: string; accessToken: string }>) => {
            state.accessToken = action.payload.accessToken
            state.userId = action.payload.userId
            state.status = undefined
            state.isAuthenticated = true
        },
        signUpRequest: (state) => {
            state.error = undefined
            state.status = AuthStatus.SIGNING_UP
        },
        signUpError: (state, action: PayloadAction<{ error: FormError }>) => {
            state.status = undefined
            state.error = action.payload.error
        },
        logOutRequest: (state) => {
            state.status = AuthStatus.LOGING_OUT
        },
        logOutSuccess: () => initialState,
        logOutError: (state) => {
            state.status = undefined
        },
    }
})
const persistConfig = {
    key: authSlice.name,
    storage: AsyncStorage,
    blacklist: ['sesionState', 'logInError', 'signUpError', 'updateProfileError', 'isUpdatingProfile']
};
export const authReducer = persistReducer(persistConfig, authSlice.reducer)
export const {
    logInError, logInRequest, signInSuccess, signUpError, signUpRequest,
    logOutError, logOutRequest, logOutSuccess
} = authSlice.actions