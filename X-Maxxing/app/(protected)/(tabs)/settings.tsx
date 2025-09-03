import { Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { BlurredModal } from "@/components/blurModalComponent";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { deleteUser } from "@/utils/userManager";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.xmaxxinglight.logoBackground,
        dark: Colors.xmaxxingdark.logoBackground,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/xmaxxing_pattern_transparent_cropped.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>
          Settings</ThemedText>
        <ThemedView>
          <Button title="Log out" onPress={authContext.logOut} />
        </ThemedView>
      </ThemedView>

      {/* Create the "Delete Goal" Modal  */}
      <BlurredModal
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(false);
        }}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
              marginTop: 16,
            }}
          >
            WARNING
          </ThemedText>
          <ThemedText>
            Do you really want to delete your Account {authContext.loggedInUser}
            ?
          </ThemedText>
          <ThemedView style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Button
              title="Cancel"
              color="green"
              onPress={() => {
                setDeleteModalVisible(false);
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                setDeleteModalVisible(false);
                deleteUser(authContext.loggedInUserId);
                authContext.logOut();
                router.replace("/login");
              }}
            />
          </ThemedView>
        </ThemedView>
      </BlurredModal>
      <ThemedView style={{ maxWidth: 400, marginBottom: 60 }}>
        <ThemedView style={{marginBottom: 32}}>
        <ThemedText style={styles.sectionTitle}>API Key</ThemedText>
          <TextInput
            placeholder="Enter your API Key"
            style={styles.input}
          ></TextInput>
        </ThemedView>
        <ThemedView>
          <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
          <Button
            title="Delete Account"
            color="red"
            onPress={() => {
              setDeleteModalVisible(true);
            }}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 450,
    position: "absolute",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    maxHeight: 400,
    maxWidth: 400,
    minWidth: 100,
    borderRadius: 12,
    borderColor: "#FFF",
    borderWidth: 1,
  },
  input: {
    height: 50,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "rgb(163, 163, 163)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  goalsSection: {
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  goalItem: {
    overflow: "hidden",
    maxWidth: 400,
    marginTop: 30,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: "rgb(120, 120, 120)",
  },
  title: {
    padding: 16,
    paddingLeft: 0,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 32, 
  },
  deleteButton: {
    backgroundColor: "rgba(255, 0, 0, 0.42)",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
