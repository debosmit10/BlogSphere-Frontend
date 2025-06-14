import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { PiThumbsUp, PiThumbsUpFill, PiDotsThreeBold } from "react-icons/pi";
import {
    getFileUrl,
    toggleCommentLike,
    getCommentLikeCount,
    getCommentLikeStatus,
} from "../../../shared/api/ApiClient";
import { useAuth } from "../../../shared/contexts/AuthContext";
import { formatDate } from "../../../shared/utils/dateUtils";

const CommentCard = ({ comment }) => {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikeLoading, setIsLikeLoading] = useState(false);

    useEffect(() => {
        const fetchLikeData = async () => {
            if (!comment?.id || !user?.id) return;

            try {
                const [likedStatus, likesCount] = await Promise.all([
                    getCommentLikeStatus(comment.id, user.id),
                    getCommentLikeCount(comment.id),
                ]);
                setIsLiked(likedStatus);
                setLikeCount(likesCount);
            } catch (error) {
                console.error("Error fetching comment like data:", error);
            }
        };

        fetchLikeData();
    }, [comment?.id, user?.id]);

    const handleLikeClick = async () => {
        if (!comment?.id || !user?.id || isLikeLoading) return;

        setIsLikeLoading(true);
        try {
            const newLikedStatus = await toggleCommentLike(comment.id, user.id);
            setIsLiked(newLikedStatus);
            setLikeCount((prevCount) =>
                newLikedStatus ? prevCount + 1 : prevCount - 1
            );
        } catch (error) {
            console.error("Error toggling comment like:", error);
            alert("Failed to update comment like status. Please try again.");
        } finally {
            setIsLikeLoading(false);
        }
    };

    return (
        <div className="mt-5 pb-5 space-y-3 border-b border-neutral-200">
            <div className="flex flex-row items-center space-x-3">
                <Link to={`/profile/${comment.userId}`}>
                    <img
                        src={getFileUrl(
                            "profile-pictures",
                            comment.userProfilePictureUrl
                        )}
                        alt="Profile Picture"
                        className="rounded-full object-cover size-10"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "/api/files/profile-pictures/default.jpg";
                        }}
                    />
                </Link>
                <Link to={`/profile/${comment.userId}`}>Username</Link>
                <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p>{comment.content}</p>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row  space-x-2">
                    <button
                        onClick={handleLikeClick}
                        disabled={isLikeLoading}
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
                <button className="cursor-pointer">
                    <PiDotsThreeBold className="text-2xl rounded-sm hover:bg-neutral-200 transition-colors duration-200 ease-in-out" />
                </button>
            </div>
        </div>
    );
};

export default CommentCard;
