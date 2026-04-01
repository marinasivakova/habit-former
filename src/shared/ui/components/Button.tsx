import { type FC, type ButtonHTMLAttributes } from "react";
import { useTheme } from "../theme";
import styles from "./button.module.scss";
import { typography } from "../tokens";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tab";
    isActive?: boolean;
}

export const Button: FC<ButtonProps> = ({
    variant = "primary",
    isActive = false,
    style,
    children,
    ...props
}) => {
    const { colors } = useTheme();

    // Dynamic styles for theme colors
    const themeStyles: React.CSSProperties = {
        "--primary-color": colors.primary,
        "--primary-hover": colors.primaryHover,
        "--secondary-bg": colors.surface,
        "--secondary-text": colors.text,
        "--secondary-border": colors.border,
        "--tab-text": colors.text,
        "--primary-gradient": `linear-gradient(270deg, ${colors.primary}, ${colors.primaryHover}, ${colors.primary})`,
        color: variant === "primary" ? colors.text : undefined,
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.semiBold,
    } as React.CSSProperties;

    const className = [
        styles.button,
        variant === "primary" ? styles.primary : "",
        variant === "secondary" ? styles.secondary : "",
        variant === "tab" ? styles.tab : "",
        isActive && variant === "tab" ? styles.active : "",
    ]
        .filter(Boolean)
        .join(" ");

    const getStyle = (): React.CSSProperties => {
        switch (variant) {
            case "primary":
                return {
                    backgroundColor: colors.primary, // base color
                    color: colors.text,
                    borderRadius: "16px",
                    transition: "all 0.2s ease",
                };
            case "secondary":
                return {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                };
            default:
                return {};
        }
    };

    return (
        <button
            className={className}
            style={{
                ...themeStyles,
                ...getStyle(),
                ...style,
            }}
            onMouseEnter={(e) => {
                if (variant === "primary") {
                    const el = e.currentTarget;
                    el.style.background = `linear-gradient(270deg, ${colors.primary}, ${colors.primaryHover}, ${colors.primary})`;
                    el.style.backgroundSize = "600% 600%";
                    el.style.animation = "shimmer 3s ease infinite";
                }
            }}
            onMouseLeave={(e) => {
                if (variant === "primary") {
                    const el = e.currentTarget;
                    el.style.background = colors.primary;
                    el.style.animation = "none";
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};
