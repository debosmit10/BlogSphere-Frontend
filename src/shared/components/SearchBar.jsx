import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className="flex items-center rounded-full px-3 py-2 w-120 border border-neutral-200">
            <CiSearch className="text-gray-500 mr-2 text-xl" />
            <input
                type="text"
                placeholder="Search"
                className="outline-none w-full text-lg bg-transparent placeholder-gray-400 "
            />
        </div>
    );
};

export default SearchBar;
