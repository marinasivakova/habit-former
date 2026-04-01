import { type ReactNode } from "react";
import { useTheme } from "@/shared/ui/theme";
import { Header } from "../header/Header";
import { typography } from "@/shared/ui/tokens/typography";
import cls from "./MainLayout.module.scss";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { colors, theme } = useTheme();

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
            <main className={theme === "dark" ? cls.mainDark : cls.mainLight}>
                {children}
            </main>
        </div>
    );
};
