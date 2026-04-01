import { makeUserStorageKey } from "@/app/model/helpers";
import localStorageStore from "@/app/model/localStorageStore";
import { useAuthStore } from "@/entities/auth/model/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HabitEntry {
    date: string;
    done: boolean;
}

export interface Habit {
    id: string;
    title: string;
    entries: HabitEntry[];
}

interface HabitsState {
    habits: Habit[];
    addHabit: (title: string) => void;
    toggleHabitDone: (habitId: string, date?: string) => void;
    loadHabitsForUser: (userId: string) => void;
}

const createUserStorage = (userId: string) => {
    const key = makeUserStorageKey(userId, "habit-former-habits");

    return {
        getItem: (name: string) => {
            const value = localStorage.getItem(`${key}-${name}`);
            return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: any) => {
            localStorage.setItem(`${key}-${name}`, JSON.stringify(value));
        },
        removeItem: (name: string) => {
            localStorage.removeItem(`${key}-${name}`);
        },
    };
};

export const useHabitsStore = create<HabitsState>()(
    persist(
        (set, get) => ({
            habits: [],
            addHabit: (title) => {
                const userId = useAuthStore.getState().activeUserId;
                if (!userId) return;

                const newHabit: Habit = {
                    id: crypto.randomUUID(),
                    title,
                    entries: [],
                };
                set((state) => ({ habits: [...state.habits, newHabit] }));
            },
            toggleHabitDone: (
                habitId,
                date = new Date().toISOString().split("T")[0],
            ) => {
                const habits = get().habits.map((habit) => {
                    if (habit.id !== habitId) return habit;

                    const existing = habit.entries.find((e) => e.date === date);
                    if (existing) existing.done = !existing.done;
                    else habit.entries.push({ date, done: true });

                    return habit;
                });

                set({ habits });
            },
            loadHabitsForUser: (userId) => {
                const storage = createUserStorage(userId);
                const saved = storage.getItem(`${userId}-habits`);
                set({ habits: saved || [] });
            },
        }),
        {
            name: "habits-per-user", // not really used, per-user key overrides storage
            storage: localStorageStore,
        },
    ),
);
