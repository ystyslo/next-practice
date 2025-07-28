import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  hasAccount: boolean;
  setHasAccount: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasAccount: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setHasAccount: (value) => set({ hasAccount: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        hasAccount: state.hasAccount,
      }),
    }
  )
);
