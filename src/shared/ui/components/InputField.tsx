import { type FC, type InputHTMLAttributes } from "react";
import { useTheme } from "../theme";
import { spacing, typography } from "../tokens";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputField: FC<InputFieldProps> = ({ label, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: spacing.md,
      }}
    >
      {label && (
        <label
          style={{
            marginBottom: spacing.xs,
            color: colors.mutedText,
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.sm,
          }}
        >
          {label}
        </label>
      )}
      <input
        style={{
          padding: `${spacing.sm} ${spacing.md}`,
          borderRadius: "12px",
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
          color: colors.text,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.md,
          outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          ...(props.type === "number" && {
            MozAppearance: "textfield",
          }),
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = colors.primary;
          e.currentTarget.style.boxShadow = `0 0 8px ${colors.primary}55`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
    </div>
  );
};
