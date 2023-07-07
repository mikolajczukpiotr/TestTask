import { Box, NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./routers/mainStack";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Box flex={1} bg="#fff">
          <StatusBar style="auto" />
          <Navigator />
        </Box>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
