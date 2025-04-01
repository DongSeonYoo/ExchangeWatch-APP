import { MMKV } from "react-native-mmkv";
import STORAGE_KEYS from "../constant/storageKeys";

const storage = new MMKV();

export const TokenService = {
  saveAccessToken: (token: string): void => {
    try {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving access token:", error);
      throw error;
    }
  },

  getAccessToken: (): string | null => {
    try {
      return storage.getString(STORAGE_KEYS.ACCESS_TOKEN_KEY) || null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  },

  saveRefreshToken: (token: string): void => {
    try {
      storage.set(STORAGE_KEYS.REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving refresh token:", error);
      throw error;
    }
  },

  getRefreshToken: (): string | null => {
    try {
      return storage.getString(STORAGE_KEYS.REFRESH_TOKEN_KEY) || null;
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  },

  clearTokens: (): void => {
    try {
      storage.delete(STORAGE_KEYS.ACCESS_TOKEN_KEY);
      storage.delete(STORAGE_KEYS.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error clearing tokens:", error);
      throw error;
    }
  },
};
