import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import * as Crypto from "expo-crypto"; 

export async function generateSHA256Hash(data: string): Promise<string> {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    data
  );
  console.log("SHA256 Hash:", digest);
  return digest;
}

//Definiert neuer Typ in Typescript
type Authstate = {
  isLoggedIn: boolean;
  logIn: (username: string, password: string) => void;
  logOut: () => void;
  createUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void|String>;
  isReady: boolean;

  loggedInUser: string;
  loggedInUserId: Number;
  loggedInUserEmail: string;
};

const authStrogeKey = "auth-key";
const API_URL = process.env.EXPO_PUBLIC_XM_URL + "/auth/login"; // SET IN .ENV FILE MANNNN

//Verwendung von Typ für Constante AuthContext, welche einen Context mit Authstate erstellt
export const AuthContext = createContext<Authstate>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  createUser: async (username: string, email: string, password: string) =>
    Promise.resolve(),
  loggedInUser: "",
  loggedInUserId: 0,
  loggedInUserEmail: "",
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setloggedInUser] = useState("");
  const [loggedInUserId, setloggedInUserId] = useState(0);
  const [loggedInUserEmail, setloggedInUserEmail] = useState("");

  const storeAuthState = async (newState: {
    isLoggedIn: boolean;
    loggedInUser: string;
    loggedInUserEmail?: string;
    loggedInUserId?: Number;
  }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStrogeKey, jsonValue);
    } catch (e) {
      console.error("Error storing auth state", e);
    }
  };


  const logIn = async (username: string, password: string): Promise<String|void> => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return "Please fill in all fields";
    }

    try {
      password = (await generateSHA256Hash(password)).toString();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }


      const data = await res.json(); // { id, username, email }

      setIsLoggedIn(true);
      setloggedInUser(data.username);
      setloggedInUserId(data.id);
      setloggedInUserEmail(data.email);
      await storeAuthState({
        isLoggedIn: true,
        loggedInUser: data.username,
        loggedInUserEmail: data.email,
        loggedInUserId: data.id,
      });
      router.replace("/");
    } catch (e) {
      console.error("Error logging in", e);
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setloggedInUser("");
    storeAuthState({ isLoggedIn: false, loggedInUser: "", loggedInUserEmail });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStrogeKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
          setloggedInUser(auth.loggedInUser);
          setloggedInUserEmail(auth.loggedInUserEmail);
          setloggedInUserId(auth.loggedInUserId);
        }
      } catch (e) {
        console.error("Error getting auth state", e);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  const createUser = async (
    username: string,
    email: string,
    password: string
  ):Promise<void | String> => {
    try {
      username = username.toLowerCase().trim();
      email = email.toLowerCase().trim();
      password = password.trim();
      password = (await generateSHA256Hash(password)).toString();

      if (!username || !email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return "Please fill in all fields";
      }
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        createUser,
        logIn,
        logOut,
        loggedInUser,
        loggedInUserEmail,
        loggedInUserId,
        isReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
