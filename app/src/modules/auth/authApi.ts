import { AxiosResponse } from "axios"
import { transport } from "../../api"

export type SignUpRequest = {
    id: string
    username: string;
    email: string;
    fullname: string;
}

export type LogInRequest = {
    username: string;
    password: string;
}

export type UpdateUserRequest = {
    username: string;
    fullname: string;
    photoUrl?: string;
    bio?: string;
}

export type UserResponse = {
    id: string
    username: string;
    email: string;
    fullname: string;
    photoUrl?: string;
    bio?: string;
}

export const AuthApi = {
    async logIn({ username, password }: LogInRequest): Promise<AxiosResponse<UserResponse>> {
        return await transport.post("/sessions/", {}, {
            withCredentials: true,
            auth: { username, password }
        })
    },
    async signUp(user: SignUpRequest): Promise<AxiosResponse<UserResponse>> {
        return await transport.post("/users/", user)
    },
    async updateUser(user: UpdateUserRequest): Promise<AxiosResponse<UserResponse>> {
        return await transport.post("/users/", user)
    },
    async logOut(): Promise<AxiosResponse<boolean>> {
        return await transport.delete('/sessions/')
    },
}