import React, { useState, useEffect } from "react";
import TopPickCard from "./TopPickCard";
import { fetchTopLikedBlogsOfWeek } from "../api";

const TopPicks = () => {
    const [topPicks, setTopPicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTopPicks = async () => {
            try {
                const data = await fetchTopLikedBlogsOfWeek();
                setTopPicks(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getTopPicks();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-neutral-500">
                Loading Top Picks...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Error loading Top Picks: {error.message}
            </div>
        );
    }

    if (topPicks.length === 0) {
        return (
            <div className="text-center text-neutral-500">
                No Top Picks this week.
            </div>
        );
    }

    return (
        <div className="space-y-7">
            {topPicks.map((blog) => (
                <TopPickCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default TopPicks;
