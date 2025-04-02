import { Slot } from "expo-router";
import "../global.css";
import { AppProvider } from "@/src/context/AppContext";
import ToastManager from "toastify-react-native";
import { UserProvider } from "../src/context/UserContext";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <AuthProvider>
        <UserProvider>
          <ToastManager textStyle={{ fontSize: 12 }} theme="light" />
          <Slot />
        </UserProvider>
      </AuthProvider>
    </AppProvider>
  );
}
