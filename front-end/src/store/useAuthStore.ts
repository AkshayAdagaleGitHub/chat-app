import { create } from 'zustand';
import { type AuthState } from '../type/type.ts';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";


export const useAuthStore = create<AuthState>((set) => ({
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
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try{
            console.log("Checking Auth through auth/check API");
            const response = await axiosInstance.get('/auth/check');
            const data = response.data;
            console.log("auth/check response ", data);
            set({authUser: data})
            console.log(data);

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
            console.log("data -> ",data);
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
            console.log("data -> ",data);
            localStorage.setItem('jwt', data.token);
            toast.success('Logged in successfully');
            set({authUser: data})
        }catch (e) {
            toast.error('Error logging in');
            console.log(e);
        }finally {
            set({isLoggingIn: false})
        }
    }
}));