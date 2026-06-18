import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type AuthContextType = {

    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;

};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function fetchUser() {

            if (!token) return;

            try {

                const response = await api.get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);

            } catch (error) {

                localStorage.removeItem("token");
                setToken(null);
                setUser(null);

            }
        }

        fetchUser();

    }, [token]);   

    function login(token: string) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token,user,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
