import { useState } from "react";
import { AuthAPI } from "../api/modules/AuthApi";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";

interface UseAuthType {
  isLoading: boolean;
  error: string | null;
  googleLoginWithRedirect: () => Promise<boolean>;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  resetError: () => void;
}

export const useAuth = (): UseAuthType => {
  const authContext = useAuthContext();
  const { saveUserInfo } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleLoginWithRedirect = async () => {
    try {
      setIsLoading(true);
      const result = await AuthAPI.googleLoginWithRedirect();
      if (result) {
        authContext.login(result.accessToken, result.refreshToken);
        saveUserInfo({
          idx: Number(result.userIdx),
          email: result.email,
          name: result.name,
        });
        // 로그인 성공 후, 온보딩 완료 처리
        StorageService.setItem(STORAGE_KEYS.ONBOARDING_KEY, "true");

        return true;
      } else {
        // @TODO 서버에서 정상적으로 응답이 반환되었지만 로그인정보가 내려오지 않았을 시, (이게 catch부분보다 훨씬 심각함, 처리 잘해줘야됌)
      }
      return false;
    } catch (error) {
      console.error(error);
      setError(`${error}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...authContext,
    isLoading,
    error,
    googleLoginWithRedirect,
  };
};
