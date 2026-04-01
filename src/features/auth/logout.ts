import { useAuthStore } from "@/entities/auth/model/store";
import { useHabitsStore } from "@/entities/habit/model/store";

export const logout = () => {
    useAuthStore.getState().logout();
    useHabitsStore.setState({ habits: [] });
};
