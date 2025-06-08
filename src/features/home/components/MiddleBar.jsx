import React, { useState, useRef, useEffect } from "react";
import Feed from "./Feed";
import FeedFollowing from "./FeedFollowing";
import { PiArrowCircleLeft } from "react-icons/pi";

const MiddleBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeView, setActiveView] = useState("forYou");
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleForYouClick = () => {
        setActiveView("forYou");
        setMenuOpen(false);
    };

    const handleFollowingClick = () => {
        setActiveView("following");
        setMenuOpen(false);
    };

    return (
        <div className="p-7">
            <div className="relative flex flex-row items-center pb-5 space-x-5 border-b border-neutral-200">
                {/* Button to open dropdown menu */}
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="cursor-pointer"
                >
                    <PiArrowCircleLeft className="text-2xl" />
                </button>
                {/* Dropdown menu to select view */}
                {isMenuOpen && (
                    <ul
                        ref={menuRef}
                        className="absolute top-[-0.2rem] right-235 w-fit max-h-60 overflow-y-auto scrollbar-hidden bg-white border border-neutral-200 rounded-xl shadow z-10 overflow-hidden"
                    >
                        <li
                            onClick={handleForYouClick}
                            className="dropdown-list"
                        >
                            <span>For You</span>
                        </li>
                        <li
                            onClick={handleFollowingClick}
                            className="dropdown-list"
                        >
                            <span>Following</span>
                        </li>
                    </ul>
                )}
                {/* Current View */}
                <span className="font-reservation font-bold text-2xl">
                    {activeView === "forYou" ? "For You" : "Following"}
                </span>
            </div>
            {activeView === "forYou" ? <Feed /> : <FeedFollowing />}
        </div>
    );
};

export default MiddleBar;
