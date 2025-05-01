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



export default function RootLayout() {
  const colorScheme = useColorScheme();
  /*
  const createDbIfNotExists = async (db: SQLiteDatabase) => {
    console.log("Creating database if not exists");
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL UNIQUE,email TEXT NOT NULL UNIQUE,created_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    );
  };
  */


  return (
    //<SQLiteProvider databaseName="xmaxxing.db" onInit={createDbIfNotExists}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>

    //</SQLiteProvider>
  );
}
