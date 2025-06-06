import React from "react";

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

export const FollowButton = () => (
    <button className="px-2 py-0.5 w-fit rounded-full border hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
        <span>Follow</span>
    </button>
);
