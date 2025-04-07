import { View } from "react-native";
import TabSelector from "../common/TabSelector";

export type TabSelectType = "all" | "favorites";

interface Props {
  activeTab: TabSelectType;
  setActiveTab: (tab: TabSelectType) => void;
}

export default function ExchangeRateTabSelector({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <View className="px-4 mb-2">
      <TabSelector
        tabs={[
          { id: "all", label: "전체 시세" },
          { id: "favorites", label: "관심 통화" },
        ]}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />
    </View>
  );
}
