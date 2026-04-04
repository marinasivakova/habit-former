// src/pages/HomePage.tsx
import { useHabitsStore } from "@/entities/habit/model/store";
import { useTheme } from "@/shared/ui/theme";
import { ProgressPie } from "@/widgets/overview/ProgressPie";

import {
  getMoneyEarnedToday,
  getMoneyEarnedLastWeek,
  getLongestStreak,
  getCurrentLongestStreak,
} from "./utils/helpers";
import { StatCard } from "@/widgets/overview/StatCard";

export default function OverviewPage() {
  const { colors } = useTheme();
  const habits = useHabitsStore((s) => s.habits);

  const today = new Date().toISOString().split("T")[0];

  const doneCount = habits.filter(
    (h) => h.entries.find((e) => e.date === today)?.done
  ).length;

  const total = habits.length;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;

  // --- new stats ---
  const moneyToday = getMoneyEarnedToday(habits);
  const moneyWeek = getMoneyEarnedLastWeek(habits);
  const { streak: bestStreak, habitName: bestHabit } = getLongestStreak(habits);
  const { streak: currentStreak, habitName: currentHabit } =
    getCurrentLongestStreak(habits);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "32px 16px 100px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h2 style={{ color: colors.text }}>Today</h2>
        <p style={{ color: colors.text, opacity: 0.6 }}>
          {new Date().toDateString()}
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.surface}, ${colors.primary}11)`,
          borderRadius: "28px",
          padding: "32px 20px",
          border: `1px solid ${colors.border}`,
          boxShadow: `0 12px 40px ${colors.primary}22`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
        }}
      >
        <ProgressPie value={progress} label="completed" />

        <div style={{ color: colors.text }}>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            {doneCount} / {total}
          </div>
          <div style={{ opacity: 0.6 }}>habits completed today</div>
        </div>

        {/* money highlight */}
        <div
          style={{
            marginTop: "8px",
            padding: "10px 16px",
            borderRadius: "12px",
            background: `${colors.primary}22`,
            color: colors.text,
            fontWeight: 600,
          }}
        >
          💰 +{moneyToday}
        </div>
      </div>

      {/* SECONDARY STATS */}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        <StatCard
          title="This week"
          value={`+${moneyWeek}`}
          subtitle="earned"
          colors={colors}
        />

        <StatCard
          title="Current streak"
          value={currentStreak}
          subtitle={currentHabit ?? "—"}
          colors={colors}
        />

        <StatCard
          title="Best streak"
          value={bestStreak}
          subtitle={bestHabit ?? "—"}
          colors={colors}
        />

        <StatCard
          title="Completion"
          value={`${progress}%`}
          subtitle="today"
          colors={colors}
        />
      </div>
    </div>
  );
}
