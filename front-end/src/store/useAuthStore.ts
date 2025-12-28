import { create } from 'zustand';
import { type AuthState } from '../type/type.ts';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
import {io} from "socket.io-client";


export const useAuthStore = create<AuthState>((set, get) => ({
    authUser : null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,
    isRegistering: false,
    isUpdatingProfile: false,
    isLoading: false,
    error: null,
    isSigningUp: false,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try{
            // console.log("Checking Auth through auth/check API");
            const response = await axiosInstance.get('/auth/check');
            const data = response.data;
            // console.log("auth/check response ", data);
            set({authUser: data})
            // console.log(data);

        }catch (e) {
            console.log(e);
            set({authUser: null})
        }finally {
            set({isCheckingAuth: false})
        }
    },
    signsUp: async (formData) => {
        set({isSigningUp: true});
        try{
            const response = await axiosInstance.post('/auth/signup', formData);
            const data = response.data;
            // console.log("data -> ",data);
            set({authUser: data})
            toast.success('Signed up successfully');
            return data;
        }catch (e) {
            toast.error('Error signing up');
            set({authUser: null})
            console.log(e);
        }finally {
            set({isSigningUp: false})
        }
    },
    logout: async () => {
        set({isLoggingOut: true});
        try{
            await axiosInstance.post('/auth/logout');
            localStorage.removeItem('jwt');
            toast.success('Logged out successfully');
            get().disconnectSocket();
            set({authUser: null})
        }catch (e) {
            console.log(e);
        }finally {
            set({isLoggingOut: false})
        }
    },
    login: async (formData) => {
        set({isLoggingIn: true});
        try{
            const response = await axiosInstance.post('/auth/login', formData);
            const data = response.data;
            localStorage.setItem('jwt', data.token);
            toast.success('Logged in successfully');
            // console.log("Login Successfull !! ");
            set({authUser: data})
            // console.log("Auth User Set Successfully !!",);
            get().connectSocket();
            // console.log("Socket Connected !!");
            return data;
        }catch (e) {
            toast.error('Error logging in');
            console.log(e);
        }finally {
            set({isLoggingIn: false})
        }
    },
    connectSocket: async () => {
        const { authUser, socket } = get(); // Call get() as a function
        if (!authUser || socket?.connected) return;

        if( !authUser || get().socket !== null){
            return;
        }
        const newSocket = io('http://localhost:5001',{
            query: {
                userId: authUser.id
            }
        });
        newSocket.connect();
        set({socket: newSocket});
        if(newSocket.connected){
            newSocket.on("getOnlineUsers", (userIds) => {
                console.log("userOnline", userIds);
                set({onlineUsers: userIds});
            });

        }
        // socket.on('onlineUsers', (users) => {
        //     console.log('onlineUsers', users);
            // set({onlineUsers: users});
        // });

        return socket;
    },
    disconnectSocket: () => {
        const { socket } = get();
        if(socket === null){
            return;
        }
        socket.disconnect();
    }
}));