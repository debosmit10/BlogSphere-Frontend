import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BlogCard from "./BlogCard";
import { fetchBlogsByTopic } from "../api";

const FeedTopic = ({ selectedTopic }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBlogsByTopic(selectedTopic); // Use the new API function
                console.log(data);
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs by topic:", err);
                setError(err.message || "Failed to load blogs for this topic.");
            } finally {
                setLoading(false);
            }
        };

        if (selectedTopic) {
            getBlogs();
        }
    }, [selectedTopic]);

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

    if (blogs.length === 0) {
        return <div className="p-7">No blogs found for this topic.</div>;
    }

    return (
        <div>
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default FeedTopic;
