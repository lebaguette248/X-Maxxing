import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <StatusBar style="auto"></StatusBar>
          <Stack>
            <Stack.Screen
              name="(protected)"
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack>
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
