import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";

export const MessagingHelper = {
  requestUserPermission: async () => {
    try {
      if (Platform.OS === "ios") {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        return enabled;
      }

      // For Android API level 33+
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const { PermissionsAndroid } = require("react-native");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  getFCMToken: async () => {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  onMessage: (callback: (message: any) => void) => {
    return messaging().onMessage(callback);
  },

  onNotificationOpenedApp: (callback: (message: any) => void) => {
    return messaging().onNotificationOpenedApp(callback);
  },

  getInitialNotification: async () => {
    try {
      return await messaging().getInitialNotification();
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
