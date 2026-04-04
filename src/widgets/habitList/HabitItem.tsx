// src/entities/habit/ui/HabitItem.tsx
import { type FC } from "react";
import { useTheme } from "@/shared/ui/theme";
import { useNavigate } from "react-router-dom";
import { calculateStreak } from "@/pages/habitDetailPage/utls/streakCounter";
import { useHabitsStore } from "@/entities/habit/model/store";

interface HabitItemProps {
  title: string;
  done: boolean;
  onToggle: () => void;
  id: string;
}

export const HabitItem: FC<HabitItemProps> = ({
  title,
  done,
  onToggle,
  id,
}) => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const habit = useHabitsStore((s) => s.habits.find((h) => h.id === id));

  const streak = calculateStreak(habit?.entries || []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "transform 0.1s ease, box-shadow 0.2s ease",
        padding: "16px",
        background: `linear-gradient(135deg, ${colors.surface}, ${colors.primary}08)`,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 6px 16px ${colors.primary}11`,
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
      onClick={() => navigate(`/habit/${id}`)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: done ? colors.mutedText : colors.text,
            fontWeight: "bold",

            textDecoration: done ? "line-through" : "none",
          }}
        >
          {title}
        </span>

        {/* Streak counter */}
        <span
          style={{
            color: done ? colors.text : colors.mutedText,
            fontSize: "0.8rem",
          }}
        >
          🔥{streak}
        </span>
      </div>

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
