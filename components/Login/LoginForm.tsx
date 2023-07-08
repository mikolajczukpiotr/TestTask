import { Button, View } from "native-base";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types/StackNavigator";
import Input from "./Input";

const LoginForm = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <Input
        label="Email"
        placeholder="example@email.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
        error={emailError}
      />
      <Input
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={validatePassword}
        error={passwordError}
        secureTextEntry={true}
      />
      <Button size="lg" onPress={handleLogin}>
        Sign in
      </Button>
    </View>
  );
};

export default LoginForm;
