import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
StorageService;
import STORAGE_KEYS from "../constant/storageKeys";
import { StorageService } from "../services/StorageService";
import { User } from "../api/types/user/UserEntity";

export type UserInfoType = Pick<User, "idx" | "email" | "name">;
export type UserContextType = {
  user: UserInfoType | null;
  setUser: (user: UserInfoType | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    accessToken: string,
    refreshToken: string,
    user: UserInfoType
  ) => void;
  logout: () => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserInfoType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserAndTokens = () => {
      try {
        const userJsonData = StorageService.getItem(STORAGE_KEYS.USER_INFO_KEY);
        const accessToken = StorageService.getItem(
          STORAGE_KEYS.ACCESS_TOKEN_KEY
        );
        const refreshToken = StorageService.getItem(
          STORAGE_KEYS.REFRESH_TOKEN_KEY
        );

        if (userJsonData) {
          const userData = JSON.parse(userJsonData) as UserInfoType;
          setUserState(userData);
        }

        if (accessToken) setAccessToken(accessToken);
        if (refreshToken) setRefreshToken(refreshToken);
      } catch (error) {
        console.error("UserInfo load error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndTokens();
  }, []);

  const setUser = (userInfo: UserInfoType | null) => {
    setUserState(userInfo);
    if (userInfo) {
      StorageService.setItem(
        STORAGE_KEYS.USER_INFO_KEY,
        JSON.stringify(userInfo)
      );
    } else {
      StorageService.removeItem(STORAGE_KEYS.USER_INFO_KEY);
    }
  };

  const login = (token: string, refresh: string, userInfo: UserInfoType) => {
    setAccessToken(token);
    setRefreshToken(refresh);
    setUser(userInfo);
    StorageService.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, token);
    StorageService.setItem(STORAGE_KEYS.REFRESH_TOKEN_KEY, refresh);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    StorageService.removeItem(STORAGE_KEYS.USER_INFO_KEY);
    StorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
    StorageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN_KEY);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated: !!accessToken,
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
