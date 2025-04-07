import { Slot } from "expo-router";
import { useAuth } from "../../../src/hooks/useAuth";
import { ExchangeRateProvider } from "../../../src/context/ExchangeRateContext";

export default function HomeLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <ExchangeRateProvider isAutenticated={isAuthenticated}>
      <Slot />
    </ExchangeRateProvider>
  );
}
