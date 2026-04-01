import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import DashboardPage from "@/pages/dashboardPage/Dashboard";
import HabitDetailPage from "@/pages/habitDetailPage/HabitDetail";
import AuthPage from "@/pages/auth/Auth";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<DashboardPage />} />
            <Route path={ROUTES.HABIT_DETAIL} element={<HabitDetailPage />} />
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            {/* future routes can be added easily here */}
        </Routes>
    );
}
