export const StorageUtil = {
  getItem: (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  },
  setItem: (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },
  deleteItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const STORAGE_KEYS = {
  CHAT: "stored-chat",
};
