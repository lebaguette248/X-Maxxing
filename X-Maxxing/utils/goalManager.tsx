const API_URL = process.env.EXPO_PUBLIC_XM_URL;


export interface Goal {
  id: string;
  title: string;
  description: string;
}

export async function createGoal(
  userId: Number,
  title: string,
  description?: string
) {
  try {
    const res = await fetch(`${API_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        title: title,
        description: description,
      }),
    });

    if (!res.ok) throw new Error("Goal creation failed");

    const data = await res.json();
    console.log("Goal created:", data);
    return data;
  } catch (error) {
    console.error("Error creating goal:", error);
  }
}

export async function getGoalsbyUser(userId: Number) {
  try {
    const res = await fetch(`${API_URL}/goals/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch goals");

    const data = await res.json();
    console.log("Fetched goals:", data);
    return data;
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
}

export async function deleteGoal(goalId: Number) {
  try {
    const res = await fetch(`${API_URL}/goals/${goalId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete goal");

    const data = await res.json();
    console.log("Goal deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
}



export async function getSubgoals(goalId: Number) {
  try {
    const res = await fetch(`${API_URL}/subgoals/${goalId}`);
    if (!res.ok) throw new Error("Failed to fetch subgoals");
    const data = await res.json();
    return data; // Array of subgoals
  } catch (error) {
    console.error("Error fetching subgoals:", error);
    return [];
  }
}

export async function deleteSubgoal(subgoalId: Number) {
  try {
    const res = await fetch(`${API_URL}/subgoals/${subgoalId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete subgoal");

    const data = await res.json();
    console.log("Subgoal deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting subgoal:", error);
  }
}

export async function createSubgoal(goalId: number, title: string, description: string) {
  try {
    const res = await fetch(`${API_URL}/subgoals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal_id: goalId,
        title: title,
        description: description,
      }),
    });

    if (!res.ok) throw new Error('Failed to create subgoal');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating subgoal:', error);
    return null;
  }
}

export async function getGoalById(goalId: number):Promise<Goal | null> {
  try {
    const response = await fetch(`${API_URL}/goalsbyId/${goalId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch goal');
    }
    const goal = await response.json();
    return goal;
  } catch (error) {
    console.error("Error fetching goal by ID:", error);
    return null;
  }
}



