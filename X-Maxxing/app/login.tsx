import { useContext, useState } from "react";
import { View, Text, Button, useColorScheme, TextInput } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { StyleSheet } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import responsiveHelper from "@/components/responsive-helper";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [unameInput, setUnameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [mode, setMode] = useState("login");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View
        style={!responsiveHelper() ? styles.desktopview : styles.mobileview}
      >
        <View style={styles.container}>
        {mode === "login" ? (
            <>
              <TextInput
                style={styles.input}
                id="unameInput"
                onChangeText={(text) => setUnameInput(text)}
                placeholder="Username"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPasswordInput(text)}
              ></TextInput>
              <Button
                title="Log In"
                onPress={() => authContext.logIn(unameInput, passwordInput)}
                color={Colors.xmaxxingdark.tabIconSelected}
              ></Button>
              <Button
                title="No Account yet? Register"
                // onPress={() => router.replace("/register")}
                onPress={() => setMode("register")}
                color={Colors.xmaxxingdark.tabIconSelected}
              ></Button>
            </>
          ) : (
            <>
              <TextInput style={styles.input} placeholder="Username" />
              <TextInput
                style={styles.input}
                placeholder="Password"
              ></TextInput>
              <Button
                title="Register"
                onPress={() => authContext.logIn("unameInput", "passwordInput")}
                color={Colors.xmaxxingdark.tabIconSelected}
              ></Button>
              <Button
                title="Have a Account? Log In"
                onPress={()=> setMode("login")}
                color={Colors.xmaxxingdark.tabIconSelected}
              ></Button>
            </>
          )}
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#F00",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginpage: {
    width: "100%",
    height: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  desktopview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 800,
  },
  container: {
    width: "90%",
    padding: 20,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: "white",
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  mobileview: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
