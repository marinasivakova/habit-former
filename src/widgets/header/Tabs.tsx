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
                        variant="tab"
                        onClick={() => navigate(tab.route)}
                        style={{
                            color: isActive ? colors.text : colors.mutedText,
                            fontWeight: isActive ? 700 : 500,
                            borderBottom: isActive
                                ? `3px solid ${colors.primary}`
                                : "3px solid transparent",
                            backgroundColor: "transparent",
                            borderRadius: 0,
                            padding: "12px 24px",
                            marginRight: "4px",
                            transition: "all 0.2s ease",
                            boxShadow: isActive
                                ? `0 0 8px ${colors.primary}55` // subtle glow for active tab
                                : "none",
                        }}
                    >
                        {tab.label}
                    </Button>
                );
            })}
        </nav>
    );
};
