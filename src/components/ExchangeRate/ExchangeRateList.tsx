import React, { useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import ExchangeRateItem from "./ExchangeRateItem";
import EmptyState from "../common/EmptyState";
import { RateDisplay, useExchangeRate } from "../../hooks/useExchangeRate";

interface ExchangeRateListProps {
  rates: RateDisplay[];
  onRefresh: () => void;
  searchQuery: string;
  baseCurrency: string;
  isLoading: boolean;
  error?: string;
}

const ExchangeRateList: React.FC<ExchangeRateListProps> = ({
  rates,
  onRefresh,
  searchQuery,
  baseCurrency,
  isLoading,
  error,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <FlatList
        data={rates}
        keyExtractor={(item) => item.currencyCode}
        renderItem={({ item }) => (
          <ExchangeRateItem rate={item} baseCurrency={baseCurrency} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FBC214"]}
            tintColor="#FBC214"
            progressBackgroundColor="#1E293B"
          />
        }
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={
          <EmptyState
            message={
              searchQuery ? "검색 결과가 없습니다" : "환율 정보가 없습니다"
            }
            icon="search-outline"
          />
        }
        className="flex-1 px-4"
      />
    </>
  );
};

export default ExchangeRateList;
