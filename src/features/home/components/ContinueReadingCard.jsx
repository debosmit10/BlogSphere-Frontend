import React from "react";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { Link } from "react-router";

const ContinueReadingCard = ({ blog }) => {
    return (
        <Link
            to={`/blog/${blog.id}`}
            className="px-3 py-2 flex flex-row items-center space-x-3 rounded-2xl hover:bg-gray-100 duration-200"
        >
            <img
                src={getFileUrl(
                    "profile-pictures",
                    blog.authorProfilePictureUrl
                )}
                alt="Profile Picture"
                className="rounded-full object-cover size-8"
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/api/files/profile-pictures/default.jpg";
                }}
            />
            <h3 className="font-roboto line-clamp-1">{blog.title}</h3>
        </Link>
    );
};

export default ContinueReadingCard;
