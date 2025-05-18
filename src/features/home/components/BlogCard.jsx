import React from "react";
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

const BlogCard = ({ blog }) => {
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
                    <span className="text-lg">{blog.authorUsername}</span>
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
                        <span>
                            {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString()
                                : ""}
                        </span>
                        <button className="flex flex-row space-x-2">
                            <PiThumbsUp className="text-2xl" />
                            <span>0</span>
                        </button>
                        <button className="flex flex-row space-x-2">
                            <PiChats className="text-2xl" />
                            <span>0</span>
                        </button>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <button>
                            <PiBookmarksSimple className="text-2xl" />
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
