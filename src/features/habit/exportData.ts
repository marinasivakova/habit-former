// src/features/habits/exportData.ts

import { useHabitsStore } from "@/entities/habit/model/store";

export const exportData = () => {
  const habits = useHabitsStore.getState().habits;

  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    habits,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "habit-former-data.json";
  a.click();

  URL.revokeObjectURL(url);
};
