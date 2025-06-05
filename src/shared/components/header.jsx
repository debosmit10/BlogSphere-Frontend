import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import {
    PiNotePencil,
    PiNotification,
    PiUserCircle,
    PiSquareSplitVertical,
    PiNote,
    PiBookmarksSimple,
    PiGearSix,
} from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import Hamburger from "hamburger-react";
import { logoutUser } from "../../features/auth/api";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Check if the click target is the hamburger icon itself
                const hamburgerElement =
                    document.querySelector(".hamburger-react"); // hamburger-react adds this class
                if (
                    !hamburgerElement ||
                    !hamburgerElement.contains(event.target)
                ) {
                    setMenuOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 h-16 bg-white border-b border-neutral-200">
            <div className="pl-4 mx-auto relative font-syne">
                <div className="flex justify-between h-16 items-center">
                    <Link
                        to={`/home`}
                        className="font-reservation font-bold text-2xl"
                    >
                        BLOGPSHERE
                    </Link>
                    <SearchBar className="" />
                    <div className="flex items-center space-x-0">
                        <Link
                            to={`/write`}
                            className="mr-4 flex items-center gap-x-1 text-neutral-500"
                        >
                            <PiNotePencil className="text-2xl text-neutral-500" />
                            {/* Write */}
                        </Link>
                        {/* <button className="rounded-full p-2 hover:bg-neutral-100 transition-colors">
                            <PiNotification className="text-2xl text-neutral-500" />
                        </button> */}
                        <Link to={`#notification`} className="mr-4">
                            <PiNotification className="text-2xl text-neutral-500" />
                        </Link>
                        <img
                            src="https://placehold.co/100"
                            alt="Profile Picture"
                            className="rounded-full object-cover size-10"
                        />
                        {/* Hamburger Menu Section */}
                        <div ref={menuRef} className="relative ml-1">
                            <Hamburger
                                size={24}
                                direction="left"
                                color="#737373" //neutral-500
                                rounded
                                label="Show menu"
                                toggled={isMenuOpen}
                                toggle={setMenuOpen}
                            />
                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <ul className="absolute top-14 right-[-16px] w-48 bg-white border-l border-b border-neutral-200 rounded-bl-xl z-20 overflow-hidden">
                                    <li className="dropdown-list">
                                        <PiUserCircle className="text-2xl" />
                                        <span>Profile</span>
                                    </li>
                                    <li className="dropdown-list">
                                        <PiSquareSplitVertical className="text-2xl" />
                                        <span>Feed</span>
                                    </li>
                                    <li className="dropdown-list">
                                        <PiNote className="text-2xl" />
                                        <span>Drafts</span>
                                    </li>
                                    <li className="dropdown-list">
                                        <PiBookmarksSimple className="text-2xl" />
                                        <span>Saved</span>
                                    </li>
                                    <li className="dropdown-list">
                                        <PiGearSix className="text-2xl" />
                                        <span>Settings</span>
                                    </li>
                                    <li className="hover:bg-neutral-100 transition-colors duration-200">
                                        <button
                                            onClick={logoutUser}
                                            className="dropdown-list"
                                        >
                                            <IoIosLogOut className="text-2xl" />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
