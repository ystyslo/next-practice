import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  hasAccount: boolean;
  setHasAccount: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hasAccount: false,
      setHasAccount: (value) => set({ hasAccount: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        hasAccount: state.hasAccount,
      }),
    }
  )
);
