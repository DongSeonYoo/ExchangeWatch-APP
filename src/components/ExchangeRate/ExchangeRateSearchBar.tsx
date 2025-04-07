import { View } from "react-native";
import SearchBar from "../common/SearchBar";

interface Props {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export default function ExchangeRateSearchBar({
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <View className="px-4 mt-2 mb-2">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="통화명 또는 통화코드 검색"
      />
    </View>
  );
}
