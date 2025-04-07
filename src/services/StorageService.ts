import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const StorageService = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ? value : null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => {
    storage.clearAll();
  },
};
