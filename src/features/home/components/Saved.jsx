import React from "react";
import BlogCard from "./BlogCard";

const Saved = () => {
    return (
        <div className="p-7">
            <h1 className="pb-5 font-reservation font-bold text-2xl border-b border-neutral-200">
                Saved
            </h1>
            <div>
                <BlogCard />
            </div>
        </div>
    );
};

export default Saved;
