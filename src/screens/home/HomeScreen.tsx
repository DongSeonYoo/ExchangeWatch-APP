import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import {
  ExchangeRateProvider,
  useExchangeRateContext,
} from "../../context/ExchangeRateContext";
import ExchangeRatesList from "../../components/ExchangeRate/ExchangeRateList";
import BaseCurrencySelector from "../../components/ExchangeRate/BaseCurrencySelector";
import ExchangeRateHeaderRow from "../../components/ExchangeRate/ExchangeRateHeaderRow";
import ExchangeRateSearchBar from "../../components/ExchangeRate/ExchangeRateSearchBar";
import useExchangeRateList from "../../hooks/useExchangeRateList";
import ExchangeRateTabSelector from "../../components/ExchangeRate/ExchangeRateTabSelector";

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredRates,
    onRefresh,
  } = useExchangeRateList();
  const { baseCurrency, setBaseCurrency, isLoading, error } =
    useExchangeRateContext();

  return (
    <SafeAreaView className="flex-1 bg-[#111827] relative">
      <ExchangeRateProvider isAutenticated={isAuthenticated}>
        <View className="flex-1">
          {/* 국기 버튼은 View 안에 가장 마지막에 배치해서 가장 위에 떠 있게 */}
          <View className="flex-1 p-4">
            <Text className="text-white text-2xl font-bold mt-2 mb-4">
              실시간 환율
            </Text>

            {/* 탭셀렉터 */}
            <ExchangeRateTabSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* 검색 바 */}
            <ExchangeRateSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* Header막대기 */}
            <ExchangeRateHeaderRow />
            {/* 리스트 */}
            <ExchangeRatesList
              rates={filteredRates}
              onRefresh={onRefresh}
              searchQuery={searchQuery}
              baseCurrency={"KRW"}
              isLoading={isLoading}
            />
          </View>

          <BaseCurrencySelector
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
          />
        </View>
      </ExchangeRateProvider>
    </SafeAreaView>
  );
}
