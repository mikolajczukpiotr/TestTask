import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Terms: undefined;
  Calculation: undefined;
};
export type RootNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
