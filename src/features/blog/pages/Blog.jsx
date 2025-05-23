import React, { useState, useEffect } from "react";
import Header from "../../../shared/components/header";
import { Link, useParams } from "react-router";
import { FollowButton } from "../../../shared/components/Buttons";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
} from "react-icons/pi";
import Comment from "../components/Comment";
import ApiClient, { getFileUrl } from "../../../shared/api/ApiClient";
import { formatDate } from "../../../shared/utils/dateUtils";
import { getLikeStatus, getLikeCount, toggleLike } from "../api";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await ApiClient.get(`/blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Fetch like status and count when blog data is loaded
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!id) return;

            try {
                // Fetch like status and count in parallel
                const [status, count] = await Promise.all([
                    getLikeStatus(id),
                    getLikeCount(id),
                ]);

                setIsLiked(status);
                setLikeCount(count);
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        };

        if (!loading && !error && blog) {
            fetchLikeData();
        }
    }, [id, loading, error, blog]);

    // Handle like button click
    const handleLikeClick = async () => {
        if (!id || isLikeLoading) return;

        setIsLikeLoading(true);
        try {
            await toggleLike(id);
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

    if (loading) return <div className="p-4">Loading blog...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!blog) return <div className="p-4">Blog not found</div>;

    return (
        <>
            <Header />
            <div className="p-5 flex flex-col items-center font-syne">
                <div className="w-170">
                    <div className="flex flex-col space-y-0">
                        {blog.imageUrl && (
                            <img
                                src={getFileUrl("blog-images", blog.imageUrl)}
                                alt="Blog Cover"
                                className="mb-4 rounded-xl w-full h-auto max-h-96 object-cover"
                            />
                        )}
                        <Link
                            to={`/home/topic/${blog.topic}`}
                            className="mb-2 font-medium text-neutral-600 hover:underline"
                        >
                            #{blog.topicDisplayName}
                        </Link>
                        <h1 className="font-reservation font-bold text-4xl ">
                            {blog.title}
                        </h1>
                    </div>
                    <section>
                        <div className="sticky top-16 py-5 space-y-3 bg-white border-b border-neutral-200">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center space-x-3">
                                    <Link to={`/user/${blog.authorUsername}`}>
                                        <img
                                            src={getFileUrl(
                                                "profile-pictures",
                                                blog.authorProfilePictureUrl
                                            )}
                                            alt="Profile"
                                            className="rounded-full object-cover size-10"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "/api/files/profile-pictures/default.jpg";
                                            }}
                                        />
                                    </Link>
                                    <Link to={`/user/${blog.authorUsername}`}>
                                        {blog.authorUsername}
                                    </Link>
                                    <FollowButton />
                                </div>
                                <div className="flex flex-row space-x-3 items-center">
                                    <span>{formatDate(blog.createdAt)}</span>
                                    <div className="flex flex-row space-x-2 items-center transition-colors duration-200 ease-in-out">
                                        <button
                                            onClick={handleLikeClick}
                                            disabled={isLikeLoading}
                                            aria-label={
                                                isLiked
                                                    ? "Unlike post"
                                                    : "Like post"
                                            }
                                        >
                                            {isLiked ? (
                                                <PiThumbsUpFill className="text-2xl text-blue-600" />
                                            ) : (
                                                <PiThumbsUp className="text-2xl hover:text-blue-600" />
                                            )}
                                        </button>
                                        <span
                                            className={
                                                isLiked ? "text-blue-600" : ""
                                            }
                                        >
                                            {likeCount}
                                        </span>
                                    </div>
                                    <button>
                                        <PiBookmarksSimple className="text-2xl" />
                                    </button>
                                    <button>
                                        <PiDotsThreeBold className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg/loose font-montserrat font-normal">
                                {blog.content}
                            </p>
                        </div>
                    </section>
                    {/*<section>
                        <div className="sticky top-16 flex flex-col py-5 space-y-3 border-y border-neutral-200 bg-white">
                            <span className="font-reservation font-bold text-4xl">
                                Comments
                            </span>
                            <div className="flex flex-row space-x-3 items-center">
                                <img
                                    src="https://placehold.co/100"
                                    alt="Profile Picture"
                                    className="rounded-full object-cover size-10"
                                />
                                <input
                                    type="text"
                                    placeholder="Write your comment here..."
                                    className="outline-none border-b border-neutral-400 w-full text-lg bg-transparent placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                    </section>*/}
                </div>
            </div>
        </>
    );
};

export default Blog;
