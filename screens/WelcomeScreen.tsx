import React from "react";
import { Text, View, Image, Flex } from "native-base";
import LoginForm from "../components/LoginForm";

const WelcomeScreen = () => {
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
    </Flex>
  );
};

export default WelcomeScreen;
