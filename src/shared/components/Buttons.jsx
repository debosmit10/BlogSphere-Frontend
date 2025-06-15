import React, { useState } from "react";
import { PiStarFour, PiStarFourFill } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";

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

export const FollowButton = ({ isFollowing, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            className={`px-2 py-0.5 w-23 rounded-full border ${
                isFollowing
                    ? "bg-black text-white hover:bg-white hover:text-black"
                    : "hover:bg-black hover:text-white"
            } transition-colors duration-200 cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isFollowing ? (
                <span>{isHovered ? "Unfollow" : "Following"}</span>
            ) : (
                <span>Follow</span>
            )}
        </button>
    );
};

export const AIButton = ({ onClick, isEnhancing }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            className={`flex flex-row items-center justify-cente space-x-2 px-4 py-2 font-medium border rounded-full transition-colors duration-200 ${
                isEnhancing
                    ? "bg-purple-500 text-white cursor-not-allowed"
                    : "border-purple-500 hover:bg-purple-500 hover:text-white"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isEnhancing}
        >
            {isEnhancing ? (
                <>
                    <span>Enhancing</span>
                    <CgSpinner className="animate-spin text-xl" />
                </>
            ) : (
                <>
                    <span>Enhance</span>
                    {isHovered ? <PiStarFourFill /> : <PiStarFour />}
                </>
            )}
        </button>
    );
};
