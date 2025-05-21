import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../features/landing/pages/LandingPage";
import Login from "../features/auth/pages/Login";
import Registration from "../features/auth/pages/Registration";
import Home from "../features/home/pages/Home";
import Blog from "../features/blog/pages/Blog";
import Write from "../features/blog/pages/Write";
import WriteMock from "../features/blog/pages/WriteMock";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            {/* Temporary Public Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/write" element={<Write />} />
            <Route path="/writemock" element={<WriteMock />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
