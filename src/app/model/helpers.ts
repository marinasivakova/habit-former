export const makeUserStorageKey = (userId: string, baseKey: string) =>
    `${baseKey}-${userId}`;
