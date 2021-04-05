import { transport } from "../../api"

type SignUpRequest = {
    id: string
    username: string;
    email: string;
    fullname: string;
}

type LogInRequest = {
    username: string;
    password: string;
}

type UserResponse = {
    id: string
    username: string;
    email: string;
    fullname: string;
    photoURL?: string;
    bio?: string;
}

export const AuthApi = {
    async logIn(user: LogInRequest): Promise<UserResponse> {
        const configAxios = {
            auth: { username: user.username, password: user.password },
            withCredentials: true
        }
        return await transport.post("/sessions/", configAxios);
    },
    async signUp(user: SignUpRequest): Promise<UserResponse> {
        return await transport.post("/users/", user)
    }
}