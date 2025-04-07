import React, { createContext, useContext, ReactNode } from "react";
import { ExchangeRateState, useExchangeRate } from "../hooks/useExchangeRate";

const ExchangeRateContext = createContext<ExchangeRateState | undefined>(
  undefined
);

export const ExchangeRateProvider = ({
  children,
  isAutenticated,
}: {
  children: ReactNode;
  isAutenticated: boolean;
}) => {
  const value = useExchangeRate(isAutenticated);
  return (
    <ExchangeRateContext.Provider value={value}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRateContext = () => {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error(
      "useExchangeRateContext must be used within ExchangeRateProvider"
    );
  }
  return context;
};
