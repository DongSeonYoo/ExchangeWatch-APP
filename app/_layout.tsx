import { Slot } from "expo-router";
import "../global.css";
import { AppProvider } from "@/src/context/AppContext";
import ToastManager from "toastify-react-native";
import { UserProvider } from "../src/context/UserContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <UserProvider>
        <ToastManager textStyle={{ fontSize: 12 }} theme="light" />
        <Slot />
      </UserProvider>
    </AppProvider>
  );
}
