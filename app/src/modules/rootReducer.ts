import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";

// export interface EasyChatState {
//     auth: AuthState;
// }
export const rootReducer = combineReducers({
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>;

// type GlobalState = {
//     auth: {
//         accessToken?: string;
//         isAuthenticated: boolean;
//         userId?: string;
//         status?: "AuthStatus";
//         error?: string;
//         isUpdatingProfile?: boolean;
//     },
//     users: {
//         entities: HashTable<{
//             id: string;
//             photoUrl: string;
//             bio: string;
//             fullname: string;
//             username: string;
//             email: string;
//         }>;
//         mesages: HashTable<{
//             list: Array<{ messageId: string; createdAt: any }>;
//             offset?: string;
//             isLoading: boolean;
//             allMessagesLoaded: boolean;
//             lastMessageId: string;
//         }>;
//         searchResults: HashTableArray<{ userId: string; isGlobal: boolean }>;
//     },
//     groups: {
//         entities: HashTable<{
//             id: string;
//             name: string;
//             photoUrl: string;
//             bio: string;
//         }>;
//         members: HashTable<Array<{ userId: string }>>;
//         myGroups: Array<{ groupId: string; lastMessageId: string }>;
//         searchResults: HashTableArray<{ groupId: string }>;
//     },
//     chats: {
//         myChats: Array<{ userId: string; lastMessageId: string }>;
//     },
//     messages: {
//         entities: HashTable<{
//             id: string;
//             content: string;
//             createdAt: any;
//             senderId: string;
//             recipientId: string;
//         }>;
//     }
// }