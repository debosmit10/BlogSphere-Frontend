import React, { useState, useEffect, useContext } from "react";
import Header from "../../../shared/components/header";
import { Link, useParams } from "react-router";
import { FollowButton } from "../../../shared/components/Buttons";
import {
    PiThumbsUp,
    PiThumbsUpFill,
    PiBookmarksSimple,
    PiBookmarksSimpleFill,
    PiDotsThreeBold,
    PiShieldCheck,
} from "react-icons/pi";
import CommentSection from "../components/CommentSection";
import ApiClient, {
    getFileUrl,
    getCommentsByBlogId,
} from "../../../shared/api/ApiClient";
import { formatDate } from "../../../shared/utils/dateUtils";
import {
    getLikeStatus,
    getLikeCount,
    toggleLike,
    getSavedStatus,
    toggleSavedStatus,
} from "../../blog/api";
import { useAuth } from "../../../shared/contexts/AuthContext";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [comments, setComments] = useState([]); // New state for comments
    const [commentsLoading, setCommentsLoading] = useState(true); // New state for comments loading
    const [commentsError, setCommentsError] = useState(null); // New state for comments error

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

    // Fetch like and save status and count when blog data is loaded
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!id) return;

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
                console.error("Error fetching like data:", error);
            }
        };

        if (!loading && !error && blog) {
            fetchLikeData();
        }
    }, [id, loading, error, blog]);

    const fetchComments = async () => {
        if (!id) {
            console.log("fetchComments: Blog ID is not available.");
            return;
        }
        setCommentsLoading(true);
        setCommentsError(null);
        try {
            console.log(
                `fetchComments: Attempting to fetch comments for blog ID: ${id}`
            );
            const fetchedComments = await getCommentsByBlogId(id);
            console.log(
                "fetchComments: Fetched comments data:",
                fetchedComments
            );
            setComments(fetchedComments);
            console.log("fetchComments: Comments state updated.");
        } catch (err) {
            console.error("fetchComments: Error fetching comments:", err);
            setCommentsError(err.message);
        } finally {
            setCommentsLoading(false);
            console.log("fetchComments: Comments loading finished.");
        }
    };

    useEffect(() => {
        if (!loading && !error && blog) {
            console.log(
                "Blog useEffect: Blog data loaded, initiating comment fetch."
            );
            fetchComments();
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
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
                                className="mb-4 rounded-xl w-full h-auto max-h-96 aspect-16/9 object-cover"
                            />
                        )}
                        <div className="mb-2 font-medium text-neutral-600">
                            #{blog.topicDisplayName}
                        </div>
                        <h1 className="font-reservation font-bold text-4xl ">
                            {blog.title}
                        </h1>
                    </div>
                    {/* Blog Section */}
                    <section>
                        <div className="sticky top-16 py-5 space-y-3 bg-white border-b border-neutral-200">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center space-x-3">
                                    <Link to={`/profile/${blog.authorId}`}>
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
                                    <Link
                                        to={`/profile/${blog.authorId}`}
                                        className="text-lg"
                                    >
                                        {blog.authorUsername}
                                    </Link>
                                    {blog.authorRole &&
                                        blog.authorRole === "ROLE_ADMIN" && (
                                            <PiShieldCheck className="text-lg" />
                                        )}
                                    {/* <FollowButton /> */}
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
                                            className="cursor-pointer"
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
                                    <button
                                        onClick={handleSaveClick}
                                        disabled={isSaveLoading}
                                        aria-label={
                                            isSaved
                                                ? "Unsave post"
                                                : "Save post"
                                        }
                                        className="cursor-pointer"
                                    >
                                        {isSaved ? (
                                            <PiBookmarksSimpleFill className="text-2xl text-blue-600" />
                                        ) : (
                                            <PiBookmarksSimple className="text-2xl hover:text-blue-600 transition-colors duration-200" />
                                        )}
                                    </button>
                                    <button>
                                        <PiDotsThreeBold className="text-2xl rounded-sm hover:bg-neutral-200 transition-colors duration-200 ease-in-out" />
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
                    {/* Comments Section */}
                    <section>
                        <CommentSection
                            blogId={blog.id}
                            comments={comments}
                            commentsLoading={commentsLoading}
                            commentsError={commentsError}
                            onCommentPosted={fetchComments}
                        />
                    </section>
                </div>
            </div>
        </>
    );
};

export default Blog;
