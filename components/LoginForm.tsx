import {
  FormControl,
  Icon,
  Input,
  Button,
  View,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../types/StackNavigator";

const LoginForm = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [email, setEmail] = useState("example@gsdfgfsd.com");
  const [password, setPassword] = useState("fsdafsdafasdfasdf");
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      navigation.push("Calculation");
    }
  };
  return (
    <View>
      <FormControl isInvalid={!!emailError} mb="4">
        <FormControl.Label>Email</FormControl.Label>
        <Input
          variant="underlined"
          w="100%"
          placeholder="example@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={validateEmail}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {emailError}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!passwordError} mb="4">
        <FormControl.Label>Password</FormControl.Label>
        <Input
          variant="underlined"
          type={show ? "text" : "password"}
          w="100%"
          placeholder="Password"
          InputRightElement={
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                color="muted.400"
              />
            </TouchableOpacity>
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          onBlur={validatePassword}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {passwordError}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={handleLogin}>Sign in</Button>
    </View>
  );
};

export default LoginForm;
