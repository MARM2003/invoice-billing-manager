import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    setAuth,
    clearAuth,
} from "../utils/tokenStorage";
import { logoutUser } from "../services/auth.service";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();


    const [user, setUser] = useState(() => getAuth());


    // Store user after login
    const login = (userData) => {
        setUser(userData);
        setAuth(userData);
    };


    // Logout
    const logout = async () => {
        await logoutUser();

        setUser(null);
        clearAuth();

        toast.success("Logged Out", {
            onClose: () => navigate("/login"),
        });
    };

    const updateUser = (updatedUser) => {
        const updatedAuth = {
            ...user,
            user: updatedUser,
        };

        setUser(updatedAuth);
        setAuth(updatedAuth);
    };

    

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext