import { useLocalSearchParams } from "expo-router";
import { TextInput, Button, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { createSubgoal, getSubgoals, Goal } from "@/utils/goalManager";
import { ThemedView } from "@/components/ThemedView";

export default function SubgoalPage() {
  const { goalId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const fetchedGoals = await getSubgoals(Number(goalId));
      setGoals(fetchedGoals);
    };
    fetchGoals();
  }, [goalId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.header}>
        Add Subgoal to Goal Goal nr {goalId}
      </ThemedText>
      <TextInput
        placeholder="Subgoal Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Subgoal Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Add Subgoal" onPress={() => createSubgoal(Number(goalId), title, description)} />
      {goals.map((goal, index) => (
          <ThemedView key={index} style={styles.goalItem}>
            <ThemedText style={styles.goalTitle}>{goal.title}</ThemedText>
            <ThemedText style={styles.goalDescription}>
              {goal.description}
            </ThemedText>
          </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
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
});
