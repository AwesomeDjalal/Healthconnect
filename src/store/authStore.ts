import { create } from 'zustand';
import { auth } from '../lib/api';

interface User {
  id: number;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email, password, role) => {
    set({ isLoading: true, error: null });
    try {
      await auth.login({ email, password, role });
      set({ user: { email, role: role as 'patient' | 'doctor' | 'admin' } as User });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await auth.register(data);
      set({ user: { email: data.email, role: 'patient' } as User });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Registration failed' });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await auth.logout();
      set({ user: null });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Logout failed' });
    } finally {
      set({ isLoading: false });
    }
  },
}));