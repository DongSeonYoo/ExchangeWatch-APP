import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import i18n from "../../utils/i18n";
import { useAuth } from "../../hooks/useAuth";

export const FeaturedContent = () => {
  const { logout } = useAuth();
  return (
    <View className="bg-blue-500 rounded-xl p-6 mb-6 dark:bg-slate-800">
      <Text className="text-xl font-semibold text-white mb-2 dark:text-white">
        {i18n.t("homeScreen.featuredContent")}
      </Text>
      <Text className="font-regular text-white mb-4 dark:text-white">
        {i18n.t("homeScreen.featuredDescription")}
      </Text>
      <TouchableOpacity className="bg-white dark:bg-slate-900 py-2 px-4 rounded-full self-start">
        <Text className="text-blue-500 font-medium dark:text-white">
          <Button
            onPress={() => {
              logout();
            }}
            title={i18n.t("homeScreen.learnMore")}
          ></Button>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
