import React, { createContext, useState, useContext, useEffect } from "react";
import ApiClient from "../api/ApiClient"; // Adjust path as needed
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("AuthProvider: Checking token on initial load...");
        const token = localStorage.getItem("authToken");
        if (token) {
            console.log("AuthProvider: Token found in localStorage.");
            try {
                const decoded = jwtDecode(token);
                console.log("AuthProvider: Token decoded:", decoded);
                if (decoded.exp * 1000 > Date.now()) {
                    console.log(
                        "AuthProvider: Token is valid. Setting auth state."
                    );
                    // Ensure the user object structure matches what Login sets
                    const userData = {
                        username: decoded.sub,
                        profilePictureUrl: decoded.profilePictureUrl || null,
                        // Add any other essential fields from token if available
                    };
                    setUser(userData);
                    setIsAuthenticated(true);
                    ApiClient.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                } else {
                    console.log("AuthProvider: Token expired.");
                    localStorage.removeItem("authToken");
                }
            } catch (error) {
                console.error("AuthProvider: Error decoding token:", error);
                localStorage.removeItem("authToken");
            }
        } else {
            console.log("AuthProvider: No token found in localStorage.");
        }
        setIsLoading(false);
    }, []);

    const login = (token, userData) => {
        console.log("AuthContext login called with:", { token, userData }); // Debug log
        if (!token || !userData || !userData.username) {
            console.error(
                "AuthContext login: Invalid token or userData provided.",
                { token, userData }
            );
            return; // Prevent setting invalid state
        }
        localStorage.setItem("authToken", token);
        ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(userData);
        setIsAuthenticated(true);
        console.log("AuthContext state updated:", {
            user: userData,
            isAuthenticated: true,
        }); // Debug log
    };

    const logout = () => {
        console.log("AuthContext logout called."); // Debug log
        localStorage.removeItem("authToken");
        delete ApiClient.defaults.headers.common["Authorization"];
        setUser(null);
        setIsAuthenticated(false);
        console.log("AuthContext state cleared."); // Debug log
        // Redirect might be better handled in the component calling logout
        // navigate("/login"); // Example if navigate is available here
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    // Don't render children until loading is complete to avoid flashes of incorrect state
    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
