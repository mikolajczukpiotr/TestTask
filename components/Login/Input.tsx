import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FormControl,
  Icon,
  Input as NativeBaseInput,
  WarningOutlineIcon,
} from "native-base";
import { setStatusBarTranslucent } from "expo-status-bar";

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error: string;
  secureTextEntry?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl isInvalid={!!error} mb="4">
      <FormControl.Label>{label}</FormControl.Label>
      <NativeBaseInput
        variant="underlined"
        type={showPassword ? "password" : "text"}
        w="100%"
        size="lg"
        placeholder={placeholder}
        InputRightElement={
          secureTextEntry ? (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                color="muted.400"
              />
            </TouchableOpacity>
          ) : undefined
        }
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
export default Input;
