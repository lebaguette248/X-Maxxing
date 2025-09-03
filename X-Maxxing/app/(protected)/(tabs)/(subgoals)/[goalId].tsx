import { Redirect, router, useLocalSearchParams } from "expo-router";
import { TextInput, Button, StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import {
  createSubgoal,
  deleteSubgoal,
  getGoalById,
  getSubgoals,
  Goal,
  updateGoal,
  updateSubGoal,
} from "@/utils/goalManager";
import { ThemedView } from "@/components/ThemedView";
import { subgoalGenerator } from "@/utils/aiManager";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import LoadingSpinner from "@/components/loadspinner";

export default function SubgoalPage() {
  const { goalId } = useLocalSearchParams();

  if (!goalId) {
    console.error("No goalId provided");
    return <Redirect href="/" />;
  }

  const [goalData, setGoalData] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getGoalById(Number(goalId));
        setGoalData(data);
        console.log("goalVars", data);
      } catch (error) {
        console.error("Failed to fetch goal:", error);
      }
    };

    fetchGoalData();
  }, [goalId]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [GoalNewName, setGoalNewName] = useState("");
  const [GoalNewDescription, setGoalNewDescription] = useState("");

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getSubgoals(Number(goalId));
      setGoals(fetchedGoals);
    } catch (error) {
      console.error("Failed to fetch subgoals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [goalId]);

  // Update the UI after adding or deleting a subgoal
  const handleAddSubgoal = async () => {
    await createSubgoal(Number(goalId), title, description);
    setTitle("");
    setDescription("");
    fetchGoals();
  };

  const handleDeleteSubgoal = async (id: number) => {
    await deleteSubgoal(id);
    fetchGoals();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.xmaxxinglight.logoBackground,
        dark: Colors.xmaxxingdark.logoBackground,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/xmaxxing_pattern_transparent_cropped.png")}
          style={localstyles.reactLogo}
        />
      }
    >
      <ScrollView contentContainerStyle={localstyles.container}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          <ThemedText style={localstyles.title}>
            {goalData?.title} settings
          </ThemedText>
          <ThemedView>
            <Button
              title="Return to Home"
              onPress={() => {
                router.push("/");
              }}
            />{" "}
          </ThemedView>
        </ThemedView>
        <ThemedView
        style={{maxWidth:400, marginBottom: 40,}}
        >
          <ThemedText style={localstyles.header}>
            Change Information for "{goalData?.title}"
          </ThemedText>
          <TextInput
            placeholder={`Goal Name: ${goalData?.title}`}
            onChangeText={(text) => {

              setGoalNewName(text);
            }}
            style={localstyles.input}
          />
          <TextInput
            placeholder={`Goal Description: ${goalData?.description}`}
            onChangeText={(text) => {
              setGoalNewDescription(text);
            }}
            style={localstyles.input}
          />
        <Button
            title="Update Goal"
            onPress={async () => {
              if (goalData) {
                await updateGoal(
                  Number(goalId),
                  GoalNewName,
                  GoalNewDescription,
                  
                );}}}
        ></Button>
        </ThemedView>

        <ThemedView style={localstyles.stepContainer}>
          <ThemedText style={localstyles.header}>
            Subgoals for "{goalData?.title}"
          </ThemedText>

          <TextInput
            placeholder="Subgoal Title"
            value={title}
            onChangeText={setTitle}
            style={localstyles.input}
          />
          <TextInput
            placeholder="Subgoal Description"
            value={description}
            onChangeText={setDescription}
            style={localstyles.input}
          />
          <Button
            title="Add Subgoal"
            onPress={() => handleAddSubgoal(Number(goalId), title, description)}
          />

          <Button
            title="Generate Subgoals"
            onPress={async () => {
              setIsGenerating(true);
              await generateandCreateSubgoals(
                goalData?.title,
                goalData?.description,
                String(goalId)
              );
              const updatedGoals = await getSubgoals(Number(goalId));
              setGoals(updatedGoals);
              setIsGenerating(false);
            }}
          ></Button>
        </ThemedView>
        {isGenerating && (
          <ThemedView style={{ alignItems: "center", marginVertical: 20 }}>
            <ThemedText style={{ marginBottom: 10 }}>
              Generating subgoals, please wait...
            </ThemedText>
          </ThemedView>
        )}

        {goals.map((goal, index) => (
          <ThemedView key={index} style={localstyles.goalItem}>
            <ThemedText style={localstyles.goalTitle}>{goal.title}</ThemedText>
            <ThemedText style={localstyles.goalDescription}>
              {goal.description}
            </ThemedText>
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                console.log(goal.id);
                handleDeleteSubgoal(Number(goal.id));
              }}
            />
          </ThemedView>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

export async function generateandCreateSubgoals(
  title: string,
  description: string,
  goalId: string
) {
  try {
    console.error(
      "Generating subgoals with " +
        title +
        " and " +
        description +
        " for " +
        goalId,
      "This may take a few seconds."
    );
    const generatedSubgoals = await subgoalGenerator(title, description);

    // Process the returned JSON and create subgoals
    if (Array.isArray(generatedSubgoals)) {
      for (const subgoal of generatedSubgoals) {
        await createSubgoal(
          Number(goalId),
          subgoal.Subgoal,
          subgoal.Description
        );
      }
    } else {
      console.error("Generated subgoals format is invalid:", generatedSubgoals);
    }
  } catch (error) {
    console.error("Error generating subgoals:", error);
  }
}

const localstyles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: 400,
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "rgb(163, 163, 163)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    maxWidth: 400,
    gap: 8,
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
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
    maxWidth: 400,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  reactLogo: {
    height: 300,
    width: 450,
    position: "absolute",
  },
});
