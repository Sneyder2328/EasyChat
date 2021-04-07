import { combineReducers } from "redux";
import { HashTable, HashTableArray } from "../utils/utils";
import { authReducer } from "./auth/authReducer";
import { groupReducer } from "./group/groupReducer";
import { userReducer } from "./user/userReducer";

// export interface EasyChatState {
//     auth: AuthState;
// }
export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    group: groupReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

type GlobalState = {
    auth: {
        accessToken?: string;
        isAuthenticated: boolean;
        userId?: string;
        status?: "AuthStatus";
        error?: string;
        isUpdatingProfile?: boolean;
    },
    users: {
        entities: HashTable<{
            id: string;
            photoURL: string;
            bio: string;
            fullname: string;
            username: string;
            email: string;
        }>;
        mesages: HashTable<{
            list: Array<{ messageId: string; createdAt: any }>;
            offset?: string;
            isLoading: boolean;
            allMessagesLoaded: boolean;
            lastMessageId: string;
        }>;
        isSearching: boolean;
        searchResults: {
            chats: HashTableArray<{ userId: string }>;
            global: HashTableArray<{ userId: string }>;
        }
    },
    groups: {
        entities: HashTable<{
            id: string;
            name: string;
            photoUrl: string;
            bio: string;
        }>;
        mesages: HashTable<{
            list: Array<{ messageId: string; createdAt: any }>;
            offset?: string;
            isLoading: boolean;
            allMessagesLoaded: boolean;
            lastMessageId: string;
        }>;
        members: HashTable<Array<{ userId: string }>>;
        myGroups: Array<{ groupId: string; lastMessageId: string }>;
        searchResults: HashTableArray<{ groupId: string }>;
    },
    chats: {
        myChats: Array<{ userId: string; lastMessageId: string }>;
    },
    messages: {
        entities: HashTable<{
            id: string;
            content: string;
            createdAt: any;
            senderId: string;
            recipientId: string;
        }>;
    }
}