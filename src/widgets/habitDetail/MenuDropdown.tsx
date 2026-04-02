// src/shared/ui/components/MenuDropdown.tsx
import { useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "@/shared/ui/theme";
import { Modal } from "@/shared/ui/components/Modal";
import { Button } from "@/shared/ui/components/Button";
import { InputField } from "@/shared/ui/components/InputField";
import { SelectField } from "@/shared/ui/components/SelectField";
import { useHabitsStore } from "@/entities/habit/model/store";
import { habitTypeMap } from "@/entities/habit/utils/habitUtils";
import { useOnClickOutside } from "@/shared/hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

interface Props {
  habitId: string;
}

export const MenuDropdown = ({ habitId }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const habit = useHabitsStore((s) => s.habits.find((h) => h.id === habitId));

  const editHabit = useHabitsStore((s) => s.editHabit);
  const deleteHabit = useHabitsStore((s) => s.removeHabit);

  // --- edit state ---
  const [title, setTitle] = useState(habit?.title ?? "");
  const [difficulty, setDifficulty] = useState(habit?.difficulty ?? 1);
  const [pay, setPay] = useState(habit?.pay ?? 0);

  // load in data from habit
  useEffect(() => {
    if (habit && editOpen) {
      setTitle(habit.title);
      setDifficulty(habit.difficulty);
      setPay(habit.pay);
    }
  }, [habit, editOpen]);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, handleClickOutside);

  const navigate = useNavigate();

  if (!habit) return null;

  const options = Object.keys(habitTypeMap).map((key) => ({
    value: key,
    label: habitTypeMap[key].difficulty,
  }));

  const handleEdit = () => {
    if (title.trim() === "" || isNaN(difficulty) || isNaN(pay)) return;
    editHabit(habitId, {
      title,
      difficulty,
      pay,
    });
    setEditOpen(false);
  };

  const handleDelete = () => {
    deleteHabit(habitId);
    setDeleteOpen(false);
    navigate("/");
  };

  return (
    <div style={{ position: "absolute", top: 0, right: 0 }} ref={dropdownRef}>
      {/* Trigger */}
      <span
        onClick={() => setOpen((p) => !p)}
        style={{
          padding: "16px",
          fontSize: "1.5rem",
          color: colors.text,
          cursor: "pointer",
          writingMode: "vertical-lr",
        }}
      >
        ⋯
      </span>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "8px",
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
            boxShadow: `0 4px 12px ${colors.primary}33`,
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <div
            style={itemStyle(colors)}
            onClick={() => {
              setEditOpen(true);
              setOpen(false);
            }}
          >
            Edit
          </div>
          <div
            style={itemStyle(colors, true)}
            onClick={() => {
              setDeleteOpen(true);
              setOpen(false);
            }}
          >
            Delete
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Habit"
        actions={<Button onClick={handleEdit}>Save</Button>}
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
          onChange={(val) => {
            setDifficulty(Number(val));
            setPay(habitTypeMap[val].defaultPay);
          }}
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
      </Modal>

      {/* --- DELETE MODAL --- */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Habit"
        actions={
          <Button onClick={handleDelete} danger>
            Delete
          </Button>
        }
      >
        <p style={{ color: colors.text }}>
          Are you sure you want to delete this habit?
        </p>
      </Modal>
    </div>
  );
};

// small helper
const itemStyle = (colors: any, danger = false) => ({
  padding: "12px 16px",
  cursor: "pointer",
  color: danger ? "#ff6b6b" : colors.text,
  transition: "background 0.2s",
});
