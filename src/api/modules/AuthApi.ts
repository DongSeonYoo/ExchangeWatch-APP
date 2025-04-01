import { api, API_URL } from "../custom-Instance";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export const AuthAPI = {
  googleLoginWithRedirect: async () => {
    try {
      const loginUrl = `${API_URL}/auth/google/callback`;

      const result = await WebBrowser.openAuthSessionAsync(loginUrl, "asdf");

      if (result.type === "success") {
        const url = result.url;
        const parsed = Linking.parse(url);
        const { accessToken, refreshToken, userIdx, email, name } =
          parsed.queryParams as Record<string, string>;

        return {
          accessToken,
          refreshToken,
          userIdx,
          email,
          name,
        };
      }
    } catch (error) {
      console.error("error on google login", error);
    }
  },

  refreshAccessToken: async () => {
    return await api.get<{ refreshToken: string }>("/auth/refresh");
  },

  // ...api 요청 후 응답 반환
};
