const getToday = () => new Date().toISOString().split("T")[0];

const getLastNDays = (n: number) => {
  const days: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  return days;
};

export { getToday, getLastNDays };
