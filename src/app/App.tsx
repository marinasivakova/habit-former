import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@/shared/ui/theme";
import { useAuthStore } from "@/entities/auth/model/store";
import { useHabitsStore } from "@/entities/habit/model/store";
import { useEffect } from "react";

function App() {
    const userId = useAuthStore((state) => state.activeUserId);
    const loadHabitsForUser = useHabitsStore(
        (state) => state.loadHabitsForUser,
    );

    useEffect(() => {
        if (userId) {
            loadHabitsForUser(userId);
        }
    }, [userId]);

    return (
        <HashRouter>
            <ThemeProvider>
                <AppRoutes />
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
