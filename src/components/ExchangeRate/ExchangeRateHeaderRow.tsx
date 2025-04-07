import React from "react";
import { View, Text } from "react-native";

export default function ExchangeRateHeaderRow() {
  return (
    <View className="flex-row px-4 py-2 border-b border-gray-800">
      <View className="flex-[2]">
        <Text className="text-xs text-gray-500">통화</Text>
      </View>
      <View className="flex-[2] items-end">
        <Text className="text-xs text-gray-500">현재가</Text>
      </View>
      <View className="flex-[2] items-end">
        <Text className="text-xs text-gray-500">전일대비</Text>
      </View>
      <View className="flex-[2] items-end">
        <Text className="text-xs text-gray-500">시간</Text>
      </View>
    </View>
  );
}
