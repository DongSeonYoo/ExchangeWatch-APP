import { InternalAxiosRequestConfig } from "axios";
import { StorageService } from "../../services/StorageService";
import STORAGE_KEYS from "../../constant/storageKeys";

export const InjectTokenToRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  try {
    const accessToken = StorageService.getItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  } catch (error) {
    console.log("Error injecting accessToken: ", error);

    return config;
  }
};
