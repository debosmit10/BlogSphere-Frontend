import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import {
    PiNotePencil,
    PiNotification,
    PiUserCircle,
    PiSquareSplitVertical,
    PiNote,
    PiBookmarksSimple,
    PiGearSix,
    PiChartBar,
} from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import Hamburger from "hamburger-react";
import { useAuth } from "../contexts/AuthContext";
import { getFileUrl } from "../api/ApiClient";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const { user, logout, isAuthenticated, isLoading } = useAuth(); // Get user and logout from context
    const navigate = useNavigate(); // Hook for navigation

    // --- Construct Profile Picture URL using getFileUrl ---
    const defaultProfilePic =
        "https://placehold.co/100/cccccc/FFFFFF?text=User"; // Default/fallback image

    // Use getFileUrl to construct the full URL if profilePictureUrl (filename) exists
    const fullProfilePicUrl = user?.profilePictureUrl
        ? getFileUrl("profile-pictures", user.profilePictureUrl) // Use the utility function
        : defaultProfilePic;

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

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

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
                    {/* <SearchBar className="" /> */}
                    <div className="flex items-center space-x-0">
                        <Link
                            to={`/write`}
                            className="mr-4 flex items-center gap-x-1 text-neutral-500"
                        >
                            <PiNotePencil className="text-2xl text-neutral-500" />
                            <span>Write</span>
                        </Link>
                        {/* <Link to={`#notification`} className="mr-4">
                            <PiNotification className="text-2xl text-neutral-500" />
                        </Link> */}
                        <Link to={`/profile/${user.id}`}>
                            <img
                                src={fullProfilePicUrl}
                                alt="Profile Picture"
                                className="rounded-full aspect-square object-cover size-10"
                                onError={(e) => {
                                    if (e.target.src !== defaultProfilePic) {
                                        console.warn(
                                            `Failed to load profile picture from ${fullProfilePicUrl}, falling back to default.`
                                        );
                                        e.target.onerror = null;
                                        e.target.src = defaultProfilePic;
                                    }
                                }}
                            />
                        </Link>
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
                                    <Link to={`/profile/${user.id}`}>
                                        <li className="dropdown-list">
                                            <PiUserCircle className="text-2xl" />
                                            <span>Profile</span>
                                        </li>
                                    </Link>
                                    <Link to={`/home`}>
                                        <li className="dropdown-list">
                                            <PiSquareSplitVertical className="text-2xl" />
                                            <span>Feed</span>
                                        </li>
                                    </Link>
                                    {/* <li className="dropdown-list">
                                        <PiNote className="text-2xl" />
                                        <span>Drafts</span>
                                    </li>
                                    <li className="dropdown-list">
                                        <PiBookmarksSimple className="text-2xl" />
                                        <span>Saved</span>
                                    </li> */}
                                    {user && user.role === "ROLE_ADMIN" && (
                                        <Link to={`/admin/dashboard`}>
                                            <li className="dropdown-list">
                                                <PiChartBar className="text-2xl" />
                                                <span>Dashboard</span>
                                            </li>
                                        </Link>
                                    )}
                                    <li className="dropdown-list">
                                        <PiGearSix className="text-2xl" />
                                        <span>Settings</span>
                                    </li>
                                    <li className="hover:bg-neutral-100 transition-colors duration-200">
                                        <button
                                            onClick={handleLogout}
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
