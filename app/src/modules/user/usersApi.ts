import { AxiosResponse } from "axios"
import { transport } from "../../api"
import { GroupObject } from "../group/groupReducer"
import { UserObject } from "./userReducer"

export type SearchResponse = {
    users: Array<UserObject & { isGlobal: boolean }>;
    groups: Array<GroupObject>;
}
export interface SearchRequest {
    query: string;
    includeGroups: boolean ;
}

export const UserApi = {
    async searchUsers({ query, includeGroups }: SearchRequest): Promise<AxiosResponse<SearchResponse>> {
        return await transport.get("/users/", {
            params: { query, includeGroups, limit: 20 }
        })
    }
}