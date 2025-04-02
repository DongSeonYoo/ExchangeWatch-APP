import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import i18n from "../../utils/i18n";

export const UserInfo = () => {
  return (
    <View className="bg-white rounded-xl p-4 shadow-md dark:bg-slate-800">
      <Text className="text-gray-600 dark:text-white font-regular">
        {i18n.t("homeScreen.lastSignIn")}:{" "}
        {/* {moment(user?.metadata.lastSignInTime).format("LLL")} */}
      </Text>
      <Text className="text-gray-600 mt-2 dark:text-white font-regular">
        {i18n.t("homeScreen.accountCreated")}:{" "}
        {/* {moment(user?.metadata.creationTime).format("LLL")} */}
      </Text>
    </View>
  );
};
