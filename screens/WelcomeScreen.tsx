import React from "react";
import { Text, Image, Flex, Button } from "native-base";
import LoginForm from "../components/Login/LoginForm";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../navigation/types";

const WelcomeScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Flex flex={1} alignItems="center" justifyContent="center" mx="6">
        <Image
          source={require("../assets/icon.png")}
          alt="logo restaurant"
          width="32"
          height="32"
        />
        <Flex alignItems="center" my="6">
          <Text fontSize="4xl">Welcome</Text>
          <Text fontSize="xl" color="gray.500">
            Hi there! Nice to see you again.
          </Text>
        </Flex>
        <LoginForm />
        <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
          <Text my="6" fontSize="md" color="gray.500">
            check terms
          </Text>
        </TouchableOpacity>
      </Flex>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
