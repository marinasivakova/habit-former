import { useAuthStore } from "@/entities/auth/model/store";
import { useHabitsStore } from "@/entities/habit/model/store";

export const login = (userId: string) => {
    useAuthStore.getState().login(userId);
    useHabitsStore.getState().loadHabitsForUser(userId);
};
