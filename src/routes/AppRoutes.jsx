import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../features/landing/pages/LandingPage";
import Login from "../features/auth/pages/Login";
import Registration from "../features/auth/pages/Registration";
import Home from "../features/home/pages/Home";
import Blog from "../features/blog/pages/Blog";
import Write from "../features/blog/pages/Write";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/write" element={<Write />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
