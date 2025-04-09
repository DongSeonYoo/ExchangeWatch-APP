import { api } from "../custom-Instance";
import { CurrentRatesResponseDto } from "../types/exchange-rate/dto/ExchangeRateDto";

export const ExchangeRateAPI = {
  getCurrentRates: async (
    baseCurrency: string,
    page: number = 1,
    limit: number = 10
  ) => {
    console.log("baseCurrency: ", baseCurrency);
    const response = await api.get<CurrentRatesResponseDto>(
      `/exchange-rates/current`,
      {
        baseCurrency,
      }
    );

    return response;
  },
};
