interface HabitType {
  difficulty: string;
  minPay: number;
  maxPay: number;
  defaultPay: number;
}

export const habitTypeMap: Record<string, HabitType> = {
  "0": {
    difficulty: "Easy",
    minPay: 10,
    maxPay: 50,
    defaultPay: 25,
  },
  "1": {
    difficulty: "Medium",
    minPay: 50,
    maxPay: 100,
    defaultPay: 75,
  },
  "2": {
    difficulty: "Hard",
    minPay: 100,
    maxPay: 200,
    defaultPay: 150,
  },
};
