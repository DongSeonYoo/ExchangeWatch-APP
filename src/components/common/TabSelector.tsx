import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type TabSelectType = "all" | "favorites";

interface Tab {
  id: TabSelectType;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: TabSelectType;
  onChangeTab: (tabId: TabSelectType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  activeTab,
  onChangeTab,
}) => {
  return (
    <View className="flex-row bg-gray-900 px-4 py-2 gap-x-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            className={`flex-1 items-center py-2 rounded-full ${
              isActive ? "bg-yellow-400" : "bg-gray-800"
            }`}
            onPress={() => onChangeTab(tab.id)}
          >
            <Text
              className={`text-sm font-medium ${
                isActive ? "text-black" : "text-gray-300"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabSelector;
