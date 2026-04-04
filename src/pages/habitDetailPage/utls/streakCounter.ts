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

export function calculateAmountEarned(
  entries: { date: string; done: boolean; amountEarned: number }[]
) {
  return entries.reduce((total, entry) => total + entry.amountEarned, 0);
}

export function calculateAmountEarnedUntilDate(
  entries: { date: string; done: boolean; amountEarned: number }[],
  targetDate: string
) {
  return entries.reduce((total, entry) => {
    if (entry.date <= targetDate) {
      return total + entry.amountEarned;
    }
    return total;
  }, 0);
}

export function calculateAmountEarnedFromDateToDate(
  entries: { date: string; done: boolean; amountEarned: number }[],
  startDate: string,
  endDate: string
) {
  return entries.reduce((total, entry) => {
    if (entry.date >= startDate && entry.date <= endDate) {
      return total + entry.amountEarned;
    }
    return total;
  }, 0);
}
