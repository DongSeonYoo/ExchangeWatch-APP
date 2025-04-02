import { useState, useEffect } from "react";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await StorageService.getItem(STORAGE_KEYS.ONBOARDING_KEY);
      setHasSeenOnboarding(!!status);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    hasSeenOnboarding,
  };
};
