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
  }
  // setUser: user => set({ user })
}))