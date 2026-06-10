import { createContext, useState, useEffect } from "react";
import { GetMe } from "../services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await GetMe();
                if (data.success) {
                    setUser(data.data.user || data.data);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, isLoggingOut, setIsLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};