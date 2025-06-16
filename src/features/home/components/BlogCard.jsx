import React, { useState, useEffect, useRef } from "react";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiChats,
    PiChatsFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
    PiShieldCheck,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { formatDate } from "../../../shared/utils/dateUtils";
import {
    getLikeStatus,
    getLikeCount,
    toggleLike,
    getSavedStatus,
    toggleSavedStatus,
} from "../../blog/api";
import { deleteBlog } from "../../home/api";
import { useAuth } from "../../../shared/contexts/AuthContext";

const BlogCard = ({ blog }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    const canDelete =
        user && (user.id === blog.authorId || user.role === "ROLE_ADMIN");

    const canEdit = user && user.id === blog.authorId;

    // Fetch like and save status and count when component mounts
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!blog?.id) return;

            try {
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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const handleDeleteClick = async () => {
        if (!blog?.id || !canDelete) return;

        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlog(blog.id);
                alert("Blog deleted successfully!");
                /*if (onDeleteSuccess) {
                    onDeleteSuccess(blog.id); // Notify parent component to remove the blog
                }*/
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog. Please try again.");
            }
        }
    };

    const handleEditClick = () => {
        if (blog?.id && canEdit) {
            navigate(`/edit/${blog.id}`); // Navigate to edit
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
                <div className="flex flex-row items-center space-x-3">
                    <Link to={`/profile/${blog.authorId}`}>
                        <img
                            src={getFileUrl(
                                "profile-pictures",
                                blog.authorProfilePictureUrl
                            )}
                            alt="Profile"
                            className="rounded-full aspect-square object-cover size-10"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src =
                                    "/api/files/profile-pictures/default.jpg";
                            }}
                        />
                    </Link>
                    <Link to={`/profile/${blog.authorId}`} className="text-lg">
                        {blog.authorName}
                    </Link>
                    {blog.authorRole && blog.authorRole === "ROLE_ADMIN" && (
                        <PiShieldCheck className="text-lg" />
                    )}
                </div>
                <Link to={`/blog/${blog.id}`}>
                    <h2 className="font-roboto font-bold text-3xl line-clamp-1">
                        {blog.title || "Untitled Blog"}
                    </h2>
                    <p className="font-roboto line-clamp-2">
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
                            <Link to={`/blog/${blog.id}`}>
                                <PiChats className="text-2xl hover:text-blue-600 transition-colors duration-200 ease-in-out" />
                            </Link>
                            <span>{blog.commentCount}</span>
                        </button>
                    </div>
                    <div className="relative flex flex-row items-center space-x-4">
                        <button
                            onClick={handleSaveClick}
                            disabled={isSaveLoading}
                            aria-label={isSaved ? "Unsave post" : "Save post"}
                            className="cursor-pointer"
                        >
                            {isSaved ? (
                                <PiBookmarksSimpleFill className="text-2xl text-blue-600" />
                            ) : (
                                <PiBookmarksSimple className="text-2xl hover:text-blue-600 transition-colors duration-200" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <PiDotsThreeBold className="text-2xl rounded-sm hover:bg-neutral-200 transition-colors duration-200 ease-in-out" />
                        </button>
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute left-25 bottom-1.5 w-fit bg-white border border-neutral-200 rounded-xl shadow z-10 overflow-hidden"
                            >
                                {canEdit && (
                                    <button
                                        onClick={handleEditClick}
                                        className="dropdown-list"
                                    >
                                        Edit
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={handleDeleteClick}
                                        className="dropdown-list text-red-500"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* <-----<< Blog Image >>-----> */}
            {blog.imageUrl && (
                <img
                    src={getFileUrl("blog-images", blog.imageUrl)}
                    alt="Blog cover"
                    className="w-3/10 rounded-xl aspect-16/9 object-cover"
                />
            )}
        </div>
    );
};

export default BlogCard;
