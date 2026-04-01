import { createContext, useContext, useState, type ReactNode } from "react";
import { colors } from "./tokens/colors";

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
    const [theme] = useState<Theme>("dark"); // default dark mode
    const value: ThemeContextValue = { theme, colors: colors[theme] };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
