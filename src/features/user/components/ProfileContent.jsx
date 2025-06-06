import React from "react";
import Feed from "../../home/components/Feed";

const ProfileContent = () => {
    return (
        <div className="flex flex-col px-7 space-y-0">
            <img
                src="https://placehold.co/1920x1080/cccccc/FFFFFF?text=Profile Cover"
                alt="Profile Cover"
                className="w-full h-64 object-cover"
                loading="lazy"
            />
            <nav className="sticky top-16 py-5 flex w-full justify-center space-x-7 bg-white border-b border-neutral-200 font-reservation">
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    Blogs
                </button>
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    About
                </button>
                <button className="text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer">
                    Drafts
                </button>
            </nav>
            <Feed />
        </div>
    );
};

export default ProfileContent;
