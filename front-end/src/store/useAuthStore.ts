// import  { create} from 'vuex'
import  { create} from 'zustand'
import axiosInstance from "../lib/axios.ts";
import toast from "react-hot-toast";

export const useAuthStore = create(set => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      set({ authUser: response.data })
    }catch (e) {
      set({ authUser: null })
      console.log(e);
    }finally {
      set({ isCheckingAuth: false })
    }
  },
  login: async (data: { email: string, password: string }) => {
    try {
      const response
          = await axiosInstance.post('/auth/login', data);
      set({ authUser: response.data })
      toast.success('Logged in successfully');
    }catch (e) {
      console.log(e);
    }finally {
      set({ isLoggingIn: false })
    }
  },
  signup: async (data: { name: string, email: string, password: string }) => {
    try {
      set({ isSigningUp: true })
      const response
          = await axiosInstance.post('/auth/signup', data);
      set({ authUser: response.data })
      set({ isSigningUp: false })
      set({ isLoggingIn: false })
      toast.success('Signed up successfully');
    }catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error('Error signing up', e.response.data);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.log(e.response.data);
    }finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null })
      toast.success('Logged out successfully');
    }catch (e) {
      console.log(e);
    }finally {
      set({ isLoggingIn: false })
    }
  }
  // setUser: user => set({ user })
}))