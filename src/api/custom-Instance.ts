import Axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import qs from "qs";
import { InjectTokenToRequest } from "./interceptors/injectTokenToRequest";
import { ISuccessResponse } from "./types/response";

export const API_URL = Platform.select({
  ios: "http://127.0.0.1:3000/api",
  android: "http://10.0.2.2:3000/api",
}) as string;

export interface IApiResponse {
  statusCode: number;
  message: string;
  timestamp: Date;
  requestURL: string;
}

export type ApiError = {
  error: string;
  message: string;
  statusCode: number;
  errors: never;
};

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
AXIOS_INSTANCE.interceptors.response.use(async (response) => {
  return response.data;
});

const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<ISuccessResponse<T>> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error: ??
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
