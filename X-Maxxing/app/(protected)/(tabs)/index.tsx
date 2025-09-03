import { Image, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { BlurredModal } from "@/components/blurModalComponent";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/constants/styles";

import {
  createGoal,
  deleteGoal,
  getGoalsbyUser,
  Goal,
} from "@/utils/goalManager";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import responsiveHelper from "@/components/responsive-helper";

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
  const isMobile = responsiveHelper();

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
          Welcome Back{" "}
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
              fetchGoals();}}
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
              style={{ flex: 1 }}
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
              <Feather name="trash-2" size={40} color="black" />
            </Pressable>
          </View>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}
