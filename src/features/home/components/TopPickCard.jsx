import React from "react";
import { Link } from "react-router";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { formatDate } from "../../../shared/utils/dateUtils";

const TopPickCard = ({ blog }) => {
    return (
        <div className="flex flex-row w-100 rounded-2xl items-center space-x-3">
            <Link to={`/blog/${blog.id}`}>
                <img
                    src={getFileUrl("blog-images", blog.imageUrl)}
                    alt="Blog Cover"
                    className="h-20 aspect-16/9 object-cover rounded-xl"
                />
            </Link>
            <div className="flex flex-col justify-center space-y-2">
                <div className="flex flex-row space-x-3 items-center">
                    <Link to={`/profile/${blog.authorId}`}>
                        <img
                            src={getFileUrl(
                                "profile-pictures",
                                blog.authorProfilePictureUrl
                            )}
                            alt="Profile Picture"
                            className="rounded-full object-cover size-8"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src =
                                    "/api/files/profile-pictures/default.jpg";
                            }}
                        />
                    </Link>
                    <Link
                        to={`/profile/${blog.authorId}`}
                        className="font-semibold line-clamp-1"
                    >
                        {blog.authorUsername}
                    </Link>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>
                <Link
                    to={`/blog/${blog.id}`}
                    className="font-roboto line-clamp-1"
                >
                    {blog.title || "Untitled Blog"}
                </Link>
            </div>
        </div>
    );
};

export default TopPickCard;
