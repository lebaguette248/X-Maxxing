const API_URL = process.env.EXPO_PUBLIC_XM_URL;


export interface Goal {
  id: string;
  title: string;
  description: string;
}

export async function deleteUser(userId: Number) {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to delete user");

    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}



