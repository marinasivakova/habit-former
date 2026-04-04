import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

import HabitListPage from "@/pages/habitListPage/HabitListPage";
import HabitDetailPage from "@/pages/habitDetailPage/HabitDetail";
import AuthPage from "@/pages/auth/Auth";
import { MainLayout } from "@/widgets/layouts/MainLayout";
import { RouteGuard } from "@/shared/lib/RouteGuard";
import OverviewPage from "@/pages/overviewPage/OverviewPage";
import NotFoundPage from "@/pages/system/NotFoundPage";
import ProfilePage from "@/pages/profile/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Overview - protected */}
      <Route
        path={ROUTES.OVERVIEW}
        element={
          <RouteGuard redirectTo={ROUTES.AUTH}>
            <MainLayout>
              <OverviewPage />
            </MainLayout>
          </RouteGuard>
        }
      />

      {/* Habit List - protected */}
      <Route
        path={ROUTES.HABIT_LIST}
        element={
          <RouteGuard redirectTo={ROUTES.AUTH}>
            <MainLayout>
              <HabitListPage />
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

      {/* History - protected */}
      <Route
        path={ROUTES.HISTORY}
        element={
          <RouteGuard redirectTo={ROUTES.AUTH}>
            <MainLayout>
              <div>History</div>
            </MainLayout>
          </RouteGuard>
        }
      />

      {/* Profile - protected */}
      <Route
        path={ROUTES.PROFILE}
        element={
          <RouteGuard redirectTo={ROUTES.AUTH}>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </RouteGuard>
        }
      />

      {/* 404 - protected */}
      <Route
        path="*"
        element={
          <RouteGuard redirectTo={ROUTES.AUTH}>
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          </RouteGuard>
        }
      />

      {/* Auth Page - guest only */}
      <Route
        path={ROUTES.AUTH}
        element={
          <RouteGuard requireAuth={false} redirectTo={ROUTES.OVERVIEW}>
            <AuthPage />
          </RouteGuard>
        }
      />
    </Routes>
  );
}
