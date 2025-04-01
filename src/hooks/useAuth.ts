import { useState } from "react";
import { UserContextType, useUserContext } from "../context/UserContext";
import { AuthAPI } from "../api/modules/AuthApi";
import { useAppContext } from "../context/AppContext";

interface UseAuthType
  extends Pick<
    UserContextType,
    "accessToken" | "refreshToken" | "isAuthenticated" | "login" | "logout"
  > {
  isLoading: boolean;
  error: string | null;
  googleLoginWithRedirect: () => Promise<boolean>;
}

export const useAuth = (): UseAuthType => {
  const {
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading: contextLoading,
    login,
    logout,
  } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleLoginWithRedirect = async () => {
    try {
      setIsLoading(true);
      const result = await AuthAPI.googleLoginWithRedirect();
      if (result) {
        login(result.accessToken, result.refreshToken, {
          email: result.email,
          idx: Number(result.userIdx),
          name: result.name,
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
    googleLoginWithRedirect,
  };
};
