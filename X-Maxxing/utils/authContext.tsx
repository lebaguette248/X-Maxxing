import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

//Definiert neuer Typ in Typescript
type Authstate = {
    isLoggedIn: boolean;
    logIn: (name: string) => void;
    logOut: () => void;
    isReady: boolean;

    loggedAs: string;
}

const authStrogeKey = "auth-key";

//Verwendung von Typ für Constante AuthContext, welche einen Context mit Authstate erstellt
export const AuthContext = createContext<Authstate>(
    {
        isLoggedIn: false,
        isReady: false,
        logIn: () => {},
        logOut: () => {},
        loggedAs: "",
    }
);

export function AuthProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedAs, setLoggedAs] = useState("");
    const storeAuthState = async (newState: { isLoggedIn: boolean; loggedAs: string }) => {
        try {
            const jsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStrogeKey, jsonValue);

        } catch (e) {
            console.error("Error storing auth state", e);
        }
    }

    const logIn = (name:string) => {
        setIsLoggedIn(true);
        setLoggedAs(name);
        storeAuthState({isLoggedIn: true, loggedAs: name});
        router.replace("/");
        
    }

    const logOut = () => {
        setIsLoggedIn(false);
        setLoggedAs("");
        storeAuthState({isLoggedIn: false, loggedAs: ""});
        router.replace("/login");
    }

    useEffect(() => {
        const getAuthFromStorage = async () => {
            try {
                const value = await AsyncStorage.getItem(authStrogeKey);
                if(value !== null) {
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);

                }
            } catch (e) {
                console.error("Error getting auth state", e);
            }
            setIsReady(true);
        }
        getAuthFromStorage();
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, logIn, logOut, loggedAs, isReady}}>
            {children}
        </AuthContext.Provider>
    );
}

