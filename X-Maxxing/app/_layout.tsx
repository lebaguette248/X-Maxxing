import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/utils/authContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
