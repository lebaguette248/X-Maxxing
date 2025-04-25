import { router } from 'expo-router';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

//Definiert neuer Typ in Typescript
type Authstate = {
    isLoggedIn: boolean;
    logIn: (name: string) => void;
    logOut: () => void;

    loggedAs: string;
}

//Verwendung von Typ für Constante AuthContext, welche einen Context mit Authstate erstellt
export const AuthContext = createContext<Authstate>(
    {
        isLoggedIn: false,
        logIn: () => {},
        logOut: () => {},
        loggedAs: "",
    }
);

export function AuthProvider({children}: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedAs, setLoggedAs] = useState("");

    const logIn = (name:string) => {
        setIsLoggedIn(true);
        setLoggedAs(name);
        router.replace("/");
        
    }

    const logOut = () => {
        setIsLoggedIn(false);
        router.replace("/login");
        setLoggedAs("");
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, logIn, logOut, loggedAs}}>
            {children}
        </AuthContext.Provider>
    );
}

