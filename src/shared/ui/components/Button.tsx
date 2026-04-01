import { type FC, type ButtonHTMLAttributes } from "react";
import { useTheme } from "../theme";
import { typography } from "../tokens/typography";
import { spacing } from "../tokens/spacing";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tab";
}

export const Button: FC<ButtonProps> = ({
    variant = "primary",
    style,
    children,
    ...props
}) => {
    const { colors } = useTheme();

    const baseStyle = {
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.medium,
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: "16px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
    };

    const getStyle = () => {
        switch (variant) {
            case "primary":
                return {
                    background: `linear-gradient(270deg, ${colors.primary}, ${colors.primaryHover}, ${colors.primary})`,
                    backgroundSize: "600% 600%",
                    color: colors.text,
                    animation: "shimmer 3s ease infinite",
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

    const variantStyle = getStyle();

    return (
        <button style={{ ...baseStyle, ...variantStyle, ...style }} {...props}>
            {children}
        </button>
    );
};
