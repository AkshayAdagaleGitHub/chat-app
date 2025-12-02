import  { create } from 'zustand'
import toast from 'react-hot-toast';
import axiosInstance from "../lib/axios.ts";
import type {User} from "../type";

export const useChatStore = create(set => ({
    messages: [],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        try {
            const response = await axiosInstance.get('/message/users');
            set({ users: response.data })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch (e) {
            toast.error('Error fetching users');
        }finally {
            set({ isUserLoading: false })
        }
    },
    getMessages: async (userId: string) => {
        try {
            const response =
                await axiosInstance.get(`/message/${userId}`);
            set({ messages: response.data })
        }catch (e) {
            toast.error('Error fetching messages');
        }
    },
    setSelectedUser: (selectedUser: User) => set({ selectedUser: selectedUser })
}))