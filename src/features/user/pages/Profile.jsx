import React, { useState, useEffect } from "react";
import Header from "../../../shared/components/header";
import ProfileContent from "../components/ProfileContent";
import ProfileInfo from "../components/ProfileInfo";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../shared/contexts/AuthContext";
import ApiClient from "../../../shared/api/ApiClient";

const Profile = () => {
    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // If no userId is provided, use the current user's ID
                const targetUserId =
                    userId || (currentUser ? currentUser.id : null);

                if (!targetUserId) {
                    throw new Error("No user ID available");
                }

                const userResponse = await ApiClient.get(
                    `/users/${targetUserId}/profile`
                );
                setUser(userResponse.data);

                const blogsResponse = await ApiClient.get(
                    `/blogs/user/${targetUserId}`
                );
                setBlogs(blogsResponse.data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, currentUser]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">
                    Error: {error.message}
                </div>
                <button
                    onClick={() => navigate("/home")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-row">
                <div className="Left-Bar w-1/5" />
                <div className="Middle-Bar h-screen w-1/2">
                    {blogs && <ProfileContent blogs={blogs} />}
                </div>
                <div className="Right-Bar h-screen w-3/10 border-l border-neutral-200">
                    {user && <ProfileInfo user={user} />}
                </div>
            </div>
        </>
    );
};

export default Profile;
