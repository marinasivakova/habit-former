import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import DashboardPage from "@/pages/dashboardPage/Dashboard";
import HabitDetailPage from "@/pages/habitDetailPage/HabitDetail";
import AuthPage from "@/pages/auth/Auth";
import { MainLayout } from "@/widgets/layouts/MainLayout";
import { RouteGuard } from "@/shared/lib/RouteGuard";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Home / Dashboard - protected */}
            <Route
                path={ROUTES.HOME}
                element={
                    <RouteGuard redirectTo={ROUTES.AUTH}>
                        <MainLayout>
                            <DashboardPage />
                        </MainLayout>
                    </RouteGuard>
                }
            />

            {/* Habit Detail - protected */}
            <Route
                path={ROUTES.HABIT_DETAIL}
                element={
                    <RouteGuard redirectTo={ROUTES.AUTH}>
                        <MainLayout>
                            <HabitDetailPage />
                        </MainLayout>
                    </RouteGuard>
                }
            />

            {/* Auth Page - guest only */}
            <Route
                path={ROUTES.AUTH}
                element={
                    <RouteGuard requireAuth={false} redirectTo={ROUTES.HOME}>
                        <AuthPage />
                    </RouteGuard>
                }
            />

            {/* add future routes here */}
        </Routes>
    );
}
