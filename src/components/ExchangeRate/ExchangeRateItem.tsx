import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import FlagImage from "../common/FlagImage";
import { RateDisplay } from "../../hooks/useExchangeRate";

interface Props {
  baseCurrency: string;
  rate: RateDisplay;
}

const ExchangeRateItem: React.FC<Props> = ({ baseCurrency, rate }) => {
  const changeColor =
    rate.dayChangePercent > 0
      ? "text-green-400"
      : rate.dayChangePercent < 0
      ? "text-red-400"
      : "text-gray-300";

  const formattedChange =
    rate.dayChangePercent > 0
      ? `+${rate.dayChangePercent.toFixed(2)}%`
      : `${rate.dayChangePercent.toFixed(2)}%`;

  return (
    <TouchableOpacity className="flex-row px-4 py-4 border-b border-gray-800">
      {/* 통화 */}
      <View className="flex-[3] flex-row items-center gap-x-3">
        <FlagImage currencyCode={rate.currencyCode} size={36} />
        <View>
          <Text className="text-white text-sm font-medium">{rate.name}</Text>
          <Text className="text-gray-400 text-xs">
            {rate.currencyCode}/{baseCurrency}
          </Text>
        </View>
      </View>

      {/* 현재가 */}
      <View className="flex-[2] items-end justify-center">
        <Text className="text-white text-base font-semibold">
          {rate.rate.toFixed(2)}
        </Text>
      </View>

      {/* 전일대비 */}
      <View className="flex-[2] items-end justify-center">
        <Text className={`${changeColor} text-sm font-medium`}>
          {formattedChange}
        </Text>
      </View>

      {/* 시간 */}
      <View className="flex-[2] items-end justify-center">
        <Text className="text-gray-400 text-xs">{"24:20:11"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExchangeRateItem;
