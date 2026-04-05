import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@/shared/ui/theme";
import { useAuthStore } from "@/entities/auth/model/store";
import { useHabitsStore } from "@/entities/habit/model/store";
import { useEffect } from "react";
import { useUserStore } from "@/entities/user/model/store";
import { migrateUsers } from "./utils/helpers";

function App() {
  const userId = useAuthStore((state) => state.activeUserId);
  const loadHabitsForUser = useHabitsStore((state) => state.loadHabitsForUser);
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    if (userId) {
      loadHabitsForUser(userId);
      loadUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    migrateUsers();
  }, []);

  return (
    <HashRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
