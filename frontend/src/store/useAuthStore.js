import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      set({ authUser: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ authUser: null, isAuthenticated: false });
    } finally {
      set({
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
      });
    }
  },
}));
