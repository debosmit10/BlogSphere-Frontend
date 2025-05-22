import React from "react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import LogoutButton from "../../features/auth/components/LogoutButton";
import { PiNotePencil } from "react-icons/pi";
import { PiNotification } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    return (
        <nav className="sticky top-0 z-50 h-16 backdrop-blur-lg border-b border-neutral-200">
            <div className="px-4 mx-auto relative text-sm">
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
                            className="flex items-center gap-x-1 rounded-full px-3 py-2 hover:bg-neutral-100 transition-colors"
                        >
                            <PiNotePencil className="text-2xl text-neutral-500" />
                            Write
                        </Link>
                        <button className="rounded-full p-2 hover:bg-neutral-100 transition-colors">
                            <PiNotification className="text-2xl text-neutral-500" />
                        </button>
                        <img
                            src="https://placehold.co/100"
                            alt="Profile Picture"
                            className="rounded-full object-cover size-10"
                        />
                        <button className="rounded-full p-2 hover:bg-neutral-100 transition-colors">
                            <RxHamburgerMenu className="text-2xl text-neutral-500" />
                        </button>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
