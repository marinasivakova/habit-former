import { useState } from "react";
import { InputField } from "@/shared/ui/components/InputField";
import { Modal } from "@/shared/ui/components/Modal";
import { Button } from "@/shared/ui/components/Button";
import { useHabitsStore } from "@/entities/habit/model/store";
import { habitTypeMap } from "@/entities/habit/utils/habitUtils";
import { SelectField } from "@/shared/ui/components/SelectField";

export const CreateHabitModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [pay, setPay] = useState(habitTypeMap["1"].defaultPay);

  const addHabit = useHabitsStore((state) => state.addHabit);

  const handleSubmit = () => {
    if (title.trim() === "" || isNaN(difficulty) || isNaN(pay)) return; // optional: prevent empty names
    addHabit(title.trim(), difficulty, pay);
    setTitle(""); // clear input
    setOpen(false); // close modal
  };

  const options = Object.keys(habitTypeMap).map((key) => ({
    value: key,
    label: habitTypeMap[key].difficulty,
  }));

  const onChangeDifficulty = (difficulty: string) => {
    setDifficulty(Number(difficulty));
    setPay(habitTypeMap[difficulty].defaultPay);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>New habit</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create New Habit"
      >
        <InputField
          label="Habit name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <SelectField
          label="Difficulty"
          options={options}
          value={difficulty.toString()}
          onChange={(difficulty) => onChangeDifficulty(difficulty)}
        />
        <InputField
          label="Pay"
          type="number"
          value={pay}
          onChange={(e) => {
            const val = e.target.value;
            if (!isNaN(Number(val))) setPay(Number(val));
          }}
          onBlur={(e) => {
            const val = Number(e.target.value);
            const min = habitTypeMap[difficulty].minPay;
            const max = habitTypeMap[difficulty].maxPay;

            if (!isNaN(val)) {
              const clamped = Math.min(Math.max(val, min), max);
              setPay(clamped);
            }
          }}
          max={habitTypeMap[difficulty].maxPay}
          min={habitTypeMap[difficulty].minPay}
        />
        <Button onClick={handleSubmit}>Add Habit</Button>
      </Modal>
    </div>
  );
};
