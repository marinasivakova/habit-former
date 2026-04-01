import type { PersistStorage } from "zustand/middleware";

const localStorageStore: PersistStorage<Record<string, unknown>> = {
    getItem: (name) => {
        const value = localStorage.getItem(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
        localStorage.removeItem(name);
    },
};

export default localStorageStore;
