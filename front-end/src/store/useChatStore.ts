import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.ts';
import toast from "react-hot-toast";
import {type ChatUser, type Message} from '../type/type.ts';

export const useChatStore = create<ChatUser>((set, get) => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    lastSeen: new Date(),
    isMessageLoading: false,
    unreadCount: 0,
    online: false,
    typing: false,
    selected: false,
    lastMessage:null,
    lastMessageTime:  null,
    lastMessageSeen: false,
    lastMessageSeenTime: null,
    lastMessageSeenBy:  null,
    lastMessageSentBy:  null,
    lastMessageSentTime:  null,
    lastMessageSentByMe: false,
    lastMessageSentByMeTime:  null,
    lastMessageSentByMeSeen: false,
    lastMessageSentByMeSeenTime:  null,
    lastMessageSentByMeSeenBy:  null,

    getUsers: async () => {
        set({isUsersLoading: true});
        try{
            const response = await axiosInstance.get('/message/get-all-users');
            const data = response.data;
            console.log("data -> ",data);
            set({users: data})
        }catch (e) {
            console.log(e);
            toast.error('Error fetching users');
        }finally {
            set({isUsersLoading: false})
        }
    },
    getMessages: async (messageData) => {
        set({isMessagesLoading: true});
        try{
            const response = await axiosInstance.get(`/message/users/getMessages`,{
                params: { ...messageData }
            });
            // 1. Ensure 'data' is an array. If backend returns { messages: [...] },
            // use response.data.messages instead.
            const rawMessages = Array.isArray(response.data) ? response.data : [];

            // 2. Sort the array
            const sortedMessages = rawMessages.sort((a: Message, b: Message) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });

            // 3. Update the store.
            // DO NOT use {...sortedMessages} because that turns the array into an object index.
            set({ messages: sortedMessages });
        }catch (e) {
            console.log(e);
            toast.error('Error fetching messages');
        }finally {
            set({isMessagesLoading: false})
        }
    },
    updateOnlineStatus: async () => {
        try{
            const response = await axiosInstance.put(`/auth/online`);
            const data = response.data;
            console.log("data -> ",data);
            set({online: true})
        }catch (e) {
            console.log(e);
        }finally {
            console.log("finally");
        }
    },
    setSelectedUser: (user) => {
        set({selectedUser: user})
    },
    sendMessage: async (messageData) => {
        console.log("Inside sendMessage");
        console.log("messageData ", messageData);
        const {selectedUser, messages } = get();
        try{
            const response = await axiosInstance.post(`/message/send/${selectedUser?.id}`, messageData);
            const data = response.data;
            console.log("data -> ",data);
            set({messages: [...messages, data]})
        }catch (e) {
            console.log(e);
        }finally {
            console.log("finally");
        }
    }
}));