import localStorageStore from "@/app/model/localStorageStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  activeUserId: string | null;
  users: string[];
  login: (userId: string) => void;
  logout: () => void;
  addUser: (userId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      activeUserId: null,
      users: [],

      login: (userId: string) => {
        const { users } = get();

        if (!users.includes(userId)) {
          set({ users: [...users, userId] });
        }

        set({ activeUserId: userId });
      },

      addUser: (userId: string) => {
        const { users } = get();
        if (!users.includes(userId)) {
          set({ users: [...users, userId] });
        }
      },

      logout: () => set({ activeUserId: null }),
    }),
    {
      name: "habit-former-auth",
      storage: localStorageStore,
    }
  )
);
