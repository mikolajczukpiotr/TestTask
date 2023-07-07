import { View, Text } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CalculationScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
      px="4"
    >
      <Text>Create new entry</Text>
    </View>
  );
};

export default CalculationScreen;
