import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
    const token = Cookies.get("token");
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
