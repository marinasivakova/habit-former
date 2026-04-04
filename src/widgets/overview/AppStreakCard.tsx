// src/widgets/overview/AppStreakCard.tsx
import { useTheme } from "@/shared/ui/theme";

export const AppStreakCard = ({
  streak,
  activeToday,
}: {
  streak: number;
  activeToday: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        borderRadius: "22px",
        background: `linear-gradient(135deg, ${colors.primary}22, ${colors.primaryHover}33)`,
        border: `1px solid ${colors.primary}55`,
        boxShadow: activeToday
          ? `0 0 25px ${colors.primary}55`
          : `0 6px 16px ${colors.primary}22`,
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          opacity: 0.7,
          color: colors.text,
        }}
      >
        Current streak
      </div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: 800,
          color: colors.text,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        🔥 {streak}
      </div>

      <div
        style={{
          fontSize: "12px",
          opacity: 0.6,
          color: colors.text,
        }}
      >
        {activeToday ? "You're on track today" : "Do a habit to keep it alive"}
      </div>
    </div>
  );
};
