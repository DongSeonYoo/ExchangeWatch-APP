import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  resetError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //   앱 시작 시 토큰 정보 불러오기
  useEffect(() => {
    const loadTokens = () => {
      try {
        const storedAccessToken = StorageService.getItem(
          STORAGE_KEYS.ACCESS_TOKEN_KEY
        );
        const storedRefreshToken = StorageService.getItem(
          STORAGE_KEYS.REFRESH_TOKEN_KEY
        );

        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
          setIsAuthenticated(true);
        }
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      } catch (error) {
        console.error("Error loading auth tokens: ", error);
        setError("Faild to load user's auth data");
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, []);

  const login = (token: string, refresh: string) => {
    try {
      // 유저 토큰 상태 업데이트
      setAccessToken(token);
      setRefreshToken(refresh);

      // 유저 토큰을 스토리지에 업데이트
      StorageService.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, token);
      StorageService.setItem(STORAGE_KEYS.REFRESH_TOKEN_KEY, refresh);

      setIsAuthenticated(true);

      setError(null);
    } catch (error) {
      console.error("Error saving auth tokens: ", error);
      setError("Failed to processing authenticated");
    }
  };

  const logout = () => {
    try {
      // 유저 토큰 상태 업데이트
      setAccessToken(null);
      setRefreshToken(null);

      // 유저 토큰을 스토리지에 업데이트
      StorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
      StorageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN_KEY);

      // isAuth값 수정
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
      setError("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        accessToken,
        refreshToken,
        error,
        login,
        logout,
        resetError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a UserProvider");
  }

  return context;
};
