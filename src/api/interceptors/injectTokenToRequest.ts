import { InternalAxiosRequestConfig } from "axios";
import { TokenService } from "../../services/TokenService";

export const InjectTokenToRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  try {
    const accessToken = TokenService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  } catch (error) {
    console.log("Error injecting accessToken: ", error);

    return config;
  }
};
