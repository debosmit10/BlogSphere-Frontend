import React, { useState, useEffect } from "react";
import ContinueReadingCard from "./ContinueReadingCard";
import { fetchRecentlyVisitedBlogs } from "../api";

const ContinueReading = () => {
    const [recentlyVisitedBlogs, setRecentlyVisitedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecentlyVisitedBlogs = async () => {
            try {
                const data = await fetchRecentlyVisitedBlogs();
                setRecentlyVisitedBlogs(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getRecentlyVisitedBlogs();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-neutral-500">
                Loading Recently Visited Blogs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Error loading Recently Visited Blogs: {error.message}
            </div>
        );
    }

    if (recentlyVisitedBlogs.length === 0) {
        return (
            <div className="text-center text-neutral-500">
                No recently visited blogs.
            </div>
        );
    }

    return (
        <div>
            {recentlyVisitedBlogs.map((blog) => (
                <ContinueReadingCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default ContinueReading;
