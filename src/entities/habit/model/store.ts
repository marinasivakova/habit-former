import { create } from "zustand";

type THabit = {
    id: string;
    title: string;
    completed: boolean;
};

type THabitStore = {
    habits: THabit[];
    toggleHabit: (id: string) => void;
};

export const useHabitStore = create<THabitStore>((set) => ({
    habits: [],
    toggleHabit: (id) =>
        set((state) => ({
            habits: state.habits.map((h) =>
                h.id === id ? { ...h, completed: !h.completed } : h,
            ),
        })),
}));
