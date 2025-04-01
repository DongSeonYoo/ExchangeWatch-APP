import { Redirect } from "expo-router";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import OnboardingScreen from "@/src/components/OnboardingScreen";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { useUserContext } from "../src/context/UserContext";

export function Index() {
  const { isAuthenticated, isLoading } = useUserContext();
  const { isLoading: isLoadingOnboarding, hasSeenOnboarding } = useOnboarding();

  if (isLoading || isLoadingOnboarding) {
    return <LoadingScreen />;
  }

  // Show onboarding if user hasn't seen it yet
  // console.log("hasSeenOnboarding: ", hasSeenOnboarding);
  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  // Normal authentication flow
  if (isAuthenticated) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}

export default Index;
