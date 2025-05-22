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

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                                    <button className="flex flex-row space-x-2">
                                        <PiThumbsUp className="text-2xl" />
                                        <span>0</span>
                                    </button>
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
