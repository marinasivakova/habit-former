import { type FC, type ButtonHTMLAttributes } from "react";
import { useTheme } from "../theme";
import { typography } from "../tokens/typography";
import { spacing } from "../tokens/spacing";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
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
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
    };

    // const variantStyle =
    //     variant === "primary"
    //         ? {
    //               backgroundColor: colors.primary,
    //               color: colors.text,
    //               ":hover": { backgroundColor: colors.primaryHover },
    //           }
    //         : {
    //               backgroundColor: colors.surface,
    //               color: colors.text,
    //               border: `1px solid ${colors.border}`,
    //           };

    const getStyle = () => {
        switch (variant) {
            case "primary":
                return {
                    backgroundColor: colors.primary,
                    color: colors.text,
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
