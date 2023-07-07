import { View, Text, CloseIcon } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const TermsScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      {/* Im adding zIndex because position absolute is not working with
      TouchableOpacity */}
      <View position="absolute" zIndex={1} right={0}>
        <TouchableOpacity onPress={goBack}>
          <CloseIcon m={4} size={6} color="gray.600" />
        </TouchableOpacity>
      </View>
      <View px="8" pt="12">
        <Text mb="2" fontSize="xl">
          Terms Screen
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ut
          dolorem dignissimos odit beatae, nostrum sequi corrupti pariatur nam.
          Doloribus molestiae ut non maxime! Fugit nobis vero quaerat quis iste
        </Text>
      </View>
    </>
  );
};

export default TermsScreen;
