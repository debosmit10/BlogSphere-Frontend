import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { fetchBlogsFromFollowedUsers } from "../api";

const FeedFollowing = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const data = await fetchBlogsFromFollowedUsers();
                setBlogs(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-8">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-5">
            {blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
                <span className="text-neutral-500 text-center mt-8">
                    No blogs from followed users yet.
                </span>
            )}
        </div>
    );
};

export default FeedFollowing;
