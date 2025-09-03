import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.EXPO_PUBLIC_XM_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function subgoalGenerator(
  goal: string,
  Description: string
): Promise<JSON | undefined> {
  const goalTitle = goal;
  const goalDescription = Description;
  if (!goalTitle || !goalDescription) {
    console.error("Goal title and description are required");
    return;
  }

  const prompt = `You are a helpful assistant that breaks large goals into smaller, actionable subgoals.
Given the following goal and its description, return a numbered list of 2-7 short and clear subgoals that could help someone accomplish it.
Goal: ${goalTitle},
Description: ${goalDescription},
You will do this by following strictly this JSON format and only JSON so it is parsable by JSON.parse:

[
  {
    "Subgoal": "exampleTitle1",
    "Description": "exampleDescription1",
  },
  {
    "Subgoal": "exampleTitle2",
    "Description": "exampleDescription2",
  }
]

    Return: Array<SubGoals>`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  
  console.log(response.text);
  try {
    console.log("Raw response:", response);
    const responseText = response.text
      .replace(/^```(?:json|Json)?|```$/g, "")
      .trim();

      console.log("Parsed response:", responseText);
    const cleanedResp = JSON.parse(responseText);
    console.log("Cleaned response:", cleanedResp);

    return cleanedResp;

  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return;
  }
}
