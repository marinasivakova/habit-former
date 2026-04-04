import type { Habit } from "@/entities/habit/model/store";
import { getLastNDays, getToday } from "@/shared/utils/helpers";

export const hasAppStreakToday = (habits: Habit[]): boolean => {
  const today = getToday();

  return habits.some((habit) =>
    habit.entries.some((e) => e.date === today && e.done)
  );
};

export const getMoneyEarnedToday = (habits: Habit[]): number => {
  const today = getToday();

  return habits.reduce((total, habit) => {
    const todayEntries = habit.entries.filter(
      (e) => e.date === today && e.done
    );

    return total + todayEntries.reduce((sum, e) => sum + e.amountEarned, 0);
  }, 0);
};

export const getMoneyEarnedLastWeek = (habits: Habit[]): number => {
  const last7Days = new Set(getLastNDays(7));

  return habits.reduce((total, habit) => {
    const relevantEntries = habit.entries.filter(
      (e) => last7Days.has(e.date) && e.done
    );

    return total + relevantEntries.reduce((sum, e) => sum + e.amountEarned, 0);
  }, 0);
};

const getHabitLongestStreak = (habit: Habit): number => {
  const doneDates = habit.entries
    .filter((e) => e.done)
    .map((e) => e.date)
    .sort(); // ISO dates sort correctly

  if (doneDates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < doneDates.length; i++) {
    const prev = new Date(doneDates[i - 1]);
    const curr = new Date(doneDates[i]);

    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }

  return longest;
};

export const getLongestStreak = (habits: Habit[]) => {
  let bestHabit: Habit | null = null;
  let bestStreak = 0;

  for (const habit of habits) {
    const streak = getHabitLongestStreak(habit);

    if (streak > bestStreak) {
      bestStreak = streak;
      bestHabit = habit;
    }
  }

  return {
    streak: bestStreak,
    habitName: bestHabit?.title ?? null,
  };
};

const isDoneOnDate = (habit: Habit, date: string): boolean => {
  return habit.entries.some((e) => e.date === date && e.done);
};

const getHabitCurrentStreak = (habit: Habit): number => {
  let streak = 0;
  const today = new Date();

  while (true) {
    const dateStr = new Date(today).toISOString().split("T")[0];

    if (!isDoneOnDate(habit, dateStr)) break;

    streak++;

    // go one day back
    today.setDate(today.getDate() - 1);
  }

  return streak;
};

export const getCurrentLongestStreak = (habits: Habit[]) => {
  let bestHabit: Habit | null = null;
  let bestStreak = 0;

  for (const habit of habits) {
    const streak = getHabitCurrentStreak(habit);

    if (streak > bestStreak) {
      bestStreak = streak;
      bestHabit = habit;
    }
  }

  return {
    streak: bestStreak,
    habitName: bestHabit?.title ?? null,
  };
};
