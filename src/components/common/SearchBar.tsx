import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "검색",
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      className={`flex-row items-center bg-gray-800 px-4 py-2 rounded-full ${
        isFocused ? "border border-yellow-400" : ""
      }`}
    >
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-2 text-white text-base"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
