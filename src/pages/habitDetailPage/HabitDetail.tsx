import { useParams } from "react-router-dom";
import { useHabitsStore } from "@/entities/habit/model/store";
import { useTheme } from "@/shared/ui/theme";

import {
  calculateAmountEarnedFromDateToDate,
  calculateAmountEarnedUntilDate,
  calculateStreak,
} from "./utls/streakCounter";
import { MenuDropdown } from "@/widgets/habitDetail/MenuDropdown";
import { habitTypeMap } from "@/entities/habit/utils/habitUtils";

export default function HabitDetailPage() {
  const { id } = useParams();
  const { colors } = useTheme();

  const habit = useHabitsStore((s) => s.habits.find((h) => h.id === id));
  const toggleHabitDone = useHabitsStore((s) => s.toggleHabitDone);

  const today = new Date().toISOString().split("T")[0];

  if (!habit) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: colors.surface,
            borderRadius: "20px",
            padding: "24px",
            boxShadow: `0 8px 24px ${colors.primary}33`,
            position: "relative",
            textAlign: "center",
            color: colors.mutedText,
            fontSize: "1.2rem",
            fontWeight: "bold",
            lineHeight: "1.5",

            verticalAlign: "middle",
          }}
        >
          <h2 style={{ margin: 0, color: colors.text }}>Habit not found</h2>
        </div>
      </div>
    );
  }

  const entry = habit.entries.find((e) => e.date === today);
  const done = entry?.done ?? false;

  const streak = calculateStreak(habit.entries);

  const earned = calculateAmountEarnedUntilDate(habit.entries, today);

  const earnedThisWeek = calculateAmountEarnedFromDateToDate(
    habit.entries,
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
    today
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: colors.surface,
          borderRadius: "20px",
          padding: "24px",
          boxShadow: `0 8px 24px ${colors.primary}33`,
          position: "relative",
        }}
      >
        {/* Top right menu button */}
        <MenuDropdown habitId={habit.id} />

        {/* Done today */}
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Title */}
          <h2 style={{ marginTop: 0, color: colors.text }}>{habit.title}</h2>
          {/* Custom checkbox */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleHabitDone(habit.id);
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

        {/* Difficulty */}
        <p style={{ color: colors.mutedText }}>
          🎯 Difficulty: {habitTypeMap?.[habit?.difficulty]?.difficulty}
        </p>

        {/* Pay */}
        <p style={{ color: colors.mutedText }}>💰 Pay: {habit.pay}</p>

        {/* Earned this week */}
        <p style={{ color: colors.text }}>
          💸 This week: <b>{earnedThisWeek}</b>
        </p>

        {/* Earned overall */}
        <p style={{ color: colors.text }}>
          💰 Overall: <b>{earned}</b>
        </p>

        {/* Streak */}
        <p style={{ color: colors.text }}>
          🔥 Streak: <b>{streak}</b> days
        </p>
      </div>
    </div>
  );
}
