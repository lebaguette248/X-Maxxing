import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { BlurredModal } from "@/components/blurModalComponent";
import {
  createGoal,
  deleteGoal,
  getGoalsbyUser,
  Goal,
} from "@/utils/goalManager";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeletemodalVisible, setconfirmDeletemodalVisible] =
    useState(false);
  const [goalToChange, setGoalToChange] = useState("");
  const [goalToChangeTitle, setGoalToChangeTitle] = useState("");

  const [goalInput, setGoalInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [goals, setGoals] = useState<Goal[]>([]);
  const fetchGoals = async () => {
    const fetchedGoals = await getGoalsbyUser(authContext.loggedInUserId);
    setGoals(fetchedGoals);
  };

  useEffect(() => {
    fetchGoals();
  }, [authContext.loggedInUserId]);

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
          {" "}
          Willkommen zurück{" "}
          {String(authContext.loggedInUser).charAt(0).toUpperCase() +
            String(authContext.loggedInUser).slice(1)}
        </ThemedText>
        <ThemedView>
          <Button title="Log out" onPress={authContext.logOut} />
        </ThemedView>
      </ThemedView>

      {/* Create the "Create Goal" Modal  */}
      <BlurredModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedText>Create a new Goal</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setGoalInput(text.toLowerCase())}
            placeholder="Goal"
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescriptionInput(text.toLowerCase())}
            placeholder="Description"
          ></TextInput>
          <ThemedView style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Button
              color="red"
              title="Cancel"
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <Button
              title="Create"
              color="green"
              onPress={() => {
                setModalVisible(false);
                createGoal(
                  authContext.loggedInUserId,
                  goalInput,
                  descriptionInput
                );
                fetchGoals();
              }}
            />
          </ThemedView>
        </ThemedView>
      </BlurredModal>

      {/* Create the "Delete Goal" Modal  */}
      <BlurredModal
        visible={confirmDeletemodalVisible}
        onRequestClose={() => {
          setconfirmDeletemodalVisible(false);
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
            Do you really want to delete {goalToChangeTitle} ?
          </ThemedText>
          <ThemedView style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Button
              title="Cancel"
              color="green"
              onPress={() => {
                setconfirmDeletemodalVisible(false);
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                setconfirmDeletemodalVisible(false);
                deleteGoal(Number(goalToChange));
                setGoalToChange("");
                setGoalToChangeTitle;
                window.location.reload();
              }}
            />
          </ThemedView>
        </ThemedView>
      </BlurredModal>

      <ThemedView style={styles.goalsSection}>
        <ThemedView>
          <ThemedText style={styles.sectionTitle}>Your Goals</ThemedText>
          <ThemedView
            style={{ maxWidth: 100, borderRadius: 8, overflow: "hidden" }}
          >
            <Button
              title="Create new Goal"
              onPress={() => setModalVisible(true)}
            />
          </ThemedView>
        </ThemedView>



        {goals?.map((goal) => (
          <View style={styles.goalItem}>
            <Pressable
              style={{  flex: 1 }}
              onPress={() => router.push(`/(subgoals)/${goal.id}`)}
            >
              <View style={{ margin: 8 }}>
                <ThemedText style={styles.goalTitle}>{goal.title}</ThemedText>
                <ThemedText style={styles.goalDescription}>
                  {goal.description}
                </ThemedText>
              </View>
            </Pressable>
            
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  setGoalToChange(goal.id);
                  setGoalToChangeTitle(goal.title);
                  setconfirmDeletemodalVisible(true);
                }}
              >
                <ThemedText>Delete {goal.title}</ThemedText>
              </Pressable>
          </View>
        ))}
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
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 0, 0, 0.42)",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
