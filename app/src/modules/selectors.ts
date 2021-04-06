import { RootState } from "./rootReducer";

export const isAuthSelector = (state: RootState) => state.auth.isAuthenticated