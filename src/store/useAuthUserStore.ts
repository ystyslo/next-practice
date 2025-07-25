import { create } from "zustand";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  hasAccount: boolean;
  setHasAccount: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hasAccount: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  get isLoggedIn() {
    return !!this.user;
  },
  setHasAccount: (value) => set({ hasAccount: value }),
}));
