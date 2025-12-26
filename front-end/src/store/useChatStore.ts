import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.ts';
import toast from "react-hot-toast";
import {type ChatUser} from '../type/type.ts';

export const useChatStore = create<ChatUser>((set) => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    lastSeen: new Date(),
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
            const response = await axiosInstance.get('/message/users');
            const data = response.data;
            set({users: data})
        }catch (e) {
            console.log(e);
            toast.error('Error fetching users');
        }finally {
            set({isUsersLoading: false})
        }
    },
    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try{
            const response = await axiosInstance.get(`/message/users/${userId}`);
            const data = response.data;
            set({messages: data})
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
    }
}));