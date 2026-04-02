import { type FC, useState, useRef, useEffect } from "react";
import { useTheme } from "../theme";
import { spacing, typography } from "../tokens";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  options,
  value,
  placeholder = "Select...",
  onChange,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: spacing.md,
        position: "relative",
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

      {/* Trigger */}
      <div
        onClick={() => setOpen((p) => !p)}
        style={{
          padding: `${spacing.sm} ${spacing.md}`,
          borderRadius: 12,
          border: `1px solid ${open ? colors.primary : colors.border}`,
          backgroundColor: colors.surface,
          color: selected ? colors.text : colors.mutedText,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.md,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s ease",
          boxShadow: open ? `0 0 8px ${colors.primary}55` : "none",
        }}
      >
        <span>{selected?.label || placeholder}</span>

        {/* Arrow */}
        <span
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            fontSize: 12,
            opacity: 0.7,
          }}
        >
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            marginTop: 6,
            width: "100%",
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
            boxShadow: `0 8px 24px rgba(0,0,0,0.2)`,
            overflow: "hidden",
            zIndex: 10,
            animation: "fadeIn 0.15s ease",
          }}
        >
          {options.map((opt) => {
            const isActive = opt.value === value;

            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  cursor: "pointer",
                  backgroundColor: isActive
                    ? `${colors.primary}22`
                    : "transparent",
                  color: isActive ? colors.primary : colors.text,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor =
                      colors.primary + "22";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
