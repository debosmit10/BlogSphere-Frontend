import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../features/landing/pages/LandingPage";
import About from "../features/misc/pages/About";
import Contact from "../features/misc/pages/Contact";
import Authentication from "../features/auth/pages/Authentication";
import Home from "../features/home/pages/Home";
import Blog from "../features/blog/pages/Blog";
import Write from "../features/blog/pages/Write";
import Edit from "../features/blog/pages/Edit";
import Profile from "../features/user/pages/Profile";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/write" element={<Write />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/profile/:userId" element={<Profile />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
