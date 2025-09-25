import { generateSHA256Hash, AuthContext, AuthProvider } from "../authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { render, act } from "@testing-library/react-native";

// Mocks
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));
jest.mock("react-native", () => ({
  Alert: { alert: jest.fn() },
}));
jest.mock("expo-crypto", () => ({
  digestStringAsync: jest.fn(async (_alg, val) => `hashed-${val}`),
  CryptoDigestAlgorithm: { SHA512: "SHA512" },
}));

describe("generateSHA256Hash", () => {
  it("returns a hash string", async () => {
    const hash = await generateSHA256Hash("password");
    expect(hash).toBe("hashed-password");
  });
});

describe("AuthProvider functions", () => {
  let context: any;
  beforeEach(async () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {value => {
            context = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
    // Wait for context to initialize
    await act(async () => {});
  });

  it("logIn calls Alert on bad credentials", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });
    await act(async () => {
      await context.logIn("user", "pass");
    });
    expect(require("react-native").Alert.alert).toHaveBeenCalled();
  });

  it("logOut calls AsyncStorage and router", () => {
    act(() => {
      context.logOut();
    });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(require("expo-router").router.replace).toHaveBeenCalledWith("/login");
  });

  it("createUser calls Alert if fields missing", async () => {
    await act(async () => {
      await context.createUser("", "", "");
    });
    expect(require("react-native").Alert.alert).toHaveBeenCalled();
  });
});