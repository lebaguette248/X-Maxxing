const API_URL = process.env.EXPO_PUBLIC_XM_URL;

export async function createGoal(
  userId: number,
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

export async function getGoals(userId: number) {
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


