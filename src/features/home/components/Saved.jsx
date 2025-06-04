import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { getSavedBlogs } from "../../blog/api";

const Saved = () => {
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                setLoading(true);
                const blogs = await getSavedBlogs();
                setSavedBlogs(blogs);
            } catch (err) {
                console.error("Error fetching saved blogs:", err);
                setError("Failed to load saved blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSavedBlogs();
    }, []);

    return (
        <div className="p-7">
            <h1 className="pb-5 font-reservation font-bold text-2xl border-b border-neutral-200">
                Saved
            </h1>

            {loading && (
                <div className="py-5 text-center text-gray-500">
                    Loading saved blogs...
                </div>
            )}

            {error && (
                <div className="py-5 text-center text-red-500">{error}</div>
            )}

            {!loading && !error && savedBlogs.length === 0 && (
                <div className="py-5 text-center text-gray-500">
                    You haven't saved any blogs yet.
                </div>
            )}

            <div>
                {savedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Saved;
