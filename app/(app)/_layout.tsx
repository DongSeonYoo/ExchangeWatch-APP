import { Stack, Redirect } from "expo-router";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import i18n from "../../src/utils/i18n";
import { useAuth } from "../../src/hooks/useAuth";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="ml-2">
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: isDark ? "#0F172A" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="home"
        options={{ headerShown: false, title: i18n.t("homeScreen.title") }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: i18n.t("profileScreen.title"),
        }}
      />
    </Stack>
  );
}
