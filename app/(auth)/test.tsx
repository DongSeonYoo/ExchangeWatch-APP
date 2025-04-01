import { Text, View } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Test() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(app)/home");
    } else {
      console.log("로그인댐");
    }
  }, []);
  return (
    <View>
      <Text>asdf</Text>
    </View>
  );
}
