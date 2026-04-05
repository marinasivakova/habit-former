// src/entities/user/model/store.ts
import { create } from "zustand";
import { makeUserStorageKey } from "@/app/model/helpers";
import { useAuthStore } from "@/entities/auth/model/store";

export interface UserData {
  name: string;
  avatarColor: string;
  theme: "light" | "dark";
}

interface UserState extends UserData {
  loadUser: (userId: string) => void;
  updateUser: (changes: Partial<UserData>) => void;
}

const createUserStorage = (userId: string) => {
  const key = makeUserStorageKey(userId, "habit-former-user");

  return {
    getItem: (): UserData | null => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: (value: UserData) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };
};

const defaultUser: UserData = {
  name: "Guest",
  avatarColor: "#7c5cff",
  theme: "dark",
};

export const useUserStore = create<UserState>((set) => ({
  ...defaultUser,

  loadUser: (userId) => {
    const storage = createUserStorage(userId);
    let user = storage.getItem();

    if (!user) {
      user = {
        ...defaultUser,
        name: userId,
      };

      storage.setItem(user);
    }

    set(user);
  },

  updateUser: (changes) => {
    const userId = useAuthStore.getState().activeUserId;
    if (!userId) return;

    set((state) => {
      const updated = { ...state, ...changes };
      createUserStorage(userId).setItem(updated);
      return updated;
    });
  },
}));
