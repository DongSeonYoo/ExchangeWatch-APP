import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StorageService } from "../services/StorageService";
import { User } from "../api/types/user/entity/UserEntity";
import STORAGE_KEYS from "../constant/storageKeys";
import { UserApi } from "../api/modules/UserApi";
import { useAuthContext } from "./AuthContext";

export type UserInfoType = Pick<User, "idx" | "email" | "name">;
export interface UserContextType {
  user: UserInfoType | null;
  setUser: (user: UserInfoType | null) => void;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
  saveUserInfo: (userInfo: UserInfoType) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * 사용자 인증 관련 상태만을 관련
 *
 * 사용자 정보
 * 인증 토큰
 * 로그인/로그아웃 등
 */
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, accessToken } = useAuthContext();
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UserContext는 단순히 유저 정보만을 로드해서 유저 상태 스토리지에 저장 & userState업데이트
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchUserProfile();
    }
    const loadUserInfo = () => {
      try {
        const userJsonData = StorageService.getItem(STORAGE_KEYS.USER_INFO_KEY);
        if (userJsonData) {
          const userData = JSON.parse(userJsonData) as UserInfoType;
          setUserInfo(userData);
        } else {
          // @TODO 토큰은 있지만 사용자 정보가 없는 경우 API에서 가져오기 해야할듯, 이럴경우가 언제생기는지 파악점
        }
      } catch (error) {
        console.error("USerinfo load error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [isAuthenticated, accessToken]);

  // 사용자 정보 설정 (스토리지에 따로 저장)
  const setUserInfo = (userInfo: UserInfoType | null) => {
    setUser(userInfo);

    if (userInfo) {
      StorageService.setItem(
        STORAGE_KEYS.USER_INFO_KEY,
        JSON.stringify(userInfo)
      );
    } else {
      StorageService.removeItem(STORAGE_KEYS.USER_INFO_KEY);
    }
  };

  const fetchUserProfile = async () => {
    // 로그인되지 않았을 경우 바로 탈출
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("accessToken: ", accessToken);
    if (!isAuthenticated || !accessToken) return;

    setIsLoading(true);
    try {
      const data = await UserApi.getUserInformation();
      setUserInfo(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user information: ", error);
      setError("Failed to load user information");
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserInfo = async (userInfo: UserInfoType) => {
    setUserInfo(userInfo);
  };

  // 로그아웃 시 사용자 초기화
  useEffect(() => {
    if (!isAuthenticated) {
      setUserInfo(null);
    }
  }, [isAuthenticated]);

  const value: UserContextType = {
    user,
    isLoading,
    error,
    fetchUserProfile,
    saveUserInfo,
    setUser: setUserInfo,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
