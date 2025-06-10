import React from "react";
import { FollowButton } from "../../../shared/components/Buttons";
import { getFileUrl } from "../../../shared/api/ApiClient";
import { PiShieldCheck } from "react-icons/pi";

const ProfileInfo = ({
    user,
    blogCount,
    followerCount,
    followingCount,
    isFollowing,
    onToggleFollow,
    showFollowButton,
}) => {
    return (
        <div className="sticky top-16 p-7 flex flex-col space-y-2 font-syne">
            <img
                src={
                    getFileUrl("profile-pictures", user.profilePictureUrl) ||
                    "https://via.placeholder.com/150"
                }
                alt="Profile Picture"
                className="rounded-full aspect-square object-cover size-40"
            />
            <div className="flex flex-row items-center space-x-2">
                <h1 className="font-reservation font-black text-2xl">
                    {user.name}
                </h1>
                {user && user.role === "ROLE_ADMIN" && (
                    <PiShieldCheck className="text-2xl" />
                )}
            </div>
            <span className="text-neutral-600">@{user.username}</span>
            {showFollowButton && (
                <FollowButton
                    isFollowing={isFollowing}
                    onClick={onToggleFollow}
                />
            )}
            <ul className="flex flex-row space-x-7">
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{blogCount}</span>
                    <span className="text-sm text-neutral-600">Posts</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{followerCount}</span>
                    <span className="text-sm text-neutral-600">Followers</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{followingCount}</span>
                    <span className="text-sm text-neutral-600">Following</span>
                </li>
            </ul>
        </div>
    );
};

export default ProfileInfo;
