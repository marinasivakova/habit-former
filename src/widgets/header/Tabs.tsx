// src/widgets/components/Tabs.tsx
import { type FC } from "react";
import { useTheme } from "@/shared/ui/theme";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/ui/components/Button";

interface Tab {
    label: string;
    route: string;
}

interface TabsProps {
    tabs: Tab[];
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav
            style={{
                display: "flex",
                borderBottom: `1px solid ${colors.border}`,
            }}
        >
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.route;
                return (
                    <Button
                        key={tab.route}
                        onClick={() => navigate(tab.route)}
                        style={{
                            cursor: "pointer",
                            color: isActive ? colors.text : colors.mutedText,
                            border: "none",
                            fontWeight: isActive ? 700 : 500,
                            transition: "background-color 0.2s ease",
                        }}
                    >
                        {tab.label}
                    </Button>
                );
            })}
        </nav>
    );
};
