import { Image, Modal, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "react-native-gesture-handler";
import { BlurredModal } from "@/components/blurModalComponent";
import { createGoal } from "@/utils/goalManager";
import GoalBox from "@/components/goalComponent";

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [goalInput, setGoalInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const GoalsList: React.FC = () => {
    const allMyGoals = [
      {
        id: 1,
        title: "Learn React Native",
        description: "Complete the official tutorial.",
      },
      {
        id: 2,
        title: "Build a Portfolio App",
        description: "Showcase my projects.",
      },
      // Add more goals as needed
    ];

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
          <ThemedText> Hello {authContext.loggedInUser}</ThemedText>
          <Button title="Lock out" onPress={authContext.logOut} />
          <Button
            title="Create new Goal"
            onPress={() => setModalVisible(true)}
          />
        </ThemedView>

        <BlurredModal /* create a new goal */
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <ThemedView style={styles.modalContainer}>
            <ThemedText>This is a modal!</ThemedText>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setGoalInput(text)}
              placeholder="Goal"
            ></TextInput>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDescriptionInput(text)}
              placeholder="Description"
            ></TextInput>

            <Button
              title="Cancel"
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <Button
              title="Create"
              onPress={() => {
                setModalVisible(false);
                createGoal(
                  authContext.loggedInUserId,
                  goalInput,
                  descriptionInput
                );
              }}
            />
          </ThemedView>
        </BlurredModal>
      </ParallaxScrollView>
    );
  };
}

export const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
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
});
