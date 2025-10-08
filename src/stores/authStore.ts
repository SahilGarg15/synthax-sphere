import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'mentor' | 'admin';
  avatar?: string;
  streak?: number;
  joinedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  setUser: (user: User | null) => void;
}

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sahil Kumar',
    email: 'sahil@example.com',
    role: 'learner',
    avatar: '',
    streak: 7,
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'mentor',
    avatar: '',
    joinedAt: '2023-06-20',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '',
    joinedAt: '2023-01-01',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      rememberMe: false,

      login: async (email: string, password: string, rememberMe: boolean) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const user = mockUsers.find((u) => u.email === email);
        if (!user) {
          throw new Error('Invalid credentials');
        }

        set({ user, isAuthenticated: true, rememberMe });
        return user;
      },

      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newUser: User = {
          id: String(mockUsers.length + 1),
          name,
          email,
          role: 'learner',
          avatar: '',
          streak: 0,
          joinedAt: new Date().toISOString(),
        };

        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true });
        return newUser;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      verifyOTP: async (otp: string) => {
        // Simulate OTP verification
        await new Promise((resolve) => setTimeout(resolve, 800));
        return otp === '123456'; // Mock OTP
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
