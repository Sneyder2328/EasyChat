import { AuthStatus } from "./auth/authReducer";
import { RootState } from "./rootReducer";

export const isAuthSelector = (state: RootState) => state.auth.isAuthenticated
export const isSigningUpSelector = (state: RootState) => state.auth.status  === AuthStatus.SIGNING_UP
export const isLogingInSelector = (state: RootState) => state.auth.status  === AuthStatus.LOGING_IN
export const isLogingOutSelector = (state: RootState) => state.auth.status  === AuthStatus.LOGING_OUT