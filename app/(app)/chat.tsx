import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import { Message, ChatState } from "@/src/types/chat";
import { debounce } from "lodash";
import i18n from "../../src/helpers/i18n";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const isDark = colorScheme.get() === "dark";

  // Debounced scroll to end
  const debouncedScrollToEnd = useCallback(
    debounce(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100),
    []
  );

  const addMessage = (newMessage: Message) => {
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    debouncedScrollToEnd();
  };

  const sendMessage = async () => {
    console.log("chat not implemented");
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View
      className={`flex-row ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <View
        className={`max-w-[80%] rounded-2xl p-3 ${
          message.isUser
            ? "bg-brand rounded-tr-none"
            : "bg-gray-200 dark:bg-slate-600 rounded-tl-none"
        }`}
      >
        <Text
          className={`${
            message.isUser ? "text-white" : "text-gray-800 dark:text-white"
          }`}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-700">
      <Stack.Screen
        options={{
          title: i18n.t("chatScreen.title"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDark ? "#334155" : "#fff",
          },
          headerTintColor: isDark ? "#fff" : "#000",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          onContentSizeChange={debouncedScrollToEnd}
        >
          {chatState.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {chatState.isLoading && (
            <View className="items-start">
              <View className="bg-gray-200 dark:bg-slate-600 rounded-2xl p-3 rounded-tl-none">
                <ActivityIndicator color={isDark ? "#fff" : "#000"} />
              </View>
            </View>
          )}
        </ScrollView>
        <View className="p-4 border-t border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700">
          <View className="flex-row items-center space-x-2">
            <TextInput
              className="flex-1 bg-gray-100 dark:bg-slate-600 rounded-full px-4 py-2 text-gray-800 dark:text-white"
              placeholder={i18n.t("chatScreen.messagePlaceholder")}
              placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!message.trim() || chatState.isLoading}
              className={`p-2 rounded-full ${
                !message.trim() || chatState.isLoading
                  ? "bg-gray-300 dark:bg-slate-600"
                  : "bg-brand"
              }`}
            >
              <Ionicons
                name="send"
                size={24}
                color={
                  !message.trim() || chatState.isLoading ? "#9CA3AF" : "#FFFFFF"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
