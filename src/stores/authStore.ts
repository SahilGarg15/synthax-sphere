import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, signupUser, verifyOTP as verifyOTPApi, logoutUser, loginWithGoogle, getCurrentUser } from '@/api/auth';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<User>;
  setUser: (user: User | null) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      login: async (email: string, password: string, rememberMe: boolean) => {
        const response = await loginUser(email, password);
        if (!response.success || !response.user) throw new Error(response.message || 'Login failed');
        set({ user: response.user, isAuthenticated: true, rememberMe });
        return response.user;
      },
      signup: async (name: string, email: string, password: string) => {
        const response = await signupUser(name, email, password);
        if (!response.success || !response.user) throw new Error(response.message || 'Signup failed');
        set({ user: response.user, isAuthenticated: true });
        return response.user;
      },
      logout: async () => {
        await logoutUser();
        set({ user: null, isAuthenticated: false, rememberMe: false });
      },
      verifyOTP: async (otp: string) => {
        const user = get().user;
        if (!user) return false;
        const response = await verifyOTPApi(user.email, otp);
        return response.success;
      },
      loginWithGoogle: async () => {
        const response = await loginWithGoogle();
        if (!response.success || !response.user) throw new Error(response.message || 'Google login failed');
        set({ user: response.user, isAuthenticated: true });
        return response.user;
      },
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
      checkAuth: () => {
        const user = getCurrentUser();
        if (user) set({ user, isAuthenticated: true });
      },
    }),
    { name: 'auth-storage' }
  )
);
