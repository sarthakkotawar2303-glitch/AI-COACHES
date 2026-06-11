import { useContext } from "react";
import { AuthContext } from "../state/auth.context";
import { login, logout, register, GetMe } from "../services/auth.api";
import { useNavigate } from "react-router";



export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, isLoggingOut, setIsLoggingOut } = context
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data.success) {
                setUser(data.data.user)
                setLoading(false);
                navigate("/")
                return { success: true };
            }
            else {
                setLoading(false);
                return { success: false, error: data.message || data.error || "Login failed" };
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
            return { success: false, error: "An error occurred during sign-in. Please try again." };
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ userName, email, password })
            if (data.success) {
                console.log(data)
                setLoading(false)
                navigate("/login")
            }
            else {
                alert(data.error);
                setLoading(false);
                navigate("/register");
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            navigate("/register")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await logout();
        } catch (error) {
            console.error("Logout API request failed:", error);
        } finally {
            // Wait to ensure the logout animation plays fully
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUser(null)
            setIsLoggingOut(false)
            navigate("/login")
        }
    }

    const getMe = async () => {
        setLoading(true)
        try {
            const data = await GetMe();
            if (data.success && data.data.user) {
                setUser(data.data.user)
                setLoading(false)
                navigate("/")
            }
            else {
                setUser(null)
                setLoading(false)
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            navigate("/login")
        }
        finally {
            setLoading(false)
        }
    }
    return { user, loading, handleLogin, handleRegister, handleLogout, getMe, isLoggingOut }

}
