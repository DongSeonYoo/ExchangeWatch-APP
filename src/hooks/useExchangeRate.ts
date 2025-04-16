// hooks/useExchangeRate.ts
import { useState, useEffect, useRef } from "react";
import { ExchangeRateAPI } from "../api/modules/ExchangeRateApi";
import {
  RateDetailDto,
  CurrentRatesResponseDto,
} from "../api/types/exchange-rate/dto/ExchangeRateDto";
import { LatestRateUpdateDto } from "../api/types/exchange-rate/dto/LatestRateUpdateDto";
import { StorageService } from "../services/StorageService";
import STORAGE_KEYS from "../constant/storageKeys";
import { useSSE } from "./useSSE";
import { TabSelectType } from "../components/common/TabSelector";

export interface RateDisplay {
  currencyCode: string;
  name: string;
  rate: number;
  dayChange: number;
  dayChangePercent: number;
  inverseRate: number;
  timestamp: Date;
}

export interface ExchangeRateState {
  rates: RateDisplay[];
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
  ratesData: CurrentRatesResponseDto | null;

  activeTab: TabSelectType;
  setActiveTab: (args: TabSelectType) => void;

  searchQuery: string;
  setSearchQuery: (text: string) => void;

  refreshing: boolean;
  setRefreshing: (args: boolean) => void;
}

export const useExchangeRate = (
  isAuthenticated: boolean
): ExchangeRateState => {
  const [ratesData, setRatesData] = useState<CurrentRatesResponseDto | null>(
    null
  );
  const [rates, setRates] = useState<RateDisplay[]>([]);
  const [baseCurrency, setBaseCurrency] = useState<string>("KRW");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useSSE(baseCurrency, {
    onMessage: (data: LatestRateUpdateDto) => {
      setRates((prevRates) => {
        return prevRates.map((rate) => {
          if (rate.currencyCode === data.currencyCode) {
            return {
              name: rate.name,
              currencyCode: data.currencyCode,
              inverseRate: rate.inverseRate + data.rate,
              rate: rate.rate + data.rate,
              dayChange: rate.dayChange + data.change,
              dayChangePercent: rate.dayChangePercent + data.changePct,
              timestamp: new Date(data.timestamp),
            };
          }
          return rate;
        });
      });
      setLastUpdated(new Date(data.timestamp));
    },
    onError: (err) => {
      console.error("SSE 에러:", err);
    },
  });

  useEffect(() => {
    const savedCurrency = StorageService.getItem(STORAGE_KEYS.BASE_CURRENCY);
    if (savedCurrency) {
      setBaseCurrency(savedCurrency);
    }

    fetchRates();
  }, [baseCurrency]);

  const transformRatesData = (
    rates: CurrentRatesResponseDto["rates"]
  ): RateDisplay[] => {
    return Object.entries(rates).map(([currencyCode, details]) => ({
      currencyCode,
      ...details,
    }));
  };

  const fetchRates = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const data = await ExchangeRateAPI.getCurrentRates(baseCurrency);

      setRatesData(data);
      setRates(transformRatesData(data.rates));
      setLastUpdated(new Date());
      setError(null);
      const totalItems = Object.keys(data.rates).length;
    } catch (error) {
      console.error("환율 데이터 불러오기 오류:", error);
      setError("환율 데이터를 불러오는데 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchRates();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (newCurrency: string) => {
    StorageService.setItem(STORAGE_KEYS.BASE_CURRENCY, newCurrency);
    setBaseCurrency(newCurrency);
  };

  return {
    rates,
    baseCurrency,
    setBaseCurrency: handleBaseCurrencyChange,
    isLoading,
    error,
    lastUpdated,
    refreshRates: fetchRates,
    ratesData,

    activeTab,
    setActiveTab,

    searchQuery,
    setSearchQuery,

    refreshing,
    setRefreshing,
  };
};
