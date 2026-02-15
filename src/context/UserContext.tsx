
import React, { createContext, useContext, useEffect, useState } from "react";
import { config } from "@/config";

interface UserContextType {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    clientId: string;
    setClientId: (clientId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState(() => localStorage.getItem("user_name") || "");
    const [email, setEmail] = useState(() => localStorage.getItem("user_email") || "");
    const [clientId, setClientId] = useState(() => localStorage.getItem("client_id") || config.landingClientId);

    useEffect(() => {
        if (name) localStorage.setItem("user_name", name);
    }, [name]);

    useEffect(() => {
        if (email) localStorage.setItem("user_email", email);
    }, [email]);

    useEffect(() => {
        if (clientId) localStorage.setItem("client_id", clientId);
    }, [clientId]);

    return (
        <UserContext.Provider value={{ name, setName, email, setEmail, clientId, setClientId }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
