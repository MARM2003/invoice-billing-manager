import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Store user after login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const updateUser = (updatedUser) => {
        const updatedAuth = {
            ...user,          // Keeps the accessToken
            user: updatedUser // Replaces only the user object
        };

        setUser(updatedAuth);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedAuth)
        );
    };

    // //keep user logged in after refresh
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user")

    //     if (storedUser) setUser(JSON.parse(storedUser))
    // }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext