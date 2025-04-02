import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import i18n from "../../src/utils/i18n";
import { useAuth } from "../../src/hooks/useAuth";

export default function Login() {
  const isDark = colorScheme.get() === "dark";
  const { googleLoginWithRedirect, isAuthenticated } = useAuth();
  const router = useRouter();

  // 구글 로그인 버튼 클릭 시 서버의 딥링크 리다이렉트 API 호출 TODO
  const handleGoogleLogin = async () => {
    const success = await googleLoginWithRedirect();
    if (success) {
      console.log("isAuth: ", isAuthenticated);
      return router.replace("/(app)/home");
    }
  };

  // 애플 로그인 (필요 시 구현)
  const handleAppleLogin = async () => {
    // 구현 필요: 예) AuthAPI.handleAppleLoginRedirect();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          {i18n.t("loginScreen.title")}
        </Text>
        <TouchableOpacity
          className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border border-gray-200 dark:border-white"
          onPress={() => handleGoogleLogin()}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color={isDark ? "#fff" : "#000"}
          />
          <Text className="text-black text-base ml-2 dark:text-white">
            {i18n.t("loginScreen.googleLoginButton")}
          </Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity
            className="w-full py-3 px-6 rounded-full items-center justify-center my-2 flex-row border border-gray-200 dark:border-white"
            onPress={handleAppleLogin}
          >
            <Ionicons
              name="logo-apple"
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
            <Text className="text-black text-base ml-2 dark:text-white">
              {i18n.t("loginScreen.appleLoginButton")}
            </Text>
          </TouchableOpacity>
        )}
        {/* 회원가입 링크 등 추가 UI가 필요하면 아래와 같이 추가 */}
        <View className="flex-row my-4 justify-center">
          <Text className="text-gray-600 dark:text-white">
            {i18n.t("loginScreen.registerPrompt")}{" "}
          </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text className="font-semibold text-brand dark:text-white">
                {i18n.t("loginScreen.registerLink")}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
