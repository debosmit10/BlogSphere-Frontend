import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { fetchAllBlogs } from "../api";

const Feed = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchAllBlogs();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    if (loading) return <div className="p-4">Loading blogs...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (blogs.length === 0) return <div className="p-4">No blogs found</div>;

    return (
        <div>
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Feed;
