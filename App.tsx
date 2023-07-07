import { Box, NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Box flex={1} bg="#fff">
          <StatusBar style="auto" />
          <WelcomeScreen />
        </Box>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
