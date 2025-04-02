import { Redirect } from "expo-router";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import OnboardingScreen from "@/src/components/OnboardingScreen";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { useAuth } from "../src/hooks/useAuth";

export function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isLoading: isLoadingOnboarding, hasSeenOnboarding } = useOnboarding();

  if (isLoading || isLoadingOnboarding) {
    return <LoadingScreen />;
  }

  // 인증 상태 확인
  if (isAuthenticated) {
    return <Redirect href="/(app)/home" />;
  }

  // 인증되지 않은 사용자만 온보딩 상태 확인
  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  // 온보딩은 봤지만, 인증되지 않은 사용자
  return <Redirect href="/(auth)/login" />;
}

export default Index;
