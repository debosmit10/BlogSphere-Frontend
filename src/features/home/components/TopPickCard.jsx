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
                    className="h-20 rounded-xl"
                />
            </Link>
            <div className="flex flex-col justify-center space-y-1">
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
                                if (e.target.src !== defaultProfilePic) {
                                    console.warn(
                                        `Failed to load profile picture from ${fullProfilePicUrl}, falling back to default.`
                                    );
                                    e.target.onerror = null;
                                    e.target.src = defaultProfilePic;
                                }
                            }}
                        />
                    </Link>
                    <Link
                        to={`/profile/${blog.authorId}`}
                        className="font-semibold"
                    >
                        {blog.authorName}
                    </Link>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>
                <Link to={`/blog/${blog.id}`} className="font-roboto">
                    {blog.title || "Untitled Blog"}
                </Link>
            </div>
        </div>
    );
};

export default TopPickCard;
