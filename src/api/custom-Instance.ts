import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import qs from "qs";
import { InjectTokenToRequest } from "./interceptors/injectTokenToRequest";
import { ISuccessResponse } from "./types/response";
import { AuthAPI } from "./modules/AuthApi";
import { router } from "expo-router";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";

export const API_URL = Platform.select({
  ios: "http://127.0.0.1:3000/api",
  android: "http://10.0.2.2:3000/api",
}) as string;

const AXIOS_INSTANCE = Axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});

// Request interceptors
AXIOS_INSTANCE.interceptors.request.use(InjectTokenToRequest, (error) => {
  console.log("Error while sending request", JSON.stringify(error, null, 2));
  return Promise.reject(error);
});

// Response interceptors
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      const refreshToken = StorageService.getItem(
        STORAGE_KEYS.REFRESH_TOKEN_KEY
      );
      console.log(refreshToken);

      try {
        const { accessToken } = await AuthAPI.refreshAccessToken(refreshToken!);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        StorageService.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, accessToken);

        return AXIOS_INSTANCE(originalRequest);
      } catch (err) {
        console.error("리프레시 실패", err);
        StorageService.clear();
        router.replace("/(auth)/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// 타입을 실제 구현에 맞게 수정 (ISuccessResponse<T> -> T)
const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE<ISuccessResponse<T>>({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then((res) => res.data.data);

  // @ts-expect-error: cancel 메서드 추가
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export const api = {
  get: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
    customInstance<T>({ url, method: "GET", params }, options),

  post: <T>(url: string, data?: any, options?: AxiosRequestConfig) =>
    customInstance<T>({ url, method: "POST", data }, options),

  put: <T>(url: string, data?: any, options?: AxiosRequestConfig) =>
    customInstance<T>({ url, method: "PUT", data }, options),

  delete: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
    customInstance<T>({ url, method: "DELETE", params }, options),
};
