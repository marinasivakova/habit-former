import localStorageStore from "@/app/model/localStorageStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    activeUserId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            activeUserId: null,
            login: (userId: string) => set({ activeUserId: userId }),
            logout: () => set({ activeUserId: null }),
        }),
        {
            name: "habit-former-auth",
            storage: localStorageStore,
        },
    ),
);
