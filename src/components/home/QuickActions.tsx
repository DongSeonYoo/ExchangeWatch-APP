import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colorScheme } from "nativewind";
import i18n from "../../helpers/i18n";

type QuickActionButton = {
  icon: "person-outline" | "chatbubble-ellipses-outline";
  label: string;
  onPress: () => void;
};

export const QuickActions = () => {
  const isDark = colorScheme.get() === "dark";

  const quickActions: QuickActionButton[] = [
    {
      icon: "person-outline",
      label: i18n.t("homeScreen.profile"),
      onPress: () => router.push("/(app)/profile"),
    },
    {
      icon: "chatbubble-ellipses-outline",
      label: i18n.t("homeScreen.chat"),
      onPress: () => router.push("/(app)/chat"),
    },
  ];

  return (
    <View className="flex-row justify-between mb-6">
      {quickActions.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={button.onPress}
          className="flex-1 items-center bg-white p-4 rounded-xl shadow-md mx-1 dark:bg-slate-800"
        >
          <Ionicons
            name={button.icon}
            size={24}
            color={isDark ? "#9CA3AF" : "#4B5563"}
          />
          <Text className="mt-2 text-sm text-gray-600 text-center dark:text-white font-regular">
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
