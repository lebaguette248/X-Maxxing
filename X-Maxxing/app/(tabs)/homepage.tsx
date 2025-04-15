import { Image, StyleSheet, Platform, TextInput, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useState } from "react";

export default function Homepage() {
  const [loggedInUser, setLoggedInUser] = useState("User");
  const [inputValue, setInputValue] = useState(loggedInUser);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          style={styles.titleText}
          darkColor="white"
          lightColor="black"
        >
          Welcome back {loggedInUser}
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Enter your name"
        />
        <Button
          title="Update Name"
          onPress={() => setLoggedInUser(inputValue)}
          color="#4900C0"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleText: {
    fontSize: 30,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#4900C0",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "white",
  },
});
