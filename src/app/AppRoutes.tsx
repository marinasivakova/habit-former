// src/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import DashboardPage from "@/pages/dashboardPage/Dashboard";
import HabitDetailPage from "@/pages/habitDetailPage/HabitDetail";
import AuthPage from "@/pages/auth/Auth";
import { MainLayout } from "@/widgets/layouts/MainLayout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTES.HOME}
                element={
                    <MainLayout>
                        <DashboardPage />
                    </MainLayout>
                }
            />
            <Route
                path={ROUTES.HABIT_DETAIL}
                element={
                    <MainLayout>
                        <HabitDetailPage />
                    </MainLayout>
                }
            />
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            {/* add future routes here */}
        </Routes>
    );
}
