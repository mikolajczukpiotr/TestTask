import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import Navigator from "./navigation/Navigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Navigator />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
