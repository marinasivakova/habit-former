import { useAuthStore } from "@/entities/auth/model/store";

export const migrateUsers = () => {
  const keys = Object.keys(localStorage);

  const userIds = keys
    .filter((k) => k.startsWith("habit-former-user-"))
    .map((k) => k.replace("habit-former-user-", ""));

  useAuthStore.setState({ users: userIds });
};
