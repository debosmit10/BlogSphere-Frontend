import React, { createContext, useState, useContext, useEffect } from "react";
import ApiClient, { getUserProfile } from "../api/ApiClient"; // Adjust path as needed, import getUserProfile
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(
            "AuthProvider useEffect: Running on initial load or dependency change."
        );
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId"); // Get user ID from localStorage

        console.log(
            "AuthProvider useEffect: Retrieved from localStorage - token:",
            token ? "Exists" : "Does not exist",
            "userId:",
            userId ? "Exists" : "Does not exist"
        );

        if (token && userId) {
            console.log(
                "AuthProvider useEffect: Token and user ID found. Validating token..."
            );
            try {
                const decoded = jwtDecode(token);
                console.log("AuthProvider useEffect: Token decoded:", decoded);
                if (decoded.exp * 1000 > Date.now()) {
                    console.log(
                        "AuthProvider useEffect: Token is valid. Attempting to fetch user profile for userId:",
                        userId
                    );
                    ApiClient.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;

                    // Fetch full user profile using the stored user ID
                    getUserProfile(userId)
                        .then((userData) => {
                            console.log(
                                "AuthProvider useEffect: User profile fetched successfully:",
                                userData
                            );
                            setUser(userData);
                            setIsAuthenticated(true);
                            console.log(
                                "AuthProvider useEffect: User profile fetched and state updated.",
                                userData
                            );
                        })
                        .catch((error) => {
                            console.error(
                                "AuthProvider useEffect: Error fetching user profile on reload:",
                                error
                            );
                            // If fetching profile fails, clear auth state
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("userId");
                            setUser(null);
                            setIsAuthenticated(false);
                            console.log(
                                "AuthProvider useEffect: Cleared auth state due to profile fetch error."
                            );
                        })
                        .finally(() => {
                            setIsLoading(false);
                            console.log(
                                "AuthProvider useEffect: Finished loading process."
                            );
                        });
                } else {
                    console.log("AuthProvider useEffect: Token expired.");
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("userId"); // Also remove user ID if token expired
                    setUser(null);
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    console.log(
                        "AuthProvider useEffect: Cleared auth state due to expired token."
                    );
                }
            } catch (error) {
                console.error(
                    "AuthProvider useEffect: Error decoding token or fetching profile:",
                    error
                );
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId"); // Also remove user ID on error
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
                console.log(
                    "AuthProvider useEffect: Cleared auth state due to decoding/fetch error."
                );
            }
        } else {
            console.log(
                "AuthProvider useEffect: No token or user ID found. Clearing auth state."
            );
            localStorage.removeItem("authToken"); // Clean up if only one is present
            localStorage.removeItem("userId");
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            console.log(
                "AuthProvider useEffect: Finished loading process (no token/userId)."
            );
        }
    }, []); // Empty dependency array means this runs only once on mount

    const login = async (token, userData) => {
        // Made login async
        console.log("AuthContext login called with:", {
            token: token ? "Exists" : "Does not exist",
            userData,
        }); // Debug log
        if (!token || !userData || !userData.username || !userData.userId) {
            // Ensure userId is present
            console.error(
                "AuthContext login: Invalid token or userData provided.",
                { token: token ? "Exists" : "Does not exist", userData }
            );
            return; // Prevent setting invalid state
        }
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userData.userId); // Store user ID
        ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
            console.log(
                "AuthContext login: Attempting to fetch full user profile for userId:",
                userData.userId
            );
            // Fetch full user profile after successful login
            const fullUserData = await getUserProfile(userData.userId);
            console.log(
                "AuthContext login: Full user profile fetched successfully:",
                fullUserData
            );
            setUser(fullUserData); // Set user state with full data including profilePictureUrl
            setIsAuthenticated(true);
            console.log(
                "AuthContext login: AuthContext state updated after fetching profile:",
                {
                    user: fullUserData,
                    isAuthenticated: true,
                }
            ); // Debug log
        } catch (error) {
            console.error(
                "AuthContext login: Error fetching user profile after login:",
                error
            );
            // If fetching profile fails after login, clear auth state
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            setUser(null);
            setIsAuthenticated(false);
            console.log(
                "AuthContext login: Cleared auth state due to profile fetch error after login."
            );
            // Optionally, show an error message to the user
        }
    };

    const logout = () => {
        console.log("AuthContext logout called."); // Debug log
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId"); // Remove user ID on logout
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
