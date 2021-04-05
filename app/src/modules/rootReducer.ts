import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth/authReducer";

export interface EasyChatState {
    auth: AuthState;
}
export const rootReducer = combineReducers({
    auth: authReducer
})