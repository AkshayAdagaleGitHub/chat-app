export interface User {
    id: number;
    fullName: string;
    email: string;
    profilePic: string;
}

export interface ChatUser{
    users:[],
    setSelectedUser: (user: User) => void;
    selectedUser: User | null,
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    messages: Message[];
    isMessageLoading: boolean;
    lastSeen: Date;
    unreadCount: number;
    online: boolean;
    typing: boolean;
    selected: boolean;
    lastMessage: Message | null;
    lastMessageTime: Date | null;
    lastMessageSeen: boolean;
    lastMessageSeenTime: Date | null;
    lastMessageSeenBy: User | null;
    lastMessageSentBy: User | null;
    lastMessageSentTime: Date | null;
    lastMessageSentByMe: boolean;
    lastMessageSentByMeTime: Date | null;
    lastMessageSentByMeSeen: boolean;
    lastMessageSentByMeSeenTime: Date | null;
    lastMessageSentByMeSeenBy: User | null;
    getUsers: () => Promise<void>;
    getMessages: (messageData: Message) => Promise<void>;
    updateOnlineStatus: () => Promise<void>;
    sendMessage: (messageData: Message) => Promise<void>;
}

export interface Message {
    id?: number;
    messageText: string;
    fullName?: string | undefined;
    email?: string | undefined;
    fromUserId?: number | undefined;
    toUserId?: number | undefined;
    senderId?: number | undefined;
    receiverId?: number | undefined;
    createdAt?: string;
    seen?: boolean;
    seenBy?: User | null;
    sentByMe?: boolean;
    sentByMeTime?: Date | null;
    sentByMeSeen?: boolean;
    sentByMeSeenTime?: Date | null;
    sentByMeSeenBy?: User | null;
    sentBy?: User | null;
    chatUser?: ChatUser | null;
    chatUserLastMessage?: Message | null;
    chatUserLastMessageTime?: Date | null;
    chatUserLastMessageSeen?: boolean;
    chatUserLastMessageSeenTime?: Date | null;
    chatUserLastMessageSeenBy?: User | null;

}
export interface AuthState {
    authUser: User | null;
    isCheckingAuth: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isRegistering: boolean;
    isUpdatingProfile: boolean;
    isSigningUp: boolean;
    signsUp: (data: SignUpFormData) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    login: (data: LoginFormData) => Promise<void>;
}
export interface LoginFormData {
    email: string;
    password: string;
}
export interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
}