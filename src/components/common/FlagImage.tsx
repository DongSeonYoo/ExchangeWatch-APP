import React from "react";
import { Image, View } from "react-native";
import { FLAG_IMAGES } from "../../constant/flagImages";

interface FlagImageProps {
  currencyCode: string;
  size?: number;
}

const FlagImage: React.FC<FlagImageProps> = ({ currencyCode, size = 35 }) => {
  const source = FLAG_IMAGES[currencyCode] || FLAG_IMAGES["DEFAULT"];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#374151", // tailwind gray-700
      }}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default FlagImage;
