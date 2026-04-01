// src/widgets/layouts/MainLayout.tsx
import { type ReactNode } from "react";
import { useTheme } from "@/shared/ui/theme";
import { Header } from "../header/Header";
import { typography } from "@/shared/ui/tokens/typography";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { colors } = useTheme();

    return (
        <div
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: typography.fontFamily,
            }}
        >
            <Header />
            <main style={{ flex: 1, padding: "24px" }}>{children}</main>
        </div>
    );
};
