import React, { useState, useEffect } from "react";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiChats,
    PiChatsFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
} from "react-icons/pi";
import { Link } from "react-router";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { formatDate } from "../../../shared/utils/dateUtils";
import {
    getLikeStatus,
    getLikeCount,
    toggleLike,
    getSavedStatus,
    toggleSavedStatus,
} from "../../blog/api";

const BlogCard = ({ blog }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    // Fetch like and save status and count when component mounts
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!blog?.id) return;

            try {
                // Fetch like status, like count, and saved status in parallel
                const [likeStatus, likesCount, savedStatus] = await Promise.all(
                    [
                        getLikeStatus(blog.id),
                        getLikeCount(blog.id),
                        getSavedStatus(blog.id),
                    ]
                );

                setIsLiked(likeStatus);
                setLikeCount(likesCount);
                setIsSaved(savedStatus);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchLikeData();
    }, [blog?.id]);

    // Handle like button click
    const handleLikeClick = async () => {
        if (!blog?.id || isLikeLoading) return;

        setIsLikeLoading(true);
        try {
            await toggleLike(blog.id);
            // Update UI optimistically
            setIsLiked(!isLiked);
            setLikeCount((prevCount) =>
                isLiked ? prevCount - 1 : prevCount + 1
            );
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert UI changes if API call fails
            alert("Failed to update like status. Please try again.");
        } finally {
            setIsLikeLoading(false);
        }
    };

    // Handle save button click
    const handleSaveClick = async () => {
        if (!blog?.id || isSaveLoading) return;

        setIsSaveLoading(true);
        try {
            const newSavedStatus = await toggleSavedStatus(blog.id);
            // Update UI based on API response
            setIsSaved(newSavedStatus);
        } catch (error) {
            console.error("Error toggling saved status:", error);
            alert("Failed to update saved status. Please try again.");
        } finally {
            setIsSaveLoading(false);
        }
    };

    // Safe checks for undefined values
    if (!blog) {
        return (
            <div className="py-5 border-b border-neutral-200">
                Loading blog...
            </div>
        );
    }

    return (
        <div className="py-5 flex flex-row items-center border-b border-neutral-200 space-x-5">
            {/* <-----<< Blog Info >>-----> */}
            <div className="flex flex-col space-y-2 w-7/10">
                <div className="flex flex-row items-center space-x-4">
                    <Link to={`/profile`}>
                        <img
                            src={getFileUrl(
                                "profile-pictures",
                                blog.authorProfilePictureUrl
                            )}
                            alt="Profile"
                            className="rounded-full object-cover size-10"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src =
                                    "/api/files/profile-pictures/default.jpg";
                            }}
                        />
                    </Link>
                    <Link to={`/profile`} className="text-lg">
                        {blog.authorName}
                    </Link>
                </div>
                <Link to={`/blog/${blog.id}`}>
                    <h2 className="font-roboto font-bold text-3xl">
                        {blog.title || "Untitled Blog"}
                    </h2>
                    <p className="font-roboto">
                        {blog.content || "No content available"}
                    </p>
                </Link>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-4">
                        <span>{formatDate(blog.createdAt)}</span>
                        <div className="flex flex-row space-x-2 items-center">
                            <button
                                onClick={handleLikeClick}
                                disabled={isLikeLoading}
                                aria-label={
                                    isLiked ? "Unlike post" : "Like post"
                                }
                                className="cursor-pointer"
                            >
                                {isLiked ? (
                                    <PiThumbsUpFill className="text-2xl text-blue-600" />
                                ) : (
                                    <PiThumbsUp className="text-2xl hover:text-blue-600 transition-colors duration-200 ease-in-out" />
                                )}
                            </button>
                            <span className={isLiked ? "text-blue-600" : ""}>
                                {likeCount}
                            </span>
                        </div>
                        <button className="flex flex-row space-x-2">
                            <PiChats className="text-2xl" />
                            <span>0</span>
                        </button>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <button
                            onClick={handleSaveClick}
                            disabled={isSaveLoading}
                            aria-label={isSaved ? "Unsave post" : "Save post"}
                            className="cursor-pointer"
                        >
                            {isSaved ? (
                                <PiBookmarksSimpleFill className="text-2xl text-blue-600" />
                            ) : (
                                <PiBookmarksSimple className="text-2xl hover:text-blue-600" />
                            )}
                        </button>
                        <button>
                            <PiDotsThreeBold className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* <-----<< Blog Image >>-----> */}
            {blog.imageUrl && (
                <img
                    src={getFileUrl("blog-images", blog.imageUrl)}
                    alt="Blog cover"
                    className="w-3/10 rounded-xl"
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default BlogCard;
