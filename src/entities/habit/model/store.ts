import { makeUserStorageKey } from "@/app/model/helpers";
import { useAuthStore } from "@/entities/auth/model/store";
import { create } from "zustand";

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
    const key = makeUserStorageKey(userId, "habit-former-habits"); // e.g. "habit-former-habits-123"

    return {
        getItem: () => {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        },
        setItem: (value: Habit[]) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: () => {
            localStorage.removeItem(key);
        },
    };
};

export const useHabitsStore = create<HabitsState>()((set) => ({
    habits: [],
    addHabit: (title) => {
        const userId = useAuthStore.getState().activeUserId;
        if (!userId) return;

        const newHabit: Habit = { id: crypto.randomUUID(), title, entries: [] };
        set((state) => {
            const updatedHabits = [...state.habits, newHabit];
            createUserStorage(userId).setItem(updatedHabits);
            return { habits: updatedHabits };
        });
    },

    toggleHabitDone: (
        habitId,
        date = new Date().toISOString().split("T")[0],
    ) => {
        const userId = useAuthStore.getState().activeUserId;
        if (!userId) return;

        set((state) => {
            const updatedHabits = state.habits.map((habit) => {
                if (habit.id !== habitId) return habit;
                const existing = habit.entries.find((e) => e.date === date);
                if (existing) existing.done = !existing.done;
                else habit.entries.push({ date, done: true });
                return habit;
            });

            createUserStorage(userId).setItem(updatedHabits);
            return { habits: updatedHabits };
        });
    },

    loadHabitsForUser: (userId: string) => {
        const storage = createUserStorage(userId);
        let saved = storage.getItem();

        if (!saved) {
            saved = []; // initialize empty habits array for this user
            storage.setItem(saved);
        }

        set({ habits: saved });
    },
}));
