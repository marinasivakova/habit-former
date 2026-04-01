// src/shared/lib/RouteGuard.tsx
import { useAuthStore } from "@/entities/auth/model/store";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface GuardProps {
    children: ReactNode;
    requireAuth?: boolean; // true = must be logged in, false = must be guest
    redirectTo: string;
}

export const RouteGuard = ({
    children,
    requireAuth = true,
    redirectTo,
}: GuardProps) => {
    const activeUserId = useAuthStore((state) => state.activeUserId);

    if (requireAuth && !activeUserId)
        return <Navigate to={redirectTo} replace />;
    if (!requireAuth && activeUserId)
        return <Navigate to={redirectTo} replace />;

    return <>{children}</>;
};
