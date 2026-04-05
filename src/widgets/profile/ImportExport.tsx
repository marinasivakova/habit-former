import { useRef, useState } from "react";
import { Button } from "@/shared/ui/components/Button";
import { Modal } from "@/shared/ui/components/Modal";
import { useHabitsStore } from "@/entities/habit/model/store";
import { mergeHabits } from "@/entities/habit/utils/importExportUtils";
import { exportData } from "@/features/habit/exportData";

export const ImportExport = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"merge" | "replace">("merge");
  const [file, setFile] = useState<File | null>(null);

  const setHabits = useHabitsStore((s) => s.setHabits);
  const habits = useHabitsStore((s) => s.habits);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
    setOpen(true);
  };

  const handleImport = async () => {
    if (!file) return;

    const text = await file.text();
    const parsed = JSON.parse(text);

    const incoming = parsed.habits ?? [];
    console.log(incoming);

    if (mode === "replace") {
      setHabits(incoming);
    } else {
      const merged = mergeHabits(habits, incoming);
      setHabits(merged);
    }

    setOpen(false);
    setFile(null);
  };

  return (
    <>
      <input
        type="file"
        accept="application/json"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFile}
      />

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <Button onClick={() => fileRef.current?.click()}>Import Data</Button>

        <Button onClick={() => exportData()}>Export Data</Button>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Import Data"
        actions={<Button onClick={handleImport}>Import</Button>}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label>
            <input
              type="radio"
              checked={mode === "merge"}
              onChange={() => setMode("merge")}
            />
            Merge (recommended)
          </label>

          <label>
            <input
              type="radio"
              checked={mode === "replace"}
              onChange={() => setMode("replace")}
            />
            Replace all data
          </label>
        </div>
      </Modal>
    </>
  );
};
