import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  message: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon = "alert-circle-outline",
  actionText,
  onAction,
}) => {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-gray-900">
      <Ionicons name={icon as any} size={64} color="#9CA3AF" className="mb-4" />

      <Text className="text-center text-gray-400 text-base mb-4">
        {message}
      </Text>

      {actionText && onAction && (
        <TouchableOpacity
          className="bg-yellow-500 py-2 px-4 rounded-lg"
          onPress={onAction}
        >
          <Text className="text-gray-900 font-medium">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
