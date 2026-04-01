// src/entities/habit/ui/HabitItem.tsx
import { type FC } from "react";
import { useTheme } from "@/shared/ui/theme";

interface HabitItemProps {
    title: string;
    done: boolean;
    onToggle: () => void;
}

export const HabitItem: FC<HabitItemProps> = ({ title, done, onToggle }) => {
    const { colors } = useTheme();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "16px",
                backgroundColor: colors.surface,
                boxShadow: `0 4px 12px ${colors.primary}33`,
                cursor: "pointer",
                transition: "transform 0.1s ease, box-shadow 0.2s ease",
            }}
            // optional hover effect
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "scale(1.02)";
                el.style.boxShadow = `0 6px 16px ${colors.primary}55`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "scale(1)";
                el.style.boxShadow = `0 4px 12px ${colors.primary}33`;
            }}
        >
            <span style={{ color: done ? colors.mutedText : colors.text }}>
                {title}
            </span>

            {/* Custom checkbox */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    border: `2px solid ${colors.primary}`,
                    backgroundColor: done ? colors.primary : "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
            >
                {done && (
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.text}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
        </div>
    );
};
