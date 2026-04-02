export function calculateStreak(entries: { date: string; done: boolean }[]) {
  const sorted = [...entries]
    .filter((e) => e.done)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  let streak = 0;
  let currentDate = new Date();

  for (const entry of sorted) {
    const entryDate = new Date(entry.date);
    const diff =
      (currentDate.setHours(0, 0, 0, 0) - entryDate.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24);

    if (diff === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
