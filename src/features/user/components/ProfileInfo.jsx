import React from "react";
import { FollowButton } from "../../../shared/components/Buttons";

const ProfileInfo = () => {
    return (
        <div className="sticky top-16 p-7 flex flex-col space-y-2 font-syne">
            <img
                src="https://placehold.co/100/cccccc/FFFFFF?text=User"
                alt="Profile Picture"
                className="rounded-full object-cover size-40"
            />
            <h1 className="font-reservation font-black text-2xl">
                Debosmit Karmakar
            </h1>
            <span className="text-neutral-600">@username</span>
            <FollowButton />
            <ul className="flex flex-row space-x-7">
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">10</span>
                    <span className="text-sm text-neutral-600">Posts</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">10k</span>
                    <span className="text-sm text-neutral-600">Followers</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="text-2xl font-bold">100</span>
                    <span className="text-sm text-neutral-600">Following</span>
                </li>
            </ul>
        </div>
    );
};

export default ProfileInfo;
