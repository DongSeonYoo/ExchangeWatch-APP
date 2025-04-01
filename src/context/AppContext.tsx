import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { useOnboarding } from "@/src/hooks/useOnboarding";
import { getLocales } from "expo-localization";
import { colorScheme } from "nativewind";
import { changeLanguage } from "../helpers/i18n";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";
import * as Linking from "expo-linking";

interface AppContextType {
  language: string;
  setLanguage: (value: string) => void;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  colorScheme: "light" | "dark" | "system";
  setColorScheme: (value: "light" | "dark" | "system") => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

type ColorScheme = AppContextType["colorScheme"];

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setAppLanguage] = useState<string>(
    getLocales()[0].languageCode || "en"
  );
  const [userColorSchema, setUserColorSchema] = useState<ColorScheme>("system");
  const { hasSeenOnboarding } = useOnboarding();
  const url = Linking.useURL();

  // Init stored language
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLang = await StorageService.getItem(
          STORAGE_KEYS.LANGUAGE_KEY
        );
        if (storedLang) {
          setAppLanguage(storedLang);
          changeLanguage(storedLang);
        }
      } catch (error) {
        console.error("Error loading stored language: ", error);
      }
    };
    initLanguage();
  }, []);

  const setLanguage = (newLanguage: string) => {
    try {
      StorageService.setItem(STORAGE_KEYS.LANGUAGE_KEY, newLanguage);
      setAppLanguage(newLanguage);
      changeLanguage(newLanguage);
    } catch (error) {
      console.error("Error setting language: ", error);
    }
  };

  // Check user color scheme
  useEffect(() => {
    const initColorScheme = () => {
      try {
        const storedSchema = StorageService.getItem(
          STORAGE_KEYS.COLOR_SCHEME_KEY
        );
        if (storedSchema) {
          setUserColorSchema(storedSchema as ColorScheme);
          colorScheme.set(storedSchema as ColorScheme);
        }
      } catch (error) {
        console.error("Error loading stored color schema: ", error);
      }
    };
    initColorScheme();
  }, []);

  const value: AppContextType = {
    language,
    setLanguage,
    isLoading,
    hasSeenOnboarding,
    colorScheme: userColorSchema,
    setColorScheme: async (newScheme: ColorScheme) => {
      try {
        StorageService.setItem(STORAGE_KEYS.COLOR_SCHEME_KEY, newScheme);
        setUserColorSchema(newScheme);
      } catch (error) {
        console.error("Error setting color scheme: ", error);
      }
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
