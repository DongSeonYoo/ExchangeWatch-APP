import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import FlagImage from "../common/FlagImage";

const AVAILABLE_CURRENCIES = [
  "KRW",
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "CHF",
  "CAD",
  "AUD",
  "CNY",
  "HKD",
  "PLN",
];

interface Props {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
}

const BaseCurrencySelector = ({ baseCurrency, setBaseCurrency }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (currency: string) => {
    setBaseCurrency(currency);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute top-4 right-4 w-10 h-10 z-50"
      >
        <FlagImage currencyCode={baseCurrency} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              justifyContent: "flex-end",
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  backgroundColor: "#1F2937",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                  maxHeight: "60%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 12,
                  }}
                >
                  기준 통화 선택
                </Text>

                <FlatList
                  data={AVAILABLE_CURRENCIES}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#374151",
                      }}
                    >
                      <FlagImage currencyCode={item} size={32} />
                      <Text
                        style={{ color: "white", fontSize: 16, marginLeft: 12 }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default BaseCurrencySelector;
