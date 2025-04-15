import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import responsiveHelper from "@/components/responsive-helper";

import { NavigationProp } from "@react-navigation/native";

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Check if the screen is a mobile device
  const isMobile = responsiveHelper();

  const handleLogin = () => {
    // Add your login logic here
    navigation.replace("Main");
  };

  return (
    <View style={isMobile ? styles.mobileview : styles.desktopview}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button color={"#4900C0"} title="Login" onPress={handleLogin} />

        <link href={"/register-page"}>
          <Button color={"#4900C0"} title="Register" />
        </link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  desktopview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: "#4900C0",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "white",
  },
  mobileview: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default LoginScreen;
