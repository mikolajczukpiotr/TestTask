import React from "react";
import { Text, Image, Flex, Button } from "native-base";
import LoginForm from "../components/LoginForm";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../types/StackNavigator";

const WelcomeScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Flex flex={1} alignItems="center" justifyContent="center" mx="6">
      <Image
        source={require("../assets/icon.png")}
        alt="logo restaurant"
        width="30%"
        height="15%"
      />
      <Flex alignItems="center" my="6">
        <Text fontSize="2xl">Welcome</Text>
        <Text color="gray.500">Hi there! Nice to see you again.</Text>
      </Flex>
      <LoginForm />

      <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
        <Text my="6" fontSize="xs" color="gray.500">
          check terms
        </Text>
      </TouchableOpacity>
    </Flex>
  );
};

export default WelcomeScreen;
