// src/entities/habit/ui/HabitList.tsx
import { useHabitsStore } from "@/entities/habit/model/store";
import { CreateHabitModal } from "./CreateHabitModal";
import { HabitItem } from "./HabitItem";
import { useTheme } from "@/shared/ui/theme";
import dayjs from "dayjs";

export const HabitList = () => {
  const habits = useHabitsStore((state) => state.habits);
  const toggleHabitDone = useHabitsStore((state) => state.toggleHabitDone);
  const { colors } = useTheme();

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card">
      <h2 style={{ color: colors.text, marginBottom: "24px" }}>Habit List</h2>
      <h3 style={{ color: colors.mutedText }}>
        {dayjs(today).format("MMMM D, YYYY")}
      </h3>
      <CreateHabitModal />

      {habits.length === 0 && (
        <p style={{ color: colors.mutedText, marginTop: "16px" }}>
          No habits yet.
        </p>
      )}

      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          marginTop: "24px",
        }}
      >
        {habits.map((habit) => {
          const entry = habit.entries.find((e) => e.date === today);
          const done = entry?.done ?? false;

          return (
            <HabitItem
              key={habit.id}
              title={habit.title}
              done={done}
              onToggle={() => toggleHabitDone(habit.id, today)}
              id={habit.id}
            />
          );
        })}
      </div>
    </div>
  );
};
