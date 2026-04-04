// src/shared/ui/components/ProgressPie.tsx
import { useTheme } from "@/shared/ui/theme";

interface Props {
  value: number; // 0–100
  label?: string;
}

export const ProgressPie = ({ value, label }: Props) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        background: `conic-gradient(
          ${colors.primary} ${value}%,
          ${colors.border} ${value}% 100%
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* inner circle (to make it donut style) */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: colors.surface,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: colors.text,
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: 600 }}>{value}%</div>
        {label && <div style={{ fontSize: "12px", opacity: 0.6 }}>{label}</div>}
      </div>
    </div>
  );
};
