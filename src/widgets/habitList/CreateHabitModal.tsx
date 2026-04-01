import { useState } from "react";
import { InputField } from "@/shared/ui/components/InputField";
import { Modal } from "@/shared/ui/components/Modal";
import { Button } from "@/shared/ui/components/Button";
import { useHabitsStore } from "@/entities/habit/model/store";

export const CreateHabitModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    const addHabit = useHabitsStore((state) => state.addHabit);

    const handleSubmit = () => {
        if (title.trim() === "") return; // optional: prevent empty names
        addHabit(title.trim());
        setTitle(""); // clear input
        setOpen(false); // close modal
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
                <Button onClick={handleSubmit}>Add Habit</Button>
            </Modal>
        </div>
    );
};
