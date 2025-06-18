import React from "react";
import { Navigate, Outlet } from "react-router";
//import Cookies from "js-cookie";
import { useAuth } from "../shared/contexts/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading authentication status...</div>; // Or return null, or a spinner component
    }
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/authentication" replace />
    );
};

export default ProtectedRoute;
