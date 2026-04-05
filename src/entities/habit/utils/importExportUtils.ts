// src/entities/habit/utils/importExport.ts
import type { Habit } from "../model/store";

const normalize = (s: string) => s.trim().toLowerCase();

export const mergeHabits = (existing: Habit[], incoming: Habit[]): Habit[] => {
  const result = [...existing];

  for (const incomingHabit of incoming) {
    // 1. try match by id
    let match = result.find((h) => h.id === incomingHabit.id);

    // 2. fallback match by name
    if (!match) {
      match = result.find(
        (h) => normalize(h.title) === normalize(incomingHabit.title)
      );
    }

    if (!match) {
      // completely new habit
      result.push(incomingHabit);
      continue;
    }

    // --- MERGE ENTRIES ---
    const entryMap = new Map(match.entries.map((e) => [e.date, e]));

    for (const entry of incomingHabit.entries) {
      const existingEntry = entryMap.get(entry.date);

      if (!existingEntry) {
        entryMap.set(entry.date, entry);
      } else {
        // prefer "done = true"
        entryMap.set(entry.date, {
          ...existingEntry,
          ...entry,
          done: existingEntry.done || entry.done,
          amountEarned:
            existingEntry.done || entry.done
              ? Math.max(existingEntry.amountEarned, entry.amountEarned)
              : 0,
        });
      }
    }

    match.entries = Array.from(entryMap.values());

    // optional: sync meta fields (your call)
    match.title = incomingHabit.title;
    match.difficulty = incomingHabit.difficulty;
    match.pay = incomingHabit.pay;
  }

  return result;
};
