import { AxiosResponse } from "axios";
import { AppThunk } from "../store";
import { setUser } from "../user/userReducer";
import { AuthApi, LogInRequest, SignUpRequest, UserResponse } from "./authApi";
import { logInError, logInRequest, logOutError, logOutRequest, logOutSuccess, signInSuccess, signUpError, signUpRequest } from "./authReducer";

export const logInUser = (user: LogInRequest): AppThunk => async (dispatch) => {
    dispatch(logInRequest());
    try {
        const response = await AuthApi.logIn(user);
        processSignInResponse({ dispatch, response })
    } catch (err) {
        console.log("logInUser err:", err);
        const error = err?.response?.data?.error || 'Network connection error'
        const message = err?.response?.data?.message || 'Network connection error'
        dispatch(logInError({ error: { fieldName: error, message } }))
    }
};


export const signUpUser = (userData: SignUpRequest): AppThunk => async (dispatch) => {
    dispatch(signUpRequest())
    try {
        const response = await AuthApi.signUp(userData);
        processSignInResponse({ dispatch, response })
    } catch (err) {
        console.log("signUpUser error:", err);
        const error = err?.response?.data?.error || 'Network connection error'
        const message = err?.response?.data?.message || 'Network connection error'
        dispatch(signUpError({ error: { fieldName: error, message } }))
    }
};


const processSignInResponse = ({ dispatch, response }: { dispatch: any, response: AxiosResponse<UserResponse> }) => {
    console.log("processSignInResponse", response);
    const accessToken = response.headers['authorization'];
    console.log("accessToken", accessToken);
    dispatch(setUser({ user: response.data }))
    dispatch(signInSuccess({ accessToken, userId: response.data.id }));
}

export const logOutUser = (): AppThunk => async (dispatch) => {
    dispatch(logOutRequest());
    try {
        await AuthApi.logOut();
        dispatch(logOutSuccess());
    } catch (err) {
        console.log("error logging out", err);
        dispatch(logOutError());
    }
};