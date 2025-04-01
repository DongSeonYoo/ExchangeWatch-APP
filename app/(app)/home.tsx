import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { QuickActions } from "@/src/components/home/QuickActions";
import { FeaturedContent } from "@/src/components/home/FeaturedContent";
import { UserInfo } from "@/src/components/home/UserInfo";
import i18n from "../../src/helpers/i18n";
import { useUserContext } from "../../src/context/UserContext";

export default function Home() {
  // TODO
  const { user } = useUserContext();

  // Add focus effect to refresh the screen when it comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Force a re-render
      const timestamp = Date.now();
      console.log("Screen focused, refreshing content...", timestamp);
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-3xl font-semibold text-gray-800 mb-2 dark:text-white">
            {i18n.t("homeScreen.welcome")}
            {user?.name ? `, ${user.name}` : ""}
          </Text>
          <Text className="text-lg font-medium text-gray-600 mb-6 dark:text-white">
            {i18n.t("homeScreen.subtitle")}
          </Text>
          {/* <FeaturedContent /> */}
          <Text className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
            {i18n.t("homeScreen.quickActions")}
          </Text>
          <QuickActions />
          <UserInfo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
