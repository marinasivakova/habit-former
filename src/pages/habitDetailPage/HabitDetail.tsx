import { useParams } from "react-router-dom";
import { useHabitsStore } from "@/entities/habit/model/store";
import { useTheme } from "@/shared/ui/theme";
import { Button } from "@/shared/ui/components/Button";
import { calculateStreak } from "./utls/streakCounter";
import { MenuDropdown } from "@/widgets/habitDetail/MenuDropdown";

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

        {/* Title */}
        <h2 style={{ marginTop: 0, color: colors.text }}>{habit.title}</h2>

        {/* Pay */}
        <p style={{ color: colors.mutedText }}>💰 Pay: {habit.pay}</p>

        {/* Streak */}
        <p style={{ color: colors.text }}>
          🔥 Streak: <b>{streak}</b> days
        </p>

        {/* Done today */}
        <div style={{ marginTop: "24px" }}>
          <p style={{ color: colors.text, marginBottom: "8px" }}>Today</p>

          <Button
            variant={done ? "secondary" : "primary"}
            onClick={() => toggleHabitDone(habit.id, today)}
          >
            {done ? "Marked as done ✅" : "Mark as done"}
          </Button>
        </div>
      </div>
    </div>
  );
}
