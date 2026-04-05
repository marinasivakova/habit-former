import { createContext, useContext, type ReactNode } from "react";
import { colors } from "./tokens/colors";
import { useUserStore } from "@/entities/user/model/store";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  colors: typeof colors.dark;
  toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  colors: colors.dark,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useUserStore((s) => s.theme) || "dark";
  const value: ThemeContextValue = { theme, colors: colors[theme] };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
