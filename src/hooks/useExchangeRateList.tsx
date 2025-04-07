import { useCallback, useMemo, useState } from "react";
import { useExchangeRateContext } from "../context/ExchangeRateContext";
import { TabSelectType } from "../components/common/TabSelector";

export default function useExchangeRateList() {
  const { rates, refreshRates } = useExchangeRateContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabSelectType>("all");

  const favoriteList: string[] = []; // 관심 통화 리스트 준비되면 대체

  const filteredRates = useMemo(() => {
    let filtered = rates;

    if (activeTab === "favorites") {
      filtered = filtered.filter((rate) =>
        favoriteList.includes(rate.currencyCode)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (rate) =>
          rate.currencyCode.toLowerCase().includes(q) ||
          rate.name.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [rates, activeTab, searchQuery]);

  const onRefresh = useCallback(async () => {
    await refreshRates();
  }, [refreshRates]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredRates,
    onRefresh,
  };
}
