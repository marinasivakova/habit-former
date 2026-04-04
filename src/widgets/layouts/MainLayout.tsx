import { type ReactNode } from "react";
import { useTheme } from "@/shared/ui/theme";
import { typography } from "@/shared/ui/tokens/typography";
import cls from "./MainLayout.module.scss";
import { FooterNav } from "../app/footer/Footer";

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
      <main className={theme === "dark" ? cls.mainDark : cls.mainLight}>
        {children}
      </main>
      <FooterNav />
    </div>
  );
};
