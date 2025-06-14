import React, { useState } from "react";
import { PiStarFour, PiStarFourFill } from "react-icons/pi";

// Home Leftbar Button
export const LeftbarButton = ({ icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex px-3 py-2 items-center space-x-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
    >
        <Icon className="text-2xl" />
        <span className="text-xl ">{label}</span>
    </button>
);

export const FollowButton = ({ isFollowing, onClick }) => (
    <button
        onClick={onClick}
        className={`px-2 py-0.5 w-fit rounded-full border ${
            isFollowing
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
        } transition-colors duration-200 cursor-pointer`}
    >
        <span>{isFollowing ? "Following" : "Follow"}</span>
    </button>
);

export const AIButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="flex flex-row items-center justify-cente space-x-2 px-4 py-2 font-medium border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-colors duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>Enhance</span>
            {isHovered ? <PiStarFourFill /> : <PiStarFour />}
        </button>
    );
};
